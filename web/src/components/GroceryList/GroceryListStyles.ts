import { makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => {
  return {
    root: {
      [theme.breakpoints.up("md")]: {
        width: "calc(100% - 240px)",
        marginLeft: "240px",
      },
    },
  };
});

export default useStyles;
