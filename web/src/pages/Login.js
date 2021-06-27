import LoginFormContainer from "../containers/LoginFormContainer";

const Login = (props) => {
  return (
    <main>
      <section id="LoginForm">
        <LoginFormContainer {...props} />
      </section>
    </main>
  );
};

export default Login;
