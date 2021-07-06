import { FC } from "react";
import useStyles from "./UserFormStyles";
import TextInput from "../TextInput";
import Button from "../Button";
import { Formik, Form, FormikValues, FormikHelpers } from "formik";
import { FormControlLabel, Switch, Grid } from "@material-ui/core";
import UserSignUpSchema from "../../ValidationSchema/UserSignUp/UserSignUpSchema";

interface IUserFormProps {
  onSubmit: (values: FormikValues) => void | Promise<any>;
  onHandleSwitchChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: (
      field: string,
      value: any,
      shouldValidate?: boolean
    ) => void,
    name: string
  ) => void;
}

interface IUserFormValues {
  name: string;
  email: string;
  admin: boolean;
  age?: number;
}

const UserForm: FC<IUserFormProps> = ({ onHandleSwitchChange, onSubmit }) => {
  const classes = useStyles();
  const intialValues: IUserFormValues = {
    name: "",
    email: "",
    admin: false,
    age: 0,
  };

  return (
    <Formik
      initialValues={intialValues}
      onSubmit={onSubmit}
      validationSchema={UserSignUpSchema}>
      {({ values, setFieldValue }) => (
        <Form>
          <Grid
            className={classes.root}
            spacing={2}
            container
            direction="column"
            justify="center">
            <Grid item xs={11} className={classes.textInput}>
              <TextInput
                label="Name"
                name="name"
                id="name"
                type="text"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={11} className={classes.textInput}>
              <TextInput
                label="Email"
                name="email"
                id="email"
                type="email"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={11} className={classes.textInput}>
              <TextInput
                label="Age"
                name="age"
                id="age"
                type="number"
                variant="outlined"
              />
            </Grid>

            <Grid item className={classes.switch} xs={11}>
              <FormControlLabel
                label="Admin"
                control={
                  <Switch
                    inputProps={{ "aria-label": "Admin" }}
                    name="admin"
                    id="admin"
                    color="primary"
                    checked={values.admin}
                    onChange={(e) =>
                      onHandleSwitchChange(e, setFieldValue, "admin")
                    }
                  />
                }
              />
            </Grid>

            <Grid item xs={11} className={classes.submitButton}>
              <Button type="submit" variant="contained" color="secondary">
                Create User
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

export default UserForm;
