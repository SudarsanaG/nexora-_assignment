import { createContext, ReactNode, useContext, useMemo, useState } from 'react';

type Toast = { id: number; message: string; type?: 'success' | 'error' };

type ToastContextType = {
  show: (message: string, type?: 'success' | 'error') => void;
};

const ToastContext = createContext<ToastContextType | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const api = useMemo<ToastContextType>(() => ({
    show: (message, type = 'success') => {
      const id = Date.now();
      setToasts((prev) => [...prev, { id, message, type }]);
      window.setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 2000);
    },
  }), []);

  return (
    <ToastContext.Provider value={api}>
      {children}
      {/* Toast container */}
      <div className="fixed bottom-4 right-4 z-50 space-y-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={
              'rounded-md px-4 py-2 shadow text-sm text-white ' +
              (t.type === 'error' ? 'bg-red-600' : 'bg-green-600')
            }
          >
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}


