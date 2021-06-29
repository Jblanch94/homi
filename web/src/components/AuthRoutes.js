import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import BottomNavbarContainer from "../containers/BottomNavbarContainer";
import SidebarContainer from "../containers/SidebarContainer";
import { useMediaQuery, useTheme } from "@material-ui/core";

const AuthRoutes = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  return (
    <Router>
      <Switch>
        {matches ? <SidebarContainer /> : <BottomNavbarContainer />}

        <Route path="/" exact>
          <Dashboard />
        </Route>
      </Switch>
    </Router>
  );
};

export default AuthRoutes;
