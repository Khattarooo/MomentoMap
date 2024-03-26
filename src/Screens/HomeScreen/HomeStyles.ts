import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingBottom: 90,
  },
  container1: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingTop: 40,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  quote: {
    fontSize: 38,
    color: 'white',
    textAlign: 'right',
    marginHorizontal: 20,
    marginBottom: 0,
    fontWeight: 'bold',
  },
});

export default styles;
