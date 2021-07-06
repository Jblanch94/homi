import * as yup from "yup";

export default yup.object({
  name: yup.string().required("Name is required"),
  admin: yup.boolean().required("Role is required"),
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  age: yup.number("Please enter a valid number").optional().min(0),
});
