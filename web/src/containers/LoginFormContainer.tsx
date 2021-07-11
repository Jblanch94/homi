import { FC } from "react";
import LoginForm from "../components/LoginForm/LoginForm";
import useStyles from "../components/LoginForm/LoginFormStyles";
import { useMediaQuery } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import { History } from "history";

import useTypedSelector from "../hooks/useTypedSelector";
import useActions from "../hooks/useActions";
import actions from "../state/actions";
import { FormikValues } from "formik";

interface ILoginFormContainer {
  history: History;
}

const LoginFormContainer: FC<ILoginFormContainer> = ({ history }) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const classes = useStyles();
  const auth = useTypedSelector((state) => state.auth);
  const { loginUser } = useActions(actions.authActions);

  const onSubmit: void = (values: FormikValues) => loginUser(values, history);

  const loginFormProps = {
    onSubmit,
    matches,
    classes,
    isError: auth.isError,
    errorMsg: auth.error,
    loading: auth.isLoading,
  };

  return <LoginForm {...loginFormProps} />;
};

export default LoginFormContainer;
