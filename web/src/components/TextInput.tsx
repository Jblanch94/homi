import { FC } from "react";
import { FieldHookConfig, useField } from "formik";
import { TextField, BaseTextFieldProps } from "@material-ui/core";

interface ITextInputProps extends BaseTextFieldProps {}

const TextInput: FC<ITextInputProps & FieldHookConfig<string>> = (props) => {
  const [field, meta] = useField(props);
  return (
    <>
      <TextField
        {...field}
        name={props.name}
        id={props.id}
        variant={props.variant}
        type={props.type}
        fullWidth={props.fullWidth ?? true}
        label={props.label}
        disabled={props.disabled}
        error={(meta.error && meta.touched) || props.error}
        helperText={meta.error}
      />
    </>
  );
};

export default TextInput;
