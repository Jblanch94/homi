import { FC, lazy } from 'react'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'

const SignUp = lazy(() => import('../pages/SignUp'))
const Home = lazy(() => import('../pages/Home'))
const Login = lazy(() => import('../pages/Login'))

const UnAuthRoutes: FC<{}> = () => {
  return (
    <Router>
      <Switch>
        <Route path='/' exact>
          <Home />
        </Route>
        <Route
          path='/sign-up'
          exact
          render={(routeProps) => <SignUp {...routeProps} />}
        />
        <Route
          path='/login'
          exact
          render={(routeProps) => <Login {...routeProps} />}></Route>
      </Switch>
    </Router>
  )
}

export default UnAuthRoutes
