import * as yup from "yup";

export default yup.object({
  quantity: yup.number().min(0, "Enter valid quantity"),
  item: yup.string().required("Item is required"),
});
