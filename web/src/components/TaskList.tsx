import { FC, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import TaskItem from './TaskItem/TaskItem'
import actions from '../state/actions'
import useTypedSelector from '../hooks/useTypedSelector'

const TaskList: FC<{}> = () => {
  const dispatch = useDispatch()
  const { currentUser, userProfiles } = useTypedSelector((state) => state.user)
  const { tasks } = useTypedSelector((state) => state.task)
  const { userActions, taskActions } = actions

  useEffect(() => {
    const fetchCurrentUser = () => dispatch(userActions.fetchCurrentUser())

    fetchCurrentUser()
  }, [dispatch, userActions])

  useEffect(() => {
    const fetchTasks = (familyId: number) =>
      dispatch(taskActions.fetchTasks(familyId))

    const familyId = currentUser.FamilyId
    if (familyId) {
      fetchTasks(familyId)
    }
  }, [dispatch, taskActions, currentUser.FamilyId])

  return (
    <>
      {tasks.map((task: any) => {
        return <TaskItem key={task.id} {...task} userProfiles={userProfiles} />
      })}
    </>
  )
}

export default TaskList
