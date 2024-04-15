import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';
import { formatCurrency } from '../TransferMoneyScreen';
import { goBack } from '../../Navigators/NavigationUtils';
import { useAuthetication } from '../../Stores/useAuthetication';
import Loading from '../../components/modal/Loading';
import { LocalStorage } from '../../localStore/index';
import { useFocusEffect } from '@react-navigation/native';

const SettingScreen = () => {
  const state: any = useAuthetication();
  const [info, setInfo] = useState<any | {}>({});
  // const setInfo = useAuthetication((state: any) => state.setInfo);
  const [amount, setAmount] = useState<string>(info.amount);
  const [name, setName] = useState<string>(info.name);
  const [accountNumber, setAccountNumber] = useState<string>(info?.accountNumber);
  const [token, setToken] = useState<string>(info?.token);
  const [edit, setEdit] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const userInfo = await LocalStorage.getUser();
      if (userInfo && Object.keys(userInfo).length > 0) {
        setInfo(userInfo);
        setAmount(userInfo.amount);
        setName(userInfo.name);
        setAccountNumber(userInfo.accountNumber);
        setToken(userInfo.token);
      }
    };

    fetchUserInfo();
  }, []);



  const onSave = async () => {
    if (amount.length === 0 || accountNumber.length === 0) {
      return Alert.alert('Tài khoản hoặc số dư không được bỏ trống, vui lòng kiểm tra lại!');
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setEdit(false);
      setInfo({ ...info, accountNumber: accountNumber.trim(), amount: amount, name: name, token: token });
      LocalStorage.setUser({ ...info, accountNumber: accountNumber.trim(), amount: amount, name: name, token: token })
      // Alert.alert('Cập nhật thông tin thành công!');
      goBack();
    }, 1000);
  };

  const convertToNumber = (str: string | undefined | any) => {
    if (!str) return 0;
    if (str) {
      return Number(
        str.toString()?.includes(',')
          ? str.toString()?.replaceAll(',', '')
          : str,
      );
    }
  };

  const getNumber = (num: string | number) => {
    if (num === null || num === undefined) return '--';

    const numericValue = parseFloat(num.toString());

    if (isNaN(numericValue)) return '--';

    const integerPart = Math.floor(numericValue).toString();

    const formattedNumber = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    return formattedNumber;
  };

  console.log('setting screen user info', info)

  return (
    <View style={{ padding: 16, paddingTop: 50 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <TouchableOpacity
          onPress={() => {
            goBack();
          }}>
          <MaterialCommunityIcons
            name="exit-to-app"
            color={'black'}
            size={30}
            style={{ alignSelf: 'flex-start', transform: [{ rotateY: '180deg' }] }}
          />
        </TouchableOpacity>
        {edit ? (
          <TouchableOpacity
            onPress={() => setEdit(false)}
            style={{ marginLeft: 10, alignItems: 'center', justifyContent: 'center' }}>
            <AntDesign name="close" size={25} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => setEdit(true)}
            style={{ marginLeft: 10, alignItems: 'center', justifyContent: 'center' }}>
            <FontAwesome name="edit" size={25} />
          </TouchableOpacity>
        )}
      </View>
      <Text
        style={{
          color: 'black',
          fontSize: 20,
          fontFamily: '',
          fontWeight: 'bold',
          width: 180,
          marginBottom: 30,
        }}>
        Cài đặt tài khoản
      </Text>
      <Text
        style={{
          color: 'gray',
          fontSize: 12,
          fontFamily: '',
          width: 180,
        }}>
        Tên của bạn
      </Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 30 }}>
        {/* {edit ? (
          <TextInput
            value={name}
            onChangeText={setName}
            style={{
              flex: 1,
              borderRadius: 5,
              backgroundColor: '#E5E5E5',
              paddingHorizontal: 10,
              height: 50,
            }}
            placeholder="Nhập tên của bạn"
          />
        ) : (
          <TextInput
            style={{
              flex: 1,
              borderRadius: 5,
              paddingHorizontal: 10,
              height: 50,
              fontWeight: 'bold',
            }}
            value={name}
            editable={false}
          />
        )} */}
        <TextInput
          value={name}
          onChangeText={setName}
          style={edit ? {
            flex: 1,
            borderRadius: 5,
            backgroundColor: '#E5E5E5',
            paddingHorizontal: 10,
            height: 50,
          } : {
            flex: 1,
            borderRadius: 5,
            paddingHorizontal: 10,
            height: 50,
            fontWeight: 'bold',
          }}
          placeholder="Nhập tên của bạn"
          editable={edit}
        />
      </View>
      <Text
        style={{
          color: 'gray',
          fontSize: 12,
          fontFamily: '',
          width: 180,
        }}>
        Tài khoản hiện tại
      </Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 30 }}>
        {/* {edit ? (
          <TextInput
            style={{
              flex: 1,
              borderRadius: 5,
              backgroundColor: '#E5E5E5',
              paddingHorizontal: 10,
              height: 50,
            }}
            placeholder="Nhập số tài khoản của bạn"
            onChangeText={setAccountNumber}
            keyboardType="numeric"
            value={accountNumber}
          />
        ) : (
          <TextInput
            style={{
              flex: 1,
              borderRadius: 5,
              paddingHorizontal: 10,
              height: 50,
              fontWeight: 'bold',
            }}
            keyboardType="numeric"
            value={accountNumber}
            editable={false}
          />
        )} */}

        <TextInput
          placeholder="Nhập số tài khoản của bạn"
          onChangeText={setAccountNumber}
          keyboardType="numeric"
          value={accountNumber}
          style={edit ? {
            flex: 1,
            borderRadius: 5,
            backgroundColor: '#E5E5E5',
            paddingHorizontal: 10,
            height: 50,
          } : {
            flex: 1,
            borderRadius: 5,
            paddingHorizontal: 10,
            height: 50,
            fontWeight: 'bold',
          }}
          editable={edit}
        />
      </View>
      <Text
        style={{
          color: 'gray',
          fontSize: 12,
          fontFamily: '',
          width: 180,
        }}>
        Số dư
      </Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 30 }}>

        <TextInput
          placeholder="Nhập số tiền "
          onChangeText={(val: string) => {
            const value = convertToNumber(val);
            if (value) {
              if (value >= 0) {
                setAmount(value.toString());
              } else {
                Alert.alert(
                  `Tối thiểu nhập: ${getNumber(0)}`,
                );
                setAmount("0".toString());
              }
            }
            if (!value) setAmount('0');
          }}
          keyboardType="numeric"
          value={getNumber(amount)}
          style={edit ? {
            flex: 1,
            borderRadius: 5,
            backgroundColor: '#E5E5E5',
            paddingHorizontal: 10,
            height: 50,
          } : {
            flex: 1,
            borderRadius: 5,
            paddingHorizontal: 10,
            height: 50,
            fontWeight: 'bold',
          }}
          editable={edit}
        />
      </View>
      <Text
        style={{
          color: 'gray',
          fontSize: 12,
          fontFamily: '',
          width: 180,
        }}>
        Token
      </Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 30 }}>

        <TextInput
          placeholder="Copy token "
          keyboardType="numeric"
          value={token}
          style={edit ? {
            flex: 1,
            borderRadius: 5,
            backgroundColor: '#E5E5E5',
            paddingHorizontal: 10,
            height: 50,
          } : {
            flex: 1,
            borderRadius: 5,
            paddingHorizontal: 10,
            height: 50,
            fontWeight: 'bold',
          }}
          editable={edit}
        />
      </View>
      <TouchableOpacity
        onPress={onSave}
        style={{
          width: '100%',
          borderRadius: 8,
          backgroundColor: 'black',
          paddingHorizontal: 10,
          height: 40,
          justifyContent: 'center',
        }}>
        <Text
          style={{
            color: 'white',
            fontSize: 14,
            fontFamily: '',
            textAlign: 'center',
          }}>
          Xác nhận
        </Text>
      </TouchableOpacity>
      <Loading visible={loading} />
    </View>
  );
};

export default SettingScreen;
