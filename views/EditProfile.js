import React, { useState } from "react";
import { View, Text, StyleSheet, Button, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from 'axios';

const EditProfile = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const openImagePicker = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access media library is required!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setSelectedImage(result.assets[0].uri);
      uploadImage(result.assets[0].uri); // Отправляем фото на сервер
    }
  };

  const handleCameraLaunch = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access camera is required!");
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setSelectedImage(result.uri);
      uploadImage(result.uri); // Отправляем фото на сервер
    }
  };

  const uploadImage = async (uri) => {
    const formData = new FormData();
    formData.append('fileData', {
      uri,
      type: 'image/jpeg', 
      name: 'myImage.jpg'
    });

    try {
      const response = await axios.post(
        "https://caapp-server.onrender.com/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Image uploaded:", response.data);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.textHeader]}>Edit Profile</Text>
      <Image
        source={{ uri: selectedImage }}
        style={{ width: 200, height: 200, resizeMode: "cover" }}
      />
      <Button title="Choose from Device" onPress={openImagePicker} />
      <Button title="Open Camera" onPress={handleCameraLaunch} />
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
