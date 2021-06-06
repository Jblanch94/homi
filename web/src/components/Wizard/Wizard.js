import { useState, Children, cloneElement } from 'react';
import { Button, Grid, Typography } from '@material-ui/core';
import { Formik, Form } from 'formik';
import useStyles from './WizardStyles';

const Wizard = ({ children, initialValues, onSubmit }) => {
  const [stepNumber, setStepNumber] = useState(0);
  const [snapshot, setSnapshot] = useState(initialValues);
  const steps = Children.toArray(children);

  const step = steps[stepNumber];
  const totalSteps = steps.length;
  const isLastStep = stepNumber === totalSteps - 1;

  const next = (values) => {
    setSnapshot(values);
    setStepNumber(Math.min(stepNumber + 1, totalSteps - 1));
  };

  const previous = (values) => {
    setSnapshot(values);
    setStepNumber(Math.max(stepNumber - 1, 0));
  };

  const handleSubmit = async (values, bag) => {
    if (isLastStep) {
      return onSubmit(values, bag);
    } else {
      bag.setTouched({});
      next(values);
    }
    console.log(values);
  };

  function renderFormChildren(props) {
    return Children.map(step.props.children, (child, index) => {
      return cloneElement(child, { ...props });
    });
  }

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
                        previous();
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
