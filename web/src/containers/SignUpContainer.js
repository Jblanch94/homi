import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { registerFamilyAndUser } from "../state/actions/authActions";
import familyRegistrationSchema from "../ValidationSchema/SignUpForm/FamilyRegistration";
import userRegistrationSchema from "../ValidationSchema/SignUpForm/UserRegistration";
import useToggle from "../hooks/useToggle";

import SignUp from "../pages/SignUp";

const SignUpContainer = () => {
  const [setValues, getSetValues] = useState();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const [modalOpen, modalToggle] = useToggle(false);

  const handleSubmit = (values, ...args) => {
    getSetValues(args.setValues);
    dispatch(registerFamilyAndUser(values));
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
