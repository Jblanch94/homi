import {
  BottomNavigation,
  BottomNavigationAction,
  CssBaseline,
} from "@material-ui/core";
import {
  CalendarToday,
  Check,
  LocalGroceryStore,
  Restaurant,
  People,
} from "@material-ui/icons";
import { Link } from "react-router-dom";

const BottomNavbar = ({ value, classes, onHandleChange }) => {
  return (
    <>
      <CssBaseline />
      <BottomNavigation
        value={value}
        showLabels
        className={classes.root}
        onChange={onHandleChange}>
        <BottomNavigationAction
          compnent={Link}
          to="/family"
          label="Family"
          value="family"
          icon={<People />}
        />

        <BottomNavigationAction
          label="Calendar"
          value="calendar"
          icon={<CalendarToday />}
          component={Link}
          to="/calendar"
        />
        <BottomNavigationAction label="Tasks" value="tasks" icon={<Check />} />
        <BottomNavigationAction
          label="Groceries"
          icon={<LocalGroceryStore />}
          value="groceries"
          component={Link}
          to="/groceries"
        />
        <BottomNavigationAction
          label="Recipes"
          value="recipes"
          icon={<Restaurant />}
          component={Link}
          to="/recipes"
        />
      </BottomNavigation>
    </>
  );
};

export default BottomNavbar;
