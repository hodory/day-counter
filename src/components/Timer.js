import React from "react";
import dayjs from "dayjs";
const duration = require("dayjs/plugin/duration");
dayjs.extend(duration);

const Timer = ({ dateDiff: dateDiffMilli }) => {
  const MILLISECOND = 1000;
  const MINUTE = 60 * MILLISECOND;
  const HOUR = 60 * MINUTE;

  const getTitle = () => {
    const diff = dateDiffMilli ? parseInt(dateDiffMilli) : 0;
    const diffDay = dayjs.duration(diff).get("day");
    return `D-${diffDay}`;
  };

  const getTimes = () => {
    const hours = Math.floor(dateDiffMilli / (MILLISECOND * 60 * 60));
    const minutes = Math.floor(
      (dateDiffMilli % HOUR) / MINUTE
    );
    const seconds = Math.floor((dateDiffMilli % MINUTE) / MILLISECOND);
    return `${hours} 시간 ${minutes} 분 ${seconds}초 전`;
  };

  return (
    <>
      <div>{getTitle()}</div>
      <div>{getTimes()}</div>
    </>
  );
};

export default Timer;
