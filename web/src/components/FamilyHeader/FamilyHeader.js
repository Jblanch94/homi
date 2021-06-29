import Typography from "../Typography";
import { Divider, IconButton } from "@material-ui/core";
import { AddCircleOutlineRounded } from "@material-ui/icons";
import useStyles from "./FamilyHeaderStyles";

const FamilyHeader = () => {
  const classes = useStyles();
  return (
    <>
      <header className={classes.root}>
        <Typography variant="h4" color="primary" className={classes.headerText}>
          Blanchard
        </Typography>
        <IconButton color="primary">
          <AddCircleOutlineRounded fontSize="large" />
        </IconButton>
      </header>
      <Divider />
    </>
  );
};

export default FamilyHeader;
