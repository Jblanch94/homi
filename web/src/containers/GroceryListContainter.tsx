import { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import useTypedSelector from "../hooks/useTypedSelector";
import actions from "../state/actions";

import GroceryList from "../components/GroceryList/GroceryList";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";

const GroceryListContainer: FC<{}> = () => {
  const { groceryActions, userActions } = actions;
  const dispatch = useDispatch();
  const user = useTypedSelector((state) => state.user);
  const { groceries, isLoading } = useTypedSelector((state) => state.grocery);

  useEffect(() => {
    const currentUser = () => dispatch(userActions.fetchCurrentUser());
    const fetchGroceries = (id: number) =>
      dispatch(groceryActions.fetchGroceries(id));

    const fetchAllUsers = (familyId: number) => {
      dispatch(userActions.fetchUserProfiles(familyId));
    };
    currentUser();

    const familyId = user.currentUser.FamilyId;
    if (familyId) {
      fetchGroceries(familyId);
      fetchAllUsers(familyId);
    }
  }, [groceryActions, dispatch, userActions, user.currentUser.FamilyId]);

  const props = {
    groceries,
    users: user.userProfiles,
    familyId: user.currentUser.FamilyId,
  };

  return <>{isLoading ? <LoadingSpinner /> : <GroceryList {...props} />}</>;
};

export default GroceryListContainer;
