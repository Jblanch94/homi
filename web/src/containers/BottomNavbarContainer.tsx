import React, { useState } from "react";
import { FC } from "react";
import useStyles from "../components/BottomNavbar/BottomNavbarStyles";
import BottomNavbar from "../components/BottomNavbar/BottomNavbar";

const BottomNavbarContainer: FC = () => {
  const classes = useStyles();
  const [value, setValue] = useState<string>("family");

  const onHandleChange = (e: React.ChangeEvent<{}>, newValue: string) => {
    setValue(newValue);
  };

  const props = { classes, value, onHandleChange };

  return <BottomNavbar {...props} />;
};

export default BottomNavbarContainer;
