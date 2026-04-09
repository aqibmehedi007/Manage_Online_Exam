import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function GET() {
  try {
    const session = await getSession();
    if (!session || session.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 1. User Summary
    const totalUsers = await prisma.user.count();
    const candidateCount = await prisma.user.count({ where: { role: 'CANDIDATE' } });
    const employerCount = await prisma.user.count({ where: { role: 'EMPLOYER' } });

    // 2. Exam Summary
    const totalExams = await prisma.exam.count();
    const totalSubmissions = await prisma.submission.count();
    const completedSubmissions = await prisma.submission.count({ where: { status: 'COMPLETED' } });

    // 3. Platform Health / Integrity
    const totalTabSwitches = await prisma.submission.aggregate({
      _sum: { tabSwitches: true, fullscreenExits: true }
    });

    const avgScore = await prisma.submission.aggregate({
      where: { status: 'COMPLETED' },
      _avg: { score: true }
    });

    // 4. Recent Activity (Latest 8 events)
    const recentSubmissions = await prisma.submission.findMany({
      take: 5,
      orderBy: { updatedAt: 'desc' },
      include: {
        user: { select: { name: true, image: true } },
        exam: { select: { title: true } }
      }
    });

    const recentExams = await prisma.exam.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: {
        employer: { select: { name: true } }
      }
    });

    return NextResponse.json({
      metrics: {
        users: { total: totalUsers, candidates: candidateCount, employers: employerCount },
        exams: { total: totalExams, submissions: totalSubmissions, completed: completedSubmissions },
        integrity: {
          tabSwitches: totalTabSwitches._sum.tabSwitches || 0,
          fullscreenExits: totalTabSwitches._sum.fullscreenExits || 0,
          cheatingRate: totalSubmissions > 0 
            ? ((totalTabSwitches._sum.tabSwitches || 0) / totalSubmissions).toFixed(2) 
            : 0
        },
        performance: {
          avgScore: (avgScore._avg.score || 0).toFixed(1)
        }
      },
      activity: {
        submissions: recentSubmissions,
        exams: recentExams
      },
      dbHealth: {
        questions: await prisma.question.count(),
        options: await prisma.option.count()
      }
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
