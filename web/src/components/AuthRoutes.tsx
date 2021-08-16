import { FC } from "react";

import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import FamilyContainer from "../containers/FamilyContainer";
import Calendar from "../pages/Calendar";
import Tasks from "../pages/Tasks";
import Groceries from "../pages/Groceries";
import Recipes from "../pages/Recipes";
import BottomNavbarContainer from "../containers/BottomNavbarContainer";
import SidebarContainer from "../containers/SidebarContainer";
import UserAccountCreation from "../pages/UserAccountCreation";
import AddGroceryItem from "../pages/AddGroceryItem";
import AddRecipe from "../pages/AddRecipe";
import RecipeItemDetails from "../pages/RecipeItemDetails";
import AddEvent from "../pages/AddEvent";
import Events from "../pages/Events";
import { useMediaQuery, useTheme } from "@material-ui/core";

const AuthRoutes: FC<{}> = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  return (
    <Router>
      <header>
        {matches ? <SidebarContainer /> : <BottomNavbarContainer />}
      </header>
      <Switch>
        <Route path="/" exact>
          <Dashboard />
        </Route>
        <Route exact path="/family">
          <FamilyContainer />
        </Route>
        <Route exact path="/calendar">
          <Calendar />
        </Route>
        <Route exact path="/tasks">
          <Tasks />
        </Route>
        <Route exact path="/groceries">
          <Groceries />
        </Route>
        <Route exact path="/recipes">
          <Recipes />
        </Route>
        <Route exact path="/family/create-user-account">
          <UserAccountCreation />
        </Route>
        <Route exact path="/add-grocery">
          <AddGroceryItem />
        </Route>
        <Route exact path="/add-recipe">
          <AddRecipe />
        </Route>
        <Route exact path="/recipe/:recipe">
          <RecipeItemDetails />
        </Route>
        <Route exact path="/add-event">
          <AddEvent />
        </Route>
        <Route exact path="/event-day">
          <Events />
        </Route>
      </Switch>
    </Router>
  );
};

export default AuthRoutes;
