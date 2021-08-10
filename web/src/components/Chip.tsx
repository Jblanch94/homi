import { FC } from "react";
import { Chip as MuiChip, ChipProps } from "@material-ui/core";

interface IChipProps extends ChipProps {}

const Chip: FC<IChipProps> = (props) => {
  return <MuiChip {...props} />;
};

export default Chip;
