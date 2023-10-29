import React, { useState } from "react";
import { View, Text, StyleSheet, Button, Image, Alert } from "react-native";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import axios from "axios";

const EditProfile = () => {
  const [image, setImage] = useState(null);

  const takePhoto = async () => {
    const result = await launchImageLibrary({
      mediaType: "photo",
      selectionLimit: 1,
    });

    if (result.assets) {
      setImage(result.assets.uri);
      try {
        const formData = new FormData();
        const sendFileData = result.assets.map((item) => ({
          type: item.type,
          name: item.fileName,
          uri: item.uri,
        }));

        formData.append("file", sendFileData);

        const response = await axios.post('https://caapp-server.onrender.com/upload', formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        console.log("Файл успешно загружен:", response.data);
      } catch (error) {
        console.error("Ошибка загрузки файла:", error);
      }
    }
  };

  //   const apiUrl = 'http://localhost:19006/upload'; // Замените на URL вашего сервера

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
    resizeMode: "contain",
  },
});

export default EditProfile;
