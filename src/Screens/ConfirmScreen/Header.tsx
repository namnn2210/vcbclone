import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';
import styles from './styles';
import { goBack, navigate } from '../../Navigators/NavigationUtils';
import { MAIN_NAVIGATION } from '../../Navigators/MainNavigator';

const Header = () => {
  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      colors={['#5db422', '#2f9929', '#047d30']}
      style={styles.headerBox}>
      <TouchableOpacity
        style={{ flexDirection: 'row' }}
        onPress={() => {
          goBack();
        }}>
        <Ionicons name="arrow-back" color={'white'} size={30} style={{ alignSelf: 'center' }} />
      </TouchableOpacity>
      <View style={{ flexDirection: 'row' }}>
        <Text style={{ alignSelf: 'center', color: 'white', fontSize: 17, fontFamily: '' }}>
          Xác nhận thông tin
        </Text>
      </View>
      <TouchableOpacity
        style={{ flexDirection: 'row' }}
        onPress={() => {
          navigate(MAIN_NAVIGATION.MAIN)
        }}>
        <MaterialIcons name="home" color={'white'} size={30} style={{ alignSelf: 'center' }} />
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default Header;
