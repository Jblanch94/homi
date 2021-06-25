import { Grid } from "@material-ui/core";
import { useMediaQuery } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import TextInput from "../TextInput";
import Button from "../Button";
import Typography from "../Typography";
import useStyles from "./LoginFormStyles";
import { Formik, Form } from "formik";
import LoginSchema from "../../ValidationSchema/LoginForm/LoginFormSchema";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../state/actions/authActions";

const LoginForm = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);

  const onSubmit = (values) => {
    dispatch(login(values));
  };

  console.log(user);

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
                  <Typography variant="h2" className={classes.header}>
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
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} className={classes.buttonContainer}>
                    <Button
                      type="submit"
                      color="primary"
                      variant="contained"
                      // disabled={isSubmitting || !isValid}
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
