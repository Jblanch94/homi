import { Drawer, IconButton } from "@material-ui/core";
import { Menu } from "@material-ui/icons";
import { FC, KeyboardEvent } from "react";
import SideDrawerList from "./SideDrawerList";
import { INavLink } from "../containers/SideDrawerContainer";

interface ISideDrawer {
  active: { right: boolean };
  navLinks: INavLink[];
  toggleDrawer: (anchor: string, open: boolean) => (evt: KeyboardEvent) => void;
  onMenuClick: (anchor: string, open: boolean) => (evt: any) => void;
}

const SideDrawer: FC<ISideDrawer> = ({
  toggleDrawer,
  active,
  navLinks,
  onMenuClick,
  ...props
}) => {
  return (
    <>
      <IconButton
        edge="start"
        aria-label="menu"
        onClick={onMenuClick("right", true)}
        component={Menu}
      />

      <Drawer
        anchor="right"
        open={active.right}
        onClose={toggleDrawer("right", false)}>
        <SideDrawerList navLinks={navLinks} active={active.right} />
      </Drawer>
    </>
  );
};

export default SideDrawer;
