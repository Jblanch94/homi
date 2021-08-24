import { FC } from 'react'
import { Grid, useMediaQuery, useTheme } from '@material-ui/core'
import { Formik, Form, FormikValues } from 'formik'
import { History } from 'history'

import TextInput from '../TextInput'
import Button from '../Button'
import Typography from '../Typography'
import LoginSchema from '../../ValidationSchema/LoginForm/LoginFormSchema'
import useStyles from './LoginFormStyles'
import useTypedSelector from '../../hooks/useTypedSelector'
import actions from '../../state/actions'
import useActions from '../../hooks/useActions'

interface ILoginForm {
  history: History
}

const LoginForm: FC<ILoginForm> = ({ history }) => {
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('sm'))
  const classes = useStyles()
  const auth = useTypedSelector((state) => state.auth)
  const { login } = useActions(actions.authActions)

  const onSubmit = (values: FormikValues): void => login(values, history)
  return (
    <>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={LoginSchema}
        onSubmit={onSubmit}>
        {({ isSubmitting, isValid }) => {
          return (
            <>
              <Form>
                <header className={classes.header}>
                  <>
                    <Typography variant='h2' className={classes.header}>
                      Login with Homi
                    </Typography>
                    {auth.isError && (
                      <Typography variant='h4' align='center' color='error'>
                        {auth.error}
                      </Typography>
                    )}
                  </>
                </header>

                <div className={classes.gridContainer}>
                  <Grid
                    container
                    spacing={2}
                    direction='column'
                    alignItems={matches ? 'center' : 'flex-start'}>
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      className={classes.textFieldContainer}>
                      <TextInput
                        label='Email'
                        name='email'
                        id='email'
                        variant='outlined'
                        type='email'
                        error={auth.isError}
                      />
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      className={classes.textFieldContainer}>
                      <TextInput
                        label='Password'
                        name='password'
                        id='password'
                        variant='outlined'
                        type='password'
                        error={auth.isError}
                      />
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      className={classes.buttonContainer}>
                      <Button
                        className={classes.submitButton}
                        type='submit'
                        color='primary'
                        variant='contained'
                        disabled={auth.isLoading || !isValid}
                        fullWidth
                        disableElevation>
                        Login
                      </Button>
                    </Grid>
                  </Grid>
                </div>
              </Form>
            </>
          )
        }}
      </Formik>
    </>
  )
}

export default LoginForm
