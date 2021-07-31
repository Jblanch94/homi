import GroceryItemForm from "../components/GroceryItemForm/GroceryItemForm";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import useTypedSelector from "../hooks/useTypedSelector";
import actions from "../state/actions";
import { FormikValues } from "formik";

const GroceryItemFormContainer = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { groceryActions } = actions;
  const { currentUser } = useTypedSelector((state) => state.user);
  const groceries = useTypedSelector((state) => state.grocery);

  const onFormSubmit = (values: FormikValues): void => {
    dispatch(
      groceryActions.addGroceryItem(currentUser.FamilyId, values, history)
    );
  };
  console.log(groceries);

  const props = {
    onFormSubmit,
    isError: groceries.isError,
    error: groceries.error,
  };
  return <GroceryItemForm {...props} />;
};

export default GroceryItemFormContainer;
