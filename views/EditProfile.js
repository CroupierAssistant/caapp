import React, { useState, useContext } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { AuthContext } from "../context/AuthContext";

const EditProfile = () => {
    const { user, updateUser } = useContext(AuthContext);
    const [photo, setPhoto] = React.useState(null);

    const changeProfilePicture = async () => {
        const image = await ImagePicker.launchImageLibraryAsync();

        try {
            const response = await axios.put(
                "https://caapp-server.onrender.com/change-profile-picture",
                {
                    username: user.username,
                    profilePicture: image,
                }
            );
            setPhoto(image)

            if (response.data.success) {
                updateUser({ ...user, profilePicture: image });
                Alert.alert("Success", "Profile picture changed successfully");
            } else {
                Alert.alert("Error", response.data.message);
            }
        } catch (error) {
            Alert.alert("Error", "An error occurred while changing profile picture");
        }
    };

    return (
        <View style={styles.mainBody}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>React Native Image Upload Axios</Text>
            </View>

            <View style={styles.imageContainer}>
                <Image
                    source={{ uri: photo }}
                    style={{ width: '100%', height: 350 }}
                />
            </View>


            <TouchableOpacity
                style={styles.buttonStyle}
                activeOpacity={0.5}
                onPress={changeProfilePicture}
            >
                <Text style={styles.buttonTextStyle}>Upload Image</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    mainBody: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    buttonStyle: {
        backgroundColor: '#307ecc',
        borderWidth: 0,
        color: '#FFFFFF',
        borderColor: '#307ecc',
        height: 40,
        alignItems: 'center',
        borderRadius: 30,
        marginLeft: 35,
        marginRight: 35,
        marginTop: 15,
    },
    buttonTextStyle: {
        color: '#FFFFFF',
        paddingVertical: 10,
        fontSize: 16,
    },
    textStyle: {
        backgroundColor: '#fff',
        fontSize: 15,
        marginTop: 16,
        marginLeft: 35,
        marginRight: 35,
        textAlign: 'center',
    },
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#d9d6d6',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    titleContainer: {
        alignItems: 'center',
        marginBottom: 30,
    },
    title: {
        fontSize: 23,
        fontWeight: 'bold',
    },
});

export default EditProfile;
