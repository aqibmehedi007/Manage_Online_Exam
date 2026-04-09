const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('password123', 10);

  // 1. Create Employer
  const employer = await prisma.user.upsert({
    where: { email: 'employer@example.com' },
    update: {},
    create: {
      email: 'employer@example.com',
      password: hashedPassword,
      role: 'EMPLOYER',
    },
  });

  // 2. Create Candidate
  await prisma.user.upsert({
    where: { email: 'candidate@example.com' },
    update: {},
    create: {
      email: 'candidate@example.com',
      password: hashedPassword,
      role: 'CANDIDATE',
    },
  });

  // 3. Create Sample Exams
  const exam1 = await prisma.exam.create({
    data: {
      title: 'Psychometric Test for Management Trainee Officer',
      totalCandidates: 10000,
      totalSlots: 3,
      questionSets: 3,
      questionType: 'Multiple Choice',
      startTime: new Date('2026-04-10T10:00:00Z'),
      endTime: new Date('2026-04-10T11:00:00Z'),
      duration: 30,
      negativeMarking: 0.25,
      employerId: employer.id,
      questions: {
        create: [
          {
            title: 'What is the capital of Bangladesh?',
            type: 'RADIO',
            options: {
              create: [
                { text: 'Dhaka', isCorrect: true },
                { text: 'Chittagong', isCorrect: false },
                { text: 'Sylhet', isCorrect: false },
                { text: 'Rajshahi', isCorrect: false },
              ],
            },
          },
          {
            title: 'Which of the following are programming languages?',
            type: 'CHECKBOX',
            options: {
              create: [
                { text: 'JavaScript', isCorrect: true },
                { text: 'HTML', isCorrect: false },
                { text: 'Python', isCorrect: true },
                { text: 'CSS', isCorrect: false },
              ],
            },
          },
          {
            title: 'Explain the concept of AI in one sentence.',
            type: 'TEXT',
          },
        ],
      },
    },
  });

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
