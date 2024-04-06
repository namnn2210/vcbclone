import React, { useState, useEffect, useRef } from 'react';
import { Pressable, FlatList, View, Text, TouchableOpacity, ImageBackground, TextInput, ScrollView, Modal, Alert, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import styles from './styles';
import Header from './Header';
import { navigate } from '../../Navigators/NavigationUtils';
import { MAIN_NAVIGATION } from '../../Navigators/MainNavigator';
import { BG } from '../TransferMoneyScreen';
import { Padding, PaddingMini } from '../TransferMoneyScreen';
import { InputReadBox } from '../TransferMoneyScreen/InputReadBox';
import { convertToCurrencyString } from '../../constants/convertToVND';
import Loading from '../../components/modal/Loading';
import { useTransactions } from '../../Stores/useTransactions';
import Ionicons from '@expo/vector-icons/Ionicons';
import { LocalStorage } from '@/localStore';
import { useAuthetication } from '@/Stores/useAuthetication';
import * as LocalAuthentication from 'expo-local-authentication'

export const HorizontalLine = () => {
  return <View style={{ height: 2, width: '100%', backgroundColor: 'rgba(256, 256, 256, 0.2)' }} />;
};
export function convertToInteger(str: string) {
  const withoutCommas = str.replace(/,/g, '');
  const result = parseInt(withoutCommas, 10);

  return result;
}
export const Label = ({
  title,
  txt1,
  txt2,
  color,
  bank,
  header,
}: {
  title: string;
  txt1: string;
  txt2?: any;
  color?: string;
  bank?: boolean;
  header?: string;
}) => {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      <View>
        {header && (
          <Text
            style={{
              color: 'rgba(195, 200, 205, 1)',
              fontSize: 16.5,
              fontFamily: '',
              fontWeight: '600',
            }}>
            {header}
          </Text>
        )}
        <Text
          style={{
            color: 'rgba(195, 200, 205, 1)',
            fontSize: 16.5,
            fontFamily: '',
            fontWeight: '600',
            textAlign: 'center',
          }}>
          {title}
        </Text>
      </View>
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
            <View style={{ width: 200 }}>
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
            </View>
          </>
        )}
      </View>
    </View>
  );
};

const ConfirmScreen = ({ route }: { route: any }) => {
  const dataRoute = route?.params;
  console.log("dataRoute: ", dataRoute);

  const [isBeforeDate, setIsBeforeDate] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const addTransactions = useTransactions((state: any) => state.addTransactions);
  const [showOTP, setShowOTP] = useState(false);
  const [ComfromOTP, setComfromOTP] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const refs = useRef<TextInput[]>([]);
  const setInfo = useAuthetication((state: any) => state.setInfo);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const options = ['VCB - Smart OTP', 'FaceID', 'SMS OTP'];

  const handleChooseAuth = () => {
    if (selectedOption === 'VCB - Smart OTP') {
      setShowOTP(true);
    }
    else if (selectedOption === 'FaceID') {
      onLoginFaceId();
    }
  }

  const handleChangeText = (value: string, index: number) => {
    if (isNaN(Number(value))) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value !== '' && index < 5 && refs.current[index + 1]) {
      refs.current[index + 1].focus();
    }
  };

  const handleKeyPress = (event: any, index: number) => {
    if (event.nativeEvent.key === 'Backspace' && index > 0 && otp[index] === '') {
      refs.current[index - 1].focus();
    }
  };

  const handleFocus = (index: number) => {
    setActiveIndex(index);
  };

  const handleBlur = () => {
    setActiveIndex(null);
  };

  function generateRandomNumbers() {
    var numbers = [];
    for (var i = 0; i < 8; i++) {
      numbers.push(Math.floor(Math.random() * 10));
    }
    return numbers;
  }

  useEffect(() => {
    const checkDate = () => {
      const currentDate = new Date();
      const targetDate = new Date('2024-03-05');
      const isBefore = currentDate < targetDate;
      setIsBeforeDate(isBefore);
    };
    checkDate();
  }, []);


  const onHandleConfirm = React.useCallback(
    async () => {
      setLoading(true);
      const currentAmout: any = await LocalStorage.getUser();
      const amoutAfterTransferConvert: any = convertToInteger(dataRoute?.amount);
      const amoutAfterTransfer = parseInt(currentAmout.amount) - parseInt(amoutAfterTransferConvert);
      LocalStorage.setUser({ ...currentAmout, amount: amoutAfterTransfer.toString() })
      setInfo({ ...currentAmout, amount: amoutAfterTransfer.toString() });
      setTimeout(() => {
        const newTransaction = {
          date: moment().format('DD/MM/YYYY'),
          code: `${Math.floor(Math.random() * 1000000000)}.${Math.floor(Math.random() * 1000000000)}.${Math.floor(
            Math.random() * 1000000000,
          )}`,
          amout: `-${amoutAfterTransferConvert}`,
          type: 'minus',
        };
        addTransactions(newTransaction);
        setLoading(false);
        navigate(MAIN_NAVIGATION.BILL, { dataRoute });
      }, 1500);
    }, []);

  const onLoginFaceId = async () => {
    const hasAuth = await LocalAuthentication.hasHardwareAsync();
    if (hasAuth) {
      console.log("hasAuth: ", hasAuth);
      const res: any = await LocalAuthentication.authenticateAsync();
      if (!!res) {
        setLoading(true);
        const currentAmout: any = await LocalStorage.getUser();
        const amoutAfterTransferConvert: any = convertToInteger(dataRoute?.amount);
        const amoutAfterTransfer = parseInt(currentAmout.amount) - parseInt(amoutAfterTransferConvert);
        const updatedUser = { ...currentAmout, amount: amoutAfterTransfer.toString() };

        LocalStorage.setUser(updatedUser);
        setInfo(updatedUser);
        setTimeout(() => {
          const newTransaction = {
            date: moment().format('DD/MM/YYYY'),
            code: `${Math.floor(Math.random() * 1000000000)}.${Math.floor(Math.random() * 1000000000)}.${Math.floor(
              Math.random() * 1000000000,
            )}`,
            amout: `-${amoutAfterTransferConvert}`,
            type: 'minus',
          };
          addTransactions(newTransaction);
          setLoading(false);
          navigate(MAIN_NAVIGATION.BILL, { dataRoute });
        }, 1500);
      }
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground source={BG}
        resizeMode="contain"
        style={{ flex: 1 }}>
        <Header />
        <ScrollView style={[styles.section, { paddingTop: 30 }]}>
          <Text
            style={{
              alignSelf: 'center',
              color: 'rgba(256, 256, 256, 0.8)',
              fontSize: 15,
              fontFamily: '',
              fontWeight: '600',
              textAlign: 'center',
              width: 350,
            }}>
            Quý khách vui lòng kiểm tra thông tin giao dịch đã khởi tạo
          </Text>
          <Padding />
          <HorizontalLine />
          <PaddingMini />
          <Label title="Tài khoản nguồn" txt1="1010962347" />
          <PaddingMini />
          <HorizontalLine />
          <PaddingMini />
          <Label title="Tài khoản đích" txt1={dataRoute?.receiveNumberbank} />
          <PaddingMini />
          <HorizontalLine />
          <PaddingMini />
          <Label title="Tên người thụ hưởng" txt1={dataRoute?.receiveName} color="red" />
          <PaddingMini />
          <HorizontalLine />
          <PaddingMini />
          <Label title="Ngân hàng thụ hưởng" txt1={dataRoute?.bank?.name} bank />
          <PaddingMini />
          <HorizontalLine />
          <PaddingMini />
          <Label title="Số tiền" txt1={dataRoute?.amount} txt2={convertToCurrencyString(dataRoute.amount)} color="red" />
          <PaddingMini />
          <HorizontalLine />
          <PaddingMini />
          <Label title="Số tiền phí" txt1="0 VND" txt2={'Người chuyển trả'} />
          <PaddingMini />
          <HorizontalLine />
          <PaddingMini />
          <Label title="Nội dung" txt1={dataRoute?.contentSend} bank />
          <PaddingMini />
          <HorizontalLine />
          <Padding />
          <Text
            style={{
              color: 'rgba(256, 256, 256, 0.5)',
              fontSize: 13,
              fontFamily: '',
              marginLeft: 5,
              marginBottom: 8
            }}>
            Chọn phương thức xác thực
          </Text>
          <Pressable onPress={() => setModalVisible(true)}>
            <InputReadBox
              txt={selectedOption || 'VCB - Smart OTP'}
              icon={'caret-down'}
            />
          </Pressable>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <View
              style={{
                flex: 1,
                position: 'absolute',
                width: '100%',
                height: '100%',
                marginTop: 700,
                borderRadius: 24,
                backgroundColor: '#fff'
              }}>
              <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={['#2f9929', '#2f9929', '#5db422']}
                style={{
                  padding: 10,
                  elevation: 2,
                  borderTopRightRadius: 24,
                  borderTopLeftRadius: 24,
                  flexDirection: 'row-reverse',
                }}>
                <View style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  height: 38,
                }}>
                  <Text
                    style={{
                      color: 'white',
                      fontWeight: 'bold',
                      textAlign: 'center',
                      fontSize: 16,
                      fontFamily: '',
                      flex: 1
                    }}>
                    Phương thức xác thực
                  </Text>
                  <Pressable
                    style={{ justifyContent: 'center' }}
                    onPress={() => setModalVisible(!modalVisible)}>
                    <Text
                      style={{
                        color: 'white',
                        fontWeight: 'bold',
                        textAlign: 'center',
                        fontSize: 16,
                        fontFamily: '',
                      }}>
                      Đóng
                    </Text>
                  </Pressable>
                </View>
              </LinearGradient>
              <View>
                <FlatList
                  data={options}
                  keyExtractor={(item) => item}
                  renderItem={({ item }) => (
                    <Pressable onPress={() => {
                      setSelectedOption(item);
                      setModalVisible(false);
                    }} style={{
                      padding: 16,
                      borderBottomWidth: 1,
                      borderBottomColor: '#f0f0f0',

                    }}>
                      <Text style={{ fontSize: 16, fontWeight: 'bold', textTransform: 'uppercase', color: 'gray' }}>{item}</Text>
                    </Pressable>
                  )}
                />
              </View>
            </View>
          </Modal>
          <Padding />
          <Modal
            animationType="slide"
            transparent={true}
            visible={showOTP}
            onRequestClose={() => {
              setShowOTP(false)
            }}
          >
            <View style={Styles.centeredView}>
              <View
                style={{
                  justifyContent: 'flex-start',
                  height: "15%",
                  alignItems: 'flex-start',
                }}>
                <TouchableOpacity
                  onPress={() => {
                    setShowOTP(false)
                  }}
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    alignItems: 'center',
                    gap: 5,
                    margin: 16,
                  }}>
                  <Ionicons
                    name='chevron-back'
                    color={'#fff'}
                    size={24}
                  />
                  <Text style={{
                    fontSize: 16,
                    color: "#ffff",
                    fontWeight: "bold"
                  }}>Quay lại</Text>
                </TouchableOpacity>
              </View>

              <View style={[Styles.modalView]}>
                <Text style={Styles.modalText}>
                  Xác thực giao dịch
                </Text>
                <Text
                  style={{
                    textAlign: 'center',
                    color: '#000',
                    fontWeight: 'bold',
                    fontSize: 14,
                    marginBottom: 24
                  }}
                >
                  Vui lòng
                  <Text style={{
                    textAlign: 'center',
                    color: '#5db422',
                    fontWeight: 'bold',
                    fontSize: 14
                  }}
                  > nhập mã PIN VCB - Smart OTP </Text>
                  của Quý Khách để xác nhận giao dịch
                </Text>

                <View style={Styles.container}>
                  {otp.map((value, index) => (
                    <TextInput
                      key={index}
                      ref={(ref) => (refs.current[index] = ref as TextInput)}
                      style={[Styles.input, { borderColor: activeIndex === index ? "#2f9929" : "#fff" }]}
                      maxLength={1}
                      keyboardType="numeric"
                      onChangeText={(text) => handleChangeText(text, index)}
                      onKeyPress={(event) => handleKeyPress(event, index)}
                      onFocus={() => handleFocus(index)}
                      onBlur={handleBlur}
                      value={value}
                      secureTextEntry={true}
                    />
                  ))}
                </View>

                <Text
                  style={{
                    textAlign: 'center',
                    color: 'gray',
                    fontWeight: 'bold',
                    fontSize: 14,
                    marginVertical: 24
                  }}
                >Lưu ý : VCB - Smart OTP sẽ bị khóa nếu Quý khách nhập sai mã PIN 5 lần liên tiếp</Text>

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
                      setShowOTP(false);
                      if (!!otp) {
                        setComfromOTP(true)
                      } else {
                        Alert.alert("Vui lòng nhập mã OTP");
                      }
                    }}
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: 50,
                      width: "100%",
                    }}>
                    <Text
                      style={{
                        textAlign: 'center',
                        color: 'white',
                        fontSize: 16,
                        fontFamily: '',
                        flex: 1,
                        lineHeight: 20,
                        fontWeight: "bold"
                      }}>
                      Tiếp tục
                    </Text>
                  </TouchableOpacity>
                </LinearGradient>
              </View>
            </View>
          </Modal>

          <Modal
            animationType="slide"
            transparent={true}
            visible={ComfromOTP}
            onRequestClose={() => {
              setComfromOTP(false)
            }}
          >
            <View style={[Styles.centeredView]}>
              <View
                style={{
                  justifyContent: 'flex-start',
                  height: "15%",
                  alignItems: 'flex-start',
                  marginBottom: 100
                }}>
                <TouchableOpacity
                  onPress={() => {
                    setComfromOTP(false)
                  }}
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    alignItems: 'center',
                    gap: 5,
                    margin: 16,
                  }}>
                  <Ionicons
                    name='chevron-back'
                    color={'#fff'}
                    size={24}
                  />
                  <Text style={{
                    fontSize: 16,
                    color: "#ffff",
                    fontWeight: "bold"
                  }}>Quay lại</Text>
                </TouchableOpacity>
              </View>

              <View style={[Styles.modalView]}>
                <Text style={Styles.modalText}>
                  Xác thực giao dịch
                </Text>
                <Text
                  style={{
                    textAlign: 'center',
                    color: '#000',
                    fontWeight: 'bold',
                    fontSize: 14,
                    marginBottom: 24
                  }}
                >
                  Mã xác thực giao dịch bằng hình thức
                  VCB-Smart OTP của Quý khách được hiển thị dưới đây .
                  Quý khách vui lòng ấn Tiếp tục để hoàn tất giao dịch
                </Text>

                <ImageBackground
                  source={require('../../assets/otp.png')}
                  resizeMode="cover"
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 50,
                    width: "100%",
                    borderRadius: 5,
                    marginBottom: 24,
                  }}>
                  <Text
                    style={{
                      color: '#000',
                      fontWeight: 'bold',
                      fontSize: 24,
                      letterSpacing: 16,
                      textAlign: 'center'
                    }}
                  >{generateRandomNumbers()}</Text>
                </ImageBackground>
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
                      setComfromOTP(false);
                      onHandleConfirm();
                    }}
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: 50,
                      width: "100%",
                    }}>
                    <Text
                      style={{
                        textAlign: 'center',
                        color: 'white',
                        fontSize: 14,
                        fontFamily: '',
                        flex: 1,
                        lineHeight: 20
                      }}>
                      Tiếp tục
                    </Text>
                  </TouchableOpacity>
                </LinearGradient>
              </View>
              <View style={{
                flexDirection: "row",
                alignItems: 'center',
                marginVertical: 24,
              }}></View>
              <Text
                style={{
                  textAlign: 'center',
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: 16,
                }}
              >Thời gian hiệu lực của OTP còn:
                <Text style={{
                  textAlign: 'center',
                  color: '#5db422',
                  fontWeight: 'bold',
                  fontSize: 16,
                  marginVertical: 24,
                  borderWidth: 1,
                  borderColor: '#5db422'
                }}> {' '} 22 giây
                </Text>
              </Text>
            </View>
          </Modal>

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
              onPress={handleChooseAuth}
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
                Xác nhận
              </Text>
            </TouchableOpacity>
          </LinearGradient>
          <View style={{ height: 100 }} />
          <View style={{ height: 100 }} />
        </ScrollView>
      </ImageBackground>
      <Loading visible={loading} />
    </View >
  );
};

export default ConfirmScreen;

const Styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.9)"
  },
  modalView: {
    marginHorizontal: 24,
    marginTop: 24,
    marginBottom: 8,
    backgroundColor: '#E6E6E6',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
  },
  ////
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignSelf: 'center',
    marginTop: 20,
    gap: 5,
  },
  input: {
    height: 45,
    width: 40,
    borderWidth: 1,
    textAlign: 'center',
    fontSize: 20,
    borderRadius: 8,
    backgroundColor: '#fff',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    shadowColor: '#656d77',
  },
  activeInput: {
    borderColor: 'blue',
    // color: 'transparent',
  },

  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    textAlign: 'center',
    marginBottom: 15,
    fontWeight: 'bold',
    color: 'black',
    fontSize: 18,
  },
  pinCodeContainer: {
    height: 45,
    width: 40,
    borderRadius: 8,
    backgroundColor: '#fff',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    shadowColor: '#656d77',
  },
});