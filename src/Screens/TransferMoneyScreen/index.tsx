import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
  ScrollView,
  TextInput,
  Pressable,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { decodeQr } from 'vn-qr-pay';
import styles from './styles';
import Header from './Header';
import { navigate } from '../../Navigators/NavigationUtils';
import { MAIN_NAVIGATION } from '../../Navigators/MainNavigator';
import { InputBox } from './InputBox';
import { listBank } from './listBank';
import { ModalListBank } from './ModalListBank';
import { useKeyboard } from '../../constants/useKeyboardHeight';
import { useAuthetication } from '../../Stores/useAuthetication';
import Loading from '../../components/modal/Loading';

const URL_API = 'https://api.httzip.com/api/bank/id-lookup-prod';
const KEY = 'd305dfd0-7cf9-4351-b199-db8bf4fee1afkey';
const SECRET_KEY = 'a37d65d7-31b6-42e6-9ab5-443d649e148dsecret';

export const BG = require('../../assets/BG.jpg');
const NAPAS = require('../../assets/napaslogo.jpg');
const coins = require('../../assets/coinsImg.png');

export const formatCurrency = (price: number | string, suffix: string = ' VNĐ') => {

  if (price === null || price === undefined) return '--';

  const numericValue = parseFloat(price.toString());

  if (isNaN(numericValue)) return '0';

  const integerPart = Math.floor(numericValue).toString();

  const formattedNumber = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return formattedNumber;
};

export const Padding = () => {
  return <View style={{ height: 20 }} />;
};
export const PaddingMini = React.memo(() => {
  return <View style={{ height: 10 }} />;
});
export const TitleSection = React.memo(({ name, txt }: { name: any; txt: any }) => {
  return (
    <View style={{ flexDirection: 'row' }}>
      <FontAwesome name={name} color={'white'} size={16} style={{ alignSelf: 'center' }} />
      <Text
        style={{
          alignSelf: 'center',
          // color: '#4aa924',
          color: 'white',
          fontSize: 15,
          fontFamily: '',
          marginLeft: 8,
          textAlign: 'center',
        }}>
        {txt}
      </Text>
    </View>
  );
});

const TransferMoneyScreen = ({ route }: { route: any }) => {
  const state: any = useAuthetication();
  const info = state.info;
  const [modalVisible, setModalVisible] = useState(false);
  const [bank, setBank] = useState<any>('');
  const [numerBank, setNumerBank] = useState('');
  const [content, setContent] = React.useState(`${info?.name.toUpperCase()} chuyen tien`);
  const [numberAmout, setnumberAmout] = useState('');
  const [keyHeight, setKeyHeight] = useState(0);
  const [receiveName, setReceiveName] = useState('');
  const [loading, setLoading] = useState<boolean>(false);
  const keyboardHeight = useKeyboard();

  useEffect(() => {
    setKeyHeight(keyboardHeight);
  }, [keyboardHeight]);

  // useEffect(() => {
  //   handleInputChangeContent(`${info?.name} chuyen tien`);
  // }, [info]);
  const contentRef = React.useRef(content);

  React.useEffect(() => {
    contentRef.current = content;
  }, [content]);

  const onConfirm = React.useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      if (numerBank !== '' && numberAmout !== '') {
        console.log('Content', content)
        navigate(MAIN_NAVIGATION.CONFIRM, {
          receiveNumberbank: numerBank,
          receiveName: receiveName,
          bank: bank,
          amount: numberAmout,
          contentSend: contentRef.current,
          userInfo: info
        });
      }
      setLoading(false);
    }, 1500);
  }, [numberAmout, numerBank]);

  const handleInputChangeNumberBank = React.useCallback((text: any) => {
    setNumerBank(text);
  }, []);

  const handleInputChangeContent = React.useCallback((text: any) => {
    console.log('Text to set', text)
    setContent(text);
    console.log('Text after set', text)
  }, [content]);

  const handleInputChange = React.useCallback((text: any) => {
    const numericValue = text.replace(/[^0-9]/g, '');

    const formattedValue = formatCurrency(numericValue);

    setnumberAmout(formattedValue);
  }, []);

  const onSubmitNumberBank = React.useCallback(
    async (bankcode: any, acc: any) => {
      setLoading(true);
      try {
        setLoading(false);
        const response = await fetch(URL_API, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': KEY,
            'x-api-secret': SECRET_KEY,
          },
          body: JSON.stringify({
            bank: bankcode,
            account: acc,
          }),
        });
        const { data } = await response.json();

        setReceiveName(data.ownerName);
      } catch (error) {
        console.log('Error:', error);
      }
    },
    [numerBank, bank.code],
  );
  const typeOfScreen = route?.params?.typeScreen;

  const handleReceiveName = React.useCallback(() => {
    if (typeOfScreen === 'SCAN') {
      const qrContent = route?.params?.code;
      const qrPay = decodeQr(qrContent);
      const findedBank: any = listBank.find(item => item.bin === qrPay.consumer.bankBin);
      setBank(findedBank);
      setNumerBank(qrPay.consumer.bankNumber);
      onSubmitNumberBank(findedBank.code, qrPay.consumer.bankNumber);
    }
  }, []);

  useEffect(() => {
    handleReceiveName();
  }, [handleReceiveName]);

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground source={BG}
        resizeMode="contain"
        style={{ flex: 1 }}>
        <Header />
        <ScrollView style={styles.section}>
          <Text
            style={{
              alignSelf: 'center',
              color: 'rgba(256, 256, 256, 0.5)',
              fontSize: 14,
              fontFamily: '',
            }}>
            {`Chuyển tiền nhanh 24/7 là dịch vụ chuyển tiền nhanh           `}
          </Text>
          <Image
            source={NAPAS}
            style={{ height: 15, width: 80, position: 'absolute', top: 28, left: 0 }}
            resizeMode="contain"
          />
          <Text
            style={{
              alignSelf: 'center',
              color: 'rgba(256, 256, 256, 0.5)',
              fontSize: 14,
              fontFamily: '',
              right: 45,
            }}>
            hoặc song phương
          </Text>
          <Padding />
          <InputBox txt={'Chuyển tiền nhanh 24/7 qua tài khoản'} icon={'caret-down'} />
          <Padding />
          <View style={{ flexDirection: 'row' }}>
            <Ionicons
              name="information-circle-outline"
              color={'#4aa924'}
              size={15}
              style={{ alignSelf: 'center' }}
            />
            <Text
              style={{
                alignSelf: 'center',
                color: '#4aa924',
                fontSize: 13,
                fontFamily: '',
                marginLeft: 5,
              }}>
              Mô tả dịch vụ và một số lưu ý
            </Text>
          </View>
          <Padding />
          <TitleSection name="credit-card" txt="Thông tin người nhận" />
          <Padding />
          <Text
            style={{
              color: 'rgba(256, 256, 256, 0.5)',
              fontSize: 13,
              fontFamily: '',
              marginLeft: 5,
            }}>
            Tài khoản nguồn
          </Text>
          <InputBox txt={info?.accountNumber} icon={'caret-down'} />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text
              style={{
                alignSelf: 'center',
                color: 'rgba(256, 256, 256, 0.5)',
                fontSize: 13,
                fontFamily: '',
                marginLeft: 5,
              }}>
              Số dư khả dụng
            </Text>
            <Text
              style={{
                alignSelf: 'center',
                color: 'rgba(256, 256, 256, 0.5)',
                fontSize: 13,
                fontFamily: '',
                marginLeft: 5,
              }}>{`${formatCurrency(info.amount)} VND`}</Text>
          </View>
          <Padding />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <TitleSection name="user" txt="Thông tin người hưởng" />
            <View style={{ flexDirection: 'row' }}>
              <Text
                style={{
                  alignSelf: 'center',
                  color: '#4aa924',
                  fontSize: 14,
                  fontFamily: '',
                  marginRight: 5,
                }}>
                Mẫu chuyển tiền
              </Text>
              <MaterialCommunityIcons name={'newspaper'} color={'#4aa924'} size={16} style={{ alignSelf: 'center' }} />
            </View>
          </View>
          <Padding />
          <View style={{ flexDirection: 'row' }}>
            <Text
              style={{
                alignSelf: 'center',
                color: '#4aa924',
                fontSize: 15,
                fontFamily: '',
                marginRight: 10,
              }}>
              Thêm người nhận
            </Text>
            <MaterialCommunityIcons
              name={'plus-circle-outline'}
              color={'#4aa924'}
              size={18}
              style={{ alignSelf: 'center' }}
            />
          </View>
          <Padding />

          <Pressable style={{}} onPress={() => setModalVisible(true)}>
            <InputBox txt={bank ? bank.name : 'Ngân hàng thụ hưởng'} icon={'caret-down'} color={bank ? false : true} />
          </Pressable>

          <View style={{ height: 10 }} />

          <TextInput
            style={{
              height: 44,
              backgroundColor: 'white',
              borderRadius: 10,
              paddingHorizontal: 10,
              color: '#4aa924',
              fontSize: 15,
              fontFamily: '',
            }}
            placeholder="Nhập/ chọn tài khoản nhận VND"
            onSubmitEditing={() => {
              onSubmitNumberBank(bank.code, numerBank);
            }}
            onChangeText={handleInputChangeNumberBank}
            value={numerBank}
          />
          <View style={{ height: 10 }} />
          {receiveName ? (
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text
                style={{
                  alignSelf: 'center',
                  color: '#4aa924',
                  fontSize: 15,
                  fontFamily: '',
                  marginRight: 10,
                }}>
                Tên người hưởng
              </Text>
              <Text
                style={{
                  alignSelf: 'center',
                  color: '#4aa924',
                  fontSize: 18,
                  fontFamily: '',
                  marginRight: 10,
                  fontWeight: 'bold',
                }}>
                {receiveName}
              </Text>
            </View>
          ) : (
            <View style={{ height: 25 }} />
          )}
          <Padding />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row' }}>
              <Image
                source={coins}
                style={{ alignSelf: 'center', height: 15, width: 15, borderRadius: 20 }}
                resizeMode="contain"
              />
              <Text
                style={{
                  alignSelf: 'center',
                  color: 'white',
                  fontSize: 15,
                  fontFamily: '',
                  marginLeft: 8,
                  textAlign: 'center',
                }}>
                Thông tin giao dịch
              </Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text
                style={{
                  alignSelf: 'center',
                  color: '#4aa924',
                  fontSize: 14,
                  fontFamily: '',
                  marginRight: 5,
                }}>
                Hạn mức
              </Text>
              <FontAwesome name={'question-circle-o'} color={'#4aa924'} size={16} style={{ alignSelf: 'center' }} />
            </View>
          </View>
          <Padding />
          <TextInput
            style={{
              height: 44,
              backgroundColor: 'white',
              borderRadius: 10,
              paddingHorizontal: 10,
              color: '#4aa924',
              fontSize: 15,
              fontFamily: '',
            }}
            placeholder="Số tiền"
            keyboardType="numeric"
            value={numberAmout}
            onChangeText={handleInputChange}
          />
          <Text
            style={{
              alignSelf: 'center',
              color: 'gray',
              fontSize: 15,
              fontFamily: '',
              textAlign: 'center',
              position: 'absolute',
              top: 635,
              right: 10,
            }}>
            VND
          </Text>
          <View style={{ height: 10 }} />
          <InputBox txt={'Phí giao dịch người chuyển trả'} icon={'caret-down'} />
          <View style={{ height: 10 }} />
          <TextInput
            style={{
              height: 44,
              backgroundColor: 'white',
              borderRadius: 10,
              paddingHorizontal: 10,
              color: '#4aa924',
              fontSize: 15,
              fontFamily: '',
            }}
            placeholder="Nội dung"
            value={content}
            onChangeText={handleInputChangeContent}
          />
          <MaterialCommunityIcons
            name={'pencil'}
            color={'black'}
            size={20}
            style={{ alignSelf: 'center', position: 'absolute', top: 750, right: 10 }}
          />
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
              onPress={onConfirm}
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
                  fontSize: 14,
                  fontFamily: '',
                  marginRight: 5,
                }}>
                Tiếp tục
              </Text>
            </TouchableOpacity>
          </LinearGradient>
          <View style={{ height: 100 }} />
          <View style={{ height: keyHeight }} />
        </ScrollView>
      </ImageBackground>

      <Loading visible={loading} />
      <ModalListBank modalVisible={modalVisible} setModalVisible={setModalVisible} setBank={setBank} />
    </View >
  );
};

export default TransferMoneyScreen;