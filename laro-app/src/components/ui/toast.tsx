'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
  id: string;
  type: ToastType;
  title: string;
  description?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface ToastContextType {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
  clearAll: () => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast = { ...toast, id };
    
    setToasts(prev => [...prev, newToast]);

    // Auto remove after duration
    const duration = toast.duration ?? 5000;
    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const clearAll = useCallback(() => {
    setToasts([]);
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast, clearAll }}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
}

function ToastContainer() {
  const { toasts } = useToast();

  return (
    <div className="fixed top-4 right-4 z-[100] space-y-2 max-w-sm w-full">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} />
        ))}
      </AnimatePresence>
    </div>
  );
}

function ToastItem({ toast }: { toast: Toast }) {
  const { removeToast } = useToast();

  const icons = {
    success: CheckCircle,
    error: AlertCircle,
    warning: AlertTriangle,
    info: Info,
  };

  const colors = {
    success: {
      bg: 'from-green-500/20 to-green-600/20',
      border: 'border-green-500/30',
      icon: 'text-green-400',
      text: 'text-green-100'
    },
    error: {
      bg: 'from-red-500/20 to-red-600/20',
      border: 'border-red-500/30',
      icon: 'text-red-400',
      text: 'text-red-100'
    },
    warning: {
      bg: 'from-yellow-500/20 to-yellow-600/20',
      border: 'border-yellow-500/30',
      icon: 'text-yellow-400',
      text: 'text-yellow-100'
    },
    info: {
      bg: 'from-blue-500/20 to-blue-600/20',
      border: 'border-blue-500/30',
      icon: 'text-blue-400',
      text: 'text-blue-100'
    }
  };

  const Icon = icons[toast.type];
  const colorScheme = colors[toast.type];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 300, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 300, scale: 0.9 }}
      transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 30 }}
      className={cn(
        'bg-gradient-to-r backdrop-blur-sm rounded-xl p-4 border shadow-lg',
        colorScheme.bg,
        colorScheme.border
      )}
      role="alert"
      aria-live="polite"
    >
      <div className="flex items-start space-x-3">
        {/* Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 500 }}
        >
          <Icon className={cn('w-5 h-5 mt-0.5', colorScheme.icon)} />
        </motion.div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h4 className={cn('font-semibold text-sm', colorScheme.text)}>
            {toast.title}
          </h4>
          {toast.description && (
            <p className="text-sm text-primary-300 mt-1">
              {toast.description}
            </p>
          )}
          
          {/* Action button */}
          {toast.action && (
            <motion.button
              className={cn(
                'mt-2 text-xs font-medium underline hover:no-underline transition-all',
                colorScheme.text
              )}
              onClick={toast.action.onClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {toast.action.label}
            </motion.button>
          )}
        </div>

        {/* Close button */}
        <motion.button
          className="text-primary-400 hover:text-primary-200 transition-colors p-1 rounded-md hover:bg-white/10"
          onClick={() => removeToast(toast.id)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Close notification"
        >
          <X className="w-4 h-4" />
        </motion.button>
      </div>

      {/* Progress bar for timed toasts */}
      {toast.duration && toast.duration > 0 && (
        <motion.div
          className="absolute bottom-0 left-0 h-1 bg-current opacity-30 rounded-b-xl"
          initial={{ width: '100%' }}
          animate={{ width: '0%' }}
          transition={{ duration: toast.duration / 1000, ease: "linear" }}
        />
      )}
    </motion.div>
  );
}

// Convenience functions for different toast types
export function useToastHelpers() {
  const { addToast } = useToast();

  return {
    success: (title: string, description?: string, options?: Partial<Toast>) =>
      addToast({ type: 'success', title, description, ...options }),
    
    error: (title: string, description?: string, options?: Partial<Toast>) =>
      addToast({ type: 'error', title, description, ...options }),
    
    warning: (title: string, description?: string, options?: Partial<Toast>) =>
      addToast({ type: 'warning', title, description, ...options }),
    
    info: (title: string, description?: string, options?: Partial<Toast>) =>
      addToast({ type: 'info', title, description, ...options }),

    // Basketball-themed toasts
    gameCreated: (gameName: string) =>
      addToast({
        type: 'success',
        title: 'Game Created! 🏀',
        description: `${gameName} is ready for players to join.`,
        action: {
          label: 'View Game',
          onClick: () => console.log('Navigate to game')
        }
      }),

    teamJoined: (teamName: string) =>
      addToast({
        type: 'success',
        title: 'Welcome to the team! 👥',
        description: `You've successfully joined ${teamName}.`
      }),

    courtAdded: (courtName: string) =>
      addToast({
        type: 'success',
        title: 'Court Added! 🏟️',
        description: `${courtName} has been added to the community.`
      }),

    achievementUnlocked: (achievement: string) =>
      addToast({
        type: 'success',
        title: 'Achievement Unlocked! 🏆',
        description: achievement,
        duration: 7000
      })
  };
}
