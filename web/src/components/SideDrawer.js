import { Drawer, IconButton } from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import SideDrawerList from './SideDrawerList';

const SideDrawer = ({ toggleDrawer, active, navLinks, ...props }) => {
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
        <SideDrawerList navLinks={navLinks} active={active.right} />
      </Drawer>
    </>
  );
};

export default SideDrawer;
