import { FC } from 'react'
import LoginForm from '../components/LoginForm/LoginForm'
import { History } from 'history'

interface ILoginProps {
  history: History
}

const Login: FC<ILoginProps> = (props) => {
  return (
    <main>
      <section id='LoginForm'>
        <LoginForm {...props} />
      </section>
    </main>
  )
}

export default Login
