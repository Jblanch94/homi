import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from '../pages/Home';
import SignUp from '../pages/SignUp';

const Routes = () => {
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

export default Routes;
