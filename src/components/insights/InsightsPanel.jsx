import { useMemo } from "react";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  AreaChart,
  Area,
  ScatterChart,
  Scatter,
  ZAxis,
  Cell,
} from "recharts";
import {
  Crown,
  TrendingDown,
  BarChart3,
  Calculator,
  Flame,
  Target,
  Layers,
  LineChart as LineIcon,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";
import {
  format,
  subMonths,
  startOfMonth,
  endOfMonth,
  parseISO,
  isWithinInterval,
  differenceInDays,
  startOfDay,
  subDays,
  eachDayOfInterval,
} from "date-fns";
import useFinanceStore from "../../store/useFinanceStore";
import { formatCurrency } from "../dashboard/SummaryCards";
import AnimatedCounter, { AnimatedPercentage } from "../ui/AnimatedCounter";
import { categoryColors } from "../../data/mockData";
import Card from "../ui/Card";

export default function InsightsPanel() {
  const transactions = useFinanceStore((s) => s.transactions);
  const currency = useFinanceStore((s) => s.currency);
  const theme = useFinanceStore((s) => s.theme);

  const insights = useMemo(() => {
    const now = new Date();

    const expenses = transactions.filter((t) => t.type === "expense");
    const totalExpenses = expenses.reduce((sum, t) => sum + t.amount, 0);
    const totalIncome = transactions
      .filter((t) => t.type === "income")
      .reduce((s, t) => s + t.amount, 0);

    const byCategory = {};
    expenses.forEach((t) => {
      byCategory[t.category] = (byCategory[t.category] || 0) + t.amount;
    });

    const topCategory = Object.entries(byCategory).sort(
      (a, b) => b[1] - a[1],
    )[0] || ["N/A", 0];

    const topCategoryPct =
      totalExpenses > 0
        ? ((topCategory[1] / totalExpenses) * 100).toFixed(1)
        : "0.0";

    // Radar data
    const maxCat = Math.max(...Object.values(byCategory), 1);
    const radarData = Object.entries(byCategory).map(([name, value]) => ({
      category: name,
      value: Math.round((value / maxCat) * 100),
      amount: value,
    }));

    return {
      topCategory: {
        name: topCategory[0],
        amount: topCategory[1],
        percentage: topCategoryPct,
      },
      radarData,
      totalExpenses,
      totalIncome,
    };
  }, [transactions]);

  const gridColor = theme === "dark" ? "#2A2D3A" : "#E2E8F0";
  const tickColor = theme === "dark" ? "#94A3B8" : "#64748B";

  return (
    <div className="space-y-6">
      {/* Insight Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Highest Spending Category */}
        <Card className="p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-yellow-400/20 to-orange-500/20 flex items-center justify-center">
              <Crown size={16} className="text-yellow-400" />
            </div>
            <p className="text-[10px] text-slate-400 uppercase">
              Highest Spending Category
            </p>
          </div>

          <p className="text-lg font-bold">{insights.topCategory.name}</p>

          <p className="text-orange-400 text-sm font-semibold">
            {formatCurrency(insights.topCategory.amount, currency)} spent
          </p>

          <p className="text-xs text-slate-400">
            {insights.topCategory.percentage}% of total expenses
          </p>
        </Card>

        {/* Expense Ratio */}
        <Card className="p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/10 flex items-center justify-center">
              <Target size={16} className="text-cyan-400" />
            </div>
            <p className="text-[10px] text-slate-400 uppercase">
              Expense Ratio
            </p>
          </div>

          <p className="text-xl font-bold">
            <AnimatedPercentage
              value={(insights.totalExpenses / insights.totalIncome) * 100}
            />
          </p>

          <p className="text-xs text-slate-400">of total income</p>
        </Card>
      </div>

      {/* Radar Chart */}
      <Card className="p-5">
        <div className="flex items-center gap-2 mb-4">
          <Layers size={16} className="text-cyan-400" />
          <h3 className="text-sm font-semibold">Expense Pattern Analysis</h3>
        </div>

        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={insights.radarData}>
              <PolarGrid stroke={gridColor} />
              <PolarAngleAxis
                dataKey="category"
                tick={{ fill: tickColor, fontSize: 10 }}
              />
              <PolarRadiusAxis tick={{ fill: tickColor, fontSize: 10 }} />
              <Radar
                dataKey="value"
                stroke="#06B6D4"
                fill="#06B6D4"
                fillOpacity={0.4}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}
