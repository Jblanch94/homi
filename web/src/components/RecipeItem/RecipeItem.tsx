import { FC } from "react";
import useStyles from "./RecipeItemStyles";
import { useDispatch } from "react-redux";

import Typography from "../Typography";
import Button from "../Button";
import IconButton from "../IconButton";
import Tooltip from "../Tooltip";
import {
  Grid,
  Divider,
  Avatar,
  DialogContent,
  DialogActions,
  Link,
} from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import { Link as RouterLink } from "react-router-dom";
import actions from "../../state/actions";
import useToggle from "../../hooks/useToggle";
import Dialog from "../Dialog";

interface IRecipeItemProps {
  name: string;
  description: string;
  notes: string;
  preparation: string;
  ingredients: string;
  profileUrl: string;
  username: string;
  id: number;
  familyId: number;
}

const RecipeItem: FC<IRecipeItemProps> = ({
  name,
  description,
  notes,
  preparation,
  ingredients,
  profileUrl,
  username,
  id,
  familyId,
  ...props
}) => {
  console.log(props);
  const classes = useStyles();
  const [open, modalToggle] = useToggle(false);
  const dispatch = useDispatch();
  const { recipeActions } = actions;

  const DeleteConfirmationDialog = (
    <Dialog open={open} modalToggle={modalToggle} onClose={modalToggle}>
      <DialogContent>
        <Typography
          variant="body1"
          color="textPrimary"
          className={classes.modalContent}
          gutterBottom>
          Are you sure you want to delete the {name} recipe?
        </Typography>
      </DialogContent>
      <DialogActions className={classes.modalActions}>
        <Button variant="outlined" color="primary" onClick={modalToggle}>
          Cancel
        </Button>
        <Button
          variant="outlined"
          className={classes.modalDeleteButton}
          onClick={() => dispatch(recipeActions.deleteRecipe(id, familyId))}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <>
      {DeleteConfirmationDialog}
      <div className={classes.root}>
        <Grid
          container
          className={classes.gridContainer}
          justifyContent="space-between"
          alignItems="center">
          <Grid item container xs md={6} direction="column">
            <Grid item>
              <Typography variant="h4" color="textPrimary" gutterBottom>
                {name}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1" color="textSecondary" gutterBottom>
                {description}
              </Typography>
            </Grid>
            <div>
              <Typography variant="h6" color="primary">
                <Link
                  component={RouterLink}
                  to={{
                    pathname: `/recipe/${name}`,
                    state: {
                      name,
                      description,
                      notes,
                      preparation,
                      ingredients,
                    },
                  }}>
                  View more details
                </Link>
              </Typography>
            </div>
          </Grid>

          <Grid item xs={4} md={6} container>
            <Grid
              item
              xs
              container
              direction="column"
              spacing={1}
              justifyContent="center"
              alignItems="center">
              <Grid item>
                <Tooltip title={username ?? ""} placement="right-end">
                  <Avatar
                    alt={username}
                    src={profileUrl}
                    className={classes.avatarSmall}>
                    {username ? username.charAt(0) : ""}
                  </Avatar>
                </Tooltip>
              </Grid>

              <Grid item container justifyContent="center">
                <Grid item>
                  <IconButton aria-label="Delete Recipe" onClick={modalToggle}>
                    <Delete color="error" />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
      <Divider />
    </>
  );
};

export default RecipeItem;
