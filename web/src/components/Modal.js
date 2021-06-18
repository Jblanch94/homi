import { Modal as MaterialModal } from "@material-ui/core";

const Modal = ({ open, modalToggle, children }) => {
  return (
    <MaterialModal open={open} onClose={modalToggle}>
      {children}
    </MaterialModal>
  );
};

export default Modal;
