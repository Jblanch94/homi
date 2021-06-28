import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import BottomNavbarContainer from "../containers/BottomNavbarContainer";

const AuthRoutes = () => {
  return (
    <Router>
      <Switch>
        <BottomNavbarContainer />
        <Route path="/" exact>
          <Dashboard />
        </Route>
      </Switch>
    </Router>
  );
};

export default AuthRoutes;
