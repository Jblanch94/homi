import { useState, FC, SetStateAction } from "react";
import actions from "../state/actions";
import familyRegistrationSchema from "../ValidationSchema/SignUpForm/FamilyRegistration";
import userRegistrationSchema from "../ValidationSchema/SignUpForm/UserRegistration";
import useToggle from "../hooks/useToggle";
import useTypedSelector from "../hooks/useTypedSelector";
import useActions from "../hooks/useActions";
import SignUp from "../pages/SignUp";

import { FormikValues } from "formik";
import { History, Location } from "history";
import { match } from "react-router-dom";

interface ISignUpContainer {
  history: History<unknown>;
  location: Location<unknown>;
  match: match<{}>;
}

const SignUpContainer: FC<ISignUpContainer> = () => {
  const [setValues, getSetValues] = useState();
  const auth = useTypedSelector((state) => state.auth);
  const { registerFamilyAndUser } = useActions(actions.authActions);
  const [modalOpen, modalToggle] = useToggle(false);

  const handleSubmit = (
    values: FormikValues,
    setValues: SetStateAction<undefined>
  ): void => {
    getSetValues(setValues);
    registerFamilyAndUser(values);
    if (auth.isError && auth.error === "User already exists") {
      modalToggle();
    }
  };

  const SignUpProps = {
    initialValues: {
      familyName: "",
      familyPassword: "",
      reEnterPassword: "",
      userName: "",
      email: "",
      age: "",
      profileAvatar: null,
    },

    handleSubmit,
    familyRegistrationSchema,
    userRegistrationSchema,
    setValues,
    auth,
    modalOpen,
    modalToggle,
  };

  return <SignUp {...SignUpProps} />;
};

export default SignUpContainer;