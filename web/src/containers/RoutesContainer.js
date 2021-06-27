import { useEffect, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import Routes from "../components/Routes";

const RoutesContainer = () => {
  const { retriveDataFromLocalStorage } = useLocalStorage();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const setAuthenticationStatus = () => {
      const auth = retriveDataFromLocalStorage("auth");
      if (auth && auth.isAuthenticated) {
        setIsAuthenticated(auth.isAuthenticated);
      }
    };

    setAuthenticationStatus();
  }, [retriveDataFromLocalStorage, isAuthenticated]);

  return <Routes isAuthenticated={isAuthenticated} />;
};

export default RoutesContainer;
