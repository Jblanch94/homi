import { FC, useEffect, useState } from "react";

import useLocalStorage from "../hooks/useLocalStorage";
import UnAuthRoutes from "./UnAuthRoutes";
import AuthRoutes from "./AuthRoutes";

const Routes: FC<{}> = () => {
  const { retriveDataFromLocalStorage } = useLocalStorage();
  const [isAuthenticated, setIsAuthenticated] = useState(
    retriveDataFromLocalStorage("auth")?.isAuthenticated
  );

  useEffect(() => {
    const setAuthenticationStatus = () => {
      const auth = retriveDataFromLocalStorage("auth");
      if (auth && auth.isAuthenticated) {
        setIsAuthenticated(auth.isAuthenticated);
      }
    };

    setAuthenticationStatus();

    window.addEventListener("storage", setAuthenticationStatus);

    return () => window.removeEventListener("storage", setAuthenticationStatus);
  }, [retriveDataFromLocalStorage, isAuthenticated]);

  return <>{isAuthenticated ? <AuthRoutes /> : <UnAuthRoutes />}</>;
};

export default Routes;
