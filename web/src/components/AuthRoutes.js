import { Switch, Route, BrowserRouter as Router } from "react-router-dom";

const AuthRoutes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <div>Authenticated</div>
        </Route>
      </Switch>
    </Router>
  );
};

export default AuthRoutes;
