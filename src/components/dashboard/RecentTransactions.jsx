import { useMemo } from 'react';
import { format, parseISO } from 'date-fns';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownRight, Clock } from 'lucide-react';
import useFinanceStore from '../../store/useFinanceStore';
import { formatCurrency } from './SummaryCards';
import Badge from "../ui/Badge";
import { getCategoryVariant } from "../../utils/categoryVariant";
import Card from '../ui/Card';

/**
 * Recent transactions widget for the dashboard — shows last 6 transactions with animations.
 */
export default function RecentTransactions() {
  const transactions = useFinanceStore((s) => s.transactions);
  const currency = useFinanceStore((s) => s.currency);

  const recent = useMemo(() => {
    return [...transactions]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 6);
  }, [transactions]);

  return (
    <Card className="p-5 h-full">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-accent-primary/10 flex items-center justify-center">
            <Clock size={16} className="text-accent-primary" />
          </div>
          <div>
            <h3>Recent Activity</h3>
            <p className="text-xs text-slate-400">Latest financial updates</p>
          </div>
        </div>
      </div>

      <div className="space-y-1">
        {recent.map((tx, i) => (
          <motion.div
            key={tx.id}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              delay: 0.3 + i * 0.08,
              duration: 0.4,
              ease: "easeOut",
            }}
            className="flex items-center gap-3 py-2.5 px-2 -mx-2 rounded-xl
              dark:hover:bg-dark-hover/60 hover:bg-slate-50 transition-colors group cursor-default"
          >
            {/* Icon */}
            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                tx.type === "income" ? "bg-emerald-500/10" : "bg-red-500/10"
              }`}
            >
              {tx.type === "income" ? (
                <ArrowUpRight size={14} className="text-emerald-400" />
              ) : (
                <ArrowDownRight size={14} className="text-red-400" />
              )}
            </div>

            {/* Description & Category */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium dark:text-text-primary text-slate-700 truncate">
                {tx.description}
              </p>
              <p className="text-[10px] dark:text-text-secondary/70 text-slate-400 mt-0.5">
                {format(parseISO(tx.date), "dd MMM")} · {tx.category}
              </p>
            </div>

            {/* Amount */}
            <span
              className={`font-heading text-sm font-semibold whitespace-nowrap ${
                tx.type === "income" ? "text-emerald-400" : "text-red-400"
              }`}
            >
              {tx.type === "income" ? "+" : "-"}
              {formatCurrency(tx.amount, currency)}
            </span>
          </motion.div>
        ))}
      </div>
    </Card>
  );
}
