import { Theme, makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginTop: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },

  profilesContainer: {
    display: 'flex',
    marginTop: theme.spacing(4),
  },

  assignUsersContainer: {
    paddingBottom: theme.spacing(2),
    paddingLeft: theme.spacing(2),
  },

  profile: {
    marginRight: theme.spacing(2),
    background: theme.palette.primary.main,
    '&:hover': {
      cursor: 'pointer',
    },
  },

  chipContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
}))

export default useStyles
