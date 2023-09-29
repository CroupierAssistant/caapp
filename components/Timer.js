import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

const Timer = React.memo(({time, setTimePassedParent, setIsDone}) => {
  const [timeLeft, setTimeLeft] = useState(time);

  let TIME_LIMIT = time;
  let timePassed = 0;
  let startTime = new Date();

  function formatTime(time) {
    var minutes = Math.floor(time / 60000)
      .toString()
      .padStart(2, "0");
    var seconds = Math.floor((time % 60000) / 1000)
      .toString()
      .padStart(2, "0");
    var milliseconds = ((time % 1000) / 10)
      .toFixed()
      .toString()
      .padStart(2, "0");

    return `${minutes}:${seconds}.${milliseconds}`;
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prevProgress) => {
        timePassed = new Date() - startTime;
        setTimePassedParent(formatTime(timePassed));
        if (prevProgress > 0) {
          return Math.max(0, TIME_LIMIT - timePassed);
        } else {
          clearInterval(interval);
          setTimePassedParent(formatTime(time));
          setIsDone(true);
          return prevProgress;
        }
      });
    }, 10);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <View
        style={[styles.progressBar, { width: `${(timeLeft * 80) / time}%` }]}
      />
      <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
    </View>
  );
});

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
