import { FC } from "react";

import { Grid } from "@material-ui/core";
import Typography from "../Typography";

import useStyles from "./RecipeDetailsStyles";

interface IRecipeDetailsProps {
  name: string;
  description: string;
  notes: string;
  ingredients: string;
  preparation: string;
}

const RecipeDetails: FC<IRecipeDetailsProps> = ({
  name,
  description,
  notes,
  preparation,
  ingredients,
}) => {
  const classes = useStyles();
  return (
    <Grid
      container
      item
      direction="column"
      alignItems="flex-start"
      spacing={2}
      className={classes.gridContainer}>
      <Grid item xs={10}>
        <Typography variant="h2" gutterBottom style={{ textAlign: "center" }}>
          {name}
        </Typography>
      </Grid>
      <Grid item xs={10}>
        <Typography
          variant="body1"
          color="textPrimary"
          className={classes.content}>
          Description: {description}
        </Typography>
      </Grid>
      <Grid item xs={10}>
        <Typography
          variant="body1"
          color="textPrimary"
          className={classes.content}>
          Ingredients: {ingredients}
        </Typography>
      </Grid>
      <Grid item xs={10}>
        <Typography
          variant="body1"
          color="textPrimary"
          className={classes.content}>
          Preparation: {preparation}
        </Typography>
      </Grid>
      <Grid item xs={10}>
        <Typography
          variant="body1"
          color="textPrimary"
          className={classes.content}>
          Notes: {notes}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default RecipeDetails;
