import { Wallet, TrendingUp, TrendingDown, PiggyBank } from "lucide-react";
import AnimatedCounter, { AnimatedPercentage } from "../ui/AnimatedCounter";
import useFinanceStore from "../../store/useFinanceStore";
import Card from "../ui/Card";

export function formatCurrency(amount, currency = "INR") {
  return currency === "INR"
    ? `₹${amount.toLocaleString("en-IN")}`
    : `$${amount.toLocaleString()}`;
}

export default function SummaryCards() {
  const transactions = useFinanceStore((s) => s.transactions);
  const currency = useFinanceStore((s) => s.currency);

  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const expenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = income - expenses;
  const savingsRate = income > 0 ? (balance / income) * 100 : 0;

  const cards = [
    {
      title: "Net Worth",
      value: balance,
      icon: Wallet,
      color: "from-cyan-500 to-blue-600",
    },
    {
      title: "Income (6M)",
      value: income,
      icon: TrendingUp,
      color: "from-emerald-500 to-teal-600",
    },
    {
      title: "Expenses (6M)",
      value: expenses,
      icon: TrendingDown,
      color: "from-rose-500 to-red-600",
    },
    {
      title: "Savings Ratio",
      value: savingsRate,
      icon: PiggyBank,
      isPercent: true,
      color: "from-amber-500 to-orange-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {cards.map((card, i) => {
        const Icon = card.icon;
        return (
          <Card
            key={i}
            className={`p-5 bg-gradient-to-br ${card.color} text-white shadow-lg`}
          >
            <div className="flex justify-between items-center mb-3">
              <p className="text-sm opacity-90">{card.title}</p>
              <Icon size={20} />
            </div>

            <div className="text-2xl font-bold">
              {card.isPercent ? (
                <AnimatedPercentage value={card.value} />
              ) : (
                <AnimatedCounter
                  value={card.value}
                  prefix={currency === "INR" ? "₹" : "$"}
                />
              )}
            </div>
          </Card>
        );
      })}
    </div>
  );
}
