import { FC } from "react";
import { Button, Grid, Typography } from "@material-ui/core";
import { Formik, Form, FormikValues, FormikProps } from "formik";
import useStyles from "./WizardStyles";

import { ReactElement } from "react";

interface IWizardProps {
  step: ReactElement;
  handleSubmit: (values: FormikValues, bag: any) => void;
  renderFormChildren: (props: FormikProps<{}>) => ReactElement[];
  stepNumber: number;
  previousPage: (values: FormikValues) => void;
  nextPage: (values: FormikValues) => void;
  isLastStep: boolean;
  snapshot: any;
}

const Wizard: FC<IWizardProps> = ({
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
              <Grid container direction="column" spacing={2}>
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
                        previousPage(props.values);
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
                      {isLastStep ? "Submit" : "Next"}
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
