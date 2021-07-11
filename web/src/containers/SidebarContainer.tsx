import { FC } from "react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  CalendarToday,
  Check,
  LocalGroceryStore,
  Restaurant,
  People,
} from "@material-ui/icons";

import Sidebar from "../components/Sidebar/Sidebar";

const SidebarContainer: FC<{}> = () => {
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState<string | null>(
    location.pathname
  );

  useEffect(() => {
    setCurrentPage(location.pathname);
  }, [location, location.pathname]);

  const sidebarLinks = [
    { text: "Family", icon: <People />, to: "/family" },
    { text: "Calendar", icon: <CalendarToday />, to: "/calendar" },
    { text: "Tasks", icon: <Check />, to: "/tasks" },
    { text: "Groceries", icon: <LocalGroceryStore />, to: "/groceries" },
    { text: "Recipes", icon: <Restaurant />, to: "/recipes" },
  ];

  const props = { currentPage, sidebarLinks };
  return <Sidebar {...props} />;
};

export default SidebarContainer;
