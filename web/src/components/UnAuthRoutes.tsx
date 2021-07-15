import { FC } from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import SignUp from "../containers/SignUpContainer";
import Home from "../pages/Home";
import Login from "../pages/Login";

const UnAuthRoutes: FC<{}> = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route
          path="/sign-up"
          exact
          render={(routeProps) => <SignUp {...routeProps} />}
        />
        <Route
          path="/login"
          exact
          render={(routeProps) => <Login {...routeProps} />}></Route>
      </Switch>
    </Router>
  );
};

export default UnAuthRoutes;
