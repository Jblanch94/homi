import { Dialog as MuiDialog } from "@material-ui/core";

const Dialog = ({ open, modalToggle, children, ...props }) => {
  return (
    <MuiDialog open={open} onClose={modalToggle} {...props}>
      {children}
    </MuiDialog>
  );
};

export default Dialog;
