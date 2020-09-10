import React, { useState } from "react";
import dayjs from "dayjs";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import "fontsource-roboto";
import Timer from "./components/Timer";
import DateTimePicker from "./components/DateTimePicker";

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
        />
        {dateTime > 0 ? <Timer dateDiff={dateDiff} /> : ""}
      </div>
    </Container>
  );
}

export default App;
