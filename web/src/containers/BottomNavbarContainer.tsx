import React, { useState } from "react";
import { FC } from "react";
import { useHistory } from "react-router-dom";
import useStyles from "../components/BottomNavbar/BottomNavbarStyles";
import BottomNavbar from "../components/BottomNavbar/BottomNavbar";

const BottomNavbarContainer: FC = () => {
  const classes = useStyles();
  const [value, setValue] = useState<string>("family");
  const history = useHistory();

  const onHandleChange = (e: React.ChangeEvent<{}>, newValue: string) => {
    history.push(`/${newValue}`);
    setValue(newValue);
  };

  const props = { classes, value, onHandleChange };

  return <BottomNavbar {...props} />;
};

export default BottomNavbarContainer;
