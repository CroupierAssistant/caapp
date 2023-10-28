import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableHighlight } from "react-native";
import ImagePicker from "react-native-image-picker";

const EditProfile = () => {
  return (
    <View style={styles.container}>
      <Text style={[styles.textHeader]}>Edit Profile</Text>
      <TouchableHighlight
        onPress={() => {
          var options = {
            title: "Select Image",
            storageOptions: {
              skipBackup: true,
              path: "images",
            },
          };
          ImagePicker.showImagePicker(options, (response) => {
            console.log("Response = ", response);
            if (response.didCancel) {
              console.log("User cancelled image picker");
            } else if (response.error) {
              console.log("ImagePicker Error: ", response.error);
            } else if (response.customButton) {
              console.log("User tapped custom button: ", response.customButton);
            } else {
              console.log(
                "User selected a file from camera or gallery",
                response
              );
              const data = new FormData();
              data.append("name", "avatar");
              data.append("fileData", {
                uri: response.uri,
                type: response.type,
                name: response.fileName,
              });
              const config = {
                method: "POST",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "multipart/form-data",
                },
                body: data,
              };
              fetch("http://localhost:3000/" + "upload", config)
                .then((checkStatusAndGetJSONResponse) => {
                  console.log(checkStatusAndGetJSONResponse);
                })
                .catch((err) => {
                  console.log(err);
                });
            }
          });
        }}
      >
        CHOOSE PHOTO
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  textHeader: {
    textAlign: "center",
    fontSize: 22,
    color: "#29648a",
    fontWeight: "bold",
    marginBottom: 20,
    textTransform: "uppercase",
  },
});

export default EditProfile;
