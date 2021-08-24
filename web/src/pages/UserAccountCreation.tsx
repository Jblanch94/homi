import { FC } from 'react'
import FormHeader from '../components/FormHeader/FormHeader'
import UserForm from '../components/UserForm/UserForm'

const UserAccountCreation: FC<{}> = () => {
  return (
    <>
      <FormHeader name='Add User' />
      <main>
        <UserForm />
      </main>
    </>
  )
}

export default UserAccountCreation
