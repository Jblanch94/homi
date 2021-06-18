import Modal from "./Modal";

const DuplicateAccountModal = ({ open, modalToggle }) => {
  return (
    <Modal open={open} modalToggle={modalToggle}>
      <div>This is a modal</div>
    </Modal>
  );
};

export default DuplicateAccountModal;
