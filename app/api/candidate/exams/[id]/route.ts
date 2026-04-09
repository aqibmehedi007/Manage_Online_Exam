import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session || session.role !== 'CANDIDATE') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    const exam = await prisma.exam.findUnique({
      where: { id },
      include: {
        questions: {
          include: {
            options: {
              select: {
                id: true,
                text: true,
                // Do NOT include isCorrect!
              }
            }
          }
        }
      }
    });

    if (!exam) {
      return NextResponse.json({ error: 'Exam not found' }, { status: 404 });
    }

    // Initialize or get the submission session
    const submission = await prisma.submission.upsert({
      where: {
        userId_examId: {
          userId: session.id,
          examId: id,
        }
      },
      update: {},
      create: {
        userId: session.id,
        examId: id,
        status: 'IN_PROGRESS',
        startedAt: new Date(),
      }
    });

    return NextResponse.json({
      exam,
      submission
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
