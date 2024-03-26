import {useNavigation} from '@react-navigation/native';
import React, {useState, useEffect, useCallback, useLayoutEffect} from 'react';
import {
  View,
  FlatList,
  Image,
  ActivityIndicator,
  Text,
  RefreshControl,
  TouchableOpacity,
  Modal,
  ImageBackground,
  Alert,
} from 'react-native';
import GoogleLogo from '../../assets/googlemaps.svg';
import styles from './GalleryStyles';
import axios from 'axios';
import PhotoGridItem from '../../Components/Molecules/PhotoGridItem';

const Gallery: React.FC = () => {
  const [photos, setPhotos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    fetchPhotos();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate('MapScreen')}>
          <GoogleLogo height={30} width={30} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const fetchPhotos = useCallback(async () => {
    try {
      setRefreshing(true);
      const response = await axios.get(
        'https://65fefa84df565f1a61449a1d.mockapi.io/MomentoMap/Photo',
      );
      const data = response.data;
      const updatedPhotos = await Promise.all(
        data.map(
          async (photo: {Latitude: number; Longitude: number; Path: any}) => {
            const locationName = await fetchLocationName(
              photo.Latitude,
              photo.Longitude,
            );
            return {
              ...photo,
              Path: `file://${photo.Path}`,
              Location: locationName,
            };
          },
        ),
      );
      setPhotos(updatedPhotos);
      setLoading(false);
    } catch (error) {
      Alert.alert('Failed loading the photos failed');
    } finally {
      setRefreshing(false);
    }
  }, []);
  const onRefresh = () => {
    fetchPhotos();
  };
  const handleDeletePhoto = async () => {
    try {
      if (!selectedImage) {
        return;
      }
      const response = await fetch(
        `https://65fefa84df565f1a61449a1d.mockapi.io/MomentoMap/Photo/${selectedImage.id}`,
        {
          method: 'DELETE',
        },
      );
      if (!response.ok) {
        throw new Error('Failed to delete photo');
      }
      setPhotos(prevPhotos =>
        prevPhotos.filter(photo => photo.id !== selectedImage.id),
      );
      setModalVisible(false);
    } catch (error) {
      console.error('Error deleting photo:', error);
    }
  };
  const fetchLocationName = async (latitude: number, longitude: number) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyCftb-VV6yuq4aJQtMAuondGXstqd6IHW4`,
      );
      if (!response.data.results || response.data.results.length === 0) {
        Alert.alert('No location found');
      }
      const locationName =
        response.data.results[0].address_components[1].long_name;
      return locationName;
    } catch (error) {
      Alert.alert('No location found');
      return 'Unknown';
    }
  };

  const handleImagePress = (photo: any) => {
    setSelectedImage(photo);
    setModalVisible(true);
  };

  if (loading) {
    return (
      <View style={styles.container1}>
        <ImageBackground
          source={require('../../assets/w2.jpg')}
          style={styles.backgroundImage}>
          <ActivityIndicator
            style={styles.loading}
            size="large"
            color="#007aff"
          />
        </ImageBackground>
      </View>
    );
  }

  if (photos.length === 0) {
    return (
      <View style={styles.container1}>
        <ImageBackground
          source={require('../../assets/w2.jpg')}
          style={styles.backgroundImage}>
          <Text style={styles.text}>No photos to display</Text>
        </ImageBackground>
      </View>
    );
  }

  const groupedPhotos: {[key: string]: any[]} = {};
  photos.forEach(photo => {
    const location = photo.Location || 'Unknown';
    if (!groupedPhotos[location]) {
      groupedPhotos[location] = [];
    }
    groupedPhotos[location].push(photo);
  });

  const sortedKeys = Object.keys(groupedPhotos).sort((a, b) =>
    a.localeCompare(b),
  );
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.toLocaleDateString()}`;
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/w2.jpg')}
        style={styles.backgroundImage}>
        <FlatList
          data={sortedKeys}
          renderItem={({item}) => (
            <View>
              <Text style={styles.sectionHeader}>{item}</Text>
              <FlatList
                data={groupedPhotos[item].reverse()}
                renderItem={renderGridItem}
                keyExtractor={index => index.toString()}
                numColumns={3}
                style={styles.sectionFlatList}
              />
            </View>
          )}
          keyExtractor={index => index.toString()}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <View style={styles.buttonsContainer}>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={handleDeletePhoto}>
                  <Text style={styles.deleteButtonText}>Delete</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setModalVisible(false)}>
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
              </View>
              {selectedImage && (
                <View>
                  <Image
                    source={{uri: selectedImage.Path}}
                    style={styles.modalImage}
                  />
                  <Text>Location: {selectedImage.Location}</Text>
                  <Text>Date Taken: {formatDate(selectedImage.DateTaken)}</Text>
                </View>
              )}
            </View>
          </View>
        </Modal>
      </ImageBackground>
    </View>
  );

  function renderGridItem({item}: {item: any}) {
    return <PhotoGridItem item={item} onPress={handleImagePress} />;
  }
};

export default Gallery;
