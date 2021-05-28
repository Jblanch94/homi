import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from '../pages/Home';

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
};

export default Routes;