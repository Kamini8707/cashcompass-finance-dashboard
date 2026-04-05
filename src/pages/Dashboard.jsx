import { motion } from "framer-motion";
import SummaryCards from "../components/dashboard/SummaryCards";
import QuickStats from "../components/dashboard/QuickStats";
import BalanceTrendChart from "../components/dashboard/BalanceTrendChart";
import SpendingBreakdownChart from "../components/dashboard/SpendingBreakdownChart";
import RecentTransactions from "../components/dashboard/RecentTransactions";
import CategorySpendingBars from "../components/dashboard/CategorySpendingBars";
import BudgetGauge from "../components/dashboard/BudgetGauge";

import useFinanceStore from "../store/useFinanceStore";
import { parseISO, isWithinInterval, startOfMonth, endOfMonth } from "date-fns";

export default function Dashboard() {
  const transactions = useFinanceStore((s) => s.transactions);

  // ===== Monthly Budget Logic =====
  const monthlyBudget = 20000;

  const now = new Date();
  const start = startOfMonth(now);
  const end = endOfMonth(now);

  const spentThisMonth = transactions
    .filter(
      (t) =>
        t.type === "expense" &&
        isWithinInterval(parseISO(t.date), { start, end }),
    )
    .reduce((sum, t) => sum + t.amount, 0);

  const remainingBudget = monthlyBudget - spentThisMonth;

  const budgetUsedPercent = Math.min(
    (spentThisMonth / monthlyBudget) * 100,
    100,
  );

  // ===== Top Expense Category =====
  const categoryTotals = {};
  transactions
    .filter((t) => t.type === "expense")
    .forEach((t) => {
      categoryTotals[t.category] = (categoryTotals[t.category] || 0) + t.amount;
    });

  const topCategory =
    Object.keys(categoryTotals).length > 0
      ? Object.keys(categoryTotals).reduce((a, b) =>
          categoryTotals[a] > categoryTotals[b] ? a : b,
        )
      : "N/A";

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-bold">Personal Finance Overview</h1>
        <p className="text-sm text-gray-400">
          Monitor your income, expenses, savings and monthly budget.
        </p>
      </div>

      {/* Summary Cards */}
      <SummaryCards />

      {/* Monthly Budget Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Monthly Budget */}
        <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-2xl p-5 text-white">
          <h3 className="text-sm opacity-80">Monthly Budget</h3>
          <p className="text-2xl font-bold">₹{monthlyBudget}</p>
          <p className="text-xs opacity-80">Spending limit</p>
        </div>

        {/* Spent */}
        <div className="bg-gradient-to-br from-rose-600 to-red-700 rounded-2xl p-5 text-white">
          <h3 className="text-sm opacity-80">Spent This Month</h3>
          <p className="text-2xl font-bold">₹{spentThisMonth}</p>
          <p className="text-xs opacity-80">Total expenses</p>
        </div>

        {/* Remaining */}
        <div className="bg-gradient-to-br from-emerald-600 to-teal-700 rounded-2xl p-5 text-white">
          <h3 className="text-sm opacity-80">Remaining Budget</h3>
          <p className="text-2xl font-bold">₹{remainingBudget}</p>
          <p className="text-xs opacity-80">Available balance</p>
        </div>

        {/* Top Category */}
        <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl p-5 text-white">
          <h3 className="text-sm opacity-80">Top Expense Category</h3>
          <p className="text-2xl font-bold">{topCategory}</p>
          <p className="text-xs opacity-80">Highest spending area</p>
        </div>
      </div>

      {/* Budget Progress Bar */}
      <div className="bg-dark-surface border border-dark-border rounded-2xl p-5">
        <h3 className="text-sm text-text-secondary mb-3">Budget Usage</h3>

        <div className="w-full bg-dark-border rounded-full h-3">
          <div
            className={`h-3 rounded-full ${
              budgetUsedPercent < 50
                ? "bg-green-500"
                : budgetUsedPercent < 80
                  ? "bg-yellow-500"
                  : "bg-red-500"
            }`}
            style={{ width: `${budgetUsedPercent}%` }}
          ></div>
        </div>

        <p className="text-xs text-gray-400 mt-2">
          {budgetUsedPercent.toFixed(0)}% of budget used
        </p>

        {budgetUsedPercent > 80 && budgetUsedPercent < 100 && (
          <p className="text-xs text-yellow-400 mt-2">
            Warning: You are close to your monthly budget limit!
          </p>
        )}

        {budgetUsedPercent >= 100 && (
          <p className="text-xs text-red-400 mt-2">Budget exceeded!</p>
        )}
      </div>

      {/* Quick Stats */}
      <QuickStats />

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <BalanceTrendChart />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <SpendingBreakdownChart />
        </motion.div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <RecentTransactions />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <CategorySpendingBars />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <BudgetGauge />
        </motion.div>
      </div>
    </div>
  );
}
