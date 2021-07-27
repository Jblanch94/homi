import { FC } from "react";
import { CircularProgress, CircularProgressProps } from "@material-ui/core";
import useStyles from "./LoadingSpinnerStyles";

interface ILoadingSpinnerProps extends CircularProgressProps {}

const LoadingSpinner: FC<ILoadingSpinnerProps> = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CircularProgress {...props} />
    </div>
  );
};

export default LoadingSpinner;
