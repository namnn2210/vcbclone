import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIconsIcons from '@expo/vector-icons/MaterialIcons';
import { LinearGradient } from 'expo-linear-gradient';
import styles from './styles';
import { useAuthetication } from '../../Stores/useAuthetication';
import { LocalStorage } from '../../localStore/index';
import { useDispatch } from 'react-redux';
import { setLogin } from '../../store/index';

const Header = () => {
  const setLogOut = useAuthetication((state: any) => state.setLogOut);
  const dispatch = useDispatch();

  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      colors={['#5db422', '#2f9929', '#047d30']}
      style={styles.headerBox}>
      <TouchableOpacity style={{ flexDirection: 'row' }}
        onPress={() => {
          setLogOut()
          LocalStorage.logout();
          dispatch(setLogin(false));
        }}
      >
        <MaterialCommunityIcons name="exit-to-app" color={'white'} size={30} style={{ alignSelf: 'center', transform: [{ rotateY: '180deg' }] }} />
        <Text style={{ alignSelf: 'center', color: 'white', fontSize: 15 }}>Thoát</Text>
      </TouchableOpacity>
      <View style={{ flexDirection: 'row' }}>
        <Image style={styles.logoMain} source={require('../../assets/imgFromRealApp/logoVCB.png')} resizeMode="contain" />
      </View>
      <View style={{ flexDirection: 'row' }}>
        <MaterialIconsIcons name="search" color={'white'} size={35} style={{ alignSelf: 'center', marginRight: 15 }} />
        <MaterialCommunityIcons name="bell-outline" color={'white'} size={30} style={{ alignSelf: 'center' }} />
      </View>
    </LinearGradient>
  );
};

export default Header;
