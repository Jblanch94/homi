import { useState } from 'react';
import { Drawer, IconButton } from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import SideDrawerList from './SideDrawerList';

const SideDrawer = ({ navLinks }) => {
  const [active, setActive] = useState({ right: false });

  const toggleDrawer = (anchor, open) => (evt) => {
    if (evt.type === 'keydown' && (evt.key === 'Tab' || evt.key === 'Shift')) {
      return;
    }

    setActive({ [anchor]: open });
  };

  return (
    <>
      <IconButton
        edge="start"
        aria-label="menu"
        onClick={toggleDrawer('right', true)}>
        <Menu />
      </IconButton>
      <Drawer
        anchor="right"
        open={active.right}
        onClose={toggleDrawer('right', false)}>
        <SideDrawerList navLinks={navLinks} />
      </Drawer>
    </>
  );
};

export default SideDrawer;
