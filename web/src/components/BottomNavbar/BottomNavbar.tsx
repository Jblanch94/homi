import { BottomNavigation, CssBaseline } from "@material-ui/core";
import { ClassNameMap } from "@material-ui/core/styles/withStyles";
import {
  CalendarToday,
  Check,
  LocalGroceryStore,
  Restaurant,
  People,
} from "@material-ui/icons";
import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import BottomNavbarAction from "../BottomNavbarAction";

interface IBottomNavbar {
  classes: ClassNameMap<"root">;
  value: string;
  onHandleChange: (e: React.ChangeEvent<{}>, value: string) => void;
}

const BottomNavbar: React.FC<IBottomNavbar> = ({
  value,
  classes,
  onHandleChange,
}) => {
  return (
    <Fragment>
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
    </Fragment>
  );
};

export default BottomNavbar;
