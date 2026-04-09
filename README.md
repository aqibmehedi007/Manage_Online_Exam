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
4. Set up the database:
   ```bash
   npx prisma db push
   ```
5. Seed the database with Bangladeshi demo data:
   ```bash
   npm run seed
   ```
6. Run the development server:
   ```bash
   npm run dev
   ```

### 🔑 Test Accounts
- **Employer**: `employer@akij.work` / `password123`
- **Candidate**: `candidate@akij.work` / `password123`
*(Additional Bangladeshi test accounts are available in the system after seeding)*

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

## ✨ Key Features
- **Design-Exact UI**: Pixel-perfect alignment with provided Figma screens.
- **Exam Engine**: Supports Radio, Checkbox, and Text question types with lettered options (A/B/C).
- **Proctoring**: Real-time detection of tab switching and fullscreen exit with activity logging.
- **Responsive Navigation**: Context-aware Navbar and Footer with secure sign-out confirmation.
- **Bangladeshi Context**: Seeded with realistic Bangladeshi names, locations, and banking-domain questions.
