import { FC, useEffect } from 'react'
import { Grid } from '@material-ui/core'
import { useDispatch } from 'react-redux'

import GroceryItem from '../GroceryItem/GroceryItem'
import useStyles from './GroceryListStyles'
import useTypedSelector from '../../hooks/useTypedSelector'
import actions from '../../state/actions'
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'
import { IGrocery, IUser } from '../../types'
import useCurrentUser from '../../hooks/useCurrentUser'

const GroceryList: FC<{}> = () => {
  const classes = useStyles()

  const { groceryActions, userActions } = actions
  const dispatch = useDispatch()
  const { currentUser } = useCurrentUser()
  const { userProfiles } = useTypedSelector((state) => state.user)
  const { groceries, isLoading } = useTypedSelector((state) => state.grocery)

  useEffect(() => {
    const fetchGroceries = (id: number) =>
      dispatch(groceryActions.fetchGroceries(id))

    const fetchAllUsers = (familyId: number) => {
      dispatch(userActions.fetchUserProfiles(familyId))
    }

    const familyId = currentUser.FamilyId
    if (familyId) {
      fetchGroceries(familyId)
      fetchAllUsers(familyId)
    }
  }, [groceryActions, dispatch, userActions, currentUser.FamilyId])
  const groceryItems = groceries?.map((g: IGrocery) => {
    const { name, profileUrl } = userProfiles.find(
      (user: IUser) => user.id === g.UserId
    )
    const props = {
      id: g.id,
      hasBeenBought: g.bought,
      name,
      profileUrl,
      item: g.item,
      quantity: g.quantity,
      details: g.details,
      familyId: currentUser.FamilyId,
      categories: g.Categories,
    }
    return <GroceryItem key={g.id} {...props} />
  })
  return (
    <>
      <Grid container direction='column' className={classes.root}>
        {isLoading ? <LoadingSpinner /> : groceryItems}
      </Grid>
    </>
  )
}

export default GroceryList
