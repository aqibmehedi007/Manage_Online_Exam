import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getSession();
    if (!session || session.role !== 'CANDIDATE') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id: examId } = await params;
    const { answers } = await request.json(); // { questionId: [optionId, ...] }

    const exam = await prisma.exam.findUnique({
      where: { id: examId },
      include: {
        questions: {
          include: {
            options: true
          }
        }
      }
    });

    if (!exam) return NextResponse.json({ error: 'Exam not found' }, { status: 404 });

    let score = 0;
    const negMark = exam.negativeMarking || 0;

    for (const q of exam.questions) {
      const candidateAnswer = answers[q.id] || [];
      const correctOptionIds = q.options.filter(o => o.isCorrect).map(o => o.id);

      if (q.type === 'RADIO') {
        if (candidateAnswer.length > 0) {
          if (candidateAnswer[0] === correctOptionIds[0]) {
            score += 1;
          } else {
            score -= negMark;
          }
        }
      } else if (q.type === 'CHECKBOX') {
        if (candidateAnswer.length > 0) {
          const isCorrect = 
            candidateAnswer.length === correctOptionIds.length && 
            candidateAnswer.every((id: string) => correctOptionIds.includes(id));
          
          if (isCorrect) {
            score += 1;
          } else {
            score -= negMark;
          }
        }
      }
    }

    const submission = await prisma.submission.update({
      where: {
        userId_examId: {
          userId: session.id,
          examId: examId,
        }
      },
      data: {
        status: 'COMPLETED',
        score: score,
        submittedAt: new Date(),
      }
    });

    return NextResponse.json(submission);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to submit' }, { status: 500 });
  }
}
