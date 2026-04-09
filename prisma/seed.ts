const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('password123', 10);

  // 1. Create Employer (Arif Hossain)
  const employer = await prisma.user.upsert({
    where: { email: 'employer@akij.work' },
    update: {},
    create: {
      email: 'employer@akij.work',
      name: 'Arif Hossain',
      password: hashedPassword,
      role: 'EMPLOYER',
    },
  });

  // 2. Create Candidate (Md. Naimur Rahman)
  const candidate = await prisma.user.upsert({
    where: { email: 'candidate@akij.work' },
    update: {},
    create: {
      email: 'candidate@akij.work',
      name: 'Md. Naimur Rahman',
      password: hashedPassword,
      role: 'CANDIDATE',
    },
  });

  // 3. Create Exam (MCQ Exam for Probationary Officer)
  const exam = await prisma.exam.create({
    data: {
      title: 'MCQ Exam for Probationary Officer',
      totalCandidates: 200,
      totalSlots: 5,
      questionSets: 20,
      questionType: 'MCQ',
      startTime: new Date(),
      endTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
      duration: 30,
      negativeMarking: 0.25,
      employerId: employer.id,
      questions: {
        create: [
          {
            title: 'Which of the following indicators is used to measure market volatility?',
            type: 'RADIO',
            options: {
              create: [
                { text: 'Relative Strength Index (RSI)', isCorrect: false },
                { text: 'Moving Average Convergence Divergence (MACD)', isCorrect: false },
                { text: 'Bollinger Bands', isCorrect: true },
                { text: 'Fibonacci Retracement', isCorrect: false },
              ],
            },
          },
          {
            title: 'What is the primary purpose of a "Stop Loss" order in trading?',
            type: 'RADIO',
            options: {
              create: [
                { text: 'To maximize profit potential', isCorrect: false },
                { text: 'To limit potential losses on a position', isCorrect: true },
                { text: 'To execute a trade at the best available price', isCorrect: false },
                { text: 'To ensure a trade is executed only during high volatility', isCorrect: false },
              ],
            },
          },
          {
            title: 'Which financial statement summarizes a company\'s revenues and expenses over a specific period?',
            type: 'RADIO',
            options: {
              create: [
                { text: 'Balance Sheet', isCorrect: false },
                { text: 'Income Statement', isCorrect: true },
                { text: 'Cash Flow Statement', isCorrect: false },
                { text: 'Statement of Retained Earnings', isCorrect: false },
              ],
            },
          },
        ],
      },
    },
  });

  // Add more generic questions to reach 20 as per design
  for (let i = 4; i <= 20; i++) {
    await prisma.question.create({
      data: {
        title: `Financial Knowledge Assessment Question ${i}?`,
        type: 'RADIO',
        examId: exam.id,
        options: {
          create: [
            { text: `Sample Option A for Question ${i}`, isCorrect: true },
            { text: `Sample Option B for Question ${i}`, isCorrect: false },
            { text: `Sample Option C for Question ${i}`, isCorrect: false },
            { text: `Sample Option D for Question ${i}`, isCorrect: false },
          ],
        },
      },
    });
  }

  console.log('Seed data created successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
