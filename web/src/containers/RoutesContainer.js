import { useEffect, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import Routes from "../components/Routes";

const RoutesContainer = () => {
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

  return <Routes isAuthenticated={isAuthenticated} />;
};

export default RoutesContainer;
