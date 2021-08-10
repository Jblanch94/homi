import { FC, useEffect } from "react";

import RecipeList from "../components/RecipeList";
import { useDispatch } from "react-redux";
import actions from "../state/actions";
import useTypedSelector from "../hooks/useTypedSelector";

const RecipeListContainer: FC<{}> = () => {
  const dispatch = useDispatch();
  const { userActions, recipeActions } = actions;
  const { currentUser, userProfiles } = useTypedSelector((state) => state.user);
  const recipes = useTypedSelector((state) => state.recipe);

  const familyId = currentUser?.FamilyId;

  useEffect(() => {
    const fetchCurrentUser = () => dispatch(userActions.fetchCurrentUser());

    fetchCurrentUser();

    if (familyId) {
      dispatch(userActions.fetchUserProfiles(familyId));
      dispatch(recipeActions.fetchRecipes(familyId));
    }
  }, [dispatch, recipeActions, userActions, familyId]);

  const props = {
    ...recipes,
    userProfiles,
    currentUserId: currentUser.id,
    familyId,
  };
  return <RecipeList {...props} />;
};

export default RecipeListContainer;
