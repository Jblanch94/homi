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
    paddingRight: theme.spacing(2),
    marginLeft: 'auto',
    display: 'flex',
    justifyContent: 'flex-end',
  },

  avatar: {
    marginRight: theme.spacing(1),
    background: theme.palette.primary.main,

    '&:hover': {
      cursor: 'pointer',
    },
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
