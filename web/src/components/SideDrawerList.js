import { List, ListItem, ListItemText, Divider } from '@material-ui/core';
import useStyles from './Navbar/NavbarStyles';
import { Link } from 'react-router-dom';

const SideDrawerList = ({ navLinks }) => {
  const classes = useStyles();
  return (
    <div>
      <List component="nav">
        {navLinks.map(({ title, path }) => {
          return (
            <div key={title}>
              <Link to={path} className={classes.loginLink}>
                <ListItem button>
                  <ListItemText primary={title} />
                </ListItem>
              </Link>
              <Divider />
            </div>
          );
        })}
      </List>
    </div>
  );
};

export default SideDrawerList;
