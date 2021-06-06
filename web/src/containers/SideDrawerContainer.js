import { useState } from 'react';
import SideDrawer from '../components/SideDrawer';

const SideDrawerContainer = ({ navLinks }) => {
  const [active, setActive] = useState({ right: false });

  const toggleDrawer = (anchor, open) => (evt) => {
    if (evt.type === 'keydown' && (evt.key === 'Tab' || evt.key === 'Shift')) {
      return;
    }

    setActive({ [anchor]: open });
  };

  const props = {
    active,
    toggleDrawer,
    navLinks,
  };

  return <SideDrawer {...props} />;
};

export default SideDrawerContainer;
