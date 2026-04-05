/**
 * Mock data for CashCompass finance dashboard.
 * Personalized student + internship financial data (6 months).
 */

const categories = [
  "Food",
  "Travel",
  "Bills",
  "Shopping",
  "Health",
  "Education",
  "Salary",
  "Freelance",
  "Investment",
  "EMI",
  "Subscriptions",
  "Savings",
];

const categoryColors = {
  Food: "#F97316", // orange
  Travel: "#06B6D4", // cyan
  Bills: "#EF4444", // red
  Shopping: "#A855F7", // purple
  Health: "#10B981", // green
  Education: "#3B82F6", // blue
  Salary: "#22C55E", // emerald
  Freelance: "#8B5CF6", // violet
  Investment: "#0EA5E9", // sky
  EMI: "#F59E0B", // amber
  Subscriptions: "#EC4899", // pink
  Savings: "#84CC16", // lime
};

function daysAgo(d) {
  const date = new Date();
  date.setDate(date.getDate() - d);
  return date.toISOString();
}

const mockTransactions = [
  // ===== INCOME =====
  {
    id: "tx_001",
    date: daysAgo(2),
    description: "Frontend Internship Stipend",
    amount: 15000,
    type: "income",
    category: "Salary",
  },
  {
    id: "tx_002",
    date: daysAgo(32),
    description: "Backend Internship Stipend",
    amount: 15000,
    type: "income",
    category: "Salary",
  },
  {
    id: "tx_003",
    date: daysAgo(58),
    description: "Freelance Portfolio Website",
    amount: 8000,
    type: "income",
    category: "Freelance",
  },
  {
    id: "tx_004",
    date: daysAgo(78),
    description: "UI Design for Startup",
    amount: 5000,
    type: "income",
    category: "Freelance",
  },
  {
    id: "tx_005",
    date: daysAgo(95),
    description: "Scholarship Amount",
    amount: 10000,
    type: "income",
    category: "Investment",
  },
  {
    id: "tx_006",
    date: daysAgo(120),
    description: "Stock Profit",
    amount: 4500,
    type: "income",
    category: "Investment",
  },

  // ===== EXPENSES =====
  {
    id: "tx_007",
    date: daysAgo(1),
    description: "Swiggy Food Order",
    amount: 280,
    type: "expense",
    category: "Food",
  },
  {
    id: "tx_008",
    date: daysAgo(4),
    description: "Dominos Pizza",
    amount: 520,
    type: "expense",
    category: "Food",
  },
  {
    id: "tx_009",
    date: daysAgo(10),
    description: "Monthly Groceries",
    amount: 1800,
    type: "expense",
    category: "Food",
  },

  {
    id: "tx_010",
    date: daysAgo(3),
    description: "Electricity Bill",
    amount: 1200,
    type: "expense",
    category: "Bills",
  },
  {
    id: "tx_011",
    date: daysAgo(33),
    description: "Water Bill",
    amount: 500,
    type: "expense",
    category: "Bills",
  },
  {
    id: "tx_012",
    date: daysAgo(63),
    description: "Mobile Recharge",
    amount: 799,
    type: "expense",
    category: "Bills",
  },

  {
    id: "tx_013",
    date: daysAgo(6),
    description: "Amazon Shopping",
    amount: 2400,
    type: "expense",
    category: "Shopping",
  },
  {
    id: "tx_014",
    date: daysAgo(22),
    description: "Clothes Shopping",
    amount: 3200,
    type: "expense",
    category: "Shopping",
  },

  {
    id: "tx_015",
    date: daysAgo(18),
    description: "Doctor Consultation",
    amount: 1200,
    type: "expense",
    category: "Health",
  },
  {
    id: "tx_016",
    date: daysAgo(48),
    description: "Medicines",
    amount: 900,
    type: "expense",
    category: "Health",
  },

  {
    id: "tx_017",
    date: daysAgo(7),
    description: "Udemy Course",
    amount: 499,
    type: "expense",
    category: "Education",
  },
  {
    id: "tx_018",
    date: daysAgo(40),
    description: "Programming Books",
    amount: 1500,
    type: "expense",
    category: "Education",
  },

  {
    id: "tx_019",
    date: daysAgo(12),
    description: "Auto & Bus Travel",
    amount: 600,
    type: "expense",
    category: "Travel",
  },
  {
    id: "tx_020",
    date: daysAgo(30),
    description: "Train Ticket",
    amount: 900,
    type: "expense",
    category: "Travel",
  },

  {
    id: "tx_021",
    date: daysAgo(5),
    description: "Laptop EMI",
    amount: 3500,
    type: "expense",
    category: "EMI",
  },
  {
    id: "tx_022",
    date: daysAgo(35),
    description: "Phone EMI",
    amount: 1200,
    type: "expense",
    category: "EMI",
  },

  {
    id: "tx_023",
    date: daysAgo(9),
    description: "Netflix Subscription",
    amount: 499,
    type: "expense",
    category: "Subscriptions",
  },
  {
    id: "tx_024",
    date: daysAgo(9),
    description: "Spotify Subscription",
    amount: 119,
    type: "expense",
    category: "Subscriptions",
  },

  {
    id: "tx_025",
    date: daysAgo(2),
    description: "Transferred to Savings",
    amount: 7000,
    type: "expense",
    category: "Savings",
  },
  {
    id: "tx_026",
    date: daysAgo(32),
    description: "Transferred to Savings",
    amount: 5000,
    type: "expense",
    category: "Savings",
  },
];

export { mockTransactions, categories, categoryColors };
