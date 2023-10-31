import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { AuthContext } from "../context/AuthContext";

const EditProfile = () => {
    const [image, setImage] = useState('');
  
    const handleUpload = () => {
      const formData = new FormData();
      formData.append('image', {
        name: 'image.jpg',
        type: 'image/jpeg',
        data: image,
      });
  
      fetch('http://localhost:3000/upload', {
        method: 'POST',
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            setImage(data.image);
          }
        });
    };
  
    return (
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={{ uri: image }}
        />
        <Button
          title="Загрузить изображение"
          onPress={handleUpload}
        />
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
      width: 200,
      height: 200,
    },
  });
  

export default EditProfile;
