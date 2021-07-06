import useStyles from "./UserFormStyles";
import TextInput from "../TextInput";
import Button from "../Button";
import { Formik, Form } from "formik";
import { FormControlLabel, Switch, Grid } from "@material-ui/core";
import UserSignUpSchema from "../../ValidationSchema/UserSignUp/UserSignUpSchema";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../state/actions/userActions";
import { useHistory } from "react-router-dom";

const UserForm = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const history = useHistory();

  const onHandleSwitchChange = (e, fn, name) => {
    fn(name, e.target.checked);
  };

  const onSubmit = (values) => {
    const familyId = user.currentUser.FamilyId;
    const data = { ...values, familyId };
    dispatch(registerUser(data));
    if (user.error === "") {
      history.push("/family");
    }
  };

  return (
    <Formik
      initialValues={{ name: "", email: "", admin: false, age: 0 }}
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
