import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';
import styles from './styles';
import { goBack } from '../../Navigators/NavigationUtils';

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
          Thông tin tài khoản
        </Text>
      </View>
      <TouchableOpacity
        style={{ flexDirection: 'row' }}
        onPress={() => {
        }}>
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default Header;
