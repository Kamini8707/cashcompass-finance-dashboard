import { useState, useEffect, useCallback } from 'react';

/**
 * Toast notification component with auto-dismiss and stacking.
 * @param {{ toasts: Array, removeToast: Function }} props
 */

let toastId = 0;

/**
 * Custom hook for managing toast notifications
 * @returns {{ toasts: Array, addToast: Function, removeToast: Function }}
 */
export function useToast() {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'success') => {
    const id = ++toastId;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return { toasts, addToast, removeToast };
}

export default function ToastContainer({ toasts, removeToast }) {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 pointer-events-none">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onDismiss={() => removeToast(toast.id)} />
      ))}
    </div>
  );
}

function ToastItem({ toast, onDismiss }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setIsVisible(true));
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onDismiss, 300);
    }, 2700);
    return () => clearTimeout(timer);
  }, [onDismiss]);

  const bgColor =
    toast.type === 'success'
      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
      : toast.type === 'error'
      ? 'bg-red-500/10 border-red-500/30 text-red-400'
      : 'bg-amber-500/10 border-amber-500/30 text-amber-400';

  const iconMap = {
    success: '✓',
    error: '✕',
    warning: '⚠',
  };

  return (
    <div
      className={`pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl border backdrop-blur-xl shadow-2xl transition-all duration-300 min-w-[300px] ${bgColor} ${
        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
      }`}
    >
      <span className="text-lg font-bold">{iconMap[toast.type] || '✓'}</span>
      <span className="text-sm font-medium">{toast.message}</span>
      <button
        onClick={onDismiss}
        className="ml-auto text-current opacity-50 hover:opacity-100 transition-opacity"
      >
        ✕
      </button>
    </div>
  );
}
