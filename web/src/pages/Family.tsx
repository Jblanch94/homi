import { FC, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import actions from '../state/actions'
import useTypedSelector from '../hooks/useTypedSelector'
import FamilyHeader from '../components/FamilyHeader/FamilyHeader'

const Family: FC<{}> = () => {
  const dispatch = useDispatch()
  const { fetchCurrentUser, fetchUserProfiles } = actions.userActions
  const { fetchFamily } = actions.familyActions
  const user = useTypedSelector((state) => state.user)
  const family = useTypedSelector((state) => state.family)

  useEffect(() => {
    const currentUser = () => dispatch(fetchCurrentUser())
    const userProfiles = (familyId: number) =>
      dispatch(fetchUserProfiles(familyId))
    const family = (id: number) => dispatch(fetchFamily(id))
    const familyId = user.currentUser.FamilyId

    currentUser()
    if (familyId) {
      userProfiles(familyId)
      family(familyId)
    }
  }, [
    user.currentUser.FamilyId,
    dispatch,
    fetchCurrentUser,
    fetchUserProfiles,
    fetchFamily,
  ])
  return (
    <main>
      <FamilyHeader name={family.name} isAdmin={user.currentUser.isAdmin} />
    </main>
  )
}

export default Family
