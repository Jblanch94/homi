import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: `calc(100% - 240px)`,
    marginLeft: 240,
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(1),
  },

  headerText: {
    flexGrow: 1,
    textAlign: "center",
  },
}));

export default useStyles;
