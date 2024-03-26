import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  buttonsContainer: {
    flexDirection: 'row',
    width: '100%',
  },
  gridItem: {
    flex: 1 / 3,
    flexDirection: 'column',
    margin: 1,
  },
  photo: {
    width: '100%',
    borderRadius: 10,
    aspectRatio: 1,
  },
  text: {
    color: 'white',
    alignSelf: 'center',
    marginTop: 30,
    fontSize: 20,
  },
  loading: {
    paddingTop: '100%',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    width: '100%',
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    backgroundColor: '#f2f2f2',
    opacity: 0.9,
    padding: 8,
    marginBottom: 3,
    color: 'black',
  },
  sectionFlatList: {
    marginBottom: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    elevation: 5,
  },
  modalImage: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
  closeButton: {
    alignSelf: 'center',
    padding: 10,
    marginHorizontal: 60,
  },
  closeButtonText: {
    color: 'blue',
  },
  deleteButtonText: {
    color: 'red',
  },
});
export default styles;
