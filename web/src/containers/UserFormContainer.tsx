import { FC } from "react";
import UserForm from "../components/UserForm/UserForm";
import { registerUser } from "../state/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { FormikValues } from "formik";

const UserFormContainer: FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const history = useHistory();

  const onHandleSwitchChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fn: (field: string, value: any, shouldValidate?: boolean) => void,
    name: string
  ) => {
    fn(name, e.target.checked);
  };

  const onSubmit = (values: FormikValues) => {
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
