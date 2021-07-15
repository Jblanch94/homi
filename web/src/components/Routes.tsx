import { FC } from "react";
import UnAuthRoutes from "./UnAuthRoutes";
import AuthRoutes from "./AuthRoutes";

interface IRoutesProps {
  isAuthenticated: boolean;
}

const Routes: FC<IRoutesProps> = ({ isAuthenticated }) => {
  return <>{isAuthenticated ? <AuthRoutes /> : <UnAuthRoutes />}</>;
};

export default Routes;
