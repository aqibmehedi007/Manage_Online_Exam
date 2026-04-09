import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session || session.role !== 'EMPLOYER') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const exam = await prisma.exam.findUnique({
      where: { id },
      include: {
        questions: {
          include: {
            options: true
          }
        }
      }
    });

    if (!exam) return NextResponse.json({ error: 'Exam not found' }, { status: 404 });

    return NextResponse.json(exam);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session || session.role !== 'EMPLOYER') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const { questions, ...examData } = body;

    // Update the exam and questions (transactional)
    const result = await prisma.$transaction(async (tx) => {
      // 1. Update basic info
      const updatedExam = await tx.exam.update({
        where: { id },
        data: {
          title: examData.title,
          totalCandidates: examData.totalCandidates,
          totalSlots: examData.totalSlots,
          questionSets: examData.questionSets,
          questionType: examData.questionType,
          startTime: new Date(examData.startTime),
          endTime: new Date(examData.endTime),
          duration: examData.duration,
          negativeMarking: examData.negativeMarking,
        }
      });

      // 2. Clear old questions/options and re-create (simplest for update)
      await tx.option.deleteMany({ where: { question: { examId: id } } });
      await tx.question.deleteMany({ where: { examId: id } });

      for (const q of questions) {
        await tx.question.create({
          data: {
            title: q.title,
            type: q.type,
            examId: id,
            options: q.options && q.options.length > 0 ? {
              create: q.options.map((opt: any) => ({
                text: opt.text,
                isCorrect: opt.isCorrect
              }))
            } : undefined
          }
        });
      }

      return updatedExam;
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
