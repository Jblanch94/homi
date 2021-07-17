import { FC } from "react";
import Typography from "../Typography";
import { IconButton } from "@material-ui/core";
import { AddCircleOutline } from "@material-ui/icons";
import useStyles from "./ResourceHeaderStyles";
import { Link } from "react-router-dom";

interface IResourceHeaderProps {
  title: string;
  path: string;
}

const ResourceHeader: FC<IResourceHeaderProps> = ({ title, path }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography variant="h4" className={classes.title}>
        {title}
      </Typography>
      <Link to={path}>
        <IconButton aria-label="add-grocery" color="primary">
          <AddCircleOutline fontSize="large" />
        </IconButton>
      </Link>
    </div>
  );
};

export default ResourceHeader;
