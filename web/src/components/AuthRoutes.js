import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Dashboard from "../pages/Dashboard";

const AuthRoutes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Dashboard />
        </Route>
      </Switch>
    </Router>
  );
};

export default AuthRoutes;
