import { FC } from 'react'

import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import Dashboard from '../pages/Dashboard'
import Family from '../pages/Family'
import Calendar from '../pages/Calendar'
import AddEvent from '../pages/AddEvent'
import Events from '../pages/Events'
import Tasks from '../pages/Tasks'
import AddTask from '../pages/AddTask'
import Groceries from '../pages/Groceries'
import Recipes from '../pages/Recipes'
import BottomNavbar from './BottomNavbar/BottomNavbar'
import Sidebar from './Sidebar/Sidebar'
import UserAccountCreation from '../pages/UserAccountCreation'
import AddGroceryItem from '../pages/AddGroceryItem'
import AddRecipe from '../pages/AddRecipe'
import RecipeItemDetails from '../pages/RecipeItemDetails'
import { useMediaQuery, useTheme } from '@material-ui/core'

const AuthRoutes: FC<{}> = () => {
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('md'))
  return (
    <Router>
      <header>{matches ? <Sidebar /> : <BottomNavbar />}</header>
      <Switch>
        <Route path='/' exact>
          <Dashboard />
        </Route>
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
      </Switch>
    </Router>
  )
}

export default AuthRoutes
