import { useState, Children, cloneElement } from 'react';
import { Button, Grid, Typography } from '@material-ui/core';
import { Formik, Form } from 'formik';

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

  function passPropsToChildren(props) {
    return Children.map(step.props.children, (child, index) => {
      return cloneElement(child, { ...props });
    });
  }

  return (
    <>
      <Typography variant="h2">{step.props.title}</Typography>
      <Formik
        initialValues={snapshot}
        onSubmit={handleSubmit}
        validationSchema={step.props.validationSchema}>
        {(props) => (
          <Form>
            {passPropsToChildren(props)}
            <Grid container justify="space-between">
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
          </Form>
        )}
      </Formik>
    </>
  );
};

export default Wizard;
