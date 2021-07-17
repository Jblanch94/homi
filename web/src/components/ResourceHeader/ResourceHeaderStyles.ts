import { Theme, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    [theme.breakpoints.up("md")]: {
      width: "calc(100% - 240px)",
      marginLeft: "240px",
      justifyContent: "space-between",
    },
  },

  title: {
    flex: 1,
    textAlign: "center",

    [theme.breakpoints.up("md")]: {
      textAlign: "left",
      paddingLeft: theme.spacing(2),
    },
  },
}));

export default useStyles;
