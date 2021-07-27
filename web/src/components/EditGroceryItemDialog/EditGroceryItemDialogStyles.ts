import { Theme, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    textAlign: "center",
  },

  buttonsContainer: {
    justifyContent: "space-between",
    marginTop: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),
  },
}));

export default useStyles;
