import { FC } from "react";
import { makeStyles } from "@material-ui/core";

const Recipes: FC<{}> = () => {
  const width = 240;
  const useStyles = makeStyles((theme) => ({
    root: {
      width: `calc(100% - ${width})`,
      marginLeft: width,
    },
  }));

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <h1>Recipes Page</h1>
    </div>
  );
};

export default Recipes;
