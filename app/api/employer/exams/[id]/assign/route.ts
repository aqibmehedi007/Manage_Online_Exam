import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session || session.role !== 'EMPLOYER') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id: examId } = await params;
    const { userId } = await request.json();

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    // 1. Check if submission already exists (concurrency safety)
    const existing = await prisma.submission.findUnique({
      where: {
        userId_examId: {
          userId,
          examId
        }
      }
    });

    if (existing) {
      return NextResponse.json({ error: 'Candidate already assigned' }, { status: 400 });
    }

    // 2. Create the submission
    const submission = await prisma.submission.create({
      data: {
        userId,
        examId,
        status: 'ASSIGNED'
      }
    });

    return NextResponse.json(submission);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
