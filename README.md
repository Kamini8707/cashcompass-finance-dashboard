# 🚀 FinTrack — Finance Dashboard

A modern, production-quality finance dashboard built with React, Vite, Tailwind CSS v3, and Recharts. Track income, expenses, analyze spending patterns, and switch between Admin/Viewer roles.

🔗 **Live Preview:** https://finance-dashboard-ten-rose.vercel.app/  
📂 **GitHub Repository:** https://github.com/CodewithsushilOfficial/Finance-dashboard  

![FinTrack Dashboard Screenshot](/screenshot.png)

---

## ✨ Key Highlights

- 📊 Interactive financial dashboard with real-time insights  
- 🔍 Smart filtering and search for transactions  
- 🎭 Role-based UI (Admin vs Viewer)  
- 🌙 Dark/Light mode with persistence  
- 📤 Export transactions as CSV  
- ⚡ Smooth animations and responsive design  

---

## 🧠 My Approach

While building this project, I focused on creating a **clean, intuitive, and scalable dashboard UI**.

- Designed a minimal UI to improve readability and user experience  
- Used Zustand for simple and efficient global state management  
- Implemented role-based UI to simulate real-world product behavior  
- Integrated charts to convert raw financial data into meaningful insights  
- Structured components for scalability and reusability  

---

## ✨ Features

- **Dashboard Overview** — Summary cards (Balance, Income, Expenses, Savings Rate) with trend indicators  
- **Balance Trend Chart** — 6-month area chart showing income, expenses, and net balance  
- **Spending Breakdown** — Donut chart of top 5 expense categories  
- **Transaction Management** — Full CRUD (create, read, update, delete) for transactions  
- **Advanced Filtering** — Search, type, category, and date range filters  
- **Financial Insights** — Top spending category, biggest expense, average daily spend, savings streak, and monthly comparison chart  
- **Role-Based Access (RBAC)** — Admin (full access) and Viewer (read-only) modes  
- **Dark/Light Theme** — Toggle with localStorage persistence  
- **Currency Toggle** — Switch between INR and USD formatting  
- **CSV Export** — Download filtered transactions as CSV  
- **Toast Notifications** — Animated success/error/warning toasts  
- **Page Transitions** — Smooth Framer Motion animations between pages  
- **Loading Skeleton** — Shimmer loading state on initial load  
- **Responsive Design** — Mobile bottom tabs, tablet icon sidebar, desktop full sidebar  

---

## 🛠 Tech Stack

| Technology | Purpose |
|------------|---------|
| React 18 | UI framework (JavaScript, hooks-only) |
| Vite | Build tool and dev server |
| Tailwind CSS v3 | Utility-first styling |
| Recharts | Charts and data visualization |
| Zustand | Lightweight state management |
| React Router v6 | Client-side routing |
| Lucide React | Modern icon library |
| date-fns | Date formatting and manipulation |
| Framer Motion | Page transition animations |

---

## ⚙️ Setup Instructions

```bash
# Install dependencies
npm install

# Start development server
npm run dev

📁 Folder Structure
src/
├── components/
│   ├── layout/          # Sidebar, Header, Layout wrapper
│   ├── dashboard/       # SummaryCards, BalanceTrendChart, SpendingBreakdownChart
│   ├── transactions/    # TransactionList, TransactionRow, Filters, Modal
│   ├── insights/        # InsightsPanel with analytics cards
│   └── ui/              # Badge, Card, RoleSwitcher, Toast
├── store/               # Zustand store with persist middleware
├── data/                # Mock transaction data
├── pages/               # Dashboard, Transactions, Insights pages
├── App.jsx              # Root component with routing
└── main.jsx             # Entry point

🔐 RBAC (Role-Based Access Control)
Feature	Admin	Viewer
View Dashboard	✅	✅
View Transactions	✅	✅
View Insights	✅	✅
Add Transaction	✅	❌
Edit Transaction	✅	❌
Delete Transaction	✅	❌

The role is persisted in localStorage and can be switched via the sidebar dropdown.

🧠 State Management

Zustand manages global state with persistence:

Transactions — Full CRUD with mock data initialization
Filters — Search, type, category, date range
Role — Admin/Viewer toggle
Theme — Dark/Light mode
Currency — INR/USD toggle

All persistent state is stored in localStorage under the key fintrack-storage.

🎨 Design System
Fonts: DM Sans (body), Space Grotesk (headings/numbers)
Colors: Dark-first with indigo-purple accent (#6C63FF)
Animations: Fade-in, slide-up, shimmer skeleton
UI Style: Clean, minimal, and responsive
🔮 Future Improvements
Backend API integration (REST or GraphQL)
Authentication with JWT
Budget tracking and alerts
Recurring transactions
Data import from bank statements
Multi-currency with live exchange rates
PWA support for offline access
AI-based spending insights
Team/shared dashboards
Mobile app (React Native)
🙌 Final Note

This project was built as part of a frontend assignment to demonstrate:

Clean UI/UX design
Scalable React architecture
State management using Zustand
Real-world features like RBAC and data visualization

I’d love to hear your feedback! 🚀


---

# 🔥 Final Suggestion (Very Important)

Before submitting:

👉 Add **real screenshots (not placeholder)**  
👉 Double-check mobile responsiveness  
👉 Test all features (filters, CSV, role switch)

---

If you want, I can:
- Review your live site UI  
- Suggest final polish (like interviewer feedback)  
- Help you write submission message  

Just tell me 👍