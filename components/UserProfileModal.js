import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
} from "react-native";

const UserProfileModal = ({ isVisible, onClose, user }) => {
  if (!user) {
    return null;
  }

  return (
    <Modal visible={isVisible} transparent animationType="fade">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.textContainer}>
            <Text style={styles.nickname}>{user.username}</Text>
          </View>
          <View
            style={{
              borderWidth: 2,
              flex: 1,
              borderColor: "#29648a",
              padding: 10,
              borderRadius: 3,
            }}
          >
            <ScrollView>
              <Text
                style={{
                  //   marginBottom: 5,
                  fontSize: 18,
                  fontWeight: "bold",
                  color: "#29648a",
                  textTransform: "uppercase",
                  textAlign: "center",
                }}
              >
                Personal info
              </Text>

              <View style={styles.lineBreak} />
              <View style={styles.labelContainer}>
                <Text
                  style={{ fontSize: 16, fontWeight: "bold", color: "#29648a" }}
                >
                  Name:
                </Text>
                <Text style={{ fontSize: 16 }}>
                  {user.firstName && user.lastName
                    ? `${user.firstName} ${user.lastName}`
                    : `A User Has No Name`}
                </Text>
              </View>
              <View style={styles.labelContainer}>
                <Text
                  style={{ fontSize: 16, fontWeight: "bold", color: "#29648a" }}
                >
                  Email:
                </Text>
                <Text style={{ fontSize: 16 }}>{user.email}</Text>
              </View>
              <View style={styles.labelContainer}>
                <Text
                  style={{ fontSize: 16, fontWeight: "bold", color: "#29648a" }}
                >
                  Phone:
                </Text>
                <Text style={{ fontSize: 16 }}>{user.phoneNumber}</Text>
              </View>
              <View style={styles.labelContainer}>
                <Text
                  style={{ fontSize: 16, fontWeight: "bold", color: "#29648a" }}
                >
                  Birthday:
                </Text>
                <Text style={{ fontSize: 16 }}>
                  {new Date(user.birthday).toLocaleDateString()}
                </Text>
              </View>

              <Text
                style={{
                  marginTop: 10,
                  fontSize: 18,
                  fontWeight: "bold",
                  color: "#29648a",
                  textTransform: "uppercase",
                  textAlign: "center",
                }}
              >
                Experience
              </Text>

              {user.experience
                .sort((a, b) => new Date(a.startDate) - new Date(b.startDate))
                .map((exp, index) => (
                  <>
                    <View style={styles.lineBreak} key={exp._id} />
                    <View style={{ marginVertical: 5 }}>
                      <View style={styles.labelContainer}>
                        <Text
                          style={{
                            fontSize: 16,
                            fontWeight: "bold",
                            color: "#29648a",
                          }}
                        >
                          Casino:
                        </Text>
                        <Text style={{ fontSize: 16 }}>{exp.jobName}</Text>
                      </View>
                      <View style={styles.labelContainer}>
                        <Text
                          style={{
                            fontSize: 16,
                            fontWeight: "bold",
                            color: "#29648a",
                          }}
                        >
                          Position:
                        </Text>
                        <Text style={{ fontSize: 16 }}>{exp.jobPosition}</Text>
                      </View>
                      <View style={styles.labelContainer}>
                        <Text
                          style={{
                            fontSize: 16,
                            fontWeight: "bold",
                            color: "#29648a",
                          }}
                        >
                          Location:
                        </Text>
                        <Text style={{ fontSize: 16 }}>{exp.location}</Text>
                      </View>
                      <View style={styles.labelContainer}>
                        <Text
                          style={{
                            fontSize: 16,
                            fontWeight: "bold",
                            color: "#29648a",
                          }}
                        >
                          Start Date:
                        </Text>
                        <Text style={{ fontSize: 16 }}>
                          {new Date(exp.startDate).toLocaleDateString()}
                        </Text>
                      </View>
                      <View style={styles.labelContainer}>
                        <Text
                          style={{
                            fontSize: 16,
                            fontWeight: "bold",
                            color: "#29648a",
                          }}
                        >
                          End Date:
                        </Text>
                        <Text style={{ fontSize: 16 }}>
                          {new Date(exp.endDate).toLocaleDateString()}
                        </Text>
                      </View>
                    </View>
                  </>
                ))}
            </ScrollView>
          </View>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
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
  labelContainer: {
    flex: 1,
    flexDirection: "row",
    gap: 5,
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    justifyContent: "space-between",
    width: Dimensions.get("window").width * 0.95,
    height: Dimensions.get("window").height * 0.8,
  },
  closeButton: {
    alignSelf: "center",
    marginVertical: 10,
  },
  closeButtonText: {
    fontSize: 16,
    color: "#29648a", // Цвет кнопки закрытия
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  nickname: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#29648a",
    textAlign: "center",
    marginBottom: 10,
  },
  username: {
    fontSize: 16,
    marginBottom: 10,
    color: "#29648a",
    textAlign: "center",
  },
  usernameUnknown: {
    fontSize: 16,
    marginBottom: 20,
    color: "#29648a",
    fontStyle: "italic",
  },
  lineBreak: {
    marginVertical: 5,
    borderColor: "#29648a",
    borderBottomWidth: 1,
    width: Dimensions.get("window").width - 20,
  },
});

export default UserProfileModal;
