import React, { useState } from 'react';
import { Button, Image, StyleSheet, Text, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Axios from "axios";

const EditProfile = () => {
    const [image, setImage] = useState('');

    const pickImage = async () => {
        // Запросить разрешение на доступ к камере
        const permission = await ImagePicker.requestMediaLibraryPermissionsAsync()
        if (permission.status !== 'granted') {
            return;
        }

        // Открыть диалоговое окно выбора фото
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
        });

        // Получить выбранное фото
        const image = result.uri
        console.log(result);

        // Установить выбранное фото в состояние
        setImage(image);
        handleUpload(image)
    };

    const handleUpload = async (image) => {

        // Если фото было выбрано, загрузить его на сервер
        if (image) {
            const formData = new FormData();
            formData.append('image', {
                name: 'image.jpg',
                type: 'image/jpeg',
                data: image,
            });

            fetch('https://caapp-server.onrender.com/upload', {
                method: 'POST',
                body: formData,
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.success) {
                        setImage(data.image);
                    }
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
