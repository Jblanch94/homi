import { FC } from 'react'
import ResourceHeader from '../components/ResourceHeader/ResourceHeader'
import { Divider } from '@material-ui/core'
import GroceryList from '../components/GroceryList/GroceryList'

const Groceries: FC<{}> = () => {
  return (
    <>
      <header>
        <ResourceHeader title='Groceries' path='/add-grocery' />
        <Divider />
      </header>
      <main>
        <GroceryList />
      </main>
    </>
  )
}

export default Groceries
