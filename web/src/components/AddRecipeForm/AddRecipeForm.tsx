import { FC } from 'react'
import FormHeader from '../FormHeader/FormHeader'
import { Grid, InputAdornment, Chip } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import TextInput from '../TextInput'
import Button from '../Button'
import { Formik, Form, FormikValues } from 'formik'
import useStyles from './AddRecipeFormStyles'
import AddRecipeSchema from '../../ValidationSchema/RecipeForm/AddRecipeSchema'
import useTypedSelector from '../../hooks/useTypedSelector'
import useCurrentUser from '../../hooks/useCurrentUser'
import actions from '../../state/actions'

const AddRecipeForm: FC<{}> = () => {
  const classes = useStyles()
  const initialValues = {
    name: '',
    description: '',
    ingredients: '',
    preparation: '',
    notes: '',
    tag: '',
    tags: [] as string[],
  }

  const dispatch = useDispatch()
  const history = useHistory()
  const { isSuccess } = useTypedSelector((state) => state.recipe)
  const { currentUser } = useCurrentUser()
  const { recipeActions } = actions

  const addRecipeUrl = `/family/${currentUser.FamilyId}/user/${currentUser.id}`

  const onFormSubmit = (values: FormikValues): void => {
    dispatch(recipeActions.addRecipe(values, addRecipeUrl))

    if (isSuccess) {
      history.push('/recipes')
    }
  }

  function addTag(
    name: string,
    values: FormikValues,
    setFieldValue: (
      field: string,
      value: any,
      shouldValidate?: boolean | undefined
    ) => void
  ) {
    //   get the value of the tag and append to the tags array
    const tag = values[name]
    const tags = values['tags']

    if (tag.length <= 0) return
    setFieldValue('tags', [...tags, tag])

    //   clear the input field
    setFieldValue(name, '')
  }

  function renderChips(tags: string[]) {
    return tags.map((tag: string, index: number) => {
      return (
        <Chip
          size='small'
          title={tag}
          label={tag}
          key={index}
          color='primary'
        />
      )
    })
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={AddRecipeSchema}
      onSubmit={onFormSubmit}>
      {({ values, setFieldValue }) => (
        <Form>
          <FormHeader name='Add Recipe' />
          <Grid container spacing={2} className={classes.root}>
            <Grid item md={6} xs={12}>
              <TextInput
                name='name'
                id='name'
                label='Recipe'
                placeholder='Enter name for recipe...'
                variant='outlined'
                type='text'
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextInput
                name='description'
                id='description'
                variant='outlined'
                label='Description'
                placeholder='Enter description of recipe...'
                type='text'
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextInput
                variant='outlined'
                name='ingredients'
                id='ingredients'
                label='Ingredients'
                placeholder='Enter ingredients for recipe...'
                type='text'
                multiline
                minRows={4}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextInput
                variant='outlined'
                name='preparation'
                id='preparation'
                label='Preparation'
                placeholder='Enter preparation details...'
                type='text'
                multiline
                minRows={4}
              />
            </Grid>
            <Grid
              item
              container
              spacing={2}
              xs={6}
              className={classes.notesTagsContainer}>
              <Grid item xs={12}>
                <TextInput
                  name='notes'
                  id='notes'
                  label='Notes'
                  variant='outlined'
                  placeholder='Enter some notes...'
                  type='text'
                />
              </Grid>
              <Grid item xs={12}>
                <TextInput
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <Button
                          variant='text'
                          color='primary'
                          onClick={() => addTag('tag', values, setFieldValue)}>
                          Add
                        </Button>
                      </InputAdornment>
                    ),
                  }}
                  name='tag'
                  id='tag'
                  label='Tag'
                  variant='outlined'
                  placeholder='Enter a tag...'
                  type='text'
                />
              </Grid>
              <Grid item className={classes.chipContainer}>
                {renderChips(values['tags'])}
              </Grid>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  )
}

export default AddRecipeForm
