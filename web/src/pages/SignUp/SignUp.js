import TextInput from '../../components/TextInput';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import { Button, Typography, Grid } from '@material-ui/core';
import useStyles from './SignUpStyles';

const SignUp = () => {
  const classes = useStyles();
  const validationSchema = yup.object({
    familyName: yup
      .string('Enter your family name')
      .required('Family name is required'),
    familyPassword: yup
      .string('Enter a family password')
      .required('Family password is required')
      .min(6, 'Password must be at least 6 characters'),

    reEnterPassword: yup
      .string('Re enter password')
      .required('Re enter Password')
      .when('familyPassword', {
        is: (val) => (val && val.length > 6 ? true : false),
        then: yup
          .string('Re enter password')
          .oneOf([yup.ref('familyPassword')], 'Passwords do not match'),
      }),
  });

  return (
    <>
      <Typography variant="h2" className={classes.header}>
        Sign up with Homi
      </Typography>
      <Formik
        validationSchema={validationSchema}
        initialValues={{
          familyName: '',
          familyPassword: '',
          reEnterPassword: '',
        }}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);
          console.log('values', values);
        }}>
        {(props) => (
          <div className={classes.gridContainer}>
            <Grid container direction="column">
              <Form>
                <Grid item xs={12} md={12} lg={10} xl={6}>
                  <TextInput
                    label="Family Name"
                    name="familyName"
                    id="familyName"
                    type="text"
                    placeholder="Family Name"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} md={12} lg={10} xl={6}>
                  <TextInput
                    label="Family Password"
                    name="familyPassword"
                    id="familyPassword"
                    type="password"
                    placeholder="Family Password"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} md={12} lg={10} xl={6}>
                  <TextInput
                    label="Re enter Password"
                    name="reEnterPassword"
                    id="reEnterPassword"
                    type="password"
                    placeholder="Re enter Password"
                    variant="outlined"
                  />
                </Grid>
                <Button
                  type="submit"
                  disabled={props.isSubmitting}
                  color="primary"
                  variant="contained">
                  Next
                </Button>
              </Form>
            </Grid>
          </div>
        )}
      </Formik>
    </>
  );
};

export default SignUp;
