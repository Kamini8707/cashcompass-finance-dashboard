import { useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  RadialBarChart, RadialBar, ResponsiveContainer, PolarAngleAxis,
} from 'recharts';
import { Target } from 'lucide-react';
import useFinanceStore from '../../store/useFinanceStore';
import { formatCurrency } from './SummaryCards';
import AnimatedCounter from '../ui/AnimatedCounter';
import Card from '../ui/Card';

/**
 * Income vs Expense radial gauge for the dashboard — shows budget health at a glance.
 */
export default function BudgetGauge() {
  const transactions = useFinanceStore((s) => s.transactions);
  const currency = useFinanceStore((s) => s.currency);

  const data = useMemo(() => {
    const totalIncome = transactions.filter((t) => t.type === 'income').reduce((s, t) => s + t.amount, 0);
    const totalExpenses = transactions.filter((t) => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
    const spentPct = totalIncome > 0 ? Math.round((totalExpenses / totalIncome) * 100) : 0;
    const savedPct = 100 - spentPct;

    return {
      totalIncome,
      totalExpenses,
      spentPct,
      savedPct,
      chartData: [
        { name: 'Spent', value: spentPct, fill: '#EF4444' },
        { name: 'Saved', value: savedPct, fill: '#22C55E' },
      ],
    };
  }, [transactions]);

  const formatNum = (v) => v.toLocaleString('en-IN');

  return (
    <Card className="p-5 h-full">
      <div className="flex items-center gap-2.5 mb-3">
        <div className="w-9 h-9 rounded-xl bg-cyan-500/10 flex items-center justify-center">
          <Target size={16} className="text-cyan-400" />
        </div>
        <div>
          <h3 className="font-heading text-sm font-semibold dark:text-text-primary text-slate-800">
            Budget Health
          </h3>
          <p className="text-[10px] dark:text-text-secondary text-slate-500 mt-0.5">
            Income utilization
          </p>
        </div>
      </div>

      {/* Radial Chart */}
      <div className="relative h-40 flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="60%"
            outerRadius="90%"
            data={[{ name: 'Spent', value: data.spentPct, fill: 'url(#spentGradient)' }]}
            startAngle={180}
            endAngle={0}
            barSize={12}
          >
            <defs>
              <linearGradient id="spentGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#22C55E" />
                <stop offset={`${Math.min(data.spentPct, 100)}%`} stopColor={data.spentPct > 80 ? '#EF4444' : data.spentPct > 60 ? '#F59E0B' : '#22C55E'} />
              </linearGradient>
            </defs>
            <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
            <RadialBar
              dataKey="value"
              cornerRadius={8}
              background={{ fill: 'rgba(42,45,58,0.5)' }}
              clockWise
            />
          </RadialBarChart>
        </ResponsiveContainer>
        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center mt-2">
          <span className="font-heading text-2xl font-bold dark:text-text-primary text-slate-800">
            <AnimatedCounter value={data.spentPct} suffix="%" duration={1800} />
          </span>
          <span className="text-[10px] dark:text-text-secondary text-slate-400">spent</span>
        </div>
      </div>

      {/* Legend */}
      <div className="grid grid-cols-2 gap-3 mt-2">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center px-3 py-2 rounded-xl dark:bg-emerald-500/5 bg-emerald-50"
        >
          <p className="text-[10px] font-medium text-emerald-400 uppercase tracking-wider">Saved</p>
          <p className="font-heading text-sm font-bold text-emerald-400">
            <AnimatedCounter
              value={data.totalIncome - data.totalExpenses}
              prefix={currency === 'INR' ? '₹' : '$'}
              duration={1600}
              formatFn={formatNum}
            />
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="text-center px-3 py-2 rounded-xl dark:bg-red-500/5 bg-red-50"
        >
          <p className="text-[10px] font-medium text-red-400 uppercase tracking-wider">Spent</p>
          <p className="font-heading text-sm font-bold text-red-400">
            <AnimatedCounter
              value={data.totalExpenses}
              prefix={currency === 'INR' ? '₹' : '$'}
              duration={1600}
              formatFn={formatNum}
            />
          </p>
        </motion.div>
      </div>
    </Card>
  );
}
