import React, { useEffect } from 'react';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info';

export interface ToastMessage {
  id: string;
  type: ToastType;
  message: string;
}

interface ToastProps {
  toasts: ToastMessage[];
  removeToast: (id: string) => void;
}

const Toast: React.FC<ToastProps> = ({ toasts, removeToast }) => {
  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onRemove={() => removeToast(toast.id)} />
      ))}
    </div>
  );
};

interface ToastItemProps {
  toast: ToastMessage;
  onRemove: () => void;
}

const ToastItem: React.FC<ToastItemProps> = ({ toast, onRemove }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onRemove();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onRemove]);

  const getIcon = () => {
    switch (toast.type) {
      case 'success': return <CheckCircle className="text-success" size={20} />;
      case 'error': return <AlertCircle className="text-danger" size={20} />;
      case 'info': return <Info className="text-info" size={20} />;
    }
  };

  return (
    <div className={`toast toast-${toast.type}`}>
      {getIcon()}
      <span className="text-sm font-medium flex-1">{toast.message}</span>
      <button onClick={onRemove} className="text-muted hover:text-primary">
        <X size={16} />
      </button>
    </div>
  );
};

export default Toast;