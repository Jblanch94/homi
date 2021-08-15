import { Theme, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginTop: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),

    [theme.breakpoints.up("md")]: {
      width: "calc(100% - 240px)",
      marginLeft: "240px",
    },
  },
}));

export default useStyles;
