import { FC, useEffect } from 'react'
import { Grid } from '@material-ui/core'
import { useDispatch } from 'react-redux'

import GroceryItem from '../GroceryItem/GroceryItem'
import useStyles from './GroceryListStyles'
import useTypedSelector from '../../hooks/useTypedSelector'
import actions from '../../state/actions'
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'

interface ICategory {
  id: number
  title: string
}

interface IUser {
  id: number
  name: string
  profileUrl: string | null
}

interface IGrocery {
  id: number
  item: string
  quantity: number
  details: string
  UserId: number
  FamilyId: number
  bought: boolean
  Categories: ICategory[]
}

const GroceryList: FC<{}> = () => {
  const classes = useStyles()

  const { groceryActions, userActions } = actions
  const dispatch = useDispatch()
  const user = useTypedSelector((state) => state.user)
  const { groceries, isLoading } = useTypedSelector((state) => state.grocery)

  useEffect(() => {
    const currentUser = () => dispatch(userActions.fetchCurrentUser())
    const fetchGroceries = (id: number) =>
      dispatch(groceryActions.fetchGroceries(id))

    const fetchAllUsers = (familyId: number) => {
      dispatch(userActions.fetchUserProfiles(familyId))
    }
    currentUser()

    const familyId = user.currentUser.FamilyId
    if (familyId) {
      fetchGroceries(familyId)
      fetchAllUsers(familyId)
    }
  }, [groceryActions, dispatch, userActions, user.currentUser.FamilyId])
  const groceryItems = groceries?.map((g: IGrocery) => {
    const { name, profileUrl } = user.userProfiles.find(
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
      familyId: user.currentUser.FamilyId,
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
