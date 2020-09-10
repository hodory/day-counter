import React, { useState } from "react";
import dayjs from "dayjs";
import "./App.css";
import Timer from "./components/Timer";
import DateTimePicker from "./components/DateTimePicker";

const duration = require("dayjs/plugin/duration");
const relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(duration); // use plugin
dayjs.extend(relativeTime); // use plugin

function App() {
  const [dateTime, setDateTime] = useState(null);
  const [dateDiff, setDateDiff] = useState(null);
  const [intervalsFunction, setIntervalsFunction] = useState(0);

  const startTimer = (date) => {
    setDateTime(date);
    clearInterval(intervalsFunction);
    setIntervalsFunction(getInterval(date));
  };

  const getInterval = (date) => {
    return setInterval(() => {
      const dateDiff = dayjs(date).diff(dayjs());
      setDateDiff(dateDiff);
    }, 1000);
  };

  return (
    <div className="App">
      <DateTimePicker
        dateTime={dateTime}
        setDateTime={setDateTime}
        startTimer={startTimer}
      />
      {dateTime > 0 ? <Timer dateDiff={dateDiff} /> : ""}
    </div>
  );
}

export default App;
