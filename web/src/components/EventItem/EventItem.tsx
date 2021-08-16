import { FC, useEffect } from "react";
import { Divider, Grid, Avatar } from "@material-ui/core";
import { useDispatch } from "react-redux";

import Typography from "../Typography";
import Tooltip from "../Tooltip";
import useStyles from "./EventItemStyles";
import actions from "../../state/actions";
import useTypedSelector from "../../hooks/useTypedSelector";

interface IEventItemProps {
  title: string;
  description?: string;
  startTime: string;
  endTime: string;
  date: string;
  UserId: string;
  id: number;
  familyId: number;
}

const EventItem: FC<IEventItemProps> = ({
  title,
  startTime,
  endTime,
  UserId,
  familyId,
  ...props
}) => {
  const classes = useStyles();
  const { userActions } = actions;
  const dispatch = useDispatch();
  const { userProfiles } = useTypedSelector((state) => state.user);

  const parsedStartTime = new Date(startTime).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const parsedEndTime = new Date(endTime).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  useEffect(() => {
    const fetchUserProfiles = () =>
      dispatch(userActions.fetchUserProfiles(familyId));

    fetchUserProfiles();
  }, [userActions, dispatch, familyId]);

  const eventOwner = userProfiles.find((u: any) => u.id === UserId);

  return (
    <>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item className={classes.itemContainer} xs={8}>
          <Typography variant="h6">{title}</Typography>
          <Typography
            variant="subtitle1"
            color="textSecondary">{`${parsedStartTime} - ${parsedEndTime}`}</Typography>
        </Grid>
        <Grid item className={classes.avatarContainer}>
          <Tooltip title={eventOwner.name ?? ""} placement="left-end">
            <Avatar
              src={eventOwner.profileUrl ?? ""}
              alt={eventOwner.name ?? ""}
              className={classes.avatar}>
              {eventOwner?.name.charAt(0)}
            </Avatar>
          </Tooltip>
        </Grid>
      </Grid>
      <Divider />
    </>
  );
};

export default EventItem;
