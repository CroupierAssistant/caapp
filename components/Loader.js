import React from "react";
import { View, StyleSheet, Animated, Easing } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Loader = () => {
  const animatedValue1 = React.useRef(new Animated.Value(0)).current;
  const animatedValue2 = React.useRef(new Animated.Value(0)).current;
  const animatedValue3 = React.useRef(new Animated.Value(0)).current;
  const animatedValue4 = React.useRef(new Animated.Value(0)).current;

  const animateIcon = (animatedValue, delay) => {
    return Animated.loop(
      Animated.sequence([
        Animated.delay(delay),
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1000,
          easing: Easing.easeInOut,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 1000,
          easing: Easing.easeInOut,
          useNativeDriver: true,
        }),
      ])
    );
  };

  React.useEffect(() => {
    Animated.parallel([
      animateIcon(animatedValue1, 0),
      animateIcon(animatedValue2, 250),
      animateIcon(animatedValue3, 500),
      animateIcon(animatedValue4, 750),
    ]).start();
  }, [animatedValue1, animatedValue2, animatedValue3, animatedValue4]);

  const interpolateScale1 = animatedValue1.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.2],
  });
  const interpolateScale2 = animatedValue2.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.2],
  });
  const interpolateScale3 = animatedValue3.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.2],
  });
  const interpolateScale4 = animatedValue4.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.2],
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.iconContainer,
          { transform: [{ scale: interpolateScale1 }] },
        ]}
      >
        <MaterialCommunityIcons name="cards-heart" size={24} color="#a16e83" />
      </Animated.View>
      <Animated.View
        style={[
          styles.iconContainer,
          { transform: [{ scale: interpolateScale2 }] },
        ]}
      >
        <MaterialCommunityIcons name="cards-club" size={24} color="#29648a" />
      </Animated.View>
      <Animated.View
        style={[
          styles.iconContainer,
          { transform: [{ scale: interpolateScale3 }] },
        ]}
      >
        <MaterialCommunityIcons
          name="cards-diamond"
          size={24}
          color="#a16e83"
        />
      </Animated.View>
      <Animated.View
        style={[
          styles.iconContainer,
          { transform: [{ scale: interpolateScale4 }] },
        ]}
      >
        <MaterialCommunityIcons name="cards-spade" size={24} color="#29648a" />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  iconContainer: {
    marginHorizontal: 5,
  },
});

export default Loader;
