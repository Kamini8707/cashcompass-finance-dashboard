import { useMemo } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import useFinanceStore from "../../store/useFinanceStore";
import { categoryColors } from "../../data/mockData";
import { formatCurrency } from "./SummaryCards";
import Card from "../ui/Card";

export default function SpendingBreakdownChart() {
  const transactions = useFinanceStore((s) => s.transactions);
  const currency = useFinanceStore((s) => s.currency);

  const { chartData, totalExpenses, topCategory } = useMemo(() => {
    const expenses = transactions.filter((t) => t.type === "expense");
    const total = expenses.reduce((sum, t) => sum + t.amount, 0);

    const byCategory = {};
    expenses.forEach((t) => {
      byCategory[t.category] = (byCategory[t.category] || 0) + t.amount;
    });

    const sorted = Object.entries(byCategory)
      .map(([name, value]) => ({
        name,
        value,
        percentage: ((value / total) * 100).toFixed(1),
        color: categoryColors[name] || "#0EA5E9",
      }))
      .sort((a, b) => b.value - a.value);

    return {
      chartData: sorted.slice(0, 5),
      totalExpenses: total,
      topCategory: sorted[0]?.name || "N/A",
    };
  }, [transactions]);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white dark:bg-dark-bg border dark:border-dark-border border-slate-200 rounded-xl p-3 shadow-xl">
          <p className="text-xs font-semibold mb-1">{data.name}</p>
          <p className="text-xs">
            {formatCurrency(data.value, currency)} ({data.percentage}%)
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="p-5">
      <div className="mb-4">
        <h3 className="font-heading text-base font-semibold">
          Expense Distribution
        </h3>
        <p className="text-xs text-gray-400">
          Top spending categories this month
        </p>
      </div>

      <div className="flex flex-col items-center">
        <div className="h-52 w-full relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={4}
                dataKey="value"
                strokeWidth={0}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>

          {/* Center Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-xs text-gray-400">Total Spent</span>
            <span className="font-bold text-lg">
              {formatCurrency(totalExpenses, currency)}
            </span>
          </div>
        </div>

        {/* Top Category */}
        <div className="mt-3 text-center">
          <p className="text-xs text-gray-400">Highest Spending</p>
          <p className="font-semibold text-sm text-orange-400">{topCategory}</p>
        </div>

        {/* Legend */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-2 mt-4 w-full max-w-xs">
          {chartData.map((item) => (
            <div key={item.name} className="flex items-center gap-2">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-xs truncate">{item.name}</span>
              <span className="text-xs font-medium ml-auto">
                {item.percentage}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
