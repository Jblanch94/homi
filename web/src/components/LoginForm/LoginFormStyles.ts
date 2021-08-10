import { makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  gridContainer: {
    [theme.breakpoints.down("md")]: {
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
    },
  },
  textFieldContainer: {
    width: "100%",
  },

  buttonContainer: {
    width: "100%",
  },

  submitButton: {
    fontSize: 32,
    fontWeight: "bold",
  },

  header: {
    marginBottom: theme.spacing(2),
    textAlign: "center",
  },
}));

export default useStyles;
