import { FC } from "react";
import UserForm from "../components/UserForm/UserForm";
import { registerUser } from "../state/actions/userActions";
import useTypedSelector from "../hooks/useTypedSelector";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { FormikValues } from "formik";

const UserFormContainer: FC = () => {
  const dispatch = useDispatch();
  const user = useTypedSelector((state) => state.user);
  const history = useHistory();

  const onHandleSwitchChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fn: (field: string, value: any, shouldValidate?: boolean) => void,
    name: string
  ) => {
    fn(name, e.target.checked);
  };

  const onSubmit = (values: FormikValues) => {
    const familyId: number = user.currentUser.FamilyId;
    const data = {
      name: values.name,
      email: values.email,
      admin: values.admin,
      familyId,
    };
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
