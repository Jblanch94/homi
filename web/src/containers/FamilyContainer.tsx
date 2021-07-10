import { useEffect } from "react";
import Family from "../pages/Family";
import actions from "../state/actions";
import useTypedSelector from "../hooks/useTypedSelector";
import useActions from "../hooks/useActions";

const FamilyContainer = () => {
  const userActions = useActions(actions.userActions);
  const user = useTypedSelector((state) => state.user);
  const family = useTypedSelector((state) => state.family);

  useEffect(() => {
    const currentUser = () => userActions.fetchCurrentUser();
    const userProfiles = (familyId: number) =>
      userActions.fetchUserProfiles(familyId);
    const family = (familyId: number) => userActions.fetchFamily(familyId);
    const familyId = user.currentUser.FamilyId;

    currentUser();
    if (familyId) {
      family(familyId);
      userProfiles(familyId);
    }
  }, [userActions, user.currentUser.FamilyId]);

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
