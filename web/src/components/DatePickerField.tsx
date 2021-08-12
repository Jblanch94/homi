import { FC } from "react";
import {
  KeyboardDatePicker,
  KeyboardDatePickerProps,
} from "@material-ui/pickers";
import { FormikValues, FieldProps } from "formik";

const DatePickerField: FC<KeyboardDatePickerProps & FieldProps<FormikValues>> =
  ({ form, field, ...props }) => {
    const currentError = form.errors[field.name];

    return (
      <KeyboardDatePicker
        disableToolbar
        disablePast
        inputVariant="outlined"
        name={field.name}
        value={field.value}
        variant="inline"
        format="MM/dd/yyyy"
        helperText={currentError}
        error={Boolean(currentError)}
        onError={(error) => {
          if (error !== currentError) {
            form.setFieldError(field.name, error?.toString());
          }
        }}
        onChange={(date) => form.setFieldValue(field.name, date, true)}
        children={props.children}
      />
    );
  };

export default DatePickerField;
