# CashCompass – Personal Finance Analytics Dashboard

CashCompass is a modern finance dashboard that helps users manage their income, expenses, savings, and financial insights in one place. The application focuses on clean UI, interactive charts, and role-based access to simulate a real-world financial product dashboard.

---

## Project Description

CashCompass is designed as a personal finance management dashboard where users can track financial transactions and analyze their spending behavior using visual analytics. The system includes an Admin role for managing transactions and a Viewer role for read-only access.

The dashboard converts raw transaction data into meaningful insights such as highest spending category, expense ratio, monthly comparison, and spending trends.

---

## Features

### Overview Dashboard

* Total Balance, Income, Expenses, Savings
* Budget usage and remaining budget
* Recent Activity section
* Expense Insights chart
* Balance Trend chart

### Records Management

* Add new transaction
* Edit transaction
* Delete transaction
* Search transactions
* Filter by type, category, and date
* Running balance calculation

### Analytics Dashboard

* Highest Spending Category
* Expense Ratio
* Monthly Income vs Expense comparison
* Expense Pattern Radar Chart
* Daily Spending Trend
* Income Source Distribution
* Expense Analysis Scatter Chart

### Role-Based Access Control

| Feature            | Admin | Viewer |
| ------------------ | ----- | ------ |
| View Overview      | Yes   | Yes    |
| View Records       | Yes   | Yes    |
| View Analytics     | Yes   | Yes    |
| Add Transaction    | Yes   | No     |
| Edit Transaction   | Yes   | No     |
| Delete Transaction | Yes   | No     |

### Additional Functionalities

* Dark and Light mode
* Currency switch (INR / USD)
* Export transactions to CSV
* Responsive design (Mobile, Tablet, Desktop)
* Animated counters and charts
* Local storage data persistence

---

## Tech Stack

* React.js
* Vite
* Tailwind CSS
* Recharts
* Zustand (State Management)
* React Router
* Framer Motion
* date-fns
* Lucide Icons

---

## Folder Structure

src/

* components/

  * dashboard/
  * transactions/
  * insights/
  * layout/
  * ui/
* pages/
* store/
* data/
* utils/
* App.jsx
* main.jsx

---

## Installation and Run

npm install
npm run dev

---

## Assumptions

* The application is designed for personal finance tracking.
* Admin can manage transactions, Viewer can only view data.
* Data is stored in local storage instead of a backend database.
* Charts are used to visualize financial patterns and insights.
* The focus of the project is frontend architecture, UI/UX, and analytics.

---

## Future Improvements

* Backend integration
* User authentication
* Budget alerts and notifications
* Recurring transactions
* Multi-user support
* AI-based spending insights
* Mobile application version

---

## Author

Kamini Prajapati
B.Tech IT
Frontend Developer (React)

---

## Purpose of the Project

This project was built as part of a Frontend Engineering assessment to demonstrate:

* Component-based architecture
* State management
* Data visualization
* Role-based UI
* Responsive design
* Clean and modern UI/UX
