import { FileX, RotateCcw, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { format, parseISO } from "date-fns";
import useFinanceStore from "../../store/useFinanceStore";
import { formatCurrency } from "../dashboard/SummaryCards";
import TransactionRow from "./TransactionRow";
import Badge from "../ui/Badge";
import { getCategoryVariant } from "../../utils/categoryVariant";

export default function TransactionList({ transactions, onEdit, onDelete }) {
  const role = useFinanceStore((s) => s.role);
  const currency = useFinanceStore((s) => s.currency);
  const clearFilters = useFinanceStore((s) => s.clearFilters);

  if (transactions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 animate-fade-in">
        <div className="w-16 h-16 rounded-2xl dark:bg-dark-hover bg-slate-100 flex items-center justify-center mb-4">
          <FileX
            size={26}
            className="dark:text-text-secondary text-slate-400"
          />
        </div>
        <h3 className="font-heading text-lg font-semibold dark:text-text-primary text-slate-700 mb-1">
          No transactions found
        </h3>
        <p className="text-sm dark:text-text-secondary text-slate-500 mb-4 text-center">
          Try adjusting filters or add a new transaction.
        </p>
        <button
          onClick={clearFilters}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium
            text-accent-primary bg-accent-primary/10 hover:bg-accent-primary/20 transition-all"
        >
          <RotateCcw size={14} />
          Clear Filters
        </button>
      </div>
    );
  }

  return (
    <>
      {/* Desktop Table */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b dark:border-dark-border border-light-border">
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">
                Date
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">
                Description
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase hidden md:table-cell">
                Category
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase hidden lg:table-cell">
                Type
              </th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-slate-500 uppercase">
                Amount
              </th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-slate-500 uppercase">
                Balance
              </th>
              {role === "admin" && (
                <th className="px-4 py-3 text-right text-xs font-semibold text-slate-500 uppercase">
                  Actions
                </th>
              )}
            </tr>
          </thead>

          <tbody>
            {transactions.map((tx, index) => {
              const balance = transactions
                .slice(0, index + 1)
                .reduce(
                  (acc, t) =>
                    acc + (t.type === "income" ? t.amount : -t.amount),
                  0,
                );

              return (
                <TransactionRow
                  key={tx.id}
                  transaction={tx}
                  runningBalance={balance}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="sm:hidden divide-y dark:divide-dark-border divide-light-border">
        {transactions.map((tx) => (
          <MobileTransactionCard
            key={tx.id}
            transaction={tx}
            currency={currency}
            role={role}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </>
  );
}

/* Mobile Card */
function MobileTransactionCard({
  transaction,
  currency,
  role,
  onEdit,
  onDelete,
}) {
  const { id, date, description, category, type, amount } = transaction;

  return (
    <div className="px-4 py-3.5 hover:bg-dark-hover/30 transition-colors">
      <div className="flex items-start gap-3">
        <div
          className={`w-9 h-9 rounded-xl flex items-center justify-center ${
            type === "income" ? "bg-emerald-500/10" : "bg-red-500/10"
          }`}
        >
          {type === "income" ? (
            <ArrowUpRight size={16} className="text-emerald-400" />
          ) : (
            <ArrowDownRight size={16} className="text-red-400" />
          )}
        </div>

        <div className="flex-1">
          <p className="text-sm font-medium">{description}</p>

          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs text-gray-400">
              {format(parseISO(date), "dd MMM yyyy")}
            </span>
            <Badge variant={getCategoryVariant(category)}>{category}</Badge>
          </div>

          <div className="flex justify-between items-center mt-2">
            <span
              className={`font-semibold ${
                type === "income" ? "text-emerald-400" : "text-red-400"
              }`}
            >
              {type === "income" ? "+" : "-"}
              {formatCurrency(amount, currency)}
            </span>

            {role === "admin" && (
              <div className="flex gap-2">
                <button
                  onClick={() => onEdit(transaction)}
                  className="text-xs px-2 py-1 bg-blue-500/10 text-blue-400 rounded-lg"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(id)}
                  className="text-xs px-2 py-1 bg-red-500/10 text-red-400 rounded-lg"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
