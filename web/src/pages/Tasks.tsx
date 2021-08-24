import { FC } from 'react'
import { Theme, makeStyles, Divider } from '@material-ui/core'

import ResourceHeader from '../components/ResourceHeader/ResourceHeader'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    [theme.breakpoints.up('md')]: {
      width: 'calc(100% - 240px)',
      marginLeft: '240px',
    },
  },
}))

const Tasks: FC<{}> = () => {
  const classes = useStyles()
  return (
    <>
      <ResourceHeader title='Tasks' path='add-task' />
      <Divider />
      <main className={classes.root}>Tasks Page</main>
    </>
  )
}
export default Tasks
