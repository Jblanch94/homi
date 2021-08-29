import { FC } from 'react'
import { Grid, Divider, Avatar } from '@material-ui/core'
import { CheckCircleOutline } from '@material-ui/icons'
import { useDispatch } from 'react-redux'

import Typography from '../Typography'
import IconButton from '../IconButton'
import Tooltip from '../Tooltip'
import Chip from '../Chip'
import useStyles from './TaskItemStyles'
import actions from '../../state/actions'
import { IUser, ICategory } from '../../types'

interface ITaskItemProps {
  id: number
  FamilyId: number
  name: string
  notes: string
  completed: boolean
  Users: IUser[]
  userProfiles: IUser[]
  Categories: ICategory[]
}

const TaskItem: FC<ITaskItemProps> = ({
  id,
  FamilyId,
  name,
  notes,
  completed,
  Users,
  Categories,
}) => {
  const classes = useStyles({ completed })
  const dispatch = useDispatch()
  const { taskActions } = actions

  const toggleCompletion = () =>
    dispatch(taskActions.updateTasks(id, FamilyId, { completed: !completed }))

  const categoryChips = Categories?.map((category: ICategory) => {
    return (
      <Chip
        key={category.id}
        color='primary'
        size='small'
        label={category.title}
      />
    )
  })

  const avatars = Users.map((user: IUser) => {
    return (
      <Tooltip
        id={user.name}
        title={user.name}
        key={user.id}
        placement='bottom'>
        <Avatar
          alt={user.name}
          src={user.profileUrl ?? ''}
          className={classes.avatar}>
          {user.name.charAt(0)}
        </Avatar>
      </Tooltip>
    )
  })

  return (
    <>
      <Grid container alignItems='center'>
        <Grid item>
          <IconButton onClick={toggleCompletion}>
            <CheckCircleOutline
              fontSize='large'
              className={classes.completedIcon}
            />
          </IconButton>
        </Grid>
        <Grid item xs={6}>
          <Typography variant='h6'>{name}</Typography>
          <Grid item xs>
            <Typography variant='subtitle1' color='textSecondary'>
              {notes}
            </Typography>
          </Grid>
          <Grid item className={classes.chipContainer} xs>
            {categoryChips}
          </Grid>
        </Grid>
        <Grid item className={classes.avatarContainer} lg={6} md={4} xs={2}>
          {avatars}
        </Grid>
      </Grid>
      <Divider />
    </>
  )
}

export default TaskItem
