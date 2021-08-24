import { FC } from 'react'
import Dialog from '../Dialog'
import {
  DialogTitle,
  DialogActions,
  DialogContent,
  Grid,
} from '@material-ui/core'
import { Formik, Form, FormikValues } from 'formik'
import { useDispatch } from 'react-redux'

import Button from '../Button'
import TextInput from '../TextInput'
import Typography from '../Typography'
import EditGroceryItemSchema from '../../ValidationSchema/GroceryForm/EditGroceryItemSchema'
import useStyles from './EditGroceryItemDialogStyles'
import actions from '../../state/actions'

interface IEditGroceryItemDialogProps {
  id: number
  familyId: number
  open: boolean
  modalToggle: () => void
  item: string
  quantity: number
  details: string
}

const EditGroceryItemDialog: FC<IEditGroceryItemDialogProps> = ({
  open,
  modalToggle,
  item,
  quantity,
  details,
  id,
  familyId,
}) => {
  const classes = useStyles()
  const initialValues = { item, quantity, details }

  const dispatch = useDispatch()
  const { groceryActions } = actions

  const onFormSubmit = (values: FormikValues) => {
    dispatch(groceryActions.updateGroceryItem(id, familyId, values))
    modalToggle()
  }

  return (
    <Dialog
      open={open}
      modalToggle={modalToggle}
      aria-labelledby='grocery-item-edit-form'>
      <DialogTitle id='grocery-item-edit-form' disableTypography>
        <Typography variant='h4' color='textPrimary' className={classes.title}>
          {item}
        </Typography>
      </DialogTitle>
      <Formik
        validationSchema={EditGroceryItemSchema}
        initialValues={initialValues}
        onSubmit={onFormSubmit}>
        <Form id='grocery-item-edit-form'>
          <DialogContent>
            <Grid container direction='column' spacing={2}>
              <Grid item xs={12}>
                <TextInput
                  name='quantity'
                  id='quantity'
                  label='Quantity'
                  type='number'
                  variant='outlined'
                />
              </Grid>
              <Grid item xs={12}>
                <TextInput
                  name='details'
                  id='details'
                  label='Details'
                  type='text'
                  variant='outlined'
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions className={classes.buttonsContainer}>
            <Button onClick={modalToggle} variant='outlined' color='secondary'>
              Cancel
            </Button>
            <Button variant='outlined' color='primary' type='submit'>
              Save
            </Button>
          </DialogActions>
        </Form>
      </Formik>
    </Dialog>
  )
}

export default EditGroceryItemDialog
