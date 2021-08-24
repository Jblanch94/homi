import { FC } from 'react'

import ResourceHeader from '../components/ResourceHeader/ResourceHeader'
import RecipeList from '../components/RecipeList'
import { Divider } from '@material-ui/core'

const Recipes: FC<{}> = () => {
  return (
    <>
      <ResourceHeader path='/add-recipe' title='Recipes' />
      <Divider />
      <main>
        <RecipeList />
      </main>
    </>
  )
}

export default Recipes
