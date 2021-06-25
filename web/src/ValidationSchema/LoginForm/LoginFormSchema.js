import * as yup from "yup";

const LoginFormSchema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup.string("Enter Password").required("Password is required"),
});

export default LoginFormSchema;
