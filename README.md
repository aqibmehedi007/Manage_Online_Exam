# Online Assessment Platform

A robust, full-stack Online Assessment Platform built with Next.js 15, Tailwind CSS, Prisma, and MySQL.

## 🚀 Setup Instructions

### Prerequisites
- Laragon (or any MySQL environment)
- Node.js 18+
- npm

### 1. Database Setup
1. Open Laragon and ensure MySQL is running.
2. Create a database named `exam`.
3. Update the `DATABASE_URL` in `.env`:
   ```
   DATABASE_URL="mysql://root:@localhost:3306/exam"
   ```

### 2. Installation
```bash
npm install
```

### 3. Database Migration & Seeding
```bash
npx prisma migrate dev --name init
node prisma/seed.js
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## 🔑 Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| Employer | employer@example.com | password123 |
| Candidate | candidate@example.com | password123 |

---

## 📝 Additional Questions

### MCP Integration
**Idea**: Using a **Figma MCP** could significantly speed up the workflow by automatically exporting design tokens (colors, spacing, typography) from the design file directly into `tailwind.config.ts`. Additionally, a **Database MCP** (e.g., Supabase or Prisma MCP) could allow for natural language database management, such as "List all candidates who scored above 80%" or "Add a negative marking column to the Exam table".

### AI Tools for Development
During development, I utilized **Claude 3.5 Sonnet** within an agentic coding environment to architect the complex multi-step forms and proctoring logic. I also recommend **GitHub Copilot** for faster boilerplate generation and **v0.dev** for rapid UI component iteration matching the "billion-dollar" aesthetic requirements.

### Offline Mode Handling
To handle internet loss during an exam:
1. **Local Hardening**: All candidate selections are saved to `LocalStorage` immediately upon clicking an option.
2. **Service Workers**: Use a PWA approach to cache the exam interface and questions, ensuring the app stays "alive" even when offline.
3. **Background Sync**: Implement a retry mechanism using the Background Sync API (via Service Workers) to automatically retry failed submissions once a stable connection is redetected.
4. **Local Timer**: The countdown timer runs locally (synced with the server start time) so it remains accurate regardless of connectivity.

---

## 📦 Deliverables
- **GitHub Repository**: [Link to your repo]
- **Live Demo**: [Link to live demo]
- **Video Recording**: [Link to walkthrough video]
- **Google Form Submission**: [https://forms.gle/JyLYNhdRYe3rjJJv8](https://forms.gle/JyLYNhdRYe3rjJJv8)
