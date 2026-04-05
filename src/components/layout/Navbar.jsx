import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, ArrowLeftRight, Lightbulb } from "lucide-react";
import useFinanceStore from "../../store/useFinanceStore";

export default function Navbar() {
  const location = useLocation();
  const role = useFinanceStore((s) => s.role);
  const setRole = useFinanceStore((s) => s.setRole);

  const navItems = [
    { name: "Dashboard", path: "/", icon: LayoutDashboard },
    { name: "Transactions", path: "/transactions", icon: ArrowLeftRight },
    { name: "Insights", path: "/insights", icon: Lightbulb },
  ];

  return (
    <div className="w-full h-16 bg-dark-surface border-b border-dark-border flex items-center justify-between px-6 sticky top-0 z-50">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <img src="/logo.png" className="w-10 h-10" />
        <span className="font-heading text-lg font-bold text-white">
          CashCompass
        </span>
      </div>

      {/* Nav Links */}
      <div className="flex items-center gap-6">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg transition ${
              location.pathname === item.path
                ? "bg-blue-500/10 text-blue-400"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <item.icon size={18} />
            {item.name}
          </Link>
        ))}
      </div>

      {/* Role Switch */}
      <div>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="bg-dark-bg border border-dark-border px-3 py-1 rounded-lg text-white"
        >
          <option value="admin">Admin</option>
          <option value="viewer">Viewer</option>
        </select>
      </div>
    </div>
  );
}
