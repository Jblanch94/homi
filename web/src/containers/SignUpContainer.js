import { useState } from "react";
import { useDispatch } from "react-redux";
import { registerFamilyAndUser } from "../state/actions/authActions";
import familyRegistrationSchema from "../ValidationSchema/SignUpForm/FamilyRegistration";
import userRegistrationSchema from "../ValidationSchema/SignUpForm/UserRegistration";

import SignUp from "../pages/SignUp";

const SignUpContainer = () => {
  const [setValues, getSetValues] = useState();
  const dispatch = useDispatch();
  const handleSubmit = (values, ...args) => {
    getSetValues(args.setValues);
    dispatch(registerFamilyAndUser(values));
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
  };

  return <SignUp {...SignUpProps} />;
};

export default SignUpContainer;
