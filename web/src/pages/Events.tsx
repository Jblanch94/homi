import { FC } from "react";
import { Link, Icon, makeStyles, Theme } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import { ArrowBack } from "@material-ui/icons";

import EventList from "../components/EventList";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    [theme.breakpoints.up("md")]: {
      width: "calc(100% - 240px)",
      marginLeft: "240px",
    },
  },
}));

const Event: FC<{}> = () => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.root}>
        <header>
          <Icon fontSize="large">
            <Link component={RouterLink} to="/calendar">
              <ArrowBack fontSize="large" />
            </Link>
          </Icon>
        </header>
        <main>
          <section id="event-list">
            <EventList />
          </section>
        </main>
      </div>
    </>
  );
};

export default Event;
