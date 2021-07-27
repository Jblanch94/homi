import { FC } from "react";
import MuiAlert from "@material-ui/lab/Alert";
import { AlertProps } from "@material-ui/lab";

interface IAlertProps extends AlertProps {}

const Alert: FC<IAlertProps> = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

export default Alert;
