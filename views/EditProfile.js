import React, { useState } from 'react';
import { Button, Image, StyleSheet, Text, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from "axios";

const EditProfile = () => {
    const [image, setImage] = useState('');

    const pickImage = async () => {
        // Запросить разрешение на доступ к камере
        const permission = await ImagePicker.getCameraPermissionsAsync();
        if (permission.status !== 'granted') {
            return;
        }

        // Открыть диалоговое окно выбора фото
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
        });

        // Получить выбранное фото
        const image = result.uri;

        // Установить выбранное фото в состояние
        setImage(image);
        handleUpload(image)
    };

    const handleUpload = async (image) => {
        // Если фото было выбрано, загрузить его на сервер
        if (image) {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                data: new FormData(),
            };

            config.data.append('image', {
                name: 'image.jpg',
                type: 'image/jpeg',
                data: image,
            });

            await axios.post('https://caapp-server.onrender.com/upload', config)
                .then((response) => {
                    if (response.status === 200) {
                        setImage(response.data.image);
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    return (
        <View style={styles.container}>
            <Image
                style={styles.image}
                source={{ uri: image }}
            />
            <Button
                title="Загрузить изображение"
                onPress={pickImage}
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