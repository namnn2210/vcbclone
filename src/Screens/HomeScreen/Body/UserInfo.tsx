import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { formatCurrency } from '../../TransferMoneyScreen/index';
import styles from '../styles';
import { useAuthetication } from '../../../Stores/useAuthetication';
import { navigate } from '../../../Navigators/NavigationUtils';
import { MAIN_NAVIGATION } from '../../../Navigators/MainNavigator';
import { LocalStorage } from '@/localStore';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { useTransactions } from '../../../Stores/useTransactions';
import { Platform } from 'react-native';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import moment from 'moment';

function generateUniqueRoomId() {
  return Math.floor(10000 + Math.random() * 90000);
}

async function registerForPushNotificationsAsync() {
  let token: string | undefined;
  if (Platform.OS !== 'web') {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;

  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}

const UserInfo = () => {
  const [userInfo, setUserInfo] = useState<any>({});
  const [accountNumber, setAccountNumber] = useState('');
  const [seeAmout, setSeeAmout] = useState(false);
  const addTransactions = useTransactions((state: any) => state.addTransactions);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const userInfo = await LocalStorage.getUser();
      setUserInfo(userInfo);
      console.log('info', userInfo)
    };

    fetchUserInfo();
    // Then call fetchUserInfo every 1 second
    const intervalId = setInterval(fetchUserInfo, 1000);

    // Clear the interval when the component unmounts


    registerForPushNotificationsAsync().then(token => {
      console.log('ExpoToken: ', token)

      const connectWebSocket = new Promise<W3CWebSocket>((resolve, reject) => {
        const client = new W3CWebSocket('ws://103.241.43.107:7777/ws');
        client.onopen = async () => {
          console.log('WebSocket is open now.');
          const currentUser = await LocalStorage.getUser();
          await LocalStorage.setUser({ ...currentUser, token: token })
          fetchUserInfo();
          resolve(client);
        };

        client.onmessage = async message => {
          let messageData;

          if (typeof message.data === 'string') {
            messageData = JSON.parse(message.data);
          } else {
            messageData = JSON.parse(message.data.toString());
          }
          if (messageData.token === token) {
            // The token in the message equals the device token
            // Create a notification
            console.log(messageData)
            const currentDate = new Date();
            const formattedDate = `${currentDate.getDate().toString().padStart(2, '0')}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getFullYear()} ${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()} `;
            const currentUser: any = await LocalStorage.getUser();
            console.log('accountNumber', currentUser.accountNumber)
            // setAccountNumber(currentUser.accountNumber);
            console.log('currentUser1', currentUser)
            const billNumber = String(Math.floor(Math.random() * 10000000000000))
            const newAmount = Number(currentUser.amount) + Number(messageData.amount);
            console.log('amount 1', newAmount)
            LocalStorage.setUser({ ...currentUser, amount: newAmount })
            fetchUserInfo();
            console.log('********', currentUser)
            await Notifications.scheduleNotificationAsync({
              content: {
                title: "Thông báo VCB",
                body: `Số dư TK VCB ${currentUser.accountNumber} +${messageData.amount.toLocaleString('en-US')} VND lúc ${formattedDate}. Số dư ${newAmount.toLocaleString('en-US')}. Ref MBVCB.${billNumber}.765644.${messageData.content}`,
                data: { data: 'dataRoute' },
              },
              trigger: null,
            });
            setTimeout(() => {
              const newTransaction = {
                date: moment().format('DD/MM/YYYY'),
                code: `${billNumber}`,
                amout: `+${messageData.amount}`,
                type: 'plus',
              };
              addTransactions(newTransaction);
            }, 1500);
          }
        };

        client.onerror = error => {
          console.log('Connection error', error);
          reject(error);
        };
      });

      // connectWebSocket.then(client => {
      //   const roomId = generateUniqueRoomId();
      //   client.send(JSON.stringify({ token, room: roomId }));
      // }).catch(error => {
      //   console.error('Failed to connect to the WebSocket server: ', error);
      // });
    });

    return () => clearInterval(intervalId);
  }, []);



  const changeViewAmoutTrue = () => {
    setSeeAmout(true);
  };
  const changeViewAmoutFalse = () => {
    setSeeAmout(false);
  };

  return (
    <View style={styles.infoUser}>
      <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
        <Text style={{ color: 'gray', fontSize: 10, fontFamily: '' }}>Xin chào </Text>
        <Text
          style={{ color: 'white', fontSize: 15, fontFamily: '', marginLeft: 5, fontWeight: 'bold', textTransform: 'uppercase' }}>
          {userInfo?.name}
        </Text>
      </View>
      <View style={styles.info}>
        <View style={styles.avatar}>
          <MaterialIcons name="person" color={'green'} size={55} style={styles.iconBottom} />
        </View>
        <View style={styles.avatarEdit}>
          <MaterialCommunityIcons name="lead-pencil" color={'green'} size={12} style={styles.iconBottom} />
        </View>
        <View style={styles.infoText}>
          <Text style={{ fontSize: 12, color: 'white', fontFamily: '' }}>TÀI KHOẢN THANH TOÁN</Text>
          <View style={{ flexDirection: 'row' }}>
            <Text
              style={{
                fontSize: 18,
                color: 'white',
                fontWeight: 'bold',
                fontFamily: '',
                marginRight: 5,
              }}>
              {userInfo?.accountNumber}
            </Text>
            <MaterialCommunityIcons
              name="content-copy"
              color={'#4aa924'}
              size={15}
              style={{ alignSelf: 'center', transform: [{ rotateY: '180deg' }] }}
            />
          </View>
          <View style={styles.accBalance}>
            <Text style={{ fontSize: 12, color: 'gray', fontFamily: '' }}>Số dư</Text>
            {seeAmout ? (
              <Text style={{ fontSize: 15, color: '#6cc102', marginLeft: 10 }}>{`${formatCurrency(
                userInfo.amount.toString(),
              )} VND`}</Text>
            ) : (
              <Text style={{ fontSize: 15, color: '#6cc102', marginLeft: 10 }}>******</Text>
            )}
            {seeAmout ? (
              <TouchableOpacity onPress={changeViewAmoutFalse} style={{ marginLeft: 10, height: 30, width: 30 }}>
                <Ionicons name="eye-off-outline" size={15} style={[styles.iconBottom, { color: '#6cc102' }]} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={changeViewAmoutTrue} style={{ marginLeft: 10, height: 30, width: 30 }}>
                <Ionicons name="eye-outline" size={15} style={[styles.iconBottom, { color: '#6cc102' }]} />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
      <View style={styles.accountListBox}>
        <TouchableOpacity
          onPress={() => {
            navigate(MAIN_NAVIGATION.LIST_ACC);
          }}>
          <LinearGradient
            colors={[
              'rgba(0, 0, 0, 0.1)',
              'rgba(256, 256, 256, 0.1)',
              'rgba(256, 256, 256, 0.2)',
              'rgba(256, 256, 256, 0.4)',
            ]}
            style={styles.accountListChild}>
            <Image
              style={{ alignSelf: 'center', height: 30, width: 30 }}
              source={require('../../../assets/accListIcon.png')}
              resizeMode="contain"
            />
          </LinearGradient>
          <View style={{ width: 100, alignSelf: 'center' }}>
            <Text
              style={{
                fontSize: 12,
                color: 'rgba(256, 256, 256, 0.9)',
                textAlign: 'center',
                fontFamily: '',
              }}>
              Danh sách tài khoản và thẻ
            </Text>
          </View>
        </TouchableOpacity>
        <View>
          <LinearGradient
            colors={[
              'rgba(0, 0, 0, 0.1)',
              'rgba(256, 256, 256, 0.1)',
              'rgba(256, 256, 256, 0.2)',
              'rgba(256, 256, 256, 0.4)',
            ]}
            style={styles.accountListChild}>
            <MaterialCommunityIcons
              name="folder-open-outline"
              size={30}
              color={'white'}
              style={{ alignSelf: 'center' }}
            />
          </LinearGradient>
          <View style={{ width: 100, alignSelf: 'center' }}>
            <Text style={{ fontSize: 15, color: 'white', textAlign: 'center' }}>Mở tài khoản số chọn</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default UserInfo;
