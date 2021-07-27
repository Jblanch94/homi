import { FC, Fragment, SyntheticEvent } from "react";
import { Grid, IconButton, Avatar, Divider, Tooltip } from "@material-ui/core";
import { CheckCircleOutline } from "@material-ui/icons";
import Typography from "../Typography";
import EditGroceryItemDialogContainer from "../../containers/EditGroceryItemDialogContainer";
import useStyles from "./GroceryItemStyles";

interface IGroceryItemProps {
  hasBeenBought: boolean;
  item: string;
  name: string;
  profileUrl: string;
  id: number;
  quantity: number;
  details: string;
  updateGroceryItem: (
    e: SyntheticEvent,
    id: number,
    familyId: number,
    data: any
  ) => void;
  familyId: number;
  open: boolean;
  toggleDialog: () => void;
}

const GroceryItem: FC<IGroceryItemProps> = ({
  hasBeenBought,
  item,
  name,
  profileUrl,
  id,
  quantity,
  details,
  updateGroceryItem,
  familyId,
  open,
  toggleDialog,
}) => {
  const classes = useStyles();
  return (
    <Fragment key={id}>
      <div onClick={toggleDialog} style={{ cursor: "pointer" }}>
        <Grid container alignItems="center">
          <Grid item className={classes.root}>
            <IconButton
              onClick={(e) =>
                updateGroceryItem(e, id, familyId, {
                  bought: !hasBeenBought,
                })
              }>
              <CheckCircleOutline
                color={hasBeenBought ? "primary" : "disabled"}
              />
            </IconButton>
          </Grid>
          <Grid item>
            <Typography
              variant="body1"
              color={hasBeenBought ? "textSecondary" : "textPrimary"}
              className={hasBeenBought ? classes.crossedOff : ""}>
              {item}
            </Typography>
          </Grid>

          <Grid item className={classes.avatar}>
            <Tooltip title={name} placement="bottom">
              <Avatar alt={name} src={profileUrl ?? ""}>
                {name.charAt(0)}
              </Avatar>
            </Tooltip>
          </Grid>
        </Grid>
        <Grid
          container
          alignItems="center"
          spacing={2}
          className={classes.quantity}>
          <Grid item>
            <Typography variant="body2" color="textSecondary">
              {quantity}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="subtitle2" color="textSecondary">
              {details ?? ""}
            </Typography>
          </Grid>
        </Grid>
        <Divider />
      </div>

      <EditGroceryItemDialogContainer
        open={open}
        modalToggle={toggleDialog}
        item={item}
        details={details}
        quantity={quantity}
        id={id}
        familyId={familyId}
      />
    </Fragment>
  );
};

export default GroceryItem;
