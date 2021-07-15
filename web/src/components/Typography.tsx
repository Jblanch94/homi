import { FC } from "react";
import {
  Typography as MuiTypography,
  TypographyProps,
} from "@material-ui/core";

interface ITypographyProps extends TypographyProps {}

const Typography: FC<ITypographyProps> = ({ children, ...props }) => {
  return <MuiTypography {...props}>{children}</MuiTypography>;
};

export default Typography;
