import { FC } from 'react'
import { Formik, Form, FormikValues, Field } from 'formik'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import DateFnsUtils from '@date-io/date-fns'

import FormHeader from '../FormHeader/FormHeader'
import TextInput from '../TextInput'
import DatePickerField from '../DatePickerField'
import { Grid } from '@material-ui/core'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import useStyles from './EventFormStyles'
import AddEventSchema from '../../ValidationSchema/EventForm/AddEventSchema'
import actions from '../../state/actions'
import useTypedSelector from '../../hooks/useTypedSelector'
import useCurrentUser from '../../hooks/useCurrentUser'

const EventForm: FC<{}> = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { currentUser } = useCurrentUser()
  const { isError, error } = useTypedSelector((state) => state.event)
  const { eventActions } = actions
  const initialValues = {
    title: '',
    description: '',
    startTime: '',
    endTime: '',
    date: new Date(),
  }
  const classes = useStyles()

  function onSubmit(values: FormikValues) {
    const familyId = currentUser?.FamilyId

    if (familyId) {
      dispatch(eventActions.addEvent(values, familyId, history))
    }
  }

  return (
    <>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Formik
          validationSchema={AddEventSchema}
          initialValues={initialValues}
          onSubmit={onSubmit}>
          <Form>
            <FormHeader name='Add Event' />
            {isError && (
              <div style={{ textAlign: 'center', color: 'red' }}>{error}</div>
            )}
            <Grid
              container
              spacing={2}
              className={classes.root}
              alignItems='flex-end'>
              <Grid item xs={12}>
                <TextInput
                  name='title'
                  id='title'
                  type='text'
                  variant='outlined'
                  label='Title'
                  placeholder='Enter the title of the event...'
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextInput
                  name='description'
                  id='description'
                  type='text'
                  variant='outlined'
                  label='Description'
                  placeholder='Enter a description for the event...'
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Field name='date' component={DatePickerField} />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextInput
                  id='startTime'
                  name='startTime'
                  variant='outlined'
                  label='Start Time'
                  type='time'
                  InputLabelProps={{ shrink: true }}
                  inputProps={{ step: 300 }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextInput
                  id='endTime'
                  name='endTime'
                  variant='outlined'
                  label='End Time'
                  type='time'
                  InputLabelProps={{ shrink: true }}
                  inputProps={{ step: 300 }}
                />
              </Grid>
            </Grid>
          </Form>
        </Formik>
      </MuiPickersUtilsProvider>
    </>
  )
}

export default EventForm
