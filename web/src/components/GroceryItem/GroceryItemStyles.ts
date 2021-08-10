import { makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: `${theme.spacing(2)}px 0`,
  },
  avatar: {
    marginLeft: "auto",
    paddingRight: theme.spacing(2),
    "&:hover": {
      cursor: "pointer",
    },
  },

  quantity: {
    paddingLeft: theme.spacing(2),
  },

  crossedOff: {
    textDecoration: "line-through",
  },

  chipContainer: {
    display: "flex",
    justifyContent: "start",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0.5),
    },
  },

  chip: {
    padding: theme.spacing(0.5),
    textAlign: "center",
  },
}));

export default useStyles;
