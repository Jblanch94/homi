import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import useStyles from './NavbarStyles';
import SideDrawerContainer from '../../containers/SideDrawerContainer';
import HideComponent from '../HideComponent';

const Navbar = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Link to="/" className={classes.logo}>
            <Typography variant="h3">Homi</Typography>
          </Link>
          <HideComponent xsDown>
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
          </HideComponent>

          <HideComponent smUp>
            <SideDrawerContainer
              navLinks={[
                { title: 'Log in to Homi', path: '/login' },
                { title: 'Sign up for Homi', path: '/sign-up' },
              ]}
            />
          </HideComponent>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
