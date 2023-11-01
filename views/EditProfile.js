import React, { useState } from 'react';
import { Button, Image, StyleSheet, Text, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const EditProfile = () => {
    const [image, setImage] = useState('');

    const pickImage = async () => {
        // Запросить разрешение на доступ к камере
        // const permission = await ImagePicker.requestCameraPermissionsAsync();
        // if (permission.status !== 'granted') {
        //     return;
        // }

        // Открыть диалоговое окно выбора фото
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
        });

        // Получить выбранное фото
        const image = result.uri;

        // Установить выбранное фото в состояние
        setImage(image);
    };

    const handleUpload = async () => {
        // Выбрать фото
        const image = await pickImage();

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
