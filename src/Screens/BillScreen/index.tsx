import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, Image, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';
import styles from './styles';
import Header from './Header';
import { navigate } from '../../Navigators/NavigationUtils';
import { MAIN_NAVIGATION } from '../../Navigators/MainNavigator';
import { BG } from '../TransferMoneyScreen';
import { Padding, PaddingMini } from '../TransferMoneyScreen';
import * as Notifications from 'expo-notifications';
import { useFocusEffect } from '@react-navigation/native';
import { LocalStorage } from '@/localStore';

const VCB_logo = require('../../assets/successTitle.png');
const TOGGLE = require('../../assets/toggleSw.png');

const camera = require('../../assets/camera.png');
const share = require('../../assets/share.png');
const profile = require('../../assets/share.png');

const HorizontalLine = () => {
  return <View style={{ height: 2, width: '100%', backgroundColor: 'rgba(256, 256, 256, 0.2)' }} />;
};

const Label = ({
  title,
  txt1,
  txt2,
  color,
  bank,
}: {
  title: string;
  txt1: string;
  txt2?: any;
  color?: string;
  bank?: boolean;
}) => {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      <Text
        style={{
          color: 'rgba(195, 200, 205, 1)',
          fontSize: 16.5,
          // fontFamily: '',
          fontWeight: '600',
          textAlign: 'center',
        }}>
        {title}
      </Text>
      <View>
        {bank ? (
          <Text
            style={{
              color: color || 'rgba(256, 256, 256, 1)',
              fontSize: 16.5,
              fontFamily: '',
              fontWeight: '600',
              textAlign: 'right',
              width: 180,
            }}>
            {txt1}
          </Text>
        ) : (
          <>
            <Text
              style={{
                color: color || 'rgba(256, 256, 256, 1)',
                fontSize: 16.5,
                fontFamily: '',
                fontWeight: '600',
                textAlign: 'right',
              }}>
              {txt1}
            </Text>
            <Text
              style={{
                color: color || 'rgba(256, 256, 256, 1)',
                fontSize: 16.5,
                fontFamily: '',
                fontWeight: '600',
                textAlign: 'right',
              }}>
              {txt2}
            </Text>
          </>
        )}
      </View>
    </View>
  );
};

function customDateFormat(date: any) {
  const daysOfWeek = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];

  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  const hours = ('0' + date.getHours()).slice(-2);
  const minutes = ('0' + date.getMinutes()).slice(-2);
  const dayOfWeek = daysOfWeek[date.getDay()];

  const formattedDate = `${hours}:${minutes} ${dayOfWeek} ${day}/${month}/${year}`;

  return formattedDate;
}

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const BillScreen = ({ route }: { route: any }) => {

  // const { expoPushToken, notification } = usePushNotifications()

  const { dataRoute } = route.params;

  const [date, setDate] = useState('');

  const currentDate = new Date();
  const billNumber = String(Math.floor(Math.random() * 10000000000000))

  useFocusEffect(
    React.useCallback(() => {
      const showLocalNotification = async () => {
        const { status } = await Notifications.requestPermissionsAsync();
        if (status !== 'granted') {
          // alert('No notification permissions!');
          return;
        }

        const formattedDate = `${currentDate.getDate().toString().padStart(2, '0')}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getFullYear()} ${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()} `;
        const currentUser: any = await LocalStorage.getUser();
        await Notifications.scheduleNotificationAsync({
          content: {
            title: "Thông báo VCB",
            body: `Số dư TK VCB ${dataRoute.userInfo.accountNumber} -${dataRoute.amount} VND lúc ${formattedDate}. Số dư ${Number(currentUser.amount).toLocaleString('en-US')}. Ref MBVCB.${billNumber}.765644.${dataRoute.contentSend}`,
            data: { data: 'goes here' },
          },
          trigger: null,
        });
      };

      showLocalNotification();
    }, [dataRoute])
  );

  useEffect(() => {
    const formattedDate = customDateFormat(currentDate);
    setDate(formattedDate);
  }, [currentDate]);

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground source={BG} resizeMode="cover">
        <Header />
        <ScrollView style={styles.section}>
          <View style={{ height: 200 }}>
            <Image source={VCB_logo} style={{ height: 50, width: 150, alignSelf: 'center' }} resizeMode="contain" />
            <View
              style={{
                backgroundColor: 'white',
                height: 40,
                width: 40,
                alignSelf: 'center',
                borderRadius: 50,
                position: 'absolute',
                top: 60,
              }}
            />
            <Ionicons name={'checkmark-circle-sharp'} color={'#5db422'} size={60} style={{ alignSelf: 'center' }} />
            <Text
              style={{
                color: 'rgba(256, 256, 256, 1)',
                fontSize: 16,
                fontFamily: '',
                fontWeight: '600',
                textAlign: 'center',
                marginTop: 10
              }}>
              CHUYỂN KHOẢN THÀNH CÔNG
            </Text>
            <Text
              style={{
                color: '#5db422',
                fontSize: 24,
                // fontFamily: '',
                fontWeight: 'bold',
                textAlign: 'center',
                marginTop: 10
              }}>
              {`${dataRoute.amount} VND`}
            </Text>
            <Text
              style={{
                color: 'rgba(256, 256, 256, 0.5)',
                fontSize: 13,
                // fontFamily: '',
                fontWeight: 'bold',
                textAlign: 'center',
                marginTop: 10
              }}>
              {date}
            </Text>
          </View>
          <Padding />
          <HorizontalLine />
          <PaddingMini />
          <Label title="Tên người thụ hưởng" txt1={dataRoute.receiveName} />
          <PaddingMini />
          <HorizontalLine />
          <PaddingMini />
          <Label title="Tài khoản thụ hưởng" txt1={dataRoute.receiveNumberbank} />
          <PaddingMini />
          <HorizontalLine />
          <PaddingMini />
          <Label title="Ngân hàng thụ hưởng" txt1={dataRoute.bank.name} bank />
          <PaddingMini />
          <HorizontalLine />
          <PaddingMini />
          <Label title="Mã giao dịch" txt1={billNumber} />
          <PaddingMini />
          <HorizontalLine />
          <PaddingMini />
          <Label title="Nội dung" txt1={dataRoute.contentSend} />
          <PaddingMini />
          <HorizontalLine />
          <PaddingMini />
          {/* <Padding /> */}
          {/*<Text
            style={{
              color: 'rgba(256, 256, 256, 0.5)',
              fontSize: 13,
              fontFamily: 'Manrope-SemiBold',
              marginLeft: 5,
            }}>
            Chọn phương thức xác thực
             </Text>
          <InputReadBox txt={'VCB - Smart OTP'} icon={'caret-down'} /> */}
          <Padding />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text
              style={{
                color: 'rgba(195, 200, 205, 1)',
                fontSize: 16.5,
                fontFamily: '',
                fontWeight: '600',
                textAlign: 'center',
              }}>
              Lưu mẫu chuyển tiền
            </Text>
            <Image
              source={TOGGLE}
              style={{ height: 50, width: 100, alignSelf: 'center', borderRadius: 50, marginTop: -15 }}
              resizeMode="contain"
            />
          </View>
          <Padding />
          <HorizontalLine />
          <Padding />
          <Padding />
          <View style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: 'center',
            flex: 1,
            gap: 24
          }}>
            <Image source={share}
              resizeMode='cover'
              style={{ height: 80, width: 80 }}
            />
            <Image
              source={camera}
              resizeMode='cover'
              style={{ height: 80, width: 80 }}
            />

            <Image
              source={profile}
              resizeMode='cover'
              style={{ height: 80, width: 80 }}
            />
          </View>
          {/**/}
          <Padding />
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={['#5db422', '#2f9929', '#047d30']}
            style={{
              width: '100%',
              backgroundColor: 'white',
              borderRadius: 10,
            }}>
            <TouchableOpacity
              onPress={() => {
                navigate(MAIN_NAVIGATION.TRANSFER, { code: undefined, typeScreen: 'BILL' });
              }}
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                paddingHorizontal: 10,
                marginVertical: 5,
                height: 35,
              }}>
              <Text
                style={{
                  alignSelf: 'center',
                  color: 'white',
                  fontSize: 16,
                  // fontFamily: 'Manrope-SemiBold',
                  marginRight: 5,
                }}>
                Thực hiện giao dịch mới
              </Text>
            </TouchableOpacity>
          </LinearGradient>
          <View style={{ height: 150 }} />
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default BillScreen;
