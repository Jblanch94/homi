import { Grid } from "@material-ui/core";
import TextInput from "../TextInput";
import Button from "../Button";
import Typography from "../Typography";

import { Formik, Form, FormikValues } from "formik";
import LoginSchema from "../../ValidationSchema/LoginForm/LoginFormSchema";
import { FC } from "react";
import { ClassNameMap } from "@material-ui/core/styles/withStyles";

interface ILoginForm {
  onSubmit: (values: FormikValues) => void;
  classes: ClassNameMap<
    | "gridContainer"
    | "textFieldContainer"
    | "buttonContainer"
    | "submitButton"
    | "header"
  >;
  matches: boolean;
  isError: boolean;
  errorMsg: string;
  loading: boolean;
}

const LoginForm: FC<ILoginForm> = ({
  onSubmit,
  classes,
  matches,
  ...props
}) => {
  return (
    <>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={LoginSchema}
        onSubmit={onSubmit}>
        {({ isSubmitting, isValid }) => {
          return (
            <>
              <Form>
                <header className={classes.header}>
                  <>
                    <Typography variant="h2" className={classes.header}>
                      Login with Homi
                    </Typography>
                    {props.isError && (
                      <Typography variant="h4" align="center" color="error">
                        {props.errorMsg}
                      </Typography>
                    )}
                  </>
                </header>

                <div className={classes.gridContainer}>
                  <Grid
                    container
                    spacing={2}
                    direction="column"
                    alignItems={matches ? "center" : "flex-start"}>
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      className={classes.textFieldContainer}>
                      <TextInput
                        label="Email"
                        name="email"
                        id="email"
                        variant="outlined"
                        type="email"
                        error={props.isError}
                      />
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      className={classes.textFieldContainer}>
                      <TextInput
                        label="Password"
                        name="password"
                        id="password"
                        variant="outlined"
                        type="password"
                        error={props.isError}
                      />
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      className={classes.buttonContainer}>
                      <Button
                        className={classes.submitButton}
                        type="submit"
                        color="primary"
                        variant="contained"
                        disabled={props.loading || !isValid}
                        fullWidth
                        disableElevation>
                        Login
                      </Button>
                    </Grid>
                  </Grid>
                </div>
              </Form>
            </>
          );
        }}
      </Formik>
    </>
  );
};

export default LoginForm;
