import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

const Stopwatch = ({ onTimeUpdate }) => {
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    let interval;

    if (startTime) {
      interval = setInterval(() => {
        const currentTime = new Date();
        const newElapsedTime = currentTime - startTime;
        setElapsedTime(newElapsedTime);
        onTimeUpdate(newElapsedTime);
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [startTime, onTimeUpdate]);

  useEffect(() => {
    startTimer()
  }, [])

  const startTimer = () => {
    setStartTime(new Date());
  };

  const stopTimer = () => {
    setStartTime(null);
    setElapsedTime(0);
    onTimeUpdate(0);
  };

  const resetTimer = () => {
    if (startTime) {
      setStartTime(new Date());
      setElapsedTime(0);
      onTimeUpdate(0);
    }
  };

  const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const ms = Math.round((milliseconds % 1000) / 10);

    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}.${String(ms).padStart(2, "0")}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.timer}>{formatTime(elapsedTime)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "30%",
    // padding: 5,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 2,
  },
  timer: {
    backgroundColor: "#ccc",
    width: "100%",
    textAlign: "center",
    fontSize: 12,
    paddingVertical: 4,
    borderRadius: 3,
    borderWidth: 1,
  },
  buttons: {
    flexDirection: "row",
  },
  button: {
    marginHorizontal: 10,
  },
});

export default Stopwatch;
