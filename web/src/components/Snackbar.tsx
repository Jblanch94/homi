import { FC } from "react";
import { Snackbar as MuiSnackbar, SnackbarProps } from "@material-ui/core";

interface ISnackbarProps extends SnackbarProps {}

const Snackbar: FC<ISnackbarProps> = (props) => {
  return <MuiSnackbar {...props} />;
};

export default Snackbar;
