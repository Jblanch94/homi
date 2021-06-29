import { BottomNavigation, CssBaseline } from "@material-ui/core";
import {
  CalendarToday,
  Check,
  LocalGroceryStore,
  Restaurant,
  People,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import BottomNavbarAction from "../BottomNavbarAction";

const BottomNavbar = ({ value, classes, onHandleChange }) => {
  return (
    <>
      <CssBaseline />
      <BottomNavigation
        value={value}
        showLabels
        className={classes.root}
        onChange={onHandleChange}>
        <BottomNavbarAction
          component={Link}
          to="/family"
          label="Family"
          value="family"
          icon={<People />}
        />

        <BottomNavbarAction
          label="Calendar"
          value="calendar"
          icon={<CalendarToday />}
          component={Link}
          to="/calendar"
        />
        <BottomNavbarAction label="Tasks" value="tasks" icon={<Check />} />
        <BottomNavbarAction
          label="Groceries"
          icon={<LocalGroceryStore />}
          value="groceries"
          component={Link}
          to="/groceries"
        />
        <BottomNavbarAction
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
