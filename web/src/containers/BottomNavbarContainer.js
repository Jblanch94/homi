import { useState } from "react";
import BottomNavbar from "../components/BottomNavbar/BottomNavbar";
import useStyles from "../components/BottomNavbar/BottomNavbarStyles";

const BottomNavbarContainer = () => {
  const classes = useStyles();
  const [value, setValue] = useState("family");

  const onHandleChange = (e, newValue) => {
    setValue(newValue);
  };

  const props = { classes, value, onHandleChange };

  return <BottomNavbar {...props} />;
};

export default BottomNavbarContainer;
