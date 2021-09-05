import { FC, lazy } from 'react'
import {
  Switch,
  Route,
  BrowserRouter as Router,
  Redirect,
} from 'react-router-dom'
import { useMediaQuery, useTheme } from '@material-ui/core'

const Family = lazy(() => import('../pages/Family'))
const Calendar = lazy(() => import('../pages/Calendar'))
const AddEvent = lazy(() => import('../pages/AddEvent'))
const Events = lazy(() => import('../pages/Events'))
const Tasks = lazy(() => import('../pages/Tasks'))
const AddTask = lazy(() => import('../pages/AddTask'))
const Groceries = lazy(() => import('../pages/Groceries'))
const Recipes = lazy(() => import('../pages/Recipes'))
const BottomNavbar = lazy(() => import('./BottomNavbar/BottomNavbar'))
const Sidebar = lazy(() => import('./Sidebar/Sidebar'))
const UserAccountCreation = lazy(() => import('../pages/UserAccountCreation'))
const AddGroceryItem = lazy(() => import('../pages/AddGroceryItem'))
const AddRecipe = lazy(() => import('../pages/AddRecipe'))
const RecipeItemDetails = lazy(() => import('../pages/RecipeItemDetails'))

const AuthRoutes: FC<{}> = () => {
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('md'))

  return (
    <Router>
      <header>{matches ? <Sidebar /> : <BottomNavbar />}</header>
      <Switch>
        <Route exact path='/family'>
          <Family />
        </Route>
        <Route exact path='/calendar'>
          <Calendar />
        </Route>
        <Route exact path='/tasks'>
          <Tasks />
        </Route>
        <Route exact path='/add-task'>
          <AddTask />
        </Route>
        <Route exact path='/groceries'>
          <Groceries />
        </Route>
        <Route exact path='/recipes'>
          <Recipes />
        </Route>
        <Route exact path='/family/create-user-account'>
          <UserAccountCreation />
        </Route>
        <Route exact path='/add-grocery'>
          <AddGroceryItem />
        </Route>
        <Route exact path='/add-recipe'>
          <AddRecipe />
        </Route>
        <Route exact path='/recipe/:recipe'>
          <RecipeItemDetails />
        </Route>
        <Route exact path='/add-event'>
          <AddEvent />
        </Route>
        <Route exact path='/event-day'>
          <Events />
        </Route>
        <Route exact path='/' render={() => <Redirect to='/family' />} />
      </Switch>
    </Router>
  )
}

export default AuthRoutes
