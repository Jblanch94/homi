import { FC } from "react";
import { Divider, makeStyles, Theme } from "@material-ui/core";

import ResourceHeader from "../components/ResourceHeader/ResourceHeader";
import EventCalendar from "../components/EventCalendar";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    [theme.breakpoints.up("md")]: {
      width: "calc(100% - 240px)",
      marginLeft: "240px",
    },
  },
}));

const Calendar: FC<{}> = () => {
  const classes = useStyles();

  return (
    <>
      <ResourceHeader title="Events" path="/add-event" />
      <Divider />

      <main className={classes.root}>
        <section id="event-calendar">
          <EventCalendar />
        </section>
      </main>
    </>
  );
};

export default Calendar;
