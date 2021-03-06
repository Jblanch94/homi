import { FC, Fragment, SyntheticEvent, useState } from 'react'
import { Grid, IconButton, Avatar, Divider, Tooltip } from '@material-ui/core'
import { CheckCircleOutline } from '@material-ui/icons'
import { useDispatch } from 'react-redux'

import Typography from '../Typography'
import Chip from '../Chip'
import EditGroceryItemDialog from '../EditGroceryItemDialog/EditGroceryItemDialog'
import useStyles from './GroceryItemStyles'
import actions from '../../state/actions'
import { ICategory } from '../../types'

interface IGroceryItemProps {
  hasBeenBought: boolean
  item: string
  name: string
  profileUrl: string
  id: number
  quantity: number
  details: string
  familyId: number
  categories: ICategory[]
}

const GroceryItem: FC<IGroceryItemProps> = ({
  hasBeenBought,
  item,
  name,
  profileUrl,
  id,
  quantity,
  details,
  familyId,
  categories,
}) => {
  const classes = useStyles()

  const categoryChips = categories.map((c: ICategory) => {
    return (
      <Chip
        className={classes.chip}
        size='small'
        title={c.title}
        key={c.id}
        color='secondary'
        label={c.title}
      />
    )
  })

  const dispatch = useDispatch()
  const { groceryActions } = actions
  const [open, setOpen] = useState(false)

  const updateGroceryItem = (
    e: SyntheticEvent,
    id: number,
    familyId: number,
    data: any
  ) => {
    e.stopPropagation()
    dispatch(groceryActions.updateGroceryItem(id, familyId, data))
  }

  const toggleDialog = () => setOpen(!open)

  return (
    <Fragment key={id}>
      <div onClick={toggleDialog} style={{ cursor: 'pointer' }}>
        <Grid container alignItems='center'>
          <Grid item className={classes.root}>
            <IconButton
              onClick={(e) =>
                updateGroceryItem(e, id, familyId, {
                  bought: !hasBeenBought,
                })
              }>
              <CheckCircleOutline
                color={hasBeenBought ? 'primary' : 'disabled'}
              />
            </IconButton>
          </Grid>
          <Grid item>
            <Typography
              variant='body1'
              color={hasBeenBought ? 'textSecondary' : 'textPrimary'}
              className={hasBeenBought ? classes.crossedOff : ''}>
              {item}
            </Typography>
          </Grid>

          <Grid item className={classes.avatar}>
            <Tooltip title={name} placement='bottom'>
              <Avatar alt={name} src={profileUrl ?? ''}>
                {name.charAt(0)}
              </Avatar>
            </Tooltip>
          </Grid>
        </Grid>
        <Grid
          container
          alignItems='center'
          spacing={2}
          className={classes.quantity}>
          <Grid item>
            <Typography variant='body2' color='textSecondary'>
              {quantity}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant='subtitle2' color='textSecondary'>
              {details ?? ''}
            </Typography>
          </Grid>
          <Grid item className={classes.chipContainer} xs={8}>
            {categoryChips}
          </Grid>
        </Grid>
        <Divider />
      </div>

      <EditGroceryItemDialog
        open={open}
        modalToggle={toggleDialog}
        item={item}
        details={details}
        quantity={quantity}
        id={id}
        familyId={familyId}
      />
    </Fragment>
  )
}

export default GroceryItem
