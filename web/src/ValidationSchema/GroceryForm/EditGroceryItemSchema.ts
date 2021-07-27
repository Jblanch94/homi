import * as yup from "yup";

export default yup.object({
  quantity: yup.number().min(0, "Please enter a valid quantity"),
  details: yup.string().optional(),
});
