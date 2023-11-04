import React, { useState } from "react";
import { View, Button, Modal, StyleSheet, Dimensions } from "react-native";
import { Picker } from "@react-native-picker/picker";

const DatePicker = ({ isVisible, onClose, onDateChange }) => {
  const [selectedMonth, setSelectedMonth] = useState("January");
  const [selectedDay, setSelectedDay] = useState("01");
  const [selectedYear, setSelectedYear] = useState("2023");

  const handleDateChange = () => {
    const selectedDate = new Date(
      selectedYear,
      monthNames.indexOf(selectedMonth),
      selectedDay
    );
    const milliseconds = selectedDate.getTime();
    onDateChange(milliseconds);
    onClose();
  };

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const daysInMonth = new Date(
    selectedYear,
    monthNames.indexOf(selectedMonth) + 1,
    0
  ).getDate();
  const days = Array.from({ length: daysInMonth }, (_, i) =>
    String(i + 1).padStart(2, "0")
  );
  const years = Array.from({ length: 100 }, (_, i) =>
    String(new Date().getFullYear() - i)
  );

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.innerContainer}>
          <View style={styles.pickerContainer}>
            <Picker
              style={styles.picker}
              selectedValue={selectedDay}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedDay(itemValue)
              }
            >
              {days.map((day) => (
                <Picker.Item key={day} label={day} value={day} />
              ))}
            </Picker>
            <Picker
              style={styles.picker}
              selectedValue={selectedMonth}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedMonth(itemValue)
              }
            >
              {monthNames.map((month) => (
                <Picker.Item key={month} label={month} value={month} />
              ))}
            </Picker>
            <Picker
              style={styles.picker}
              selectedValue={selectedYear}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedYear(itemValue)
              }
            >
              {years.map((year) => (
                <Picker.Item key={year} label={year} value={year} />
              ))}
            </Picker>
          </View>
          <View style={styles.buttonContainer}>
            <Button title="Close" onPress={onClose} />
            <Button title="Select Date" onPress={handleDateChange} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  pickerContainer: {
    flexDirection: "row",
  },
  innerContainer: {
    backgroundColor: "#fff",
    flexDirection: "column",
    width: Dimensions.get("window").width - 20,
    borderRadius: 5,
    paddingBottom: 15,
  },
  picker: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
    width: Dimensions.get("window").width - 20,
  },
});

export default DatePicker;
