import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet } from "react-native";

const Timer = ({ time, updateTimer, setIsDone }) => {
  const [timeLeft, setTimeLeft] = useState(time);
  let intervalRef = useRef(null);
  let TIME_LIMIT = time;
  let startTime = useRef(new Date());

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60000)
      .toString()
      .padStart(2, "0");
    const seconds = Math.floor((time % 60000) / 1000)
      .toString()
      .padStart(2, "0");
    const milliseconds = ((time % 1000) / 10)
      .toFixed()
      .toString()
      .padStart(2, "0");

    return `${minutes}:${seconds}.${milliseconds}`;
  };

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTimeLeft((prevProgress) => {
        const timePassed = new Date() - startTime.current;
        const formattedTime = formatTime(timePassed);

        if (prevProgress <= 0) {
          clearInterval(intervalRef.current);
          setIsDone(true);
        } else {
          updateTimer(formattedTime);
        }

        return prevProgress > 0
          ? Math.max(0, TIME_LIMIT - timePassed)
          : prevProgress;
      });
    }, 10);

    return () => clearInterval(intervalRef.current);
  }, [updateTimer, setIsDone]);

  return (
    <View style={styles.container}>
      <View
        style={[styles.progressBar, { width: `${(timeLeft * 80) / time}%` }]}
      />
      <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    width: "100%",
    padding: 5,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 2,
  },
  progressBar: {
    height: 10,
    backgroundColor: "#29648a",
  },
  timerText: {
    backgroundColor: "#ccc",
    width: "20%",
    textAlign: "center",
    fontSize: 14,
    lineHeight: 14,
    padding: 3,
    borderRadius: 3,
    borderWidth: 1,
  },
});
export default Timer;
