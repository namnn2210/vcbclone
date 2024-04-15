import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { useAuthetication } from '../../Stores/useAuthetication';
import Header from './Header';
import { navigate } from '../../Navigators/NavigationUtils';
import { MAIN_NAVIGATION } from '../../Navigators/MainNavigator';
import { formatCurrency } from '../TransferMoneyScreen/index';
import { LocalStorage } from '@/localStore';

const MAIN_SCREEN = require('../../assets/listAcc.jpg');

const ListAcc = ({ route }: { route: any }) => {
  const [amout, setAmount] = useState('0');
  const state: any = useAuthetication();
  // const info = state.info;
  const [info, setInfo] = useState<any | {}>({});

  // const getAmout = React.useCallback(async () => {
  //   const currentAmout = await AsyncStorage.getItem('amout');
  //   if (currentAmout === null) {
  //     setAmount('0');
  //   } else {
  //     setAmount(currentAmout);
  //   }
  // }, []);

  // useFocusEffect(
  //   React.useCallback(() => {
  //     const unsubscribe = getAmout();

  //     return () => unsubscribe;
  //   }, [getAmout]),
  // );
  useFocusEffect(
    React.useCallback(() => {
      const fetchUserInfo = async () => {

        const userInfo = await LocalStorage.getUser();
        console.log('user info', userInfo)
        setInfo(userInfo);
      };

      fetchUserInfo();
    }, [])
  );

  return (
    <View style={{ flex: 1 }}>
      <Header />
      <ScrollView>
        <Image source={MAIN_SCREEN} style={{ width: '100%', height: 880, bottom: 20 }} resizeMode="contain" />
        <Text
          style={{
            fontSize: 20,
            color: 'black',
            fontFamily: '',
            position: 'absolute',
            alignSelf: 'center',
            top: 350,
          }}>{`${formatCurrency(info.amount)}`}</Text>
        <Text
          style={{
            fontSize: 12,
            color: '#6cc102',
            fontFamily: '',
            position: 'absolute',
            alignSelf: 'flex-end',
            top: '87%',
            left: '10%',
          }}>
          {info?.accountNumber}
        </Text>

        <Text
          style={{
            fontSize: 16,
            color: '#6cc102',
            fontFamily: '',
            position: 'absolute',
            alignSelf: 'flex-end',
            top: '92.3%',
            right: '22%',
          }}>{`${formatCurrency(info.amount)}`}</Text>
        <TouchableOpacity
          style={{ height: 150, width: '100%', position: 'absolute', top: 700 }}
          onPress={() => {
            navigate(MAIN_NAVIGATION.HISTORY);
          }}
        />
      </ScrollView>
    </View>
  );
};

export default ListAcc;
