import React from 'react';
import {StyleSheet, Pressable, Text, Animated, View} from 'react-native';
import {NavigationProp} from '@react-navigation/native';

type Props = {
  navigation: NavigationProp<any>;
  targetScreen: string;
  pageName: string;
  userLocation: {
    latitude: number;
    longitude: number;
  } | null;
};

const Button: React.FC<Props> = ({
  navigation,
  targetScreen,
  pageName,
  userLocation,
}) => {
  const scale = new Animated.Value(1);

  const animatePress = () => {
    Animated.sequence([
      Animated.spring(scale, {
        toValue: 0.9,
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 1,
        useNativeDriver: true,
      }),
    ]).start(() => {
      navigation.navigate(targetScreen, {userLocation});
    });
  };

  return (
    <Pressable onPress={animatePress}>
      <View style={styles.buttonContainer}>
        <Animated.View style={[styles.button, {transform: [{scale}]}]}>
          <Text style={styles.text}>Go to {pageName}</Text>
        </Animated.View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    margin: 10,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 20,
    paddingHorizontal: 60,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  text: {
    color: 'white',
    fontSize: 16,
  },
});

export default Button;
