import { Button, Grid, Typography } from '@material-ui/core';
import { Formik, Form } from 'formik';
import useStyles from './WizardStyles';

const Wizard = ({
  children,
  step,
  snapshot,
  handleSubmit,
  renderFormChildren,
  stepNumber,
  previousPage,
  nextPage,
  isLastStep,
}) => {
  const classes = useStyles();

  return (
    <>
      <Typography variant="h2" className={classes.header}>
        {step.props.title}
      </Typography>
      <Formik
        initialValues={snapshot}
        onSubmit={handleSubmit}
        validationSchema={step.props.validationSchema}>
        {(props) => (
          <Form>
            <div className={classes.formGridContainer}>
              <Grid container direction="column">
                {renderFormChildren(props)}
                <Grid
                  container
                  justify="space-between"
                  className={classes.buttonsContainer}>
                  <Grid item>
                    <Button
                      variant="contained"
                      color="primary"
                      disabled={stepNumber === 0}
                      onClick={() => {
                        previousPage();
                        console.log(props);
                      }}>
                      Previous
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      disabled={props.isSubmitting}>
                      {isLastStep ? 'Submit' : 'Next'}
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default Wizard;
