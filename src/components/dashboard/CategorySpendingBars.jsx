import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Activity } from 'lucide-react';
import useFinanceStore from '../../store/useFinanceStore';
import { formatCurrency } from './SummaryCards';
import { categoryColors } from '../../data/mockData';
import Card from '../ui/Card';

/**
 * Animated horizontal spending bars showing category-wise expenses.
 */
export default function CategorySpendingBars() {
  const transactions = useFinanceStore((s) => s.transactions);
  const currency = useFinanceStore((s) => s.currency);

  const data = useMemo(() => {
    const expenses = transactions.filter((t) => t.type === 'expense');
    const total = expenses.reduce((sum, t) => sum + t.amount, 0);

    const byCategory = {};
    expenses.forEach((t) => {
      byCategory[t.category] = (byCategory[t.category] || 0) + t.amount;
    });

    return Object.entries(byCategory)
      .map(([name, value]) => ({
        name,
        value,
        percentage: total > 0 ? (value / total) * 100 : 0,
        color: categoryColors[name] || '#6C63FF',
      }))
      .sort((a, b) => b.value - a.value);
  }, [transactions]);

  return (
    <Card className="p-5 h-full">
      <div className="flex items-center gap-2.5 mb-5">
        <div className="w-9 h-9 rounded-xl bg-purple-500/10 flex items-center justify-center">
          <Activity size={16} className="text-purple-400" />
        </div>
        <div>
          <h3 className="font-heading text-sm font-semibold dark:text-text-primary text-slate-800">
            Spending by Category
          </h3>
          <p className="text-[10px] dark:text-text-secondary text-slate-500 mt-0.5">
            All time expenses
          </p>
        </div>
      </div>

      <div className="space-y-3.5">
        {data.map((item, i) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + i * 0.06, duration: 0.4, ease: 'easeOut' }}
          >
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <span
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-xs font-medium dark:text-text-primary text-slate-700">
                  {item.name}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] dark:text-text-secondary text-slate-400">
                  {item.percentage.toFixed(1)}%
                </span>
                <span className="text-xs font-heading font-semibold dark:text-text-primary text-slate-700">
                  {formatCurrency(item.value, currency)}
                </span>
              </div>
            </div>
            {/* Animated bar */}
            <div className="h-1.5 rounded-full dark:bg-dark-border bg-slate-100 overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: item.color }}
                initial={{ width: 0 }}
                animate={{ width: `${item.percentage}%` }}
                transition={{ delay: 0.6 + i * 0.08, duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </Card>
  );
}
