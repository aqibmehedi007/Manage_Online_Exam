import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting data re-insertion...');

  // 1. Clean existing data (Safe deletion order)
  await prisma.submission.deleteMany();
  await prisma.option.deleteMany();
  await prisma.question.deleteMany();
  await prisma.exam.deleteMany();
  await prisma.user.deleteMany();

  console.log('🧹 Cleaned existing database records.');

  // 2. Load JSON Data
  const usersData = JSON.parse(fs.readFileSync(path.join(__dirname, '../public/data/users.json'), 'utf8'));
  const examsData = JSON.parse(fs.readFileSync(path.join(__dirname, '../public/data/exams.json'), 'utf8'));

  console.log(`📜 Loaded ${usersData.length} users and ${examsData.length} exams from JSON.`);

  // 3. Insert Users
  const userMap = new Map();
  
  // Create Super Admin
  const adminPassword = await bcrypt.hash('password123', 10);
  const superAdmin = await prisma.user.create({
    data: {
      name: 'Super Admin',
      email: 'superadmin@akij.work',
      password: adminPassword,
      role: 'ADMIN',
      gender: 'MALE'
    }
  });
  console.log('👑 Super Admin inserted.');

  for (const u of usersData) {
    const hashedPassword = await bcrypt.hash(u.password, 10);
    const createdUser = await prisma.user.create({
      data: {
        name: u.name,
        email: u.email,
        password: hashedPassword,
        role: u.role,
        gender: u.gender, // Support gender field from JSON
        image: u.image
      }
    });
    userMap.set(u.email, createdUser);
  }
  console.log('👤 Users inserted successfully.');

  // 4. Insert Exams & Questions
  const employer = userMap.get('employer@akij.work');
  if (!employer) throw new Error('Employer not found in seed data');

  const createdExams = [];
  for (const e of examsData) {
    const exam = await prisma.exam.create({
      data: {
        title: e.title,
        totalCandidates: e.totalCandidates,
        totalSlots: e.totalSlots,
        questionSets: e.questionSets,
        questionType: e.questionType,
        startTime: new Date(e.startTime),
        endTime: new Date(e.endTime),
        duration: e.duration,
        negativeMarking: e.negativeMarking,
        employerId: employer.id,
        questions: {
          create: e.questions.map(q => ({
            title: q.title,
            type: q.type,
            options: {
              create: q.options
            }
          }))
        }
      }
    });
    createdExams.push(exam);
  }
  console.log('📝 Exams and Questions inserted successfully.');

  // 5. Assign exactly 10 Candidates to EACH Exam
  const candidates = Array.from(userMap.values()).filter(u => u.role === 'CANDIDATE');
  let assignmentCount = 0;

  for (const exam of createdExams) {
    // Pick 10 random candidates for THIS exam
    const shuffled = [...candidates].sort(() => 0.5 - Math.random());
    const assignedCandidates = shuffled.slice(0, 10);

    for (const cand of assignedCandidates) {
      await prisma.submission.create({
        data: {
          userId: cand.id,
          examId: exam.id,
          status: 'ASSIGNED'
        }
      });
      assignmentCount++;
    }
  }

  console.log(`✅ Seed completed successfully!`);
  console.log(`- Users: ${usersData.length}`);
  console.log(`- Exams: ${examsData.length}`);
  console.log(`- Assignments: ${assignmentCount}`);
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
