const variants = {
  default: "bg-slate-500/10 text-slate-400",
  success: "bg-emerald-500/10 text-emerald-400",
  danger: "bg-red-500/10 text-red-400",
  warning: "bg-amber-500/10 text-amber-400",
  purple: "bg-purple-500/10 text-purple-400",
  blue: "bg-blue-500/10 text-blue-400",
  pink: "bg-pink-500/10 text-pink-400",
  teal: "bg-teal-500/10 text-teal-400",
  orange: "bg-orange-500/10 text-orange-400",
  cyan: "bg-cyan-500/10 text-cyan-400",
};

export default function Badge({
  children,
  variant = "default",
  className = "",
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 hover:scale-105 ${
        variants[variant] || variants.default
      } ${className}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-80"></span>
      {children}
    </span>
  );
}
