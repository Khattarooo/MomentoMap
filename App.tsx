import React from 'react';
import Navigation from './src/Navigation/Navigation';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {ToastProvider} from 'react-native-toast-notifications';
import {StyleSheet} from 'react-native';

function App() {
  return (
    <GestureHandlerRootView style={styles.gesturers}>
      <ToastProvider duration={1000} successColor="green" dangerColor="red">
        <Navigation />
      </ToastProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  gesturers: {flex: 1},
});
export default App;
