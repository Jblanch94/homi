import { useField } from "formik";
import { TextField } from "@material-ui/core";

const TextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <TextField
        {...props}
        {...field}
        fullWidth
        label={label}
        error={(meta.error && meta.touched) || props.error}
        helperText={meta.error}
      />
    </>
  );
};

export default TextInput;
