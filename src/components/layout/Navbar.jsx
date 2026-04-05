import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  ArrowLeftRight,
  Lightbulb,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import useFinanceStore from "../../store/useFinanceStore";

export default function Navbar() {
  const location = useLocation();
  const role = useFinanceStore((s) => s.role);
  const setRole = useFinanceStore((s) => s.setRole);
  const [open, setOpen] = useState(false);

  const navItems = [
    { name: "Overview", path: "/", icon: LayoutDashboard },
    { name: "Records", path: "/transactions", icon: ArrowLeftRight },
    { name: "Analytics", path: "/insights", icon: Lightbulb },
  ];

  return (
    <div className="w-full bg-dark-surface border-b border-dark-border sticky top-0 z-50">
      <div className="flex items-center justify-between px-4 md:px-6 h-16">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img src="/logo.png" className="w-9 h-9" />
          <div className="leading-tight">
            <span className="font-heading text-white font-bold block">
              CashCompass
            </span>
            <span className="text-[10px] text-gray-400">
              Smart Finance Tracker
            </span>
          </div>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
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

          {/* Role Switch */}
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="bg-dark-bg border border-dark-border px-3 py-1 rounded-lg text-white"
          >
            <option value="admin">Admin</option>
            <option value="viewer">Viewer</option>
          </select>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-white" onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden flex flex-col gap-3 px-4 pb-4">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => setOpen(false)}
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

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="bg-dark-bg border border-dark-border px-3 py-2 rounded-lg text-white"
          >
            <option value="admin">Admin</option>
            <option value="viewer">Viewer</option>
          </select>
        </div>
      )}
    </div>
  );
}
