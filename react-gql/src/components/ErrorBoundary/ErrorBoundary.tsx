import React from 'react';

import { BoundaryContext } from '../../hooks/useErrorBoundary';

interface Props {
  retry?: boolean;
  children?: React.ReactNode;
}
interface State {
  error: Error | null;
  fetchKey: number;
}

export default class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { error: null, fetchKey: 0 };
  }

  static getDerivedStateFromError(error: Error): State {
    return { error, fetchKey: 0 };
  }

  retry = () => {
    this.setState((prev) => ({
      error: null,
      fetchKey: prev.fetchKey + 1,
    }));
  };

  render() {
    const { children, retry } = this.props;
    const { error, fetchKey } = this.state;
    if (!error) {
      return <BoundaryContext.Provider value={fetchKey}>{children}</BoundaryContext.Provider>;
    }
    return (
      <div role="alert">
        <p>Something went wrong:</p>
        <pre style={{ whiteSpace: 'normal' }}>{error.message}</pre>
        {retry && (
          <button type="button" onClick={this.retry}>
            Try again
          </button>
        )}
      </div>
    );
  }
}
