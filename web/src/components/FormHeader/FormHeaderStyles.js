import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: theme.spacing(1),

    [theme.breakpoints.up("md")]: {
      width: `calc(100% - 240px)`,
      marginLeft: 240,
    },
  },
}));

export default useStyles;
