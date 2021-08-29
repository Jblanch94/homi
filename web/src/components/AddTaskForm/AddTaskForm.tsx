import { FC, useEffect } from 'react'
import {
  Grid,
  InputAdornment,
  Chip,
  Avatar,
  Box,
  useTheme,
} from '@material-ui/core'
import { Form, Formik, FormikValues } from 'formik'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import TextInput from '../TextInput'
import Button from '../Button'
import Tooltip from '../Tooltip'
import FormHeader from '../FormHeader/FormHeader'
import useStyles from './AddTaskFormStyles'
import useTypedSelector from '../../hooks/useTypedSelector'
import actions from '../../state/actions'
import Typography from '../Typography'
import AddTaskSchema from '../../ValidationSchema/TaskForm/AddTaskSchema'
import useCurrentUser from '../../hooks/useCurrentUser'

interface IInitialValues {
  name: string
  category: string
  categories: string[]
  assignedUserIds: number[]
  notes: string
}

const AddTaskForm: FC<{}> = () => {
  const initialValues: IInitialValues = {
    name: '',
    category: '',
    categories: [],
    notes: '',
    assignedUserIds: [],
  }
  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()
  const { currentUser } = useCurrentUser()
  const { userProfiles } = useTypedSelector((state) => state.user)
  const { isSuccess, isError, error } = useTypedSelector((state) => state.task)
  const { userActions, taskActions } = actions
  const theme = useTheme()

  useEffect(() => {
    const fetchUserProfiles = (id: number) =>
      dispatch(userActions.fetchUserProfiles(id))

    if (currentUser.FamilyId) {
      fetchUserProfiles(currentUser.FamilyId)
    }
  }, [dispatch, userActions, currentUser.FamilyId])

  function onHandleCategoryClick(
    setFieldValue: any,
    values: FormikValues
  ): void {
    const category = values['category']
    setFieldValue('categories', [...values['categories'], category])

    setFieldValue('category', '')
  }

  function onDeleteCategory(
    category: string,
    values: FormikValues,
    setFieldValue: any
  ) {
    const categories = values['categories']
    const filteredCategories = categories.filter((c: any) => c !== category)
    setFieldValue('categories', filteredCategories)
  }

  function renderChips(values: FormikValues, setFieldValue: any) {
    const categories = values['categories']
    return categories.map((category: string, index: number) => {
      return (
        <Chip
          key={index}
          color='primary'
          label={category}
          onDelete={() => onDeleteCategory(category, values, setFieldValue)}
        />
      )
    })
  }

  function renderProfiles(setFieldValue: any, values: FormikValues) {
    const userIds = values['assignedUserIds']
    return userProfiles.map((user: any) => {
      const selectedUser = userIds.find((x: any) => x === user.id)
      return (
        <Tooltip
          key={user.id}
          title={user.name}
          placement='top'
          aria-label={user.name}>
          <Avatar
            onClick={() => onHandleAvatarClick(user.id, setFieldValue, values)}
            src={user.profileUrl}
            style={
              selectedUser
                ? { background: theme.palette.success.main }
                : { background: theme.palette.primary.main }
            }
            className={classes.profile}>
            {user.name?.charAt(0) ?? ''}
          </Avatar>
        </Tooltip>
      )
    })
  }

  function onHandleAvatarClick(
    userId: number,
    setFieldValue: any,
    values: FormikValues
  ) {
    const assignedUserIds = values['assignedUserIds']
    const userIdExists = assignedUserIds.find((x: any) => x === userId)
    const newAssignedUserIds = userIdExists
      ? assignedUserIds.filter((x: any) => x !== userId)
      : [...assignedUserIds, userId]
    setFieldValue('assignedUserIds', newAssignedUserIds)
  }

  function onFormSubmit(values: FormikValues) {
    const userIds = values['assignedUserIds']
    const formValues = {
      userIds,
      notes: values['notes'],
      name: values['name'],
      categories: values['categories'],
    }

    dispatch(taskActions.addTask(formValues, currentUser.FamilyId))

    if (isSuccess && !isError) {
      history.push('/tasks')
    }
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onFormSubmit}
      validationSchema={AddTaskSchema}>
      {({ values, setFieldValue }) => (
        <Form>
          <>
            <FormHeader name='Add task' />
            <Grid container spacing={2} className={classes.root}>
              {isError && (
                <Typography
                  variant='h6'
                  style={{ color: theme.palette.error.main }}>
                  {error}
                </Typography>
              )}
              <Grid item xs={12} md={6}>
                <TextInput
                  variant='outlined'
                  id='name'
                  label='Name'
                  type='text'
                  name='name'
                />
              </Grid>

              <Grid item xs={12}>
                <Box
                  className={classes.assignUsersContainer}
                  borderColor={'#333'}
                  borderTop={1}
                  borderLeft={1}
                  borderRight={1}
                  borderBottom={1}>
                  <Typography variant='h6'>Assign</Typography>
                  <div className={classes.profilesContainer}>
                    {renderProfiles(setFieldValue, values)}
                  </div>
                </Box>
              </Grid>

              <Grid item xs={6}>
                <TextInput
                  variant='outlined'
                  id='category'
                  name='category'
                  label='Category'
                  placeholder='Enter a category...'
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <Button
                          color='primary'
                          variant='text'
                          onClick={() =>
                            onHandleCategoryClick(setFieldValue, values)
                          }>
                          Add
                        </Button>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <div className={classes.chipContainer}>
                  {renderChips(values, setFieldValue)}
                </div>
              </Grid>
              <Grid item xs={12}>
                <TextInput
                  variant='outlined'
                  name='notes'
                  id='notes'
                  type='text'
                  label='Notes'
                  placeholder='Enter some notes...'
                />
              </Grid>
            </Grid>
          </>
        </Form>
      )}
    </Formik>
  )
}

export default AddTaskForm
