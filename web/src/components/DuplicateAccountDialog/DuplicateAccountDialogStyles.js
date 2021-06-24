import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  loginLink: {
    display: "inline-block",
    textDecoration: "none",
    border: `1px solid ${theme.palette.success.main}`,
    padding: theme.spacing(0.8),
    color: theme.palette.success.main,
    borderRadius: theme.spacing(0.5),
    "&:hover": {
      background: theme.palette.success.main,
      color: "#fff",
    },
  },

  cancelLink: {
    display: "inline-block",
    padding: theme.spacing(0.8),
    color: theme.palette.error.main,
    borderRadius: theme.spacing(0.5),
    border: `1px solid ${theme.palette.error.main}`,
    "&:hover": {
      background: theme.palette.error.main,
      color: "#fff",
    },
  },
  actionsContainer: {
    justifyContent: "space-between",
    padding: `0 ${theme.spacing(2)}`,
  },
}));

export default useStyles;
