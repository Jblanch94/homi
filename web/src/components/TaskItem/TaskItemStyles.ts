import { makeStyles, Theme } from '@material-ui/core'

interface IProps {
  completed: boolean
}

const useStyles = makeStyles((theme: Theme) => ({
  completedIcon: (props: IProps) => ({
    color: props.completed
      ? theme.palette.success.main
      : theme.palette.grey[400],
  }),

  avatarContainer: {
    marginLeft: 'auto',
    paddingRight: theme.spacing(2),
  },

  chipContainer: {
    display: 'flex',
    justifyContent: 'start',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
}))

export default useStyles
