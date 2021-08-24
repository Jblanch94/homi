import { FC } from 'react'
import { Theme, makeStyles } from '@material-ui/core'

import AddTaskForm from '../components/AddTaskForm/AddTaskForm'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    [theme.breakpoints.up('md')]: {
      width: 'calc(100% - 240px)',
      marginLeft: '240px',
    },
  },
}))

const AddTask: FC<{}> = () => {
  const classes = useStyles()
  return (
    <>
      <main className={classes.root}>
        <section id='add-task-form'>
          <AddTaskForm />
        </section>
      </main>
    </>
  )
}

export default AddTask
