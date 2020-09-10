import React from "react";
import dayjs from "dayjs";
import DateFnsUtils from "@date-io/dayjs";
import {
  DateTimePicker as MuiDateTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";

const DateTimePicker = ({ dateTime: selectedDate, startTimer }) => {
  const tomorrow = dayjs().add(1, "day").toDate();

  const onChangeHandler = (date) => {
    startTimer(date);
  };

  return (
    <>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <MuiDateTimePicker
          variant="inline"
          label="Type or Select the date"
          value={selectedDate}
          onChange={onChangeHandler}
          onError={console.log}
          minDate={tomorrow}
          format="YYYY/MM/DD hh:mm A"
        />
      </MuiPickersUtilsProvider>
    </>
  );
};

export default DateTimePicker;
