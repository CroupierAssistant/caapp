import React, { useState } from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';

function CardResultsPicturesItem({ item }) {
  const [isImageExpanded, setIsImageExpanded] = useState(false);

  const handleImageClick = () => {
    setIsImageExpanded(!isImageExpanded);
  };

  return (
    <TouchableOpacity onPress={handleImageClick}>
      <View style={[styles.resultItem, isImageExpanded && {height: 200}, {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: item.userInput == item.rightAnswer ? "#3c7c49" : "#a6334d"}]}>
        <View>
            <Text style={{fontSize: 20, lineHeight: 20, fontWeight: "bold", marginBottom: 5, color: "#fff" }}>
                Right answer: {item.rightAnswer}
            </Text>
            <Text style={{ fontSize: 16, color: "#fff", lineHeight: 16 }}>
                Your answer: {item.userInput ? item.userInput : "—"}
            </Text>
        </View>
        <View style={[{position: 'relative' }, isImageExpanded && {position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, justifyContent: 'center', alignItems: 'center'}]}>
            <Image
                style={{ width: 100, height: 106 }}
                source={item.cardNumber}
            />
            {isImageExpanded && (
                <TouchableOpacity onPress={handleImageClick} style={{ position: 'absolute', top: -10, left: -10, right: -10, bottom: 0, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.7)', height: 225, borderRadius: 3 }}>
                    <Image
                        style={{ width: 200, height: 212 }}
                        source={item.cardNumber}
                    />
                </TouchableOpacity>
            )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 50,
        padding: 10,
        elevation: 4,
    },
    header: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 10,
        textAlign: "center",
        color: "#19181a",
    },
    resultItem: {
        marginBottom: 5,
        padding: 10,
        borderRadius: 3,
    },
});

export default CardResultsPicturesItem;
