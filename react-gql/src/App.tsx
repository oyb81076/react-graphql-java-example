import React, { Suspense } from 'react';
import { Outlet } from 'react-router';
import { NavLink } from 'react-router-dom';
import styled from '@emotion/styled';

import ErrorBoundary from './components/ErrorBoundary';
import Loading from './components/Loading/Loading';

function App() {
  return (
    <div>
      <Header>
        <NavLink to="/home">home</NavLink>
        <NavLink to="/user">user</NavLink>
        <NavLink to="/product">product</NavLink>
      </Header>
      <main>
        <Suspense fallback={<Loading />}>
          <ErrorBoundary retry>
            <Outlet />
          </ErrorBoundary>
        </Suspense>
      </main>
    </div>
  );
}
const Header = styled.header`
  a + a {
    margin-left: 20px;
  }
`;

export default App;
