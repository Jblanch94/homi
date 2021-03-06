import { makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    position: "fixed",
    bottom: 0,
    right: 0,
    left: 0,
    zIndex: 10,
  },
}));

export default useStyles;
