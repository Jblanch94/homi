import { FC, useEffect } from "react";

import AddRecipeForm from "../components/AddRecipeForm/AddRecipeForm";
import Chip from "../components/Chip";

import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import actions from "../state/actions";
import useTypedSelector from "../hooks/useTypedSelector";
import { FormikValues } from "formik";

const AddRecipeFormContainer: FC<{}> = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { currentUser } = useTypedSelector((state) => state.user);
  const { isSuccess } = useTypedSelector((state) => state.recipe);
  const { recipeActions, userActions } = actions;

  const addRecipeUrl = `/family/${currentUser.FamilyId}/user/${currentUser.id}`;

  const onFormSubmit = (values: FormikValues): void => {
    dispatch(recipeActions.addRecipe(values, addRecipeUrl));

    if (isSuccess) {
      history.push("/recipes");
    }
  };

  function addTag(
    name: string,
    values: FormikValues,
    setFieldValue: (
      field: string,
      value: any,
      shouldValidate?: boolean | undefined
    ) => void
  ) {
    //   get the value of the tag and append to the tags array
    const tag = values[name];
    const tags = values["tags"];

    if (tag.length <= 0) return;
    setFieldValue("tags", [...tags, tag]);

    //   clear the input field
    setFieldValue(name, "");
  }

  function renderChips(tags: string[]) {
    return tags.map((tag: string, index: number) => {
      return (
        <Chip
          size="small"
          title={tag}
          label={tag}
          key={index}
          color="primary"
        />
      );
    });
  }

  useEffect(() => {
    const fetchCurrentUser = () => dispatch(userActions.fetchCurrentUser());
    fetchCurrentUser();
  }, [dispatch, userActions]);

  const props = { onFormSubmit, renderChips, addTag };

  return <AddRecipeForm {...props} />;
};

export default AddRecipeFormContainer;
