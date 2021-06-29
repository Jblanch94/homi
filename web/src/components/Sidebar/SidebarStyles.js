import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },

  drawer: {
    width: 240,
    height: "100%",
    flexShrink: 0,
  },

  drawerPaper: {
    width: 240,
  },

  listItem: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    color: theme.palette.grey,
  },

  listItemIcon: {
    "&:visited": {
      color: theme.palette.primary.light,
    },
  },

  list: {
    marginTop: theme.spacing(6),
  },

  activeLink: {
    color: theme.palette.primary.light,
  },
}));

export default useStyles;
