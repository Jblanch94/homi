import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  textInputContainer: {
    [theme.breakpoints.down('xs')]: {
      marginRight: theme.spacing(2),
      marginLeft: theme.spacing(2),
    },
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(2),
    },
  },
}));

export default useStyles;
