import LoginForm from "../components/LoginForm/LoginForm";
import useStyles from "../components/LoginForm/LoginFormStyles";
import { useMediaQuery } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";

import { useDispatch } from "react-redux";
import { login } from "../state/actions/authActions";

const LoginFormContainer = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const classes = useStyles();
  const dispatch = useDispatch();

  const onSubmit = (values) => {
    dispatch(login(values));
  };

  const props = { onSubmit, matches, classes };

  return <LoginForm {...props} />;
};

export default LoginFormContainer;
