import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexGrow: 1,
    alignItems: 'center',
  },

  links: {
    marginLeft: 'auto',
    display: 'flex',
    alignItems: 'center',
  },

  menuActive: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  logo: {
    textDecoration: 'none',
    '&:hover': {
      color: theme.palette.secondary.main,
    },
    flexGrow: 1,
  },

  loginLink: {
    textDecoration: 'none',
    marginRight: theme.spacing(4),
    '&:hover': {
      color: theme.palette.secondary.main,
    },
  },

  signUpLink: {
    textDecoration: 'none',
    marginRight: theme.spacing(2),
    display: 'inline-block',
    background: theme.palette.secondary.main,
    padding: theme.spacing(1),
    borderRadius: theme.spacing(1),
    '&:hover': {
      opacity: 0.7,
    },
  },

  signUpLinkText: {
    fontWeight: theme.typography.fontWeightBold,
  },
}));

export default useStyles;
