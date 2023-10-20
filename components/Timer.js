import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

const Timer = (props) => {
  const { time, setIsDone } = props;
  const [remainingTime, setRemainingTime] = useState(time);
  const [startTime, setStartTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = new Date();
      const elapsedTime = currentTime - startTime;

      if (elapsedTime < time) {
        setRemainingTime(time - elapsedTime);
      } else {
        setRemainingTime(0);
        setIsDone(true);
      }
    }, 10);

    return () => clearInterval(interval);
  }, [startTime, time]);

  const calculateColor = () => {
    const percentage = (remainingTime / time) * 100;
    const startColor = [200, 50, 50]; // rgb(200, 50, 50)
    const endColor = [50, 150, 50]; // rgb(50, 150, 50)

    const r = Math.round(
      startColor[0] - (startColor[0] - endColor[0]) * (percentage / 100)
    );
    const g = Math.round(
      startColor[1] - (startColor[1] - endColor[1]) * (percentage / 100)
    );
    const b = Math.round(
      startColor[2] - (startColor[2] - endColor[2]) * (percentage / 100)
    );

    return `rgb(${r},${g},${b})`;
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

  const stripWidth = (remainingTime / time) * 80 + "%";

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.strip,
          { width: stripWidth, backgroundColor: calculateColor() },
        ]}
      />
      <Text style={styles.timer}>{formatTime(remainingTime)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 5,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 2,
  },
  strip: {
    height: 10,
  },
  timer: {
    backgroundColor: "#ccc",
    width: "19%",
    textAlign: "center",
    fontSize: 12,
    lineHeight: 12,
    paddingVertical: 4,
    borderRadius: 3,
    borderWidth: 1,
  },
});

export default Timer;
