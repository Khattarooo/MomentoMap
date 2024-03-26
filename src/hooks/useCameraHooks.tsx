import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import {useNavigation} from '@react-navigation/native';
import {Alert, Linking} from 'react-native';
import {useCameraPermission} from 'react-native-vision-camera';

export const useCameraPermissions = () => {
  return useCameraPermission();
};

export const useCheckAndOpenCamera = () => {
  const {requestPermission, hasPermission} = useCameraPermissions();

  const checkAndOpenCamera = async () => {
    if (hasPermission) {
      return true;
    } else {
      const isAccessGranted = await requestPermission();
      if (!isAccessGranted) {
        Alert.alert(
          'Permission required',
          'Open settings to grant permission',
          [
            {text: 'Cancel', style: 'cancel'},
            {
              text: 'Open settings',
              style: 'default',
              onPress: async () => {
                await Linking.openSettings();
              },
            },
          ],
        );
        return false;
      } else {
        return true;
      }
    }
  };

  return checkAndOpenCamera;
};

export const useTakePhotoAndSave = () => {
  const navigation = useNavigation();

  const takePhotoAndSave = async (
    camera: any,
    postImageToAPI: Function,
    userLocation: {latitude: number; longitude: number} | null,
  ) => {
    if (camera.current) {
      try {
        const photo = await camera.current.takePhoto();
        await CameraRoll.saveAsset(photo.path);
        await postImageToAPI(photo.path, userLocation);
        Alert.alert('Success', 'Photo taken and saved successfully');
        navigation.navigate('Gallery');
      } catch (error) {
        console.error('Error taking photo:', error);
        Alert.alert(
          'Error',
          'Failed to take and save photo. Please try again later.',
        );
      }
    }
  };

  return takePhotoAndSave;
};

export const usePostImageToAPI = () => {
  const postImageToAPI = async (
    photoPath: string,
    userLocation: {latitude: number; longitude: number} | null,
  ) => {
    try {
      const response = await fetch(
        'https://65fefa84df565f1a61449a1d.mockapi.io/MomentoMap/Photo',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            DateTaken: new Date(),
            Path: photoPath,
            Latitude: userLocation?.latitude,
            Longitude: userLocation?.longitude,
          }),
        },
      );
      if (!response.ok) {
        throw new Error('Failed to save photo to API');
      }
    } catch (error) {
      console.error('Error posting image to API:', error);
      throw new Error('Failed to save photo to API');
    }
  };

  return postImageToAPI;
};
