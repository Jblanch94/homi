import { FC } from "react";
import { Tooltip as MuiTooltip, TooltipProps } from "@material-ui/core";

interface ITooltipProps extends TooltipProps {}

const Tooltip: FC<ITooltipProps> = (props) => {
  return <MuiTooltip {...props} />;
};

export default Tooltip;
