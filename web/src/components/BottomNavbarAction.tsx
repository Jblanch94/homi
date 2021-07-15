import { FC } from "react";
import {
  BottomNavigationAction,
  BottomNavigationActionProps,
} from "@material-ui/core";

interface IBottomNavbarActionProps extends BottomNavigationActionProps {}

const BottomNavbarAction: FC<IBottomNavbarActionProps> = (props) => {
  return <BottomNavigationAction {...props} />;
};

export default BottomNavbarAction;
