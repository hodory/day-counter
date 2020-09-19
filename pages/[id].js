import React, { useState, useEffect } from "react";
import Axios from "axios";
import dayjs from "dayjs";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Timer from "../components/Timer";
import DateTimePicker from "../components/DateTimePicker";
import {
  LOCAL_STORAGE_START_DATE_KEY,
  LOCAL_STORAGE_TARGET_DATE_KEY,
  SECOND,
} from "../const/";
import HomeButton from "../components/HomeButton";

// TOOD : 중복 코드를 처리 합니다.
export default function storedUrl({ startDateTime, targetDateTime }) {
  const [startTime, setStartTime] = useState(null);
  const [dateTime, setDateTime] = useState(null);
  const [dateDiffFromCurrent, setDateDiffFromCurrent] = useState(null);
  const [intervalsFunction, setIntervalsFunction] = useState(0);

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
    const storedDate = targetDateTime
      ? dayjs(targetDateTime)
      : localStorage.getItem(LOCAL_STORAGE_TARGET_DATE_KEY);
    const storedStartDateTime = startDateTime
      ? startDateTime
      : localStorage.getItem(LOCAL_STORAGE_START_DATE_KEY);

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
      marginTop: theme.spacing(2),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    fab: {
      position: "absolute",
      bottom: theme.spacing(2),
      right: theme.spacing(3),
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
        <HomeButton fabClass={classes.fab} />
      </div>
    </Container>
  );
}

export async function getServerSideProps(context) {
  const {
    query: { id: queryId },
    params: { id: parmasId },
  } = context;
  console.log(queryId);
  const { BASE_URL, DATE_TIME_API_URL } = process.env;
  const API_URL = `${BASE_URL}${DATE_TIME_API_URL}/${queryId}`;
  try {
    const {
      data: {
        data: { startDateTime, targetDateTime },
        message,
      },
      status: statusCode,
    } = await Axios.get(API_URL);
    console.log(startDateTime);
    return {
      props: {
        startDateTime,
        targetDateTime,
        statusCode,
      },
    };
  } catch (err) {
    console.error(err.response);
    console.error(err.stack);
    if (typeof err.response === "undefined") {
      return {
        props: {
          error: {
            message: err.toString(),
            code: 500,
          },
        },
      };
    }
    return {
      props: {
        posts: [],
        statusCode:
          typeof err.response.status !== "undefined"
            ? err.response.status
            : 500,
      },
    };
  }
}
