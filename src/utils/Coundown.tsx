import React, { useState, useEffect } from "react";
interface CountdownProps {
  targetDate: Date;
}

const Countdown: React.FC<CountdownProps> = ({ targetDate }) => {
  const time = new Date(targetDate);
  const [remainingTime, setRemainingTime] = useState<number>(
    time.getTime() - new Date().getTime()
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const timeRemaining = time.getTime() - new Date().getTime();
      setRemainingTime(timeRemaining);
    }, 1000);

    return () => clearInterval(interval);
  }, [time]);

  const formatTime = (time: number) => {
    const seconds = Math.floor(time / 1000) % 60;
    const minutes = Math.floor(time / 1000 / 60) % 60;
    const hours = Math.floor(time / 1000 / 60 / 60) % 24;

    return `${hours} : ${minutes} : ${seconds} `;
  };
  return <>{formatTime(remainingTime)}</>;
};

export default Countdown;
