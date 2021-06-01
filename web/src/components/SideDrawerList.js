import {
  List,
  ListItem,
  ListItemText,
  Divider,
  Slide,
} from '@material-ui/core';
import useStyles from './Navbar/NavbarStyles';
import { Link } from 'react-router-dom';

const SideDrawerList = ({ navLinks, active }) => {
  const classes = useStyles();
  return (
    <Slide direction="right" in={active} mountOnEnter unmountOnExit>
      <div>
        <List component="nav">
          {navLinks.map(({ title, path }) => {
            return (
              <div key={title}>
                <Link
                  to={path}
                  className={
                    path === '/login' ? classes.loginLink : classes.signUpLink
                  }>
                  <ListItem>
                    <ListItemText primary={title} />
                  </ListItem>
                </Link>

                <Divider variant="inset" component="li" />
              </div>
            );
          })}
        </List>
      </div>
    </Slide>
  );
};

export default SideDrawerList;
