import * as yup from "yup";

export default yup.object({
  name: yup.string().required("Recipe name is required"),
  description: yup.string().required("Recipe description is required"),
  notes: yup.string().optional(),
  preparation: yup.string().optional(),
  ingredients: yup.string().optional(),
  tag: yup.string().optional().min(1),
});
