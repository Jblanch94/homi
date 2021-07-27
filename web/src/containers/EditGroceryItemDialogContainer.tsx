import { FormikValues } from "formik";
import { FC } from "react";
import EditGroceryItemDialog from "../components/EditGroceryItemDialog/EditGroceryItemDialog";
import { useDispatch } from "react-redux";
import actions from "../state/actions";

interface IEditGroceryItemDialogContainerProps {
  id: number;
  familyId: number;
  open: boolean;
  modalToggle: () => void;
  item: string;
  quantity: number;
  details: string;
}

const EditGroceryItemDialogContainer: FC<IEditGroceryItemDialogContainerProps> =
  (props) => {
    const dispatch = useDispatch();
    const { groceryActions } = actions;

    const onFormSubmit = (values: FormikValues) => {
      dispatch(
        groceryActions.updateGroceryItem(props.id, props.familyId, values)
      );
      props.modalToggle();
    };

    const editGroceryItemDialogProps = { ...props, onFormSubmit };
    return <EditGroceryItemDialog {...editGroceryItemDialogProps} />;
  };

export default EditGroceryItemDialogContainer;
