import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import useStyles from './NavbarStyles';

const Navbar = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Link to="/" className={classes.logo}>
            <Typography variant="h6">Homi</Typography>
          </Link>
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
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
