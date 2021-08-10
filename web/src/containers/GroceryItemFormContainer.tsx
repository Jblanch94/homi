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

  const onHandleCategoryClick = (
    setFieldValue: (
      field: string,
      value: any,
      shouldValidate?: boolean | undefined
    ) => void,
    values: FormikValues,
    name: string
  ) => {
    //  add category to categories array
    const category = values[name];
    setFieldValue("categories", [...values["categories"], category]);

    // clear category text input
    setFieldValue("category", "");
  };

  const onHandleDelete = (index: number, setFieldValue: any, values: any) => {
    values["categories"].splice(index, 1);
    setFieldValue("categories", values["categories"]);
  };

  const props = {
    onFormSubmit,
    isError: groceries.isError,
    error: groceries.error,
    onHandleDelete,
    onHandleCategoryClick,
  };
  return <GroceryItemForm {...props} />;
};

export default GroceryItemFormContainer;
