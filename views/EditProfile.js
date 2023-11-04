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
} from "react-native";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { FontAwesome } from "@expo/vector-icons"; // Импортируйте нужную библиотеку иконок

const EditProfile = () => {
  const { user, updateUser } = useContext(AuthContext);

  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  // const [birthday, setBirthday] = useState(""); // Добавляем состояние для дня рождения
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
  const [experience, setExperience] = useState([
    {
      startDate: "",
      endDate: "",
      jobName: "",
      jobPosition: "",
      location: "",
    },
  ]);

  const handleAddExperience = () => {
    setExperience([
      ...experience,
      {
        startDate: "",
        endDate: "",
        jobName: "",
        jobPosition: "",
        location: "",
      },
    ]);
  };

  const handleChangeExperience = (index, field, value) => {
    const updatedExperience = [...experience];
    updatedExperience[index][field] = value;
    setExperience(updatedExperience);
  };

  const handleChangeProfile = async () => {
    try {
      // Отправляем запрос на сервер с обновленными данными пользователя
      const response = await axios.post(
        "https://caapp-server.onrender.com/update-profile",
        {
          username: user.username,
          firstName,
          lastName,
          email,
          phoneNumber,
          experience,
        }
      );

      if (response.data.success) {
        // Если запрос успешный, обновляем данные пользователя в контексте
        await updateUser({
          ...user,
          firstName,
          lastName,
          email,
          phoneNumber,
          experience,
        });

        // Ваши дополнительные действия после успешного обновления
        // ...
        
        // Выводим уведомление об успешном обновлении
        Alert.alert("Success", "Profile updated successfully");
      } else {
        Alert.alert("Error", response.data.message);
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred while updating profile");
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
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
          <Text style={styles.label}>Email</Text>
          <TextInput editable={false} style={styles.input} value={email} />
        </View>
        {/* <DatePicker
          date={birthday}
          mode="date"
          placeholder="Select Birthday"
          format="YYYY-MM-DD"
          onDateChange={(date) => setBirthday(date)}
        /> */}
        <View style={styles.labelContainer}>
          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            style={styles.input}
            value={phoneNumber}
            onChangeText={(text) => setPhoneNumber(text)}
          />
        </View>
        {/* <TextInput
        placeholder="Instagram"
        value={instagram}
        onChangeText={(text) => setInstagram(text)}
        />
        <TextInput
          placeholder="Facebook"
          value={facebook}
          onChangeText={(text) => setFacebook(text)}
      /> */}

        <Text style={[styles.textHeader]}>Work experience</Text>

        {experience.map((exp, index) => (
          <View key={index}>
            {/* <DatePicker
              date={exp.startDate}
              mode="date"
              placeholder="Select Start Date"
              format="YYYY-MM-DD"
              onDateChange={(date) =>
                handleChangeExperience(index, "startDate", date)
              }
            />

            <DatePicker
              date={exp.endDate}
              mode="date"
              placeholder="Select End Date"
              format="YYYY-MM-DD"
              onDateChange={(date) =>
                handleChangeExperience(index, "endDate", date)
              }
            /> */}
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
              <Text style={styles.label}>Job Location</Text>
              <TextInput
                style={styles.input}
                value={exp.location}
                onChangeText={(text) =>
                  handleChangeExperience(index, "location", text)
                }
              />
            </View>

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
    // height: Dimensions.get("window").height - 130,
    width: Dimensions.get("window").width,
  },
  labelContainer: {
    marginBottom: 10,
    // width: "100%",
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
    marginVertical: 15,
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
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 15,
  },
  addButtonText: {
    color: '#29648a',
    fontSize: 20,
    marginLeft: 15,
  },
});

export default EditProfile;
