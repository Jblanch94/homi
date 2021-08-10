import { FC } from "react";
import {
  IconButton as MuiIconButton,
  IconButtonProps,
} from "@material-ui/core";

interface IIconButtonProps extends IconButtonProps {}

const IconButton: FC<IIconButtonProps> = (props) => {
  return <MuiIconButton {...props} />;
};

export default IconButton;
