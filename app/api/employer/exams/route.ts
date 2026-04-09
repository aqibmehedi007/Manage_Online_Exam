import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function GET() {
  try {
    const session = await getSession();
    if (!session || session.role !== 'EMPLOYER') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const exams = await prisma.exam.findMany({
      where: { employerId: session.id },
      include: {
        _count: {
          select: {
            submissions: true,
            questions: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    // Map the counts to the property names expected by the UI
    const formattedExams = exams.map(exam => ({
      ...exam,
      candidateCount: exam._count.submissions,
      questionCount: exam._count.questions,
    }));

    return NextResponse.json(formattedExams);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session || session.role !== 'EMPLOYER') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { 
      title, totalCandidates, totalSlots, questionSets, 
      questionType, startTime, endTime, duration, 
      negativeMarking, questions 
    } = body;

    if (!title || !startTime || !endTime || !duration) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const result = await prisma.$transaction(async (tx) => {
      const exam = await tx.exam.create({
        data: {
          title,
          totalCandidates: parseInt(totalCandidates) || 0,
          totalSlots: parseInt(totalSlots) || 0,
          questionSets: parseInt(questionSets) || questions.length,
          questionType,
          startTime: new Date(startTime),
          endTime: new Date(endTime),
          duration: parseInt(duration) || 30,
          negativeMarking: parseFloat(negativeMarking) || 0,
          employerId: session.id,
        },
      });

      for (const q of questions) {
        const question = await tx.question.create({
          data: {
            title: q.title,
            type: q.type,
            examId: exam.id,
          },
        });

        if (q.options && q.options.length > 0) {
          await tx.option.createMany({
            data: q.options.map((o: any) => ({
              text: o.text,
              isCorrect: o.isCorrect,
              questionId: question.id,
            })),
          });
        }
      }

      return exam;
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
