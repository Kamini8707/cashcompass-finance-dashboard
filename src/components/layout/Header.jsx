import { useLocation } from 'react-router-dom';
import { Sun, Moon, CalendarDays, IndianRupee, DollarSign } from 'lucide-react';
import { format } from 'date-fns';
import useFinanceStore from '../../store/useFinanceStore';
import Badge from '../ui/Badge';

const pageTitles = {
  '/': 'Dashboard',
  '/transactions': 'Transactions',
  '/insights': 'Insights',
};

/**
 * Header component with page title, role badge, theme toggle, and date display.
 * Fully responsive for all device sizes.
 */
export default function Header() {
  const location = useLocation();
  const { role, theme, setTheme, currency, setCurrency } = useFinanceStore();
  const currentTitle = pageTitles[location.pathname] || 'Dashboard';

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const toggleCurrency = () => {
    setCurrency(currency === 'INR' ? 'USD' : 'INR');
  };

  return (
    <header className="sticky top-0 z-30 h-14 sm:h-16 flex items-center justify-between px-3 sm:px-4 md:px-6 border-b
      dark:bg-dark-surface/80 dark:border-dark-border
      bg-light-surface/80 border-light-border
      backdrop-blur-xl">
      {/* Left: Page Title */}
      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
        <h1 className="font-heading text-base sm:text-xl font-bold dark:text-text-primary text-slate-800 truncate">
          {currentTitle}
        </h1>
        <Badge variant={role === 'admin' ? 'purple' : 'default'} className="hidden xs:inline-flex sm:inline-flex">
          {role === 'admin' ? '👑 Admin' : '👁️ Viewer'}
        </Badge>
      </div>

      {/* Right: Controls */}
      <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
        {/* Date — hidden on small mobile */}
        <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg dark:text-text-secondary text-slate-500 text-sm">
          <CalendarDays size={14} />
          <span>{format(new Date(), 'dd MMM yyyy')}</span>
        </div>

        {/* Currency Toggle */}
        <button
          id="currency-toggle"
          onClick={toggleCurrency}
          className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-xl transition-all
            dark:text-text-secondary dark:hover:text-text-primary dark:hover:bg-dark-hover
            text-slate-500 hover:text-slate-800 hover:bg-slate-100
            active:scale-95"
          title={`Switch to ${currency === 'INR' ? 'USD' : 'INR'}`}
        >
          {currency === 'INR' ? <IndianRupee size={15} /> : <DollarSign size={15} />}
        </button>

        {/* Theme Toggle */}
        <button
          id="theme-toggle"
          onClick={toggleTheme}
          className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-xl transition-all
            dark:text-text-secondary dark:hover:text-text-primary dark:hover:bg-dark-hover
            text-slate-500 hover:text-slate-800 hover:bg-slate-100
            active:scale-95"
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
        </button>
      </div>
    </header>
  );
}
