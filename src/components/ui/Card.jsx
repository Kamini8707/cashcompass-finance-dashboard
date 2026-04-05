/**
 * Reusable Card component with dark/light theme support.
 * @param {{ children: React.ReactNode, className?: string, hover?: boolean }} props
 */
export default function Card({ children, className = '', hover = false, ...props }) {
  return (
    <div
      className={`
        rounded-2xl border transition-all duration-200
        dark:bg-dark-surface dark:border-dark-border
        bg-light-surface border-light-border
        ${hover ? 'hover:dark:border-accent-primary/30 hover:border-accent-primary/20 hover:shadow-lg hover:shadow-accent-primary/5 cursor-pointer' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
}
