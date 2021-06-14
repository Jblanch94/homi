import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import Home from "../pages/Home";
import SignUpContainer from "../containers/SignUpContainer";
import Authenticated from "../components/Authenticated";
import { useSelector } from "react-redux";

const Routes = () => {
  const auth = useSelector((state) => state.auth);
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/sign-up" exact>
          <SignUpContainer />
        </Route>
        <Route
          path="/authenticated"
          exact
          render={(routeProps) =>
            auth.isAuthenticated ? (
              <Authenticated {...routeProps} />
            ) : (
              <Redirect to="/" />
            )
          }
        />
      </Switch>
    </Router>
  );
};

export default Routes;
