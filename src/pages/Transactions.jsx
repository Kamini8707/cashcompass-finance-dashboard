import { useState, useCallback } from 'react';
import { Plus, Download } from 'lucide-react';
import useFinanceStore from '../store/useFinanceStore';
import TransactionFilters from '../components/transactions/TransactionFilters';
import TransactionList from '../components/transactions/TransactionList';
import AddTransactionModal from '../components/transactions/AddTransactionModal';
import Card from '../components/ui/Card';
import { formatCurrency } from '../components/dashboard/SummaryCards';

/**
 * Export transactions as CSV file.
 */
function exportToCSV(transactions, currency) {
  const headers = ['Date', 'Description', 'Category', 'Type', 'Amount'];
  const rows = transactions.map((tx) => [
    new Date(tx.date).toLocaleDateString('en-IN'),
    `"${tx.description}"`,
    tx.category,
    tx.type,
    `${tx.type === 'income' ? '+' : '-'}${tx.amount}`,
  ]);

  const csv = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `fintrack-transactions-${new Date().toISOString().split('T')[0]}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}

/**
 * Transactions page — fully responsive with filters, table/cards, modal, and CSV export.
 */
export default function Transactions({ addToast }) {
  const role = useFinanceStore((s) => s.role);
  const currency = useFinanceStore((s) => s.currency);
  const getFilteredTransactions = useFinanceStore((s) => s.getFilteredTransactions);
  const addTransaction = useFinanceStore((s) => s.addTransaction);
  const editTransaction = useFinanceStore((s) => s.editTransaction);
  const deleteTransaction = useFinanceStore((s) => s.deleteTransaction);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);

  const filteredTransactions = getFilteredTransactions();

  const handleAdd = () => {
    setEditingTransaction(null);
    setIsModalOpen(true);
  };

  const handleEdit = (tx) => {
    setEditingTransaction(tx);
    setIsModalOpen(true);
  };

  const handleDelete = useCallback((id) => {
    deleteTransaction(id);
    addToast('Transaction deleted successfully', 'success');
  }, [deleteTransaction, addToast]);

  const handleSave = useCallback((data) => {
    if (editingTransaction) {
      editTransaction(editingTransaction.id, data);
      addToast('Transaction updated successfully', 'success');
    } else {
      addTransaction(data);
      addToast('Transaction added successfully', 'success');
    }
  }, [editingTransaction, editTransaction, addTransaction, addToast]);

  const handleExport = () => {
    if (filteredTransactions.length === 0) {
      addToast('No transactions to export', 'warning');
      return;
    }
    exportToCSV(filteredTransactions, currency);
    addToast(`Exported ${filteredTransactions.length} transactions`, 'success');
  };

  // Calculate filtered totals
  const filteredIncome = filteredTransactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
  const filteredExpenses = filteredTransactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in">
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <p className="text-xs sm:text-sm dark:text-text-secondary text-slate-500">
            {filteredTransactions.length} transaction{filteredTransactions.length !== 1 ? 's' : ''}
            {filteredTransactions.length > 0 && (
              <span className="ml-2">
                · <span className="text-emerald-400">+{formatCurrency(filteredIncome, currency)}</span>
                {' '}<span className="text-red-400">-{formatCurrency(filteredExpenses, currency)}</span>
              </span>
            )}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Export Button */}
          <button
            id="export-csv-btn"
            onClick={handleExport}
            className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-medium border transition-all active:scale-95
              dark:border-dark-border dark:text-text-secondary dark:hover:bg-dark-hover dark:hover:text-text-primary
              border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-800"
          >
            <Download size={14} />
            <span className="hidden xs:inline">Export</span> CSV
          </button>

          {/* Add Transaction (Admin Only) */}
          {role === 'admin' && (
            <button
              id="add-transaction-btn"
              onClick={handleAdd}
              className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white
                bg-accent-primary hover:bg-accent-primary-hover transition-all active:scale-95
                shadow-lg shadow-accent-primary/25"
            >
              <Plus size={14} />
              <span className="hidden xs:inline sm:inline">Add</span> <span className="hidden sm:inline">Transaction</span>
              <span className="xs:hidden sm:hidden">Add</span>
            </button>
          )}
        </div>
      </div>

      {/* Filters */}
      <TransactionFilters />

      {/* Transaction Table / Cards */}
      <Card className="overflow-hidden">
        <TransactionList
          transactions={filteredTransactions}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </Card>

      {/* Add/Edit Modal */}
      <AddTransactionModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingTransaction(null);
        }}
        onSave={handleSave}
        editingTransaction={editingTransaction}
      />
    </div>
  );
}
