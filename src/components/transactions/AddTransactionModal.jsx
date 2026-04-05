import { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";
import { categories } from "../../data/mockData";
import { motion, AnimatePresence } from "framer-motion";

export default function AddTransactionModal({
  isOpen,
  onClose,
  onSave,
  editingTransaction = null,
}) {
  const inputRef = useRef(null);

  const [form, setForm] = useState({
    description: "",
    amount: "",
    type: "expense",
    category: "Food",
    date: new Date().toISOString().split("T")[0],
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingTransaction) {
      setForm({
        description: editingTransaction.description,
        amount: editingTransaction.amount.toString(),
        type: editingTransaction.type,
        category: editingTransaction.category,
        date: editingTransaction.date.split("T")[0],
      });
    } else {
      setForm({
        description: "",
        amount: "",
        type: "expense",
        category: "Food",
        date: new Date().toISOString().split("T")[0],
      });
    }

    setErrors({});
  }, [editingTransaction, isOpen]);

  // Auto focus first input
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 100);
    }
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const validate = () => {
    const newErrors = {};
    if (!form.description.trim())
      newErrors.description = "Description is required";
    if (
      !form.amount ||
      isNaN(parseFloat(form.amount)) ||
      parseFloat(form.amount) <= 0
    ) {
      newErrors.amount = "Enter a valid positive amount";
    }
    if (!form.date) newErrors.date = "Date is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    onSave({
      description: form.description.trim(),
      amount: parseFloat(form.amount),
      type: form.type,
      category: form.category,
      date: new Date(form.date).toISOString(),
    });

    onClose();
  };

  const inputClasses = `w-full px-3 py-2.5 rounded-xl text-sm border transition-all
    focus:outline-none focus:ring-2 focus:ring-accent-primary/40
    dark:bg-dark-bg dark:border-dark-border dark:text-text-primary
    bg-slate-50 border-slate-200 text-slate-800`;

  const labelClasses =
    "block text-xs font-semibold dark:text-text-secondary text-slate-500 uppercase tracking-wider mb-1.5";

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ type: "spring", damping: 25, stiffness: 250 }}
            className="relative w-full sm:max-w-md rounded-t-2xl sm:rounded-2xl border shadow-2xl
              dark:bg-dark-surface dark:border-dark-border
              bg-white border-slate-200
              max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b dark:border-dark-border border-slate-200">
              <h2 className="font-heading text-lg font-bold">
                {editingTransaction ? "Edit Transaction" : "Add Transaction"}
              </h2>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-dark-hover"
              >
                <X size={18} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Description */}
              <div>
                <label className={labelClasses}>Description</label>
                <input
                  ref={inputRef}
                  type="text"
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  placeholder="e.g., Netflix Subscription"
                  className={`${inputClasses} ${
                    errors.description ? "border-red-400" : ""
                  }`}
                />
                {errors.description && (
                  <p className="text-xs text-red-400 mt-1">
                    {errors.description}
                  </p>
                )}
              </div>

              {/* Amount */}
              <div>
                <label className={labelClasses}>Amount</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    ₹
                  </span>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={form.amount}
                    onChange={(e) =>
                      setForm({ ...form, amount: e.target.value })
                    }
                    className={`${inputClasses} pl-7 ${
                      errors.amount ? "border-red-400" : ""
                    }`}
                  />
                </div>
                {errors.amount && (
                  <p className="text-xs text-red-400 mt-1">{errors.amount}</p>
                )}
              </div>

              {/* Type */}
              <div>
                <label className={labelClasses}>Type</label>
                <div className="flex gap-3">
                  {["expense", "income"].map((t) => (
                    <label
                      key={t}
                      className={`flex-1 flex items-center justify-center px-4 py-2.5 rounded-xl border text-sm font-medium cursor-pointer transition-all ${
                        form.type === t
                          ? t === "income"
                            ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                            : "bg-red-500/10 border-red-500/30 text-red-400"
                          : "border-slate-200 text-slate-500"
                      }`}
                    >
                      <input
                        type="radio"
                        name="type"
                        value={t}
                        checked={form.type === t}
                        onChange={(e) =>
                          setForm({ ...form, type: e.target.value })
                        }
                        className="sr-only"
                      />
                      {t === "income" ? "↗ Income" : "↘ Expense"}
                    </label>
                  ))}
                </div>
              </div>

              {/* Category */}
              <div>
                <label className={labelClasses}>Category</label>
                <select
                  value={form.category}
                  onChange={(e) =>
                    setForm({ ...form, category: e.target.value })
                  }
                  className={inputClasses}
                >
                  {categories.map((cat) => (
                    <option key={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Date */}
              <div>
                <label className={labelClasses}>Date</label>
                <input
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className={inputClasses}
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium border"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-accent-primary hover:bg-accent-primary-hover"
                >
                  {editingTransaction ? "Save Changes" : "Add Transaction"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
