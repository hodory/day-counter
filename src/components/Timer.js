import React from "react";
import dayjs from "dayjs";
import Typography from "@material-ui/core/Typography";
const duration = require("dayjs/plugin/duration");
dayjs.extend(duration);

const Timer = ({ dateDiff: dateDiffMilli }) => {
  const getDays = () => {
    const diff = parseInt(dateDiffMilli);
    const diffDay = Math.ceil(dayjs.duration(diff).asDays());
    return `D-${diffDay}`;
  };

  const getTimes = () => {
    const diff = parseInt(dateDiffMilli);
    const duration = dayjs.duration(diff);
    const hours = parseInt(duration.asHours());
    const minutes = parseInt(duration.minutes());
    const seconds = parseInt(duration.seconds());
    return `(${hours} 시간 ${minutes} 분 ${seconds}초 전)`;
  };

  return (
    <>
      {dateDiffMilli ? (
        <>
          <Typography component="h2" variant="h1">
            {getDays()}
          </Typography>
          <Typography component="h2" variant="h5">
            {getTimes()}
          </Typography>
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default Timer;
