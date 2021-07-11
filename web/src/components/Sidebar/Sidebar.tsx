import { FC } from "react";
import {
  Drawer,
  CssBaseline,
  List,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";

import { NavLink } from "react-router-dom";
import useStyles from "./SidebarStyles";

interface ISidebarLink {
  text: string;
  icon: JSX.Element;
  to: string;
}

interface ISidebar {
  currentPage: string | null;
  sidebarLinks: ISidebarLink[];
}

const Sidebar: FC<ISidebar> = ({ currentPage, sidebarLinks }) => {
  const classes = useStyles();

  const sidebarLinksList = sidebarLinks.map((link, index) => {
    return (
      <div key={index}>
        <ListItem
          component={NavLink}
          activeClassName={classes.activeLink}
          button
          to={link.to}
          className={classes.listItem}>
          <ListItemIcon
            className={currentPage === link.to ? classes.activeLink : ""}>
            {link.icon}
          </ListItemIcon>
          <ListItemText primary={link.text} />
        </ListItem>
        <Divider />
      </div>
    );
  });
  return (
    <div className={classes.root}>
      <CssBaseline />

      <Drawer
        variant="permanent"
        anchor="left"
        className={classes.drawer}
        classes={{ paper: classes.drawerPaper }}>
        <List className={classes.list}>{sidebarLinksList}</List>
      </Drawer>
    </div>
  );
};

export default Sidebar;
