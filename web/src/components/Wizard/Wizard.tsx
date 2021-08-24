import { FC, ReactElement, useState, Children, cloneElement } from 'react'
import { Button, Grid, Typography } from '@material-ui/core'
import { Formik, Form, FormikValues, FormikProps } from 'formik'

import useStyles from './WizardStyles'

interface IWizardProps {
  initialValues: FormikValues
  onSubmit: (values: FormikValues, bag: any) => void
}

const Wizard: FC<IWizardProps> = ({ initialValues, onSubmit, children }) => {
  const classes = useStyles()
  const [stepNumber, setStepNumber] = useState(0)
  const [snapshot, setSnapshot] = useState(initialValues)
  const steps = Children.toArray(children) as ReactElement[]

  const step = steps[stepNumber]
  const totalSteps = steps.length
  const isLastStep = stepNumber === totalSteps - 1

  const nextPage = (values: FormikValues) => {
    setSnapshot(values)
    setStepNumber(Math.min(stepNumber + 1, totalSteps - 1))
  }

  const previousPage = (values: FormikValues) => {
    setSnapshot(values)
    setStepNumber(Math.max(stepNumber - 1, 0))
  }

  const handleSubmit = async (values: FormikValues, bag: any) => {
    if (isLastStep) {
      return onSubmit(values, bag)
    } else {
      console.log('Going to next page')
      bag.setTouched({})
      nextPage(values)
    }
  }

  const renderFormChildren = (props: FormikProps<{}>) => {
    return Children.map(step.props.children, (child: ReactElement, index) => {
      return cloneElement(child, { ...props })
    })
  }

  return (
    <>
      <Typography variant='h2' className={classes.header}>
        {step.props.title}
      </Typography>
      <Formik
        initialValues={snapshot}
        onSubmit={handleSubmit}
        validationSchema={step.props.validationSchema}>
        {(props) => (
          <Form>
            <div className={classes.formGridContainer}>
              <Grid container direction='column' spacing={2}>
                {renderFormChildren(props)}
                <Grid
                  container
                  justify='space-between'
                  className={classes.buttonsContainer}>
                  <Grid item>
                    <Button
                      variant='contained'
                      color='primary'
                      disabled={stepNumber === 0}
                      onClick={() => {
                        previousPage(props.values)
                      }}>
                      Previous
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      variant='contained'
                      color='primary'
                      type='submit'
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
  )
}

export default Wizard
