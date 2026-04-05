import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { mockTransactions } from '../data/mockData';
import {
  isThisMonth,
  subMonths,
  isWithinInterval,
  startOfMonth,
  endOfMonth,
  parseISO,
} from 'date-fns';

/**
 * @typedef {'viewer' | 'admin'} Role
 * @typedef {'all' | 'income' | 'expense'} TypeFilter
 * @typedef {'all' | 'this-month' | 'last-month' | 'last-3-months'} DateRange
 */

const useFinanceStore = create(
  persist(
    (set, get) => ({
      transactions: mockTransactions,
      role: 'viewer',
      theme: 'dark',
      currency: 'INR',
      sidebarCollapsed: false,
      filters: {
        search: '',
        type: 'all',
        category: 'all',
        dateRange: 'all',
      },

      /** @param {Role} role */
      setRole: (role) => {
        console.group('%c[FinTrack] Role Change', 'color: #6C63FF; font-weight: bold');
        console.log('New role:', role);
        console.groupEnd();
        set({ role });
      },

      /** @param {'dark' | 'light'} theme */
      setTheme: (theme) => {
        console.group('%c[FinTrack] Theme Change', 'color: #6C63FF; font-weight: bold');
        console.log('New theme:', theme);
        console.groupEnd();
        if (theme === 'dark') {
          document.documentElement.classList.add('dark');
          document.documentElement.classList.remove('light');
        } else {
          document.documentElement.classList.remove('dark');
          document.documentElement.classList.add('light');
        }
        set({ theme });
      },

      /** @param {'INR' | 'USD'} currency */
      setCurrency: (currency) => {
        console.group('%c[FinTrack] Currency Change', 'color: #6C63FF; font-weight: bold');
        console.log('New currency:', currency);
        console.groupEnd();
        set({ currency });
      },

      /**
       * Toggle sidebar collapsed state.
       */
      toggleSidebar: () => {
        set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed }));
      },

      /** @param {boolean} collapsed */
      setSidebarCollapsed: (collapsed) => {
        set({ sidebarCollapsed: collapsed });
      },

      /**
       * @param {string} key
       * @param {string} value
       */
      setFilter: (key, value) => {
        console.group('%c[FinTrack] Filter Change', 'color: #F59E0B; font-weight: bold');
        console.log(`${key}:`, value);
        console.groupEnd();
        set((state) => ({
          filters: { ...state.filters, [key]: value },
        }));
      },

      clearFilters: () => {
        set({
          filters: {
            search: '',
            type: 'all',
            category: 'all',
            dateRange: 'all',
          },
        });
      },

      /** @param {Object} tx */
      addTransaction: (tx) => {
        const newTx = {
          ...tx,
          id: `tx_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        };
        console.group('%c[FinTrack] Transaction Added', 'color: #22C55E; font-weight: bold');
        console.log('Transaction:', newTx);
        console.groupEnd();
        set((state) => ({
          transactions: [newTx, ...state.transactions],
        }));
        return newTx;
      },

      /**
       * @param {string} id
       * @param {Object} updates
       */
      editTransaction: (id, updates) => {
        console.group('%c[FinTrack] Transaction Edited', 'color: #F59E0B; font-weight: bold');
        console.log('ID:', id, 'Updates:', updates);
        console.groupEnd();
        set((state) => ({
          transactions: state.transactions.map((tx) =>
            tx.id === id ? { ...tx, ...updates } : tx
          ),
        }));
      },

      /** @param {string} id */
      deleteTransaction: (id) => {
        console.group('%c[FinTrack] Transaction Deleted', 'color: #EF4444; font-weight: bold');
        console.log('ID:', id);
        console.groupEnd();
        set((state) => ({
          transactions: state.transactions.filter((tx) => tx.id !== id),
        }));
      },

      /** @returns {Array} filtered transactions */
      getFilteredTransactions: () => {
        const { transactions, filters } = get();
        const now = new Date();

        return transactions.filter((tx) => {
          // Search filter
          if (
            filters.search &&
            !tx.description.toLowerCase().includes(filters.search.toLowerCase())
          ) {
            return false;
          }

          // Type filter
          if (filters.type !== 'all' && tx.type !== filters.type) {
            return false;
          }

          // Category filter
          if (filters.category !== 'all' && tx.category !== filters.category) {
            return false;
          }

          // Date range filter
          if (filters.dateRange !== 'all') {
            const txDate = parseISO(tx.date);
            switch (filters.dateRange) {
              case 'this-month':
                if (!isThisMonth(txDate)) return false;
                break;
              case 'last-month': {
                const lastMonth = subMonths(now, 1);
                if (
                  !isWithinInterval(txDate, {
                    start: startOfMonth(lastMonth),
                    end: endOfMonth(lastMonth),
                  })
                )
                  return false;
                break;
              }
              case 'last-3-months': {
                const threeMonthsAgo = subMonths(now, 3);
                if (
                  !isWithinInterval(txDate, {
                    start: startOfMonth(threeMonthsAgo),
                    end: now,
                  })
                )
                  return false;
                break;
              }
            }
          }

          return true;
        }).sort((a, b) => new Date(b.date) - new Date(a.date));
      },
    }),
    {
      name: 'fintrack-storage',
      partialize: (state) => ({
        transactions: state.transactions,
        role: state.role,
        theme: state.theme,
        currency: state.currency,
        sidebarCollapsed: state.sidebarCollapsed,
      }),
    }
  )
);

export default useFinanceStore;
