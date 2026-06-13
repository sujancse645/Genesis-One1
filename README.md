# 🌌 Genesis One

**The Autonomous Venture Intelligence OS.**

Genesis One is an advanced multi-agent operating system that transforms a single raw idea into a fully simulated, mathematically validated, and investor-ready startup. Built for the Hackathon.

## 🚀 Features

- **Agent Orchestrator:** A neural network of 9 specialized AI personas (CEO, CTO, Finance, Legal, etc.) that collaborate and debate.
- **Research Engine:** Instantly generates TAM/SAM/SOM market sizing, SWOT analysis, and Competitor Threat Matrices.
- **Digital Twin Simulation:** Deterministic SaaS mathematical modeling that projects 60 months of MRR growth, burn rate, and cash runway.
- **AI Boardroom:** A live, WebSockets-powered chat interface where you can watch the AI agents debate pricing, tech stack, and go-to-market strategies in real-time.
- **Pitch Deck Generator:** Automatically synthesizes all validated intelligence into a premium, interactive 10-slide presentation.

## 🏗️ Architecture

Genesis One is built as a highly scalable monorepo using Turborepo:
- **Frontend (`apps/web`):** Next.js 15, React 19, Tailwind CSS, Framer Motion, Recharts, and Clerk Authentication.
- **Backend (`apps/api`):** FastAPI (Python) powers the asynchronous Multi-Agent Consensus Engine and mathematical simulation models.
- **Database (`packages/database`):** Prisma ORM with Neon Serverless Postgres.

## 🛠️ Quick Start (Local Development)

### Prerequisites
- Node.js 18+
- Python 3.10+
- PostgreSQL (or a free Neon DB instance)

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Variables
Create a `.env.local` file in `apps/web`:
```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
```

Create a `.env` file in `packages/database`:
```env
DATABASE_URL="postgresql://user:password@hostname/dbname"
```

### 3. Database Setup
```bash
npm run db:push --workspace=packages/database
```

### 4. Run the Platform
Start the Next.js frontend:
```bash
npm run dev:web
```

Start the FastAPI backend:
```bash
npm run dev:api
```

Visit `http://localhost:3000` and enter the 2035 Command Center.

## 🌐 Deploying to Vercel

Genesis One is fully optimized for Vercel deployment.
1. Connect the GitHub repository to Vercel.
2. Set the **Framework Preset** to `Next.js`.
3. Set the **Root Directory** to `apps/web`.
4. Ensure the following environment variables are set in the Vercel dashboard:
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - `CLERK_SECRET_KEY`
   - `DATABASE_URL`
5. Click Deploy!
