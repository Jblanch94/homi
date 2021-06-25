import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import SignUp from "../containers/SignUpContainer";
import Home from "../pages/Home";
import Login from "../pages/Login";

const UnAuthRoutes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/sign-up" exact>
          <SignUp />
        </Route>
        <Route path="/login" exact>
          <Login />
        </Route>
      </Switch>
    </Router>
  );
};

export default UnAuthRoutes;
