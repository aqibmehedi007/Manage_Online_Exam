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

    const { id: examId } = await params;

    // 1. Get all candidates who are already assigned to this exam
    const assignedSubmissions = await prisma.submission.findMany({
      where: { examId },
      select: { userId: true }
    });

    const assignedUserIds = assignedSubmissions.map(s => s.userId);

    // 2. Fetch all CANDIDATE users NOT in that list
    const availableCandidates = await prisma.user.findMany({
      where: {
        role: 'CANDIDATE',
        id: {
          notIn: assignedUserIds
        }
      },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        gender: true,
      },
      orderBy: { name: 'asc' }
    });

    return NextResponse.json(availableCandidates);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
