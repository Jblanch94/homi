import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  header: {
    textAlign: 'center',
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(4),
  },

  gridContainer: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
}));

export default useStyles;
