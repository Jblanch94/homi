import React, { FC, KeyboardEvent, MouseEventHandler } from "react";
import { useState } from "react";
import SideDrawer from "../components/SideDrawer";

export interface INavLink {
  title: string;
  path: string;
}

interface ISideDrawerContainer {
  navLinks: INavLink[];
}

const SideDrawerContainer: FC<ISideDrawerContainer> = ({ navLinks }) => {
  const [active, setActive] = useState({
    right: false,
  });

  const toggleDrawer =
    (anchor: string, open: boolean) => (evt: KeyboardEvent) => {
      if (
        evt.type === "keydown" &&
        (evt.key === "Tab" || evt.key === "Shift")
      ) {
        return;
      }

      setActive({ right: open });
    };

  const onMenuClick =
    (anchor: string, open: boolean) =>
    (evt: MouseEventHandler<HTMLAnchorElement>) => {
      setActive({ right: open });
    };

  const props = {
    active,
    toggleDrawer,
    onMenuClick,
    navLinks,
  };

  return <SideDrawer {...props} />;
};

export default SideDrawerContainer;
