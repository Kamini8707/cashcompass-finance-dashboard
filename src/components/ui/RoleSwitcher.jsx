import useFinanceStore from '../../store/useFinanceStore';
import { Shield, Eye } from 'lucide-react';

/**
 * Role Switcher component for toggling between Admin and Viewer roles.
 * Placed in the sidebar.
 */
export default function RoleSwitcher() {
  const { role, setRole } = useFinanceStore();

  return (
    <div className="px-3">
      <label className="text-[10px] uppercase tracking-widest dark:text-text-secondary text-slate-500 font-semibold mb-2 block px-1">
        Role
      </label>
      <div className="relative">
        <select
          id="role-switcher"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full appearance-none rounded-xl px-3 py-2.5 pr-8 text-sm font-medium
            dark:bg-dark-bg dark:border-dark-border dark:text-text-primary
            bg-slate-100 border-slate-200 text-slate-800
            border transition-all focus:outline-none focus:ring-2 focus:ring-accent-primary/40
            cursor-pointer"
        >
          <option value="admin">👑 Admin</option>
          <option value="viewer">👁️ Viewer</option>
        </select>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
          {role === 'admin' ? (
            <Shield size={14} className="text-accent-primary" />
          ) : (
            <Eye size={14} className="dark:text-text-secondary text-slate-400" />
          )}
        </div>
      </div>
    </div>
  );
}
