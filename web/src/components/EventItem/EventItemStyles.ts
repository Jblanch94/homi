import { makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  itemContainer: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    paddingLeft: theme.spacing(4),
  },

  avatarContainer: {
    marginRight: theme.spacing(2),
  },

  avatar: {
    background: theme.palette.primary.main,
    "&:hover": {
      cursor: "pointer",
    },
  },
}));

export default useStyles;
