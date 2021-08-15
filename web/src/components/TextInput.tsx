import { FC } from "react";
import { FieldHookConfig, useField } from "formik";
import { TextField, OutlinedTextFieldProps } from "@material-ui/core";

interface ITextInputProps extends OutlinedTextFieldProps {}

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
        placeholder={props.placeholder}
        InputProps={props.InputProps}
        InputLabelProps={props.InputLabelProps}
        multiline={props.multiline ?? false}
        minRows={props.minRows}
        defaultValue={props.defaultValue}
      />
    </>
  );
};

export default TextInput;
