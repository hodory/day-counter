import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";

const DateTimePicker = ({ dateTime, setDateTime, startTimer }) => {
  const tomorrow = dayjs().add(1, "day").toDate();
  const onClickHandler = (date) => {
    startTimer(date);
  };

  return (
    <DatePicker
      selected={dateTime}
      onChange={(date) => onClickHandler(date)}
      minDate={tomorrow}
      timeInputLabel="Time:"
      dateFormat="MM/dd/yyyy h:mm aa"
      showTimeInput
    />
  );
};

export default DateTimePicker;
