import React, {useRef, useState, useEffect} from 'react';
import {View, Pressable, Alert} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Camera, useCameraDevice} from 'react-native-vision-camera';
import {
  useCheckAndOpenCamera,
  usePostImageToAPI,
  useTakePhotoAndSave,
} from '../../hooks/useCameraHooks';
import {requestStoragePermission} from '../../utils/permissionUtils';

import styles from './CameraScreenStyles';
import CameraIcon from '../../assets/camera.svg';
import UploadIcon from '../../assets/upload.svg';

import {launchImageLibrary} from 'react-native-image-picker';
import {useNavigation} from '@react-navigation/native';

const CameraScreen: React.FC<{route: any}> = ({route}) => {
  const device = useCameraDevice('back');
  const camera = useRef<Camera>(null);
  const checkAndOpenCamera = useCheckAndOpenCamera();
  const postImageToAPI = usePostImageToAPI();
  const takePhotoAndSave = useTakePhotoAndSave();
  const [isCameraVisible, setIsCameraVisible] = useState(false);
  const userLocation = route.params.userLocation;
  const navigation = useNavigation();

  useEffect(() => {
   
    const openCamera = async () => {
      const isCameraAccessible = await checkAndOpenCamera();
      if (isCameraAccessible) {
        setIsCameraVisible(true);
      }
    };
    openCamera();
  }, [checkAndOpenCamera]);

  const handleTakePhoto = () => {
    takePhotoAndSave(camera, postImageToAPI, userLocation);
  };

  const pickImageFromGallery = async () => {
     requestStoragePermission();
    launchImageLibrary(
      {
        mediaType: 'photo',
      },
      async response => {
        if (response.assets && response.assets.length > 0) {
          const selectedImage = response.assets[0];
          if (selectedImage.uri) {
            try {
              await postImageToAPI(selectedImage.uri, userLocation);
              Alert.alert('Success', 'Photo saved successfully');
              navigation.navigate('Gallery');
            } catch (error) {
              Alert.alert(
                'Error',
                'Failed to save photo. Please try again later.',
              );
            }
          }
        }
      },
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {isCameraVisible && device && (
        <View style={styles.cameraContainer}>
          <Camera
            ref={camera}
            style={styles.camera}
            device={device}
            isActive={true}
            photo={true}
          />
          <View>
            <Pressable onPress={handleTakePhoto} style={styles.captureButton}>
              <CameraIcon width={70} height={70} />
            </Pressable>
            <Pressable
              onPress={pickImageFromGallery}
              style={styles.uploadButton}>
              <UploadIcon width={40} height={40} />
            </Pressable>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default CameraScreen;
