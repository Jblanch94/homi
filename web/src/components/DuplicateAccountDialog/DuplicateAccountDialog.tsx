import { FC } from "react";
import {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import useStyles from "./DuplicateAccountDialogStyles";

interface IDuplicateAccountDialogProps {
  modalToggle: () => void;
}

const DuplicateAccountDialog: FC<IDuplicateAccountDialogProps> = ({
  modalToggle,
}) => {
  const classes = useStyles();
  return (
    <>
      <DialogTitle id="duplicate-account-title">
        Already have an account?
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          An account associated with this email already exists. Would you like
          to login?
        </DialogContentText>
      </DialogContent>

      <DialogActions className={classes.actionsContainer}>
        <Button onClick={modalToggle} className={classes.cancelLink}>
          Cancel
        </Button>
        <Link to="/login" className={classes.loginLink}>
          Login
        </Link>
      </DialogActions>
    </>
  );
};

export default DuplicateAccountDialog;
