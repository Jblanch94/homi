import { BottomNavigation, CssBaseline } from "@material-ui/core";
import {
  CalendarToday,
  Check,
  LocalGroceryStore,
  Restaurant,
  People,
} from "@material-ui/icons";
import React, { Fragment, useState } from "react";
import { useHistory } from "react-router-dom";

import useStyles from "./BottomNavbarStyles";
import BottomNavbarAction from "../BottomNavbarAction";

const BottomNavbar: React.FC<{}> = () => {
  const classes = useStyles();
  const [value, setValue] = useState<string>("family");
  const history = useHistory();

  const onHandleChange = (e: React.ChangeEvent<{}>, newValue: string) => {
    history.push(`/${newValue}`);
    setValue(newValue);
  };

  return (
    <Fragment>
      <CssBaseline />
      <BottomNavigation
        value={value}
        showLabels
        className={classes.root}
        onChange={onHandleChange}>
        <BottomNavbarAction label="Family" value="family" icon={<People />} />

        <BottomNavbarAction
          label="Calendar"
          value="calendar"
          icon={<CalendarToday />}
        />
        <BottomNavbarAction label="Tasks" value="tasks" icon={<Check />} />
        <BottomNavbarAction
          label="Groceries"
          icon={<LocalGroceryStore />}
          value="groceries"
        />
        <BottomNavbarAction
          label="Recipes"
          value="recipes"
          icon={<Restaurant />}
        />
      </BottomNavigation>
    </Fragment>
  );
};

export default BottomNavbar;
