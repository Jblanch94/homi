import UnAuthRoutes from "./UnAuthRoutes";
import AuthRoutes from "./AuthRoutes";

const Routes = ({ isAuthenticated }) => {
  return <>{isAuthenticated ? <AuthRoutes /> : <UnAuthRoutes />}</>;
};

export default Routes;
