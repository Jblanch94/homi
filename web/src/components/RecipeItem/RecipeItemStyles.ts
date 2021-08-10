import { makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,

    [theme.breakpoints.up("md")]: {
      width: "calc(100% - 240px)",
      marginLeft: "240px",
    },
  },
  gridContainer: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(2),
  },
  avatarSmall: {
    width: theme.spacing(4),
    height: theme.spacing(4),
    background: theme.palette.primary.main,
    "&:hover": {
      cursor: "pointer",
    },
  },

  deleteButton: {
    background: theme.palette.error.main,
    "&:hover": {
      background: theme.palette.error.dark,
    },
  },

  editIcon: {
    color: theme.palette.warning.main,
  },

  accordionDetailTypography: {
    marginBottom: theme.spacing(1),
  },

  accordion: {
    marginTop: theme.spacing(1),
  },

  modalActions: {
    justifyContent: "space-between",
    marginTop: theme.spacing(4),
  },

  modalDeleteButton: {
    color: theme.palette.error.main,
    borderColor: theme.palette.error.main,
    "&:hover": {
      opacity: 1,
    },
  },

  modalContent: {
    fontWeight: theme.typography.fontWeightBold,
  },
}));

export default useStyles;
