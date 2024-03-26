import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../Screens/HomeScreen/Home.tsx';
import CameraScreen from '../Screens/CameraScreen/CameraScreen.tsx';
import Gallery from '../Screens/GalleryScreen/Gallery.tsx';
import MapScreen from '../Screens/MapScreen/MapScreen.tsx';

const MainNavigator = createNativeStackNavigator();

function Navigation() {
  return (
    <NavigationContainer>
      <MainNavigator.Navigator
        screenOptions={{
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontSize: 20,
          },
          animation: 'slide_from_right',
        }}>
        <MainNavigator.Screen
          name="Home"
          component={Home}
          options={{title: 'Momemento Map'}}
        />
        <MainNavigator.Screen
          name="CameraScreen"
          component={CameraScreen}
          options={{title: 'Camera'}}
        />
        <MainNavigator.Screen name="Gallery" component={Gallery} />
        <MainNavigator.Screen
          name="MapScreen"
          component={MapScreen}
          options={{title: 'Map'}}
        />
      </MainNavigator.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
