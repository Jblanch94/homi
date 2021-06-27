import LoginForm from "../components/LoginForm/LoginForm";
import useStyles from "../components/LoginForm/LoginFormStyles";
import { useMediaQuery } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";

import { useDispatch } from "react-redux";
import { login } from "../state/actions/authActions";

const LoginFormContainer = (props) => {
  console.log(props);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const classes = useStyles();
  const dispatch = useDispatch();

  const onSubmit = (values) => {
    dispatch(login(values, props.history));
  };

  const loginFormProps = { onSubmit, matches, classes };

  return <LoginForm {...loginFormProps} />;
};

export default LoginFormContainer;
