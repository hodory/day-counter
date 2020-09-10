import React from "react";
import dayjs from "dayjs";
import DateFnsUtils from "@date-io/dayjs";
import {
  DateTimePicker as MuiDateTimePicker,
  KeyboardDateTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";

const DateTimePicker = ({ dateTime: selectedDate, startTimer }) => {
  const tomorrow = dayjs().add(1, "day").toDate();

  const onClickHandler = (date) => {
    startTimer(date);
  };

  return (
    <>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDateTimePicker
          value={selectedDate}
          onChange={onClickHandler}
          label="Type or Select the date"
          onError={console.log}
          minDate={tomorrow}
          format="YYYY/MM/DD hh:mm A"
        />
      </MuiPickersUtilsProvider>
    </>
  );
};

export default DateTimePicker;
