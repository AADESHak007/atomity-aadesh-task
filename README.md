# Atomity Dashboard - Aadesh Kumar (Task A)

## 🚀 Overview
This project is a high-fidelity, responsive monitoring dashboard built for the Atomity technical task. It visualizes Kubernetes-style hierarchy (Clusters → Namespaces → Pods) with a focus on premium aesthetics, performance, and modern frontend architecture.

As someone with a background primarily in **Backend Engineering**, I chose **Task A** because the requirements were exceptionally clear, and I felt confident in my ability to translate that clarity into a high-quality implementation. It served as a focused opportunity to hone my frontend skills and apply modern UI/UX principles. I successfully integrated advanced tools and frameworks that I learned and applied swiftly throughout the development process.

---

## 🛠️ Tech Stack
- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) (using the latest Alpha/Beta features)
- **State Management & Caching**: [TanStack Query v5](https://tanstack.com/query)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Data Visualization**: [Recharts](https://recharts.org/)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 🧠 Development Process & AI Collaboration
I embraced a "Cyborg" workflow for this project, blending my engineering core with AI assistance to maximize speed and quality:

- **My Core Contributions**: 
  - Architecture and component hierarchy design.
  - Selection of the tech stack (React Query for caching, Tailwind 4 for performance).
  - Implementation of core drill-down logic and state management.
  - Debugging complex environmental issues (e.g., browser/Node context conflicts).
- **AI-Guided Enhancements**:
  - Accelerated boilerplate generation for repetitive UI components.
  - Brainstorming layout ideas for the "Midnight Cyber" aesthetic.
  - Guided CSS refinements to ensure consistent spacing and advanced glassmorphism effects.
  - Rapidly learning and implementing the new Tailwind 4 syntax.

---

## ✨ Key Features

### 1. Token-Based Architecture
Instead of scattered hex values, the project uses a centralized token system (`app/tokens.ts`) mapped to CSS variables. This ensures a consistent design language and makes the theme easily maintainable or extensible (e.g., for multi-theme support).

### 2. Smart Caching & Data Handling
Leveraging **React Query**, the dashboard implements a robust caching strategy:
- **Instant Revisits**: Data is cached for 5 minutes (`staleTime`), providing an "instant" feel when navigating back and forth between clusters and namespaces.
- **Loading States**: Purpose-built `DashboardSkeleton` ensures a smooth perceived performance during the initial fetch.

### 3. Responsive "Midnight Cyber" Design
- **Desktop**: A sleek, side-nav layout with high-fidelity glassmorphism and atmospheric glows.
- **Mobile/Tablet**: A vertically stacked, scroll-optimized interface that maintains the premium feel on smaller viewports.
- **Micro-Animations**: Purposeful motion using Framer Motion to guide the user's eye during navigation and data updates.

---

## 📈 Learning Reflection
This assignment allowed me to cross the bridge from backend logic to frontend craft. Transitioning from managing servers to managing user experiences required a shift in perspective—prioritizing not just *correctness*, but *feel* and *interactivity*. I’m particularly proud of how quickly I was able to adopt the latest industry standards (Next.js 15 + Tailwind 4) to deliver a product-ready interface.

---

## 🏃 How to Run
1. Clone the repository.
2. Create a `.env` file with `NEXT_PUBLIC_BACKEND_URL`.
3. Run `npm install`.
4. Run `npm run dev`.


## NOTE : PUBLIC BACKEND API is in .env.example , so use that.