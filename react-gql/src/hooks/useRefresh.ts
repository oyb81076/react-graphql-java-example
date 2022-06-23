import React from 'react';
import { FetchPolicy } from 'relay-runtime';

import { useBoundary } from './useErrorBoundary';

interface Options {
  fetchKey?: number;
  policy?: FetchPolicy;
}
export default function useRefresh(): [options: Options, refresh: () => void] {
  const boundary = useBoundary();
  const [options, setOptions] = React.useState<Options>({});
  const refresh = React.useCallback(() => {
    setOptions((prev) => ({
      fetchKey: (prev?.fetchKey || 0) + 1,
      policy: 'network-only',
    }));
  }, []);
  return [boundary ? { fetchKey: boundary } : options, refresh];
}
