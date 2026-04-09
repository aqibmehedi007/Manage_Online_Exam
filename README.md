# Online Assessment Platform

A production-ready Online Assessment Platform built with Next.js 16 (App Router), Tailwind CSS 4, Prisma (MySQL), and Zustand. This project features high-fidelity UI alignment with Figma designs, a robust exam engine, and proctoring capabilities.

## 🚀 Getting Started

### Prerequisites
- Node.js 20+
- MySQL (e.g., via Laragon or Docker)

### Installation
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   Create a `.env` file with your database connection:
   ```env
   DATABASE_URL="mysql://root:@localhost:3306/online_exam"
   ```
4. **Set up the Database (Two Options)**:
   
   *Option A: Automated Setup (Recommended)*
   Because this project uses Prisma, you don't need to manually import SQL files! Just run:
   ```bash
   npx prisma db push
   npm run seed
   ```

   *Option B: Manual Import (Legacy)*
   If you prefer a traditional setup, you can manually import the included `exam.sql` file into a MySQL database named `online_exam` using your preferred database tool (e.g., PhpMyAdmin, TablePlus).

5. Run the development server:
   ```bash
   npm run dev
   ```

### 🔑 Test Accounts
For a complete evaluation of the platform's multi-role architecture, use the following credentials:
- **Super Admin**: `superadmin@akij.work` / `password123` (Full system monitor)
- **Employer**: `employer@akij.work` / `password123` (Exam management)
- **Candidate**: `candidate@akij.work` / `password123` (Main test session)

---

## 📝 Additional Questions

### 1. Model Context Protocol (MCP) Integration
**Question**: Have you worked with any MCP? If no, describe how it could be used in this project.
**Answer**: While I am familiar with the concepts of Model Context Protocol (MCP), a great way to use it in this project would be through a **Figma MCP**. This would allow an AI agent to directly read the design specs, spacing, and color tokens from Figma, making the UI development process significantly more accurate and faster by bridging the gap between design and code context. Additionally, a **Database MCP** (like Supabase or Prisma MCP) could allow for automated schema discovery and migration assistance during development.

### 2. AI Tools for Development
**Question**: Which AI tools or processes have you used or recommend to speed up frontend development?
**Answer**: 
- **Claude / Gemini**: Used for architectural planning and complex logic generation.
- **GitHub Copilot**: Essential for boilerplate generation and repetitive component structures.
- **Tailwind DevTools/Extensions**: To quickly debug and verify styling against designs.
- **v0.dev / Screenshot-to-Code**: Excellent for rapidly prototyping initial layouts from Figma screenshots before manual refinement.

### 3. Handling Offline Mode
**Question**: How would you handle offline mode if a candidate loses internet during an exam?
**Answer**:
In this project, I have implemented **localStorage synchronization**. 
- **State Persistence**: Every answer choice selected by the candidate is immediately synced to the browser's `localStorage`.
- **Resilience**: If the candidate accidentally refreshes the page, their computer crashes, or they lose internet, their progress is recovered instantly from local storage upon reconnecting or reloading.
- **Background Sync**: For a production environment, I would use **Service Workers** and a **Background Sync API** to queue the submission attempts. Once the connection is restored, the browser would automatically push the "pending" answers to the server without the user needing to take any action.

---

## ✨ Above & Beyond: Advanced features
This project implements several sophisticated features that exceed the standard requirements to demonstrate advanced full-stack skills:

### 1. 👑 Super Admin System Dashboard
A top-level administrative center featuring global analytics:
- **Platform Health**: Real-time monitoring of total users, active exams, and database vitals.
- **Global Integrity Monitoring**: Measures the system-wide "Integrity Score" across all employers and tests.
- **Activity Feed**: Live event tracking for all major system actions (e.g., test creation, completion).

### 2. 🛡️ High-Fidelity Proctoring & Results Dashboard
Employers have access to a dedicated **Results & Integrity Center** for every exam.
- **Detailed Tracking**: Detects and logs every **Tab Switch** and **Fullscreen Exit** during an exam.
- **Visual Warnings**: Automated warning badges (Red/Amber) highlight suspicious behavior.
- **Performance Summary**: Global average scores and completion rates per test.

### 3. 🚻 Gender-Aware Implementation
Full-stack integration of gender support across the platform:
- **Data Integrity**: Candidates generated during seeding have names and profiles correctly matched to their gender.
- **UI Customization**: Gender selection included in both Registration and Employer management workflows.

### 4. 🗄️ Full Full-Stack Architecture (Bonus)
Unlike standard mock-ups, this platform uses a robust **Prisma + MySQL** backend.
- **Relational Integrity**: Complete enterprise-ready schema for Users, Exams, Questions, and Submissions.
- **Complex Aggregations**: Backend-driven stats calculation for scores and platform-wide metrics.

### 5. 🏗️ Advanced UI/UX Components
- **Dynamic Pagination**: Custom "Items per page" logic and state-driven navigation for large datasets.
- **Offline Resilience**: `localStorage` synchronization immediately saves candidate progress to prevent data loss.
- **Visual Excellence**: Pixel-perfect alignment with Figma, featuring vibrant gradients, smooth transitions, and premium typography.
