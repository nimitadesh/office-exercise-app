import React, { useState, useEffect, useRef } from "react";

const Timer = ({ onTimerReset }) => {
  const [time, setTime] = useState(5); // Initial time set to 15 seconds
  const intervalRef = useRef(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTime((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    if (time === 0) {
      clearInterval(intervalRef.current);
      setTime(5); // Reset time to 15 seconds
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
      onTimerReset();
    }
  }, [time, onTimerReset]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return <div>{formatTime(time)}</div>;
};

export default Timer;
