import { FC } from "react";
import LoginFormContainer from "../containers/LoginFormContainer";
import { History } from "history";

interface ILoginProps {
  history: History;
}

const Login: FC<ILoginProps> = (props) => {
  return (
    <main>
      <section id="LoginForm">
        <LoginFormContainer {...props} />
      </section>
    </main>
  );
};

export default Login;
