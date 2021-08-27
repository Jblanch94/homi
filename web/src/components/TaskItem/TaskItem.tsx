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

interface IAssignedTask {
  TaskId: number
  UserId: number
}

interface ICategory {
  id: number
  title: string
}

interface IUser {
  id: number
  name: string
  profileUrl: string | null
  AssignedTasks?: IAssignedTask
}

interface ITaskItemProps {
  id: number
  FamilyId: number
  name: string
  notes: string
  completed: boolean
  users: IUser[]
  userProfiles: IUser[]
  Categories: ICategory[]
}

const TaskItem: FC<ITaskItemProps> = ({
  id,
  FamilyId,
  name,
  notes,
  completed,
  users,
  userProfiles,
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
          <Grid item xs={12}>
            <Typography variant='subtitle1' color='textSecondary'>
              {notes}
            </Typography>
          </Grid>
          <Grid item className={classes.chipContainer} xs={12}>
            {categoryChips}
          </Grid>
        </Grid>
        <Grid item className={classes.avatarContainer} xs={2}>
          <Avatar>J</Avatar>
        </Grid>
      </Grid>
      <Divider />
    </>
  )
}

export default TaskItem
