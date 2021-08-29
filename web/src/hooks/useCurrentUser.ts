import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import useTypedSelector from './useTypedSelector'
import actions from '../state/actions'

const useCurrentUser = () => {
  const dispatch = useDispatch()
  const { userActions } = actions
  const { currentUser } = useTypedSelector((state) => state.user)

  useEffect(() => {
    const fetchCurrentUser = () => dispatch(userActions.fetchCurrentUser())

    fetchCurrentUser()
  }, [dispatch, userActions])

  return { currentUser }
}

export default useCurrentUser
