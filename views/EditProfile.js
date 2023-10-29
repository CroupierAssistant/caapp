import React, { useState } from "react";
import { View, Text, StyleSheet, Button, Image, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Camera, CameraType } from "expo-camera";
import axios from "axios";

const EditProfile = () => {
  const [image, setImage] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  async function askForPermissions() {
    if (!permission) {
      Alert.alert("Error", "Permissions not granted");
      return false;
    }
    console.log('Permission: ', permission);
    return true;
  }

  const takePhoto = async () => {
    const hasPermissiont = await askForPermissions();
    if (!hasPermissiont) return;

    const img = await ImagePicker.launchCameraAsync({
      quality: 0.7,
      allowsEditing: false,
      aspect: [1, 1],
    });
    console.log('Image: ', img);
    setImage(img.uri)
    uploadFile(img.uri)
  };

  async function uploadImageAsync(uri) {
    let apiUrl = 'https://caapp-server.onrender.com/upload';
    
    let uriParts = uri.split('.');
    let fileType = uriParts[uriParts.length - 1];
  
    let formData = new FormData();
    formData.append('photo', {
      uri,
      name: `photo`,
      type: `image/jpeg`,
      
    });
  
    let options = {
      method: 'POST',
      body: formData,
          headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    };
  
    return fetch(apiUrl, options);
  }

  return (
    <View style={styles.container}>
      {image && <Image source={{ uri: image }} style={styles.image} />}
      <Button title="Get photo" onPress={takePhoto} />
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
  image: {
    width: "100%",
    height: 200,
    marginBottom: 20,
    resizeMode: "contain"
  },
});

export default EditProfile;
