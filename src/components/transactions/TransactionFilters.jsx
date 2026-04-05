import {
  Search,
  SlidersHorizontal,
  ChevronDown,
  RotateCcw,
} from "lucide-react";
import { useState } from "react";
import useFinanceStore from "../../store/useFinanceStore";
import { categories } from "../../data/mockData";

export default function TransactionFilters() {
  const { filters, setFilter, resetFilters } = useFinanceStore();
  const [filtersOpen, setFiltersOpen] = useState(false);

  const selectClasses = `appearance-none rounded-xl px-3 py-2.5 text-sm font-medium border transition-all w-full sm:w-auto
    focus:outline-none focus:ring-2 focus:ring-accent-primary/40 cursor-pointer
    dark:bg-dark-bg dark:border-dark-border dark:text-text-primary
    bg-slate-50 border-slate-200 text-slate-800`;

  return (
    <div className="space-y-3 bg-dark-surface/50 backdrop-blur-md border border-dark-border rounded-2xl p-4">
      {/* Top Row */}
      <div className="flex items-center gap-2">
        {/* Search */}
        <div className="relative flex-1">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary"
          />
          <input
            type="text"
            placeholder="Search transactions..."
            value={filters.search}
            onChange={(e) => setFilter("search", e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm border transition-all
              focus:outline-none focus:ring-2 focus:ring-accent-primary/40
              dark:bg-dark-bg dark:border-dark-border dark:text-text-primary
              bg-slate-50 border-slate-200 text-slate-800"
          />
        </div>

        {/* Filter Toggle Mobile */}
        <button
          onClick={() => setFiltersOpen(!filtersOpen)}
          className={`sm:hidden flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-sm font-medium border transition-all
            active:scale-95 flex-shrink-0
            ${
              filtersOpen
                ? "bg-accent-primary/10 border-accent-primary/30 text-accent-primary"
                : "dark:bg-dark-bg dark:border-dark-border text-text-secondary bg-slate-50 border-slate-200"
            }`}
        >
          <SlidersHorizontal size={14} />
          <ChevronDown
            size={12}
            className={`transition-transform ${
              filtersOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* Reset Filters */}
        <button
          onClick={resetFilters}
          className="hidden sm:flex items-center gap-1 px-3 py-2 rounded-xl text-xs border border-dark-border hover:bg-dark-hover transition"
        >
          <RotateCcw size={14} />
          Reset
        </button>
      </div>

      {/* Filters Row */}
      <div
        className={`grid grid-cols-3 gap-2 sm:flex sm:flex-wrap sm:items-center sm:gap-3 transition-all duration-300 origin-top ${
          filtersOpen ? "grid" : "hidden sm:flex"
        }`}
      >
        {/* Type */}
        <select
          value={filters.type}
          onChange={(e) => setFilter("type", e.target.value)}
          className={selectClasses}
        >
          <option value="all">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        {/* Category */}
        <select
          value={filters.category}
          onChange={(e) => setFilter("category", e.target.value)}
          className={selectClasses}
        >
          <option value="all">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        {/* Date */}
        <select
          value={filters.dateRange}
          onChange={(e) => setFilter("dateRange", e.target.value)}
          className={selectClasses}
        >
          <option value="all">All Time</option>
          <option value="this-month">This Month</option>
          <option value="last-month">Last Month</option>
          <option value="last-3-months">Last 3 Months</option>
        </select>
      </div>
    </div>
  );
}
