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

const UserInfo = () => {
  const [userInfo, setUserInfo] = useState<any>({});
  // const state: any = useAuthetication();
  // const info = userInfo;
  const [seeAmout, setSeeAmout] = useState(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const userInfo = await LocalStorage.getUser();
      setUserInfo(userInfo);
    };

    fetchUserInfo();
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
