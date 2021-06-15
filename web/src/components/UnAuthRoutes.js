import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import SignUp from "../containers/SignUpContainer";
import Home from "../pages/Home";

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
      </Switch>
    </Router>
  );
};

export default UnAuthRoutes;
