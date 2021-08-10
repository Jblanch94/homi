import { makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    [theme.breakpoints.up("md")]: {
      width: "calc(100% - 240px)",
      marginLeft: "240px",
    },
  },

  gridContainer: {
    paddingLeft: theme.spacing(2),

    marginTop: theme.spacing(1),
    background: theme.palette.primary.main,
    minHeight: "90vh",
  },

  content: {
    fontSize: theme.spacing(3),
    color: theme.palette.primary.dark,
    opacity: 1,
  },

  link: {
    paddingLeft: theme.spacing(2),
  },
}));

export default useStyles;
