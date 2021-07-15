import { Dialog as MuiDialog, DialogProps } from "@material-ui/core";
import { FC } from "react";

interface IDialogProps extends DialogProps {
  modalToggle: () => void;
  open: boolean;
}

const Dialog: FC<IDialogProps> = ({
  open,
  modalToggle,
  children,
  ...props
}) => {
  return (
    <MuiDialog open={open} onClose={modalToggle} {...props}>
      {children}
    </MuiDialog>
  );
};

export default Dialog;
