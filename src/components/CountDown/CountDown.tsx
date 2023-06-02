import { useState, useEffect } from "react";
import { useRef } from "react";
import styles from "./CountDown.module.css";

interface Props {
  seconds: number;
  activeTimer: () => void;
}

const CountDown = (props: Props) => {
  const [countdown, setCountDown] = useState(props.seconds);
  const timerId = useRef<number>();
  const { activeTimer } = props;
  const minutes = Math.floor(countdown / 60);
  const seconds = countdown % 60;
  const formattedSecond = seconds < 10 ? `0${seconds}` : `${seconds}`;
  useEffect(() => {
    timerId.current = setInterval(() => {
      setCountDown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timerId.current);
  }, []);

  useEffect(() => {
    if (countdown <= 0) {
      activeTimer();
      clearInterval(timerId.current);
    }
  }, [countdown, activeTimer]);
  return (
    <>
      <div className={styles["countdown__box"]}>
        <h2
          className={styles.timeTitle}
        >{`${minutes} : ${formattedSecond}`}</h2>
        <div className={styles.circleProgress}>
          <svg
            height="110"
            width="110"
            style={{
              transform: "rotate(-90deg)",
              transition: "all 1s linear",
              strokeDasharray: 47 * 2 * Math.PI,
              strokeDashoffset:
                -((countdown / props.seconds) * 47 * 2 * Math.PI) +
                47 * 2 * Math.PI,
            }}
          >
            <circle
              fill="white"
              stroke={`${countdown <= 10 ? "red" : "blue"}`}
              strokeWidth="5"
              r="47"
              cx="55"
              cy="55"
            />
          </svg>
        </div>
      </div>
    </>
  );
};

export default CountDown;
