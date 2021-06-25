import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
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

  header: {
    marginBottom: theme.spacing(2),
  },
}));

export default useStyles;
