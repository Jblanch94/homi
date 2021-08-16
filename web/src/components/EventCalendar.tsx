import { FC, SetStateAction, useState } from "react";
import { Calendar, useStaticState } from "@material-ui/pickers";
import { Link } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";

const EventCalendar: FC<{}> = () => {
  const [value, handleDateChange] = useState<SetStateAction<Date | null>>(
    new Date()
  );
  const { pickerProps } = useStaticState({
    value,
    onChange: handleDateChange,
  });
  return (
    <div>
      <Calendar
        {...pickerProps}
        renderDay={(day, selectedDate, dayInCurrentMonth, dayComponent) => (
          <Link
            component={RouterLink}
            to={{ pathname: "/event-day", state: { day } }}
            style={{ textDecoration: "none" }}>
            {dayComponent}
          </Link>
        )}
      />
    </div>
  );
};

export default EventCalendar;
