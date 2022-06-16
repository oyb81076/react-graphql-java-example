import React from 'react';

export const BoundaryContext = React.createContext<number>(0);
export const useBoundary = () => React.useContext(BoundaryContext);
