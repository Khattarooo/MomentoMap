import React from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import styles from '../../Screens/GalleryScreen/GalleryStyles';

interface PhotoGridItemProps {
  item: {Path: string};
  onPress: (item: {Path: string}) => void;
}

const PhotoGridItem: React.FC<PhotoGridItemProps> = ({item, onPress}) => (
  <View style={styles.gridItem}>
    <TouchableOpacity onLongPress={() => onPress(item)}>
      <Image source={{uri: item.Path}} style={styles.photo} />
    </TouchableOpacity>
  </View>
);

export default PhotoGridItem;
