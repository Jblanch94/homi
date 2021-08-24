import { FC, ReactElement } from 'react'
import { Grid, IconButton, InputAdornment } from '@material-ui/core'
import { Add, Remove } from '@material-ui/icons'
import { Formik, Form, FormikValues } from 'formik'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import TextInput from '../TextInput'
import Typography from '../Typography'
import Button from '../Button'
import Chip from '../Chip'
import FormHeader from '../FormHeader/FormHeader'
import useStyles from './GroceryItemFormStyles'
import AddGroceryItemSchema from '../../ValidationSchema/GroceryForm/AddGroceryItemSchema'
import useTypedSelector from '../../hooks/useTypedSelector'
import actions from '../../state/actions'

const GroceryItemFrom: FC<{}> = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { groceryActions } = actions
  const { currentUser } = useTypedSelector((state) => state.user)
  const groceries = useTypedSelector((state) => state.grocery)

  const initialValues = {
    item: '',
    details: '',
    quantity: 0,
    category: '',
    categories: [] as string[],
  }
  const classes = useStyles()

  function renderChips(
    values: FormikValues,
    setFieldValue: any
  ): ReactElement[] {
    const categories = values['categories']
    return categories.map((c: string, index: number) => {
      return (
        <Chip
          key={index}
          size='small'
          color='primary'
          label={c}
          onDelete={() => onHandleDelete(index, setFieldValue, values)}
        />
      )
    })
  }

  const onFormSubmit = (values: FormikValues): void => {
    dispatch(
      groceryActions.addGroceryItem(currentUser.FamilyId, values, history)
    )
  }

  const onHandleCategoryClick = (
    setFieldValue: (
      field: string,
      value: any,
      shouldValidate?: boolean | undefined
    ) => void,
    values: FormikValues,
    name: string
  ) => {
    //  add category to categories array
    const category = values[name]
    setFieldValue('categories', [...values['categories'], category])

    // clear category text input
    setFieldValue('category', '')
  }

  const onHandleDelete = (index: number, setFieldValue: any, values: any) => {
    values['categories'].splice(index, 1)
    setFieldValue('categories', values['categories'])
  }

  return (
    <>
      {groceries.isError && (
        <Typography variant='h4'>{groceries.error}</Typography>
      )}
      <Formik
        initialValues={initialValues}
        onSubmit={onFormSubmit}
        validationSchema={AddGroceryItemSchema}>
        {({ setFieldValue, values }) => (
          <Form>
            <FormHeader name='Grocery Item' />

            <div className={classes.root}>
              <Grid container direction='column' spacing={4}>
                <Grid item xs={12} md={10} className={classes.textInput}>
                  <TextInput
                    name='item'
                    id='item'
                    label='Item'
                    variant='outlined'
                    placeholder='Enter a grocery item...'
                  />
                </Grid>
                <div className={classes.quantityContainer}>
                  <Grid
                    container
                    item
                    justify='space-between'
                    alignItems='center'
                    xs={12}
                    md={10}>
                    <Grid item xs={2} className={classes.quantityButton}>
                      <IconButton
                        onClick={() =>
                          setFieldValue('quantity', values['quantity'] - 1)
                        }>
                        <Remove fontSize='medium' />
                      </IconButton>
                    </Grid>
                    <Grid
                      item
                      xs={4}
                      md={6}
                      className={classes.textInput}
                      style={{ textAlign: 'center' }}>
                      <TextInput
                        name='quantity'
                        id='quantity'
                        label='Quantity'
                        variant='outlined'
                        type='number'
                        disabled
                        fullWidth={false}
                        placeholder='Enter a quantity...'
                        error={values['quantity'] < 0}
                      />
                    </Grid>
                    <Grid item xs={2} className={classes.quantityButton}>
                      <IconButton
                        onClick={() =>
                          setFieldValue('quantity', values['quantity'] + 1)
                        }>
                        <Add fontSize='medium' />
                      </IconButton>
                    </Grid>
                  </Grid>
                </div>
                <Grid item className={classes.textInput} xs={12} md={10}>
                  <TextInput
                    name='details'
                    id='details'
                    label='Details'
                    variant='outlined'
                    placeholder='Enter some details about the item...'
                  />
                </Grid>
                <Grid item className={classes.textInput} xs={12} md={10}>
                  <TextInput
                    name='category'
                    id='category'
                    label='Category'
                    variant='outlined'
                    placeholder='Enter a category...'
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position='start'>
                          <Button
                            variant='text'
                            color='primary'
                            onClick={() =>
                              onHandleCategoryClick(
                                setFieldValue,
                                values,
                                'category'
                              )
                            }>
                            Add
                          </Button>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <div className={classes.chipContainer}>
                  {renderChips(values, setFieldValue)}
                </div>
              </Grid>
            </div>
          </Form>
        )}
      </Formik>
    </>
  )
}

export default GroceryItemFrom
