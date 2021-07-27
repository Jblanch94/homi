import { FC } from "react";
import { IconButton, Divider } from "@material-ui/core";
import { AddCircleOutline, ArrowBack } from "@material-ui/icons";
import Typography from "../Typography";
import useStyles from "./FormHeaderStyles";
import { useHistory } from "react-router-dom";

interface IFormHeaderProps {
  name: string;
}

const FormHeader: FC<IFormHeaderProps> = ({ name }) => {
  const classes = useStyles();
  const history = useHistory();
  return (
    <>
      <header className={classes.root}>
        <IconButton color="primary" onClick={() => history.goBack()}>
          <ArrowBack fontSize="large" />
        </IconButton>
        <Typography variant="h4" color="primary">
          {name}
        </Typography>

        <IconButton color="primary" type="submit">
          <AddCircleOutline fontSize="large" />
        </IconButton>
      </header>
      <Divider />
    </>
  );
};

export default FormHeader;
