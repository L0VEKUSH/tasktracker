import { Component } from 'react';
import { FiAlertTriangle } from 'react-icons/fi';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught an error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-gray-50 dark:bg-surface-dark p-6 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-rose-100 dark:bg-rose-500/10">
            <FiAlertTriangle size={28} className="text-rose-500" />
          </div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            Something went wrong
          </h1>
          <p className="max-w-md text-sm text-gray-500">
            An unexpected error occurred while rendering the app. Try refreshing the page.
          </p>
          <button onClick={() => window.location.reload()} className="btn-primary">
            Refresh Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
