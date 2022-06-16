import React from 'react';

interface Props {
  children?: React.ReactNode;
}
export default function Loading({ children }: Props): React.ReactElement | null {
  return <>{children || 'Loading...'}</>;
}
