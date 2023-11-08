import React, { useState, useContext, useEffect } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Alert,
  SafeAreaView,
} from "react-native";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { FontAwesome } from "@expo/vector-icons"; // Импортируйте нужную библиотеку иконок
import DatePicker from "../components/CustomDatePicker";

const EditProfile = () => {
  const { user, updateUser } = useContext(AuthContext);

  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [birthday, setBirthday] = useState(user.birthday);
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
  const [experience, setExperience] = useState(user.experience || []);

  const handleAddExperience = () => {
    setExperience([
      ...experience,
      {
        startDate: null,
        endDate: null,
        jobName: "",
        jobPosition: "",
        location: "",
      },
    ]);
  };

  const handleBirthDateChange = (date) => {
    setBirthday(date);
    setModalVisible(false);
  };

  const handleDeleteExperience = (index) => {
    const updatedExperience = [...experience];
    updatedExperience.splice(index, 1);
    setExperience(updatedExperience);
  };

  const handleChangeExperience = (index, field, value) => {
    const updatedExperience = [...experience];
    updatedExperience[index][field] = value;
    setExperience(updatedExperience);
  };

  const handleChangeProfile = async () => {
    try {
      const response = await axios.post(
        "https://caapp-server.onrender.com/update-profile",
        {
          username: user.username,
          firstName,
          lastName,
          email,
          phoneNumber,
          experience,
          birthday,
        }
      );

      if (response.data.success) {
        await updateUser({
          ...user,
          firstName,
          lastName,
          email,
          phoneNumber,
          experience,
          birthday,
        });

        Alert.alert("Success", "Profile updated successfully");
      } else {
        Alert.alert("Error", response.data.message);
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred while updating profile");
    }
  };

  const [modalVisibleBirthday, setModalVisibleBirthday] = useState(false);
  const [modalVisibleStartDate, setModalVisibleStartDate] = useState(false);
  const [modalVisibleEndDate, setModalVisibleEndDate] = useState(false);
  const [selectedExperienceIndex, setSelectedExperienceIndex] = useState(null);

  const handleOpenStartDatePicker = (index) => {
    setSelectedExperienceIndex(index);
    setModalVisibleStartDate(true);
  };

  const handleOpenEndDatePicker = (index) => {
    setSelectedExperienceIndex(index);
    setModalVisibleEndDate(true);
  };

  const handleExperienceDateChange = (index, field, date) => {
    const updatedExperience = [...experience];
    updatedExperience[index][field] = date;
  
    if (field === "endDate" && date < updatedExperience[index].startDate) {
      updatedExperience[index].startDate = date;
    }
  
    if (field === "startDate" && date > updatedExperience[index].endDate) {
      updatedExperience[index].endDate = date;
    }
  
    setExperience(updatedExperience);
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ flex: 1, backgroundColor: "#fff" }}
    >
      <View style={styles.container}>
        <Text style={[styles.textHeader]}>Personal info</Text>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>Username</Text>
          <TextInput
            editable={false}
            style={styles.input}
            value={user.username}
          />
        </View>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>First Name</Text>
          <TextInput
            style={styles.input}
            value={firstName}
            onChangeText={(text) => setFirstName(text)}
          />
        </View>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>Last Name</Text>
          <TextInput
            style={styles.input}
            value={lastName}
            onChangeText={(text) => setLastName(text)}
          />
        </View>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>Birthday</Text>
          <TouchableOpacity
            style={styles.input}
            onPress={() => setModalVisibleBirthday(true)}
          >
            <Text style={{ fontSize: 20 }}>
              {new Date(birthday).toLocaleDateString()}
            </Text>
            <FontAwesome name="calendar" size={24} color="#29648a" />
          </TouchableOpacity>
          <DatePicker
            isVisible={modalVisibleBirthday}
            onClose={() => setModalVisibleBirthday(false)}
            onDateChange={handleBirthDateChange}
          />
        </View>

        <View style={styles.labelContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput editable={false} style={styles.input} value={email} />
        </View>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            style={styles.input}
            value={phoneNumber}
            onChangeText={(text) => setPhoneNumber(text)}
          />
        </View>

        <Text style={[styles.textHeader]}>Work experience</Text>

        {experience.map((exp, index) => (
          <View key={index}>
            <View style={{...styles.labelContainer, flexDirection: 'row', gap: 5}}>
              <View style={{flex: 1}}>
                <Text style={styles.label}>Start</Text>
                <TouchableOpacity
                  style={styles.input}
                  onPress={() => handleOpenStartDatePicker(index)}
                >
                  <Text style={{ fontSize: 20 }}>
                    {new Date(exp.startDate).toLocaleDateString()}
                  </Text>
                  <FontAwesome name="calendar" size={24} color="#29648a" />
                </TouchableOpacity>
                <DatePicker
                  isVisible={modalVisibleStartDate && selectedExperienceIndex === index}
                  onClose={() => setModalVisibleStartDate(false)}
                  onDateChange={(date) =>
                    handleExperienceDateChange(index, "startDate", date)
                  }
                />
              </View>
              <View style={{flex: 1}}>
                <Text style={styles.label}>Finish</Text>
                <TouchableOpacity
                  style={styles.input}
                  onPress={() => handleOpenEndDatePicker(index)}
                >
                  <Text style={{ fontSize: 20 }}>
                    {new Date(exp.endDate).toLocaleDateString()}
                  </Text>
                  <FontAwesome name="calendar" size={24} color="#29648a" />
                </TouchableOpacity>
                <DatePicker
                  isVisible={modalVisibleEndDate && selectedExperienceIndex === index}
                  onClose={() => setModalVisibleEndDate(false)}
                  onDateChange={(date) =>
                    handleExperienceDateChange(index, "endDate", date)
                  }
                />
              </View>
            </View>
            <View style={styles.labelContainer}>
              <Text style={styles.label}>Casino name</Text>
              <TextInput
                style={styles.input}
                value={exp.jobName}
                onChangeText={(text) =>
                  handleChangeExperience(index, "jobName", text)
                }
              />
            </View>
            <View style={styles.labelContainer}>
              <Text style={styles.label}>Job Position</Text>
              <TextInput
                style={styles.input}
                value={exp.jobPosition}
                onChangeText={(text) =>
                  handleChangeExperience(index, "jobPosition", text)
                }
              />
            </View>
            <View style={styles.labelContainer}>
              <Text style={styles.label}>Country/City</Text>
              <TextInput
                style={styles.input}
                value={exp.location}
                onChangeText={(text) =>
                  handleChangeExperience(index, "location", text)
                }
              />
            </View>

            <TouchableOpacity
              onPress={() => handleDeleteExperience(index)}
              style={styles.deleteButton}
            >
              <FontAwesome name="minus-square-o" size={24} color="#a16e83" />
              <Text style={styles.deleteButtonText}>
                Delete this place of work
              </Text>
            </TouchableOpacity>

            <View style={styles.lineBreak} />
          </View>
        ))}
        <TouchableOpacity
          onPress={handleAddExperience}
          style={styles.addButton}
        >
          <FontAwesome name="plus-square-o" size={24} color="#29648a" />
          <Text style={styles.addButtonText}>Add another place of work</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleChangeProfile}>
          <Text style={styles.buttonText}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 10,
    width: Dimensions.get("window").width,
    backgroundColor: "#fff",
  },
  labelContainer: {
    marginBottom: 10,
    width: Dimensions.get("window").width - 20,
  },
  label: {
    color: "#808080",
    fontSize: 16,
  },
  input: {
    height: 50,
    width: "100%",
    borderColor: "#29648a",
    borderWidth: 1,
    borderRadius: 3,
    paddingHorizontal: 10,
    color: "#555",
    fontSize: 20,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  textHeader: {
    textAlign: "center",
    fontSize: 22,
    color: "#29648a",
    fontWeight: "bold",
    marginVertical: 15,
    textTransform: "uppercase",
  },
  lineBreak: {
    marginVertical: 5,
    borderColor: "#29648a",
    borderBottomWidth: 1,
    width: Dimensions.get("window").width - 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
    textAlign: "center",
  },
  button: {
    marginVertical: 25,
    backgroundColor: "#29648a",
    borderRadius: 3,
    width: 200,
    padding: 10,
  },
  deleteButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 15,
  },
  addButtonText: {
    color: "#29648a",
    fontSize: 20,
    marginLeft: 15,
  },
  deleteButtonText: {
    color: "#a16e83",
    fontSize: 20,
    marginLeft: 15,
  },
  datePicker: {
    height: 50,
    width: "100%",
    borderColor: "#29648a",
    borderWidth: 1,
    borderRadius: 3,
    paddingHorizontal: 10,
    color: "#555",
    fontSize: 20,
    justifyContent: "center",
  },
});

export default EditProfile;
