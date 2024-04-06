import React, { useState } from 'react';
import { View, TouchableOpacity, ImageBackground, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import Header from './Header';
import styles from './styles';
import Body from './Body';
import { navigate } from '../../Navigators/NavigationUtils';
import { MAIN_NAVIGATION } from '../../Navigators/MainNavigator';

const image = require('../../assets/BG.jpg');

const HomeScreen = () => {

  const onScan = () => {
    navigate(MAIN_NAVIGATION.SCAN);
  };

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={image}
        resizeMode="contain"
        style={{ flex: 1 }}
      >
        <View style={styles.container}>
          <Header />
          <Body />

          <Image
            style={{ width: '100%', position: 'absolute', bottom: -70 }}
            source={require('../../assets/imgFromRealApp/menu.png')}
            resizeMode="contain"
          />

          <TouchableOpacity
            style={{
              flex: 1,
              height: 80,
              width: 80,
              paddingTop: 10,
              position: 'absolute',
              bottom: 0,
              left: "20%",
              backgroundColor: 'rgba(0,0,0,0)',
            }}
            onPress={() => navigate(MAIN_NAVIGATION.TRANSFER)}
          />

          <TouchableOpacity
            style={{
              flex: 1,
              justifyContent: 'space-between',
              height: 80,
              width: 80,
              paddingTop: 10,
              position: 'absolute',
              bottom: 0,
              backgroundColor: 'rgba(0,0,0,0)',
            }}
            onPress={onScan}
          />
        </View>
      </ImageBackground>
    </View>
  );
};

export default HomeScreen;
