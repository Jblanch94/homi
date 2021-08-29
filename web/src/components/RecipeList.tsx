import { FC, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import RecipeItem from './RecipeItem/RecipeItem'
import actions from '../state/actions'
import useTypedSelector from '../hooks/useTypedSelector'
import { IUser, IRecipe } from '../types'

const RecipeList: FC<{}> = () => {
  const dispatch = useDispatch()
  const { userActions, recipeActions } = actions
  const { currentUser, userProfiles } = useTypedSelector((state) => state.user)
  const { data, isSuccess, isError, error } = useTypedSelector(
    (state) => state.recipe
  )

  const familyId = currentUser?.FamilyId

  useEffect(() => {
    const fetchCurrentUser = () => dispatch(userActions.fetchCurrentUser())

    fetchCurrentUser()

    if (familyId) {
      dispatch(userActions.fetchUserProfiles(familyId))
      dispatch(recipeActions.fetchRecipes(familyId))
    }
  }, [dispatch, recipeActions, userActions, familyId])
  const recipes = data.map((recipe: IRecipe) => {
    const user = userProfiles.find((x: IUser) => x.id === currentUser.id)

    return (
      <div key={recipe.id}>
        <RecipeItem
          {...recipe}
          profileUrl={user?.profileUrl}
          username={user?.name}
          id={recipe.id}
          familyId={familyId}
        />
      </div>
    )
  })

  return (
    <>
      {isSuccess && recipes}
      {isError && <div>{error}</div>}
    </>
  )
}

export default RecipeList
