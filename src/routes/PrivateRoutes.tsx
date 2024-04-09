import React, { FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../hooks/reduxHook';

interface IPrivateRoutesProps {
  allowedRoles: string[];
}

const PrivateRoutes: FC<IPrivateRoutesProps> = ({ allowedRoles }) => {
  const user = useAppSelector(state => state.auth.user);
  const token = useAppSelector(state => state.auth.token);

  return (
    <div>
      {token &&
        ((user?.roles || []).find((role) => allowedRoles?.includes(role)) ? (
          <Outlet />
        ) : (
          <Navigate to={'/'} />
        ))}
    </div>
  );
};

export default PrivateRoutes;
