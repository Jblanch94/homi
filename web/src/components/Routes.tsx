import { FC, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import UnAuthRoutes from './UnAuthRoutes'
import AuthRoutes from './AuthRoutes'
import actions from '../state/actions'
import useTypedSelector from '../hooks/useTypedSelector'

const Routes: FC<{}> = () => {
  const { isAuthenticated } = useTypedSelector((state) => state.auth)
  const dispatch = useDispatch()
  const { authActions } = actions
  const accessToken = JSON.parse(
    window.localStorage.getItem('auth') ?? '{}'
  )?.accessToken

  useEffect(() => {
    const refreshToken = () => dispatch(authActions.refreshToken())

    if (accessToken) {
      refreshToken()
    }
  }, [dispatch, authActions, accessToken, isAuthenticated])

  return <>{isAuthenticated ? <AuthRoutes /> : <UnAuthRoutes />}</>
}

export default Routes
