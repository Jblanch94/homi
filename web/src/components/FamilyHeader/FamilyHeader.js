import Typography from "../Typography";
import { Divider, IconButton } from "@material-ui/core";
import { AddCircleOutlineRounded } from "@material-ui/icons";
import useStyles from "./FamilyHeaderStyles";
import { Link } from "react-router-dom";

const FamilyHeader = ({ name, isAdmin }) => {
  const classes = useStyles();

  return (
    <>
      <header className={classes.root}>
        <Typography variant="h4" color="primary" className={classes.headerText}>
          {name}
        </Typography>
        {isAdmin ? (
          <Link to="/family/create-user-account">
            <IconButton color="primary">
              <AddCircleOutlineRounded fontSize="large" />
            </IconButton>
          </Link>
        ) : null}
      </header>
      <Divider />
    </>
  );
};

export default FamilyHeader;
