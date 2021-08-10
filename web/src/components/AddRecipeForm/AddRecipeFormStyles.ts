import { makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginTop: theme.spacing(1),
    [theme.breakpoints.up("md")]: {
      width: "calc(100% - 240px)",
      marginLeft: "240px",
    },
    [theme.breakpoints.down("md")]: {
      paddingRight: theme.spacing(1),
      paddingLeft: theme.spacing(1),
    },
  },

  notesTagsContainer: {
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    [theme.breakpoints.down("md")]: {
      marginBottom: theme.spacing(10),
    },

    background: theme.palette.secondary.main,
  },

  chipContainer: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0.5),
    },
  },
}));

export default useStyles;
