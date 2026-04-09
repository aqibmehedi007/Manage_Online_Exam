import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { id: examId } = await params;
    const { type, count } = await request.json();

    const updateData: any = {};
    if (type === 'TAB_SWITCH') updateData.tabSwitches = count;
    if (type === 'FULLSCREEN_EXIT') updateData.fullscreenExits = count;

    await prisma.submission.update({
      where: {
        userId_examId: {
          userId: session.id,
          examId: examId,
        }
      },
      data: updateData
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to log activity' }, { status: 500 });
  }
}
