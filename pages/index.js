import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Timer from "../components/Timer";
import DateTimePicker from "../components/DateTimePicker";
import SaveButton from "../components/SaveButton";

const duration = require("dayjs/plugin/duration");
dayjs.extend(duration);
export default function Home() {
  const [startTime, setStartTime] = useState(null);
  const [dateTime, setDateTime] = useState(null);
  const [dateDiffFromCurrent, setDateDiffFromCurrent] = useState(null);
  const [intervalsFunction, setIntervalsFunction] = useState(0);
  const SECOND = 1000;
  const LOCAL_STORAGE_START_DATE_KEY = "day-counter.startDateTime";
  const LOCAL_STORAGE_TARGET_DATE_KEY = "day-counter.targetDateTime";

  const startTimer = (date) => {
    setDateTime(date);
    localStorage.setItem(LOCAL_STORAGE_TARGET_DATE_KEY, date);
    clearInterval(intervalsFunction);
    setIntervalsFunction(getInterval(date));
  };

  const setStartDateTime = () => {
    const now = dayjs().toDate();
    setStartTime(now);
    localStorage.setItem(LOCAL_STORAGE_START_DATE_KEY, now);
  };

  const getDateDiffFromStartDate = () => {
    return Math.floor(dayjs(dateTime).diff(dayjs(startTime)) / 1000);
  };

  useEffect(() => {
    const storedDate = localStorage.getItem(LOCAL_STORAGE_TARGET_DATE_KEY);
    const storedStartDateTime = localStorage.getItem(
      LOCAL_STORAGE_START_DATE_KEY
    );

    if (storedDate) {
      startTimer(storedDate);
    }

    if (storedStartDateTime) {
      setStartTime(storedStartDateTime);
    }
  }, []);

  const getInterval = (date) => {
    return setInterval(() => {
      const dateDiff = dayjs(date).diff(dayjs());
      setDateDiffFromCurrent(dateDiff);
    }, SECOND);
  };

  const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
  }));

  const classes = useStyles();
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h1">
          D-Day Counter
        </Typography>
        <DateTimePicker
          dateTime={dateTime}
          setDateTime={setDateTime}
          startTimer={startTimer}
          setStartDateTime={setStartDateTime}
        />
        <Timer
          dateDiffMilli={dateDiffFromCurrent}
          getDateDiffFromStartDate={getDateDiffFromStartDate}
        />
        <SaveButton startDateTime={startTime} targetDateTime={dateTime} />
      </div>
    </Container>
  );
}
