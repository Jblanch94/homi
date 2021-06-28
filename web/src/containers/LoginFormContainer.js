import LoginForm from "../components/LoginForm/LoginForm";
import useStyles from "../components/LoginForm/LoginFormStyles";
import { useMediaQuery } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";

import { useDispatch, useSelector } from "react-redux";
import { login } from "../state/actions/authActions";

const LoginFormContainer = (props) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const classes = useStyles();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const onSubmit = (values) => {
    dispatch(login(values, props.history));
  };

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
