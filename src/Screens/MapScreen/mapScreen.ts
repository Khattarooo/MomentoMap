import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  markerContainer: {
    flex: 2,
    alignItems: 'center',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  markerImage: {
    width: 60,
    height: 60,
    borderRadius: 5,
  },
  photoCountContainer: {
    backgroundColor: '#238FFD',
    paddingHorizontal: 5,
    paddingVertical: 1,
    position: 'absolute',
    top: 1,
    right: 3,
    borderRadius: 5,
  },
  photoCountText: {
    color: 'white',
  },
});
export default styles;
