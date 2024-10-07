import { FC } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "../hooks/reduxHook";
import Loader from "../components/loader/Loader";

interface IPrivateRoutesProps {
  allowedRoles: string[];
}

const PrivateRoutes: FC<IPrivateRoutesProps> = ({ allowedRoles }) => {
  const location = useLocation();
  const token = localStorage.getItem("accessToken");
  const user = useAppSelector((state) => state.auth.user);

  return (
    <>
      {token && user.roles.length === 0 
      ? <Loader />
      : (token && user) &&
        user.roles.find((role) => allowedRoles?.includes(role)) 
        ? <Outlet />
        : <Navigate to="/" state={{ from: location }} replace />
      }
    </>
  );
};

export default PrivateRoutes;
