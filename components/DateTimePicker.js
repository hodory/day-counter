import React from "react";
import dayjs from "dayjs";
import DateFnsUtils from "@date-io/dayjs";
import {
  DateTimePicker as MuiDateTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";

const DateTimePicker = ({
  dateTime: selectedDate,
  startTimer,
  setStartDateTime,
}) => {
  const tomorrow = dayjs().add(1, "day").toDate();

  const onChangeHandler = (date) => {
    setStartDateTime();
    startTimer(date);
  };

  return <></>;
};

export default DateTimePicker;
