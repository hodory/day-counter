import React from "react";
import dayjs from "dayjs";
import Typography from "@material-ui/core/Typography";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

const duration = require("dayjs/plugin/duration");
dayjs.extend(duration);

const Timer = ({ dateDiffMilli, getDateDiffFromStartDate }) => {
  const MS_TO_SECOND = 1000;
  const SECOND_TO_MINUTE = 60;
  const SECOND_TO_HOUR = 3600;
  const getDays = () => {
    const diff = parseInt(dateDiffMilli);
    const diffDay = Math.ceil(dayjs.duration(diff).asDays());
    return `D-${diffDay}`;
  };

  const remainSecond = () => {
    return Math.floor(dateDiffMilli / MS_TO_SECOND);
  };

  const CircleTimerComponent = () => (
    <CountdownCircleTimer
      isPlaying
      duration={
        getDateDiffFromStartDate() > 0 ? getDateDiffFromStartDate() : 60
      }
      key={dateDiffMilli}
      initialRemainingTime={remainSecond()}
      children={children}
      colors="#A30000"
    />
  );

  const children = ({ remainingTime }) => {
    const hours = Math.floor(remainingTime / SECOND_TO_HOUR);
    const minutes = Math.floor(
      (remainingTime % SECOND_TO_HOUR) / SECOND_TO_MINUTE
    );
    const seconds = remainingTime % SECOND_TO_MINUTE;

    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <>
      {remainSecond() > 0 ? (
        <>
          {getDateDiffFromStartDate()}
          <Typography component="h2" variant="h1">
            {getDays()}
          </Typography>
          <Typography component="h2" variant="h5">
            {CircleTimerComponent()}
          </Typography>
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default Timer;
