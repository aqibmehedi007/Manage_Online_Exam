const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  // Clean existing data
  await prisma.submission.deleteMany();
  await prisma.option.deleteMany();
  await prisma.question.deleteMany();
  await prisma.exam.deleteMany();
  await prisma.user.deleteMany();

  const hash = await bcrypt.hash('password123', 10);

  // ── Users ──────────────────────────────────────────────
  const employer1 = await prisma.user.create({
    data: { email: 'employer@akij.work', name: 'Arif Hossain', password: hash, role: 'EMPLOYER' },
  });
  const employer2 = await prisma.user.create({
    data: { email: 'tanvir@akij.work', name: 'Tanvir Ahmed', password: hash, role: 'EMPLOYER' },
  });
  const cand1 = await prisma.user.create({
    data: { email: 'candidate@akij.work', name: 'Md. Naimur Rahman', password: hash, role: 'CANDIDATE' },
  });
  const cand2 = await prisma.user.create({
    data: { email: 'fatema@akij.work', name: 'Fatema Akter', password: hash, role: 'CANDIDATE' },
  });
  const cand3 = await prisma.user.create({
    data: { email: 'rafiq@akij.work', name: 'Rafiqul Islam', password: hash, role: 'CANDIDATE' },
  });
  const cand4 = await prisma.user.create({
    data: { email: 'sultana@akij.work', name: 'Mst. Sultana Begum', password: hash, role: 'CANDIDATE' },
  });

  // ── Bangladesh-contextual Questions ────────────────────
  const bdQuestions = [
    {
      title: 'What is the Capital of Bangladesh?',
      type: 'RADIO',
      options: [
        { text: 'Dhaka', isCorrect: true },
        { text: 'Chattogram', isCorrect: false },
        { text: 'Rajshahi', isCorrect: false },
        { text: 'Barishal', isCorrect: false },
      ],
    },
    {
      title: 'Which river is the longest in Bangladesh?',
      type: 'RADIO',
      options: [
        { text: 'Padma', isCorrect: false },
        { text: 'Meghna', isCorrect: true },
        { text: 'Jamuna', isCorrect: false },
        { text: 'Surma', isCorrect: false },
      ],
    },
    {
      title: 'In which year did Bangladesh gain independence?',
      type: 'RADIO',
      options: [
        { text: '1947', isCorrect: false },
        { text: '1952', isCorrect: false },
        { text: '1971', isCorrect: true },
        { text: '1975', isCorrect: false },
      ],
    },
    {
      title: 'Which of the following indicators is used to measure market volatility?',
      type: 'RADIO',
      options: [
        { text: 'Relative Strength Index (RSI)', isCorrect: false },
        { text: 'Moving Average Convergence Divergence (MACD)', isCorrect: false },
        { text: 'Bollinger Bands', isCorrect: true },
        { text: 'Fibonacci Retracement', isCorrect: false },
      ],
    },
    {
      title: 'What is the primary purpose of a "Stop Loss" order in trading?',
      type: 'RADIO',
      options: [
        { text: 'To maximize profit potential', isCorrect: false },
        { text: 'To limit potential losses on a position', isCorrect: true },
        { text: 'To execute a trade at the best available price', isCorrect: false },
        { text: 'To ensure execution during high volatility', isCorrect: false },
      ],
    },
    {
      title: 'Which financial statement summarizes revenues and expenses?',
      type: 'RADIO',
      options: [
        { text: 'Balance Sheet', isCorrect: false },
        { text: 'Income Statement', isCorrect: true },
        { text: 'Cash Flow Statement', isCorrect: false },
        { text: 'Statement of Retained Earnings', isCorrect: false },
      ],
    },
    {
      title: 'Who is considered the Father of the Nation of Bangladesh?',
      type: 'RADIO',
      options: [
        { text: 'Ziaur Rahman', isCorrect: false },
        { text: 'Sheikh Mujibur Rahman', isCorrect: true },
        { text: 'A.K. Fazlul Huq', isCorrect: false },
        { text: 'Hussain Muhammad Ershad', isCorrect: false },
      ],
    },
    {
      title: 'What is the currency of Bangladesh?',
      type: 'RADIO',
      options: [
        { text: 'Rupee', isCorrect: false },
        { text: 'Dollar', isCorrect: false },
        { text: 'Taka', isCorrect: true },
        { text: 'Yen', isCorrect: false },
      ],
    },
    {
      title: 'Select all divisions of Bangladesh from the following:',
      type: 'CHECKBOX',
      options: [
        { text: 'Dhaka', isCorrect: true },
        { text: 'Chattogram', isCorrect: true },
        { text: 'Rajshahi', isCorrect: true },
        { text: 'Kolkata', isCorrect: false },
      ],
    },
    {
      title: 'Which of the following are major export products of Bangladesh?',
      type: 'CHECKBOX',
      options: [
        { text: 'Ready-Made Garments (RMG)', isCorrect: true },
        { text: 'Jute Products', isCorrect: true },
        { text: 'Automobiles', isCorrect: false },
        { text: 'Pharmaceuticals', isCorrect: true },
      ],
    },
    {
      title: 'What is the largest mangrove forest in the world?',
      type: 'RADIO',
      options: [
        { text: 'Amazon Rainforest', isCorrect: false },
        { text: 'Sundarbans', isCorrect: true },
        { text: 'Congo Rainforest', isCorrect: false },
        { text: 'Daintree Rainforest', isCorrect: false },
      ],
    },
    {
      title: 'Which sea borders Bangladesh to the south?',
      type: 'RADIO',
      options: [
        { text: 'Arabian Sea', isCorrect: false },
        { text: 'South China Sea', isCorrect: false },
        { text: 'Bay of Bengal', isCorrect: true },
        { text: 'Indian Ocean', isCorrect: false },
      ],
    },
    {
      title: 'What is the national flower of Bangladesh?',
      type: 'RADIO',
      options: [
        { text: 'Rose', isCorrect: false },
        { text: 'Water Lily (Shapla)', isCorrect: true },
        { text: 'Lotus', isCorrect: false },
        { text: 'Jasmine', isCorrect: false },
      ],
    },
    {
      title: 'Which district is known as the "Tea Capital" of Bangladesh?',
      type: 'RADIO',
      options: [
        { text: 'Comilla', isCorrect: false },
        { text: 'Sylhet', isCorrect: true },
        { text: 'Rangpur', isCorrect: false },
        { text: 'Mymensingh', isCorrect: false },
      ],
    },
    {
      title: 'What is the GDP growth rate target for Bangladesh Vision 2041?',
      type: 'RADIO',
      options: [
        { text: '5%', isCorrect: false },
        { text: '7%', isCorrect: false },
        { text: '9%', isCorrect: true },
        { text: '12%', isCorrect: false },
      ],
    },
    {
      title: 'What is the current central bank of Bangladesh called?',
      type: 'RADIO',
      options: [
        { text: 'State Bank of Bangladesh', isCorrect: false },
        { text: 'Bangladesh Bank', isCorrect: true },
        { text: 'National Bank of Bangladesh', isCorrect: false },
        { text: 'Reserve Bank of Bangladesh', isCorrect: false },
      ],
    },
    {
      title: 'Which sport is the national sport of Bangladesh?',
      type: 'RADIO',
      options: [
        { text: 'Cricket', isCorrect: false },
        { text: 'Football', isCorrect: false },
        { text: 'Kabaddi', isCorrect: true },
        { text: 'Hockey', isCorrect: false },
      ],
    },
    {
      title: 'Write a brief description of your capital city.',
      type: 'TEXT',
      options: [],
    },
    {
      title: 'Which Bangladesh landmark was declared a UNESCO World Heritage Site?',
      type: 'RADIO',
      options: [
        { text: 'Ahsan Manzil', isCorrect: false },
        { text: 'Sixty Dome Mosque', isCorrect: true },
        { text: 'Lalbagh Fort', isCorrect: false },
        { text: 'Paharpur Vihara', isCorrect: false },
      ],
    },
    {
      title: 'What is the literacy rate target of Bangladesh by 2030?',
      type: 'RADIO',
      options: [
        { text: '80%', isCorrect: false },
        { text: '90%', isCorrect: false },
        { text: '100%', isCorrect: true },
        { text: '95%', isCorrect: false },
      ],
    },
  ];

  // ── Helper to create exam with questions ───────────────
  async function createExamWithQuestions(data, employerId, questions) {
    const exam = await prisma.exam.create({ data: { ...data, employerId } });
    for (const q of questions) {
      await prisma.question.create({
        data: {
          title: q.title,
          type: q.type,
          examId: exam.id,
          options: q.options.length > 0 ? { create: q.options } : undefined,
        },
      });
    }
    return exam;
  }

  // ── Exam 1: Full data (matches Dashboard card 1 & 2) ──
  const exam1 = await createExamWithQuestions(
    {
      title: 'Psychometric Test for Management Trainee Officer',
      totalCandidates: 10000,
      totalSlots: 3,
      questionSets: 3,
      questionType: 'MCQ',
      startTime: new Date(),
      endTime: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      duration: 30,
      negativeMarking: 0.25,
    },
    employer1.id,
    bdQuestions
  );

  // ── Exam 2: Clone (matches Dashboard card 2) ──────────
  const exam2 = await createExamWithQuestions(
    {
      title: 'Psychometric Test for Management Trainee Officer',
      totalCandidates: 10000,
      totalSlots: 3,
      questionSets: 3,
      questionType: 'MCQ',
      startTime: new Date(),
      endTime: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      duration: 30,
      negativeMarking: 0.25,
    },
    employer1.id,
    bdQuestions
  );

  // ── Exam 3: "Not Set" fields (matches Dashboard card 3) 
  const exam3 = await createExamWithQuestions(
    {
      title: 'Psychometric Test for Management Trainee Officer',
      totalCandidates: 0,
      totalSlots: 0,
      questionSets: 0,
      questionType: 'MCQ',
      startTime: new Date(),
      endTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      duration: 30,
      negativeMarking: 0.25,
    },
    employer1.id,
    bdQuestions.slice(0, 10)
  );

  // ── Exam 4: Full data (matches Dashboard card 4) ──────
  const exam4 = await createExamWithQuestions(
    {
      title: 'Psychometric Test for Management Trainee Officer',
      totalCandidates: 10000,
      totalSlots: 3,
      questionSets: 3,
      questionType: 'MCQ',
      startTime: new Date(),
      endTime: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      duration: 30,
      negativeMarking: 0.25,
    },
    employer1.id,
    bdQuestions
  );

  // ── Submissions (so candidates see exams) ──────────────
  const candidates = [cand1, cand2, cand3, cand4];
  const exams = [exam1, exam2, exam3, exam4];
  for (const c of candidates) {
    for (const e of exams) {
      await prisma.submission.create({
        data: {
          userId: c.id,
          examId: e.id,
          status: 'PENDING',
        },
      });
    }
  }

  console.log('✅ Seed completed: 6 users, 4 exams, 80 questions, 16 submissions');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
