import { makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  gridContainer: {
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
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
  },
}));

export default useStyles;
