import Typography from "../Typography";
import { Divider, IconButton } from "@material-ui/core";
import { AddCircleOutlineRounded } from "@material-ui/icons";
import useStyles from "./FamilyHeaderStyles";

const FamilyHeader = ({ name, isAdmin }) => {
  const classes = useStyles();

  return (
    <>
      <header className={classes.root}>
        <Typography variant="h4" color="primary" className={classes.headerText}>
          {name}
        </Typography>
        {isAdmin ? (
          <IconButton color="primary">
            <AddCircleOutlineRounded fontSize="large" />
          </IconButton>
        ) : null}
      </header>
      <Divider />
    </>
  );
};

export default FamilyHeader;
