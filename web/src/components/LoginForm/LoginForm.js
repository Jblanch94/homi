import { Grid } from "@material-ui/core";
import TextInput from "../TextInput";
import Button from "../Button";
import Typography from "../Typography";

import { Formik, Form } from "formik";
import LoginSchema from "../../ValidationSchema/LoginForm/LoginFormSchema";

const LoginForm = ({ onSubmit, classes, matches }) => {
  return (
    <>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={LoginSchema}
        onSubmit={onSubmit}>
        {({ isSubmitting, isValid }) => {
          return (
            <Form>
              <div className={classes.gridContainer}>
                <header className={classes.header}>
                  <Typography variant="h2" className={classes?.header}>
                    Login with Homi
                  </Typography>
                </header>
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
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} className={classes.buttonContainer}>
                    <Button
                      className={classes.submitButton}
                      type="submit"
                      color="primary"
                      variant="contained"
                      disabled={isSubmitting || !isValid}
                      fullWidth
                      disableElevation>
                      Login
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default LoginForm;
