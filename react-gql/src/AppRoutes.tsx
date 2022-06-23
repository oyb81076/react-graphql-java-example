import React from 'react';
import { Navigate, Route, Routes } from 'react-router';

import App from './App';
import HomeIndex from './views/home/HomeIndex';
import Login from './views/login/Login';
import UserIndex from './views/user/UserIndex';

export default function AppRoutes(): React.ReactElement | null {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<App />}>
        <Route index element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<HomeIndex />} />
        <Route path="/user" element={<UserIndex />} />
      </Route>
    </Routes>
  );
}
