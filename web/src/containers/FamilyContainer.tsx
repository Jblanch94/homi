import { useEffect } from "react";
import Family from "../pages/Family";
import actions from "../state/actions";
import useTypedSelector from "../hooks/useTypedSelector";
import { useDispatch } from "react-redux";

const FamilyContainer = () => {
  const dispatch = useDispatch();
  const { fetchCurrentUser, fetchUserProfiles } = actions.userActions;
  const { fetchFamily } = actions.familyActions;
  const user = useTypedSelector((state) => state.user);
  const family = useTypedSelector((state) => state.family);

  useEffect(() => {
    const currentUser = () => dispatch(fetchCurrentUser());
    const userProfiles = (familyId: number) =>
      dispatch(fetchUserProfiles(familyId));
    const family = (id: number) => dispatch(fetchFamily(id));
    const familyId = user.currentUser.FamilyId;

    currentUser();
    if (familyId) {
      userProfiles(familyId);
      family(familyId);
    }
  }, [
    user.currentUser.FamilyId,
    dispatch,
    fetchCurrentUser,
    fetchUserProfiles,
    fetchFamily,
  ]);

  const props = {
    currentUser: user.currentUser,
    userProfiles: user.userProfiles,
    family,
  };

  return (
    <>
      <Family {...props} />
    </>
  );
};

export default FamilyContainer;
