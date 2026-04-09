import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function GET() {
  try {
    const session = await getSession();
    if (!session || session.role !== 'CANDIDATE') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const exams = await prisma.exam.findMany({
      orderBy: { startTime: 'asc' },
      include: {
        _count: {
          select: { questions: true }
        }
      }
    });

    return NextResponse.json(exams.map((exam: any) => ({
      ...exam,
      questionCount: exam._count.questions
    })));
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
