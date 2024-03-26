import {PermissionsAndroid, Alert, Linking} from 'react-native';

export const requestLocationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    } else {
      Alert.alert(
        'Location Permission Denied',
        'You need to grant location permission. Would you like to open app settings?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Open Settings',
            onPress: () => Linking.openSettings(),
          },
        ],
        {cancelable: false},
      );
      return false;
    }
  } catch (err) {
    console.warn(err);
    return null;
  }
};

export const requestStoragePermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    );

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    } else {
      Alert.alert(
        'Storage Permission Denied',
        'You need to grant storage permission. Would you like to open app settings?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Open Settings',
            onPress: () => Linking.openSettings(),
          },
        ],
        {cancelable: false},
      );
      return false;
    }
  } catch (err) {
    console.warn(err);
    return false;
  }
};
