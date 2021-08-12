import { FC } from "react";

import EventForm from "../components/EventForm/EventForm";

const AddEvent: FC<{}> = () => {
  return (
    <>
      <main>
        <EventForm />
      </main>
    </>
  );
};

export default AddEvent;
