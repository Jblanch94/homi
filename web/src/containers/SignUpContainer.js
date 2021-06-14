import { useDispatch } from "react-redux";
import { registerFamilyAndUser } from "../state/actions/authActions";
import familyRegistrationSchema from "../ValidationSchema/SignUpForm/FamilyRegistration";
import userRegistrationSchema from "../ValidationSchema/SignUpForm/UserRegistration";

import SignUp from "../pages/SignUp";

const SignUpContainer = () => {
  const dispatch = useDispatch();
  const handleSubmit = (values, ...args) => {
    // Handle two asynchorous requests
    // 1. Register Family and handle any errors
    // 2. Register User with Family and handle any error
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
  };

  return <SignUp {...SignUpProps} />;
};

export default SignUpContainer;
