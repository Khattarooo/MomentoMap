import React, {useEffect, useState} from 'react';
import {View, ImageBackground, Text} from 'react-native';
import Button from '../../Components/Atoms/Button';
import {NavigationProp} from '@react-navigation/native';
import GetLocation from 'react-native-get-location';
import {requestLocationPermission} from '../../utils/permissionUtils';
import styles from './HomeStyles';

type Props = {
  navigation: NavigationProp<any>;
};

const Home: React.FC<Props> = ({navigation}) => {
  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const [quoteIndex, setQuoteIndex] = useState(0);
  const quotes = [
    '“ Navigate Your Nostalgia, Frame Your Journey. ”',
    '“ Where Every Pin Tells a Story. ”',
    '“ Discover the World, Preserve Your Memories. ”',
  ];

  useEffect(() => {
    requestLocationPermission();
    getCurrentLocation();
    const interval = setInterval(() => {
      setQuoteIndex(prevIndex => (prevIndex + 1) % quotes.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [quotes.length]);

  const getCurrentLocation = async () => {
    try {
      const location = await GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 60000,
      });
      setUserLocation(location);
    } catch (error) {
      console.error('Error getting location:', error);
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/w1.jpg')}
      style={styles.backgroundImage}
      testID="background-image">
      <View style={styles.container1} testID="quote-container">
        <Text style={styles.quote} testID="quote-text">
          {quotes[quoteIndex]}
        </Text>
      </View>
      <View style={styles.container} testID="button-container">
        <Button
          navigation={navigation}
          targetScreen="CameraScreen"
          userLocation={userLocation}
          pageName="Camera"
        />
        <Button
          navigation={navigation}
          targetScreen="MapScreen"
          userLocation={userLocation}
          pageName="Map"
        />
        <Button
          navigation={navigation}
          targetScreen="Gallery"
          userLocation={userLocation}
          pageName="Gallery"
        />
      </View>
    </ImageBackground>
  );
};

export default Home;
