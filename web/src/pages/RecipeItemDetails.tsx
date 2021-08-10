import { FC } from "react";

import RecipeDetails from "../components/RecipeDetails/RecipeDetails";
import { Link } from "@material-ui/core";
import clsx from "clsx";
import { ArrowBack } from "@material-ui/icons";

import { useLocation, Link as RouterLink } from "react-router-dom";
import useStyles from "../components/RecipeDetails/RecipeDetailsStyles";

interface IState {
  name: string;
  description: string;
  notes: string;
  ingredients: string;
  preparation: string;
}

const RecipeItemDetails: FC<{}> = () => {
  const { state } = useLocation<IState>();
  const classes = useStyles();
  return (
    <>
      <header className={clsx(classes.root, classes.link)}>
        <Link component={RouterLink} to="/recipes" className={classes.link}>
          <ArrowBack color="primary" fontSize="large" />
        </Link>
      </header>
      <main className={classes.root}>
        <RecipeDetails {...state} />
      </main>
    </>
  );
};

export default RecipeItemDetails;
