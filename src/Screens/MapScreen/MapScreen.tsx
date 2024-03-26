import React, {useEffect, useState, useLayoutEffect} from 'react';
import {
  View,
  Image,
  Text,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import GetLocation from 'react-native-get-location';
import {useNavigation} from '@react-navigation/native';
import Refresh from '../../assets/refresh.svg';
import {requestLocationPermission} from '../../utils/permissionUtils';
import styles from './mapScreen';
interface Location {
  latitude: number;
  longitude: number;
}

interface Photo {
  id: string;
  Image: string;
  DateTaken: string;
  Path: string;
  Latitude: number;
  Longitude: number;
}

const MapScreen = () => {
  const [userLocation, setUserLocation] = useState<Location | null>(null);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const navigation = useNavigation();
  useEffect(() => {
    requestLocationPermission();
    getCurrentPosition();
    fetchPhotos();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={fetchPhotos}>
          <Refresh height={30} width={30} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const getCurrentPosition = () => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 60000,
    })
      .then(location => {
        setUserLocation(location);
      })
      .catch(error => {
        const {code, message} = error;
        console.warn(code, message);
      });
  };

  const fetchPhotos = async () => {
    try {
      const response = await fetch(
        'https://65fefa84df565f1a61449a1d.mockapi.io/MomentoMap/Photo',
      );
      const data = await response.json();
      setPhotos(data);
    } catch (error) {
      console.error('Error fetching photos:', error);
    }
  };

  const countPhotosAtLocation = (latitude: number, longitude: number) => {
    return photos.filter(
      photo => photo.Latitude === latitude && photo.Longitude === longitude,
    ).length;
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/w3.jpg')}
        style={styles.backgroundImage}>
        {userLocation && (
          <MapView
            style={styles.map}
            provider={PROVIDER_GOOGLE}
            showsUserLocation={true}
            zoomControlEnabled={true}
            loadingIndicatorColor="white"
            loadingEnabled={true}
            loadingBackgroundColor="#013d86"
            initialRegion={{
              latitude: userLocation.latitude,
              longitude: userLocation.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}>
            {photos.map(photo => (
              <Marker
                key={photo.id}
                coordinate={{
                  latitude: photo.Latitude,
                  longitude: photo.Longitude,
                }}>
                <View style={styles.markerContainer}>
                  <Image
                    source={{uri: `file://${photo.Path}`}}
                    style={styles.markerImage}
                  />
                  <View style={styles.photoCountContainer}>
                    <Text style={styles.photoCountText}>
                      {countPhotosAtLocation(photo.Latitude, photo.Longitude)}
                    </Text>
                  </View>
                </View>
              </Marker>
            ))}
          </MapView>
        )}
      </ImageBackground>
    </View>
  );
};

export default MapScreen;
