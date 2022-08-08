import { useEffect } from "react";
import { useState } from "react";
import Timer from "./Timer";
import ControlButtons from "./ControlButtons";

const StopWatch = ({ getTime }) => {
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [time, setTime] = useState(0);

  useEffect(() => {
    let interval = null;

    if (isActive && isPaused === false) {
      interval = setInterval(() => {
        setTime((time) => time + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isActive, isPaused]);

  useEffect(() =>  {
    let minute = Math.floor((time/60000)%60)
    let second = Math.floor((time/1000)%60)
    let millisecond = Math.floor((time/10) % 100)
    // console.log(time)
    // console.log(`${minute}:${second}:${millisecond}`)
    getTime(`${minute}:${second}:${millisecond} (ms)`)
    // getTime()
  } )

  const handleStart = () => {
    setIsActive(true);
    setIsPaused(false);
  };

  const handlePauseResume = () => {
    setIsPaused(!isPaused);
  };

  const handleReset = () => {
    setIsActive(false);
    setTime(0);
  };

  // const getCurrentTime = () => {
  //   let minute = Math.floor((time/60000)%60)
  //   let second = Math.floor((time/1000)%60)
  //   let milisecond = Math.floor((time/10) % 100)
  //   console.log(time)
  //   console.log(`${minute}:${second}:${milisecond}`)
  // }

  return (
    <div className="stop-watch">
      <Timer time={time} />
      {/* <button onClick={getCurrentTime}>Get Time</button> */}
      <ControlButtons
        active={isActive}
        isPaused={isPaused}
        handleStart={handleStart}
        handlePauseResume={handlePauseResume}
        handleReset={handleReset}
      />
    </div>
  );
};

export default StopWatch;
