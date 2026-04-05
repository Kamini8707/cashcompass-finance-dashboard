import { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format, subMonths, startOfMonth, endOfMonth, parseISO, isWithinInterval } from 'date-fns';
import useFinanceStore from '../../store/useFinanceStore';
import { formatCurrency } from './SummaryCards';
import Card from '../ui/Card';

/**
 * Balance Trend line/area chart showing net balance over 6 months.
 */
export default function BalanceTrendChart() {
  const transactions = useFinanceStore((s) => s.transactions);
  const currency = useFinanceStore((s) => s.currency);
  const theme = useFinanceStore((s) => s.theme);

  const chartData = useMemo(() => {
    const now = new Date();
    const months = [];

    for (let i = 5; i >= 0; i--) {
      const monthDate = subMonths(now, i);
      const start = startOfMonth(monthDate);
      const end = endOfMonth(monthDate);

      const income = transactions
        .filter((t) => t.type === 'income' && isWithinInterval(parseISO(t.date), { start, end }))
        .reduce((sum, t) => sum + t.amount, 0);

      const expenses = transactions
        .filter((t) => t.type === 'expense' && isWithinInterval(parseISO(t.date), { start, end }))
        .reduce((sum, t) => sum + t.amount, 0);

      months.push({
        name: format(monthDate, 'MMM'),
        income,
        expenses,
        balance: income - expenses,
      });
    }

    return months;
  }, [transactions]);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="dark:bg-dark-bg/95 bg-white/95 backdrop-blur-xl rounded-xl border dark:border-dark-border border-slate-200 p-3 shadow-2xl">
          <p className="text-xs font-semibold dark:text-text-primary text-slate-800 mb-2">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-xs flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
              <span className="dark:text-text-secondary text-slate-500">{entry.name}:</span>
              <span className="font-semibold dark:text-text-primary text-slate-800">
                {formatCurrency(entry.value, currency)}
              </span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="p-5">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-heading text-base font-semibold dark:text-text-primary text-slate-800">
            Balance Trend
          </h3>
          <p className="text-xs dark:text-text-secondary text-slate-500 mt-0.5">
            Last 6 months
          </p>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-accent-primary" />
            <span className="dark:text-text-secondary text-slate-500">
              Balance
            </span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="dark:text-text-secondary text-slate-500">
              Income
            </span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-red-400" />
            <span className="dark:text-text-secondary text-slate-500">
              Expenses
            </span>
          </span>
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 5, right: 5, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="balanceGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0EA5E9" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#0EA5E9" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#22C55E" stopOpacity={0.2} />
                <stop offset="100%" stopColor="#22C55E" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={theme === "dark" ? "#2A2D3A" : "#E2E8F0"}
              vertical={false}
            />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{
                fill: theme === "dark" ? "#94A3B8" : "#64748B",
                fontSize: 12,
              }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{
                fill: theme === "dark" ? "#94A3B8" : "#64748B",
                fontSize: 11,
              }}
              tickFormatter={(val) =>
                currency === "INR"
                  ? `₹${(val / 1000).toFixed(0)}k`
                  : `$${(val / 1000).toFixed(0)}k`
              }
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="balance"
              stroke="#0EA5E9"
              strokeWidth={2.5}
              fill="url(#balanceGradient)"
              name="Balance"
            />
            <Area
              type="monotone"
              dataKey="expenses"
              stroke="#EF4444"
              strokeWidth={2}
              fill="none"
              strokeDasharray="5 5"
              name="Expenses"
            />
            <Area
              type="monotone"
              dataKey="balance"
              stroke="#6C63FF"
              strokeWidth={2.5}
              fill="url(#balanceGradient)"
              name="Balance"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
