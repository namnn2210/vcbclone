import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import styles from './styles';
import { navigate } from '../../Navigators/NavigationUtils';
import { MAIN_NAVIGATION } from '../../Navigators/MainNavigator';

const Header = () => {
  return (
    <View style={styles.headerBox}>
      <TouchableOpacity
        style={{ padding: 10 }}
        onPress={() => {
          navigate(MAIN_NAVIGATION.MAIN);
        }}>
        <MaterialIcons name="home" color={'white'} size={30} style={{ alignSelf: 'center' }} />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
