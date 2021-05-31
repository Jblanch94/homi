import { AppBar, Toolbar, Typography, Hidden } from '@material-ui/core';
import { Link } from 'react-router-dom';
import useStyles from './NavbarStyles';
import SideDrawer from '../SideDrawer';

const Navbar = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Link to="/" className={classes.logo}>
            <Typography variant="h3">Homi</Typography>
          </Link>
          <Hidden xsDown>
            <div className={classes.links}>
              <Link to="/login" className={classes.loginLink}>
                <Typography variant="h6">Log in to Homi</Typography>
              </Link>
              <Link to="/sign-up" className={classes.signUpLink}>
                <Typography variant="h6" className={classes.signUpLinkText}>
                  Sign up for Homi
                </Typography>
              </Link>
            </div>
          </Hidden>

          <Hidden smUp>
            <SideDrawer
              navLinks={[
                { title: 'Log in to Homi', path: '/login' },
                { title: 'Sign up for Homi', path: '/sign-up' },
              ]}
            />
          </Hidden>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
