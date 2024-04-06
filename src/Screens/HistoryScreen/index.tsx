import React, { useState } from 'react';
import { View, Text, ImageBackground, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import styles from './styles';
import Header from './Header';
import { BG } from '../TransferMoneyScreen';
import { Padding, PaddingMini } from '../TransferMoneyScreen';
import { Label, HorizontalLine } from '../ConfirmScreen';
import { useAuthetication } from '../../Stores/useAuthetication';
import { formatCurrency } from '../TransferMoneyScreen/index';
import { useTransactions } from '../../Stores/useTransactions';


const HistoryScreen = ({ route }: { route: any }) => {
  const state: any = useAuthetication();
  const info = state.info;
  const transactionState: any = useTransactions();
  const listTransaction = transactionState.transactions;
  const [amout, setAmount] = useState('0');

  const getAmout = React.useCallback(async () => {
    const currentAmout = await AsyncStorage.getItem('amout');
    if (currentAmout === null) {
      setAmount('0');
    } else {
      setAmount(currentAmout);
    }
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      const unsubscribe = getAmout();

      return () => unsubscribe;
    }, [getAmout]),
  );

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground source={BG} resizeMode="cover">
        <Header />
        <ScrollView style={styles.section}>
          <Text
            style={{
              color: 'rgba(256, 256, 256, 1)',
              fontSize: 16.5,
              fontFamily: '',
              fontWeight: '600',
            }}>
            Tài khoản thanh toán
          </Text>
          <Padding />
          <HorizontalLine />
          <Padding />
          <Label title="Tài khoản nguồn" txt1={info.accountNumber} />
          <PaddingMini />
          <HorizontalLine />
          <PaddingMini />
          <PaddingMini />
          <Label title="Số dư" txt1={`${formatCurrency(amout.toString())} VND`} />
          <PaddingMini />
          <HorizontalLine />
          <PaddingMini />
          <Text
            style={{
              color: 'rgba(256, 256, 256, 1)',
              fontSize: 16.5,
              fontFamily: '',
              fontWeight: '600',
              textAlign: 'center',
            }}>
            Chi tiết tài khoản
          </Text>
          <Padding />
          <Label title="Lịch sử giao dịch" txt1="Tìm kiếm thêm" color={'#4aa924'} />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ borderBottomWidth: 3, borderColor: 'white', flex: 1, height: 50 }}>
              <Text
                style={{
                  color: 'rgba(256, 256, 256, 1)',
                  fontSize: 16.5,
                  fontFamily: '',
                  fontWeight: '600',
                  textAlign: 'center',
                }}>
                Toàn bộ
              </Text>
            </View>
            <View style={{ flex: 1, height: 50 }}>
              <Text
                style={{
                  color: 'rgba(256, 256, 256, 1)',
                  fontSize: 16.5,
                  fontFamily: '',
                  fontWeight: '600',
                  textAlign: 'center',
                }}>
                Tiền vào
              </Text>
            </View>
            <View style={{ flex: 1, height: 50 }}>
              <Text
                style={{
                  color: 'rgba(256, 256, 256, 1)',
                  fontSize: 16.5,
                  fontFamily: '',
                  fontWeight: '600',
                  textAlign: 'center',
                }}>
                Tiền ra
              </Text>
            </View>
          </View>
          <Padding />
          {listTransaction.map((item: any) => (
            <>
              <PaddingMini />
              <Label
                header={item.date}
                title={`${item.code.slice(0, 16)}...`}
                txt1={
                  item.amout > 0
                    ? `+ ${`${formatCurrency(item.amout.toString())} VND`}`
                    : `- ${`${formatCurrency((item.amout * -1).toString())} VND`}`
                }
                color={item.type === 'minus' ? 'red' : '#6cc102'}
              />
              <PaddingMini />
              <HorizontalLine />
            </>
          ))}
          <View style={{ height: 150 }} />
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default HistoryScreen;
