import { FC } from 'react'
import { Formik, Form, FormikValues } from 'formik'
import { FormControlLabel, Switch, Grid } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import useStyles from './UserFormStyles'
import TextInput from '../TextInput'
import Button from '../Button'
import UserSignUpSchema from '../../ValidationSchema/UserSignUp/UserSignUpSchema'
import useTypedSelector from '../../hooks/useTypedSelector'
import actions from '../../state/actions'

interface IUserFormValues {
  name: string
  email: string
  admin: boolean
  age?: number
}

const UserForm: FC<{}> = () => {
  const classes = useStyles()
  const intialValues: IUserFormValues = {
    name: '',
    email: '',
    admin: false,
    age: 0,
  }
  const { userActions } = actions

  const dispatch = useDispatch()
  const user = useTypedSelector((state) => state.user)
  const history = useHistory()

  const onHandleSwitchChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fn: (field: string, value: any, shouldValidate?: boolean) => void,
    name: string
  ) => {
    fn(name, e.target.checked)
  }

  const onSubmit = (values: FormikValues) => {
    const familyId: number = user.currentUser.FamilyId
    const data = {
      name: values.name,
      email: values.email,
      admin: values.admin,
      familyId,
    }
    dispatch(userActions.registerUser(data))
    if (user.error === '') {
      history.push('/family')
    }
  }

  return (
    <Formik
      initialValues={intialValues}
      onSubmit={onSubmit}
      validationSchema={UserSignUpSchema}>
      {({ values, setFieldValue }) => (
        <Form>
          <Grid
            className={classes.root}
            spacing={2}
            container
            direction='column'
            justify='center'>
            <Grid item xs={11} className={classes.textInput}>
              <TextInput
                label='Name'
                name='name'
                id='name'
                type='text'
                variant='outlined'
              />
            </Grid>
            <Grid item xs={11} className={classes.textInput}>
              <TextInput
                label='Email'
                name='email'
                id='email'
                type='email'
                variant='outlined'
              />
            </Grid>
            <Grid item xs={11} className={classes.textInput}>
              <TextInput
                label='Age'
                name='age'
                id='age'
                type='number'
                variant='outlined'
              />
            </Grid>

            <Grid item className={classes.switch} xs={11}>
              <FormControlLabel
                label='Admin'
                control={
                  <Switch
                    inputProps={{ 'aria-label': 'Admin' }}
                    name='admin'
                    id='admin'
                    color='primary'
                    checked={values.admin}
                    onChange={(e) =>
                      onHandleSwitchChange(e, setFieldValue, 'admin')
                    }
                  />
                }
              />
            </Grid>

            <Grid item xs={11} className={classes.submitButton}>
              <Button type='submit' variant='contained' color='secondary'>
                Create User
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  )
}

export default UserForm
