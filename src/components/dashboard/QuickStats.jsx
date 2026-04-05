import { useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeftRight, CalendarDays, Flame, Target, Zap, TrendingUp,
} from 'lucide-react';
import {
  subMonths, isWithinInterval, startOfMonth, endOfMonth, parseISO,
  differenceInDays, startOfDay,
} from 'date-fns';
import useFinanceStore from '../../store/useFinanceStore';
import { formatCurrency } from './SummaryCards';
import AnimatedCounter from '../ui/AnimatedCounter';

/**
 * Quick stats strip showing additional financial metrics.
 */
export default function QuickStats() {
  const transactions = useFinanceStore((s) => s.transactions);
  const currency = useFinanceStore((s) => s.currency);

  const stats = useMemo(() => {
    const now = new Date();
    const thisMonthStart = startOfMonth(now);
    const thisMonthEnd = endOfMonth(now);
    const daysSoFar = differenceInDays(startOfDay(now), thisMonthStart) + 1;

    const thisMonthTxs = transactions.filter((t) =>
      isWithinInterval(parseISO(t.date), { start: thisMonthStart, end: thisMonthEnd })
    );
    const thisMonthExpenses = thisMonthTxs
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
    const thisMonthIncome = thisMonthTxs
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);

    // Busiest day (most transactions)
    const busiestAmount = thisMonthTxs.length > 0
      ? Math.max(...thisMonthTxs.map((t) => t.amount))
      : 0;

    // Savings streak
    let streak = 0;
    for (let i = 0; i < 12; i++) {
      const m = subMonths(now, i);
      const s = startOfMonth(m);
      const e = endOfMonth(m);
      const inc = transactions.filter((t) => t.type === 'income' && isWithinInterval(parseISO(t.date), { start: s, end: e })).reduce((a, t) => a + t.amount, 0);
      const exp = transactions.filter((t) => t.type === 'expense' && isWithinInterval(parseISO(t.date), { start: s, end: e })).reduce((a, t) => a + t.amount, 0);
      if (inc > exp && inc > 0) streak++;
      else break;
    }

    return {
      thisMonthTxCount: thisMonthTxs.length,
      avgDailySpend: daysSoFar > 0 ? Math.round(thisMonthExpenses / daysSoFar) : 0,
      thisMonthIncome,
      thisMonthExpenses,
      streak,
      totalTxCount: transactions.length,
    };
  }, [transactions]);

  const items = [
    {
      icon: CalendarDays,
      label: 'This Month',
      value: stats.thisMonthTxCount,
      suffix: ' transactions',
      color: 'text-blue-400',
      bg: 'bg-blue-500/10',
    },
    {
      icon: Zap,
      label: 'Avg Daily Spend',
      value: stats.avgDailySpend,
      isCurrency: true,
      color: 'text-amber-400',
      bg: 'bg-amber-500/10',
    },
    {
      icon: Flame,
      label: 'Savings Streak',
      value: stats.streak,
      suffix: ' months',
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10',
    },
    {
      icon: ArrowLeftRight,
      label: 'Total Records',
      value: stats.totalTxCount,
      suffix: ' entries',
      color: 'text-purple-400',
      bg: 'bg-purple-500/10',
    },
  ];

  const formatNum = (v) => v.toLocaleString('en-IN');

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className="grid grid-cols-2 lg:grid-cols-4 gap-3"
    >
      {items.map((item, i) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 + i * 0.08, duration: 0.4 }}
          className="flex items-center gap-3 px-4 py-3 rounded-xl border
            dark:bg-dark-surface/50 dark:border-dark-border/50
            bg-light-surface border-light-border
            hover:dark:border-dark-border hover:border-slate-300
            transition-all group cursor-default"
        >
          <div className={`w-8 h-8 rounded-lg ${item.bg} flex items-center justify-center flex-shrink-0
            group-hover:scale-110 transition-transform duration-300`}>
            <item.icon size={14} className={item.color} />
          </div>
          <div className="min-w-0">
            <p className="text-[10px] dark:text-text-secondary/70 text-slate-400 uppercase tracking-wider font-medium">
              {item.label}
            </p>
            <p className="font-heading text-sm font-bold dark:text-text-primary text-slate-800 truncate">
              {item.isCurrency ? (
                <AnimatedCounter
                  value={item.value}
                  prefix={currency === 'INR' ? '₹' : '$'}
                  duration={1500}
                  formatFn={formatNum}
                />
              ) : (
                <>
                  <AnimatedCounter value={item.value} duration={1200} formatFn={formatNum} />
                  <span className="text-[10px] font-normal dark:text-text-secondary text-slate-400">
                    {item.suffix}
                  </span>
                </>
              )}
            </p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
