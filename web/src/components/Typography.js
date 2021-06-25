import { Typography as MuiTypography } from "@material-ui/core";

const Typography = ({ children, ...props }) => {
  return <MuiTypography {...props}>{children}</MuiTypography>;
};

export default Typography;
