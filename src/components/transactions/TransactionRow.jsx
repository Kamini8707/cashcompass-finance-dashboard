import { format, parseISO } from "date-fns";
import { Pencil, Trash2 } from "lucide-react";
import Badge from "../ui/Badge";
import { getCategoryVariant } from "../../utils/categoryVariant";
import useFinanceStore from "../../store/useFinanceStore";
import { formatCurrency } from "../dashboard/SummaryCards";

export default function TransactionRow({
  transaction,
  runningBalance,
  onEdit,
  onDelete,
}) {
  const role = useFinanceStore((s) => s.role);
  const currency = useFinanceStore((s) => s.currency);
  const { id, date, description, category, type, amount } = transaction;

  return (
    <tr className="group hover:bg-dark-hover/40 transition-all border-b dark:border-dark-border border-light-border">
      {/* Date */}
      <td className="px-4 py-3 text-sm text-gray-400">
        {format(parseISO(date), "dd MMM yyyy")}
      </td>

      {/* Description */}
      <td className="px-4 py-3">
        <span className="text-sm font-medium">{description}</span>
      </td>

      {/* Category */}
      <td className="px-4 py-3">
        <Badge variant={getCategoryVariant(category)}>{category}</Badge>
      </td>

      {/* Type */}
      <td className="px-4 py-3">
        <Badge variant={type === "income" ? "success" : "danger"}>
          {type === "income" ? "Income" : "Expense"}
        </Badge>
      </td>

      {/* Amount */}
      <td className="px-4 py-3 text-right font-semibold">
        <span
          className={type === "income" ? "text-emerald-400" : "text-red-400"}
        >
          {type === "income" ? "+" : "-"}
          {formatCurrency(amount, currency)}
        </span>
      </td>

      {/* Running Balance */}
      <td className="px-4 py-3 text-right font-semibold text-blue-400">
        {formatCurrency(runningBalance, currency)}
      </td>

      {/* Actions */}
      {role === "admin" && (
        <td className="px-4 py-3">
          <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => onEdit(transaction)}
              className="p-1.5 rounded-lg hover:bg-blue-500/10 text-blue-400"
            >
              <Pencil size={14} />
            </button>
            <button
              onClick={() => onDelete(id)}
              className="p-1.5 rounded-lg hover:bg-red-500/10 text-red-400"
            >
              <Trash2 size={14} />
            </button>
          </div>
        </td>
      )}
    </tr>
  );
}
