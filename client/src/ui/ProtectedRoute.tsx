import type { ReactNode } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import Spinner from './Spinner';
import { useUser } from '../features/authentication/useUser';

type Props = {
  children?: ReactNode;
};

const ProtectedRoute = ({ children }: Props) => {
  const { isPending, user } = useUser();

  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-base">
        <Spinner />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      {children}
      <Outlet />
    </>
  );
};

export default ProtectedRoute;
