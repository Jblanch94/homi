import { Button as MuiButton, ButtonProps } from "@material-ui/core";
import { FC } from "react";

interface IButtonProps extends ButtonProps {}

const Button: FC<IButtonProps> = ({ children, ...props }) => {
  return <MuiButton {...props}>{children}</MuiButton>;
};

export default Button;
