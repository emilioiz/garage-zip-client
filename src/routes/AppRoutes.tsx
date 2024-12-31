// src/routes/AppRoutes.tsx
import { FC, useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';

import Layout from '../layouts/Layout';
import { useUser } from '../context/UserContext';
import Loading from '../components/Loading';

import SignIn from '../pages/SignIn';
import Dashboard from '../pages/Dashboard';
import Users from '../pages/Users';
import User from '../pages/User';
import Accounts from '../pages/Accounts';
import Account from '../pages/Account';
import NotFound from '../pages/NotFound';

const ProtectedLayout: React.FC = () => {
  const { user } = useUser();

  if (!user) {
    return <Navigate to='/sign-in' />;
  }

  return <Outlet />;
};

const AppRoutes: FC = () => {
  const { user, loading } = useUser();
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  if (loading || showLoading) {
    return <Loading />;
  }

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route element={<ProtectedLayout />}>
            <Route path='/' element={<Dashboard />} />
            <Route path='/users' element={<Users />} />
            <Route path='/users/:id' element={<User />} />
            <Route path='/accounts' element={<Accounts />} />
            <Route path='/accounts/:id' element={<Account />} />
          </Route>
          <Route path='/sign-in' element={user ? <Navigate to='/' /> : <SignIn />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default AppRoutes;
