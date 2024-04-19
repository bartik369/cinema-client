import React, { FC, useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { IUser } from '../types/auth';

interface IPrivateRoutesProps {
  allowedRoles: string[];
  user: IUser;
  authToken: string;
}

const PrivateRoutes: FC<IPrivateRoutesProps> = ({ 
  allowedRoles, 
  user,
  authToken }) => {
  const location = useLocation();

  return (
    <div>
      {(authToken && (user.roles || []).find((role) => allowedRoles?.includes(role)))
      ? <Outlet />
      : <Navigate to="/"  state={{from: location}} replace/>
      }
    </div>
  );
};

export default PrivateRoutes;
