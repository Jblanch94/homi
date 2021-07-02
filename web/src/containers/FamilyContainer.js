import { useEffect } from "react";
import Family from "../pages/Family";
import {
  fetchCurrentUser,
  fetchUserProfiles,
} from "../state/actions/userActions";
import { fetchFamily } from "../state/actions/familyActions";
import { useSelector, useDispatch } from "react-redux";

const FamilyContainer = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const family = useSelector((state) => state.family);

  useEffect(() => {
    const currentUser = () => dispatch(fetchCurrentUser());
    const userProfiles = (familyId) => dispatch(fetchUserProfiles(familyId));
    const family = (familyId) => dispatch(fetchFamily(familyId));
    const familyId = user.currentUser.FamilyId;

    currentUser();
    if (familyId) {
      family(familyId);
      userProfiles(familyId);
    }
  }, [dispatch, user.currentUser.FamilyId]);

  const props = {
    currentUser: user.currentUser,
    userProfiles: user.userProfiles,
    family,
  };
  return <Family {...props} />;
};

export default FamilyContainer;
