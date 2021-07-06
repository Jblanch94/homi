import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.up("md")]: {
      width: `calc(100% - 240px)`,
      marginLeft: 240,
      alignItems: "center",
    },
    marginTop: theme.spacing(2),
    paddingLeft: theme.spacing(2),
  },

  submitButton: {
    width: "100%",
  },

  switch: {
    width: "100%",
  },

  textInput: {
    [theme.breakpoints.up("md")]: {
      width: "100%",
    },
  },
}));

export default useStyles;
