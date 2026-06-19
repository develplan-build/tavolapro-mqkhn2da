import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center h-full w-full p-8 text-center bg-base">
          <div className="w-16 h-16 rounded-full bg-danger-bg flex items-center justify-center text-danger mb-4">
            <AlertTriangle size={32} />
          </div>
          <h2 className="text-2xl font-bold mb-2">Oops! Qualcosa è andato storto.</h2>
          <p className="text-secondary mb-6 max-w-md">
            Si è verificato un errore imprevisto in questa sezione dell'applicazione. 
            Il nostro team è stato notificato.
          </p>
          <button 
            className="btn btn-primary"
            onClick={() => window.location.reload()}
          >
            <RefreshCw size={18} />
            Ricarica l'applicazione
          </button>
          {process.env.NODE_ENV === 'development' && this.state.error && (
            <div className="mt-8 p-4 bg-surface border border-border-color rounded-lg text-left w-full max-w-2xl overflow-auto">
              <p className="text-danger font-mono text-sm">{this.state.error.toString()}</p>
            </div>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;