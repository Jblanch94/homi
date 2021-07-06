import UserForm from "../components/UserForm/UserForm";
import { registerUser } from "../state/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";

const UserFormContainer = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const history = useHistory();

  const onHandleSwitchChange = (e, fn, name) => {
    fn(name, e.target.checked);
  };

  const onSubmit = (values) => {
    const familyId = user.currentUser.FamilyId;
    const data = { ...values, familyId };
    dispatch(registerUser(data));
    if (user.error === "") {
      history.push("/family");
    }
  };

  const props = {
    onHandleSwitchChange,
    onSubmit,
  };
  return <UserForm {...props} />;
};

export default UserFormContainer;
