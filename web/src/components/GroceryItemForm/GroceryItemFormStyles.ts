import { makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginTop: theme.spacing(2),

    [theme.breakpoints.up("md")]: {
      width: "calc(100% - 240px)",
      marginLeft: "240px",
    },
  },

  textInput: {
    marginLeft: theme.spacing(2),

    [theme.breakpoints.down("md")]: {
      marginRight: theme.spacing(2),
    },
  },

  quantityButton: {
    background: theme.palette.grey[200],
    textAlign: "center",
    padding: theme.spacing(2),
  },

  quantityContainer: {
    marginLeft: theme.spacing(4),

    [theme.breakpoints.down("sm")]: {
      marginRight: theme.spacing(4),
    },
  },

  quanityInput: {
    textAlign: "center",
  },
}));

export default useStyles;
