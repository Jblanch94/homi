import { useEffect, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import Routes from "../components/Routes";

const RoutesContainer = () => {
  const { retriveDataFromLocalStorage } = useLocalStorage();
  const [isAuthenticated, setIsAuthenticated] = useState(
    retriveDataFromLocalStorage("auth")?.isAuthenticated
  );

  useEffect(() => {
    const auth = retriveDataFromLocalStorage("auth");
    setIsAuthenticated(auth?.isAuthenticated);
  }, [isAuthenticated, retriveDataFromLocalStorage]);

  return <Routes isAuthenticated={isAuthenticated} />;
};

export default RoutesContainer;
