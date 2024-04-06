import React, { useEffect, useRef, useState } from 'react';
import { View, Alert, Text, TouchableOpacity, ImageBackground, TextInput, ScrollView, Image } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import Feather from '@expo/vector-icons//Feather';
import FontAwesome from '@expo/vector-icons//FontAwesome';
import AntDesign from '@expo/vector-icons//AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import ReactNativeBiometrics from 'react-native-biometrics';
import { useAuthetication } from '../../Stores/useAuthetication';
import { styles } from './styles';
import colors from '../../constants/colors';
import dimens from '../../constants/dimens';
import Loading from '../../components/modal/Loading';
import { LocalStorage } from '../../localStore/index';
import { setLogin } from '../../store/index';
import { useDispatch } from 'react-redux';
import * as LocalAuthentication from 'expo-local-authentication'

export default function LoginScreen() {
  const scrollRef: any = useRef();
  const setLogIn = useAuthetication((state: any) => state.setLogIn);
  const setInfo = useAuthetication((state: any) => state.setInfo);
  const [phone, setPhone] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();

  const onNextStep = async () => {
    if (phone.length !== 10) return Alert.alert('Số điện thoại không hợp lệ, vui lòng kiểm tra lại');
    scrollRef.current.scrollTo({ x: dimens.screenWidth });
  };

  const goBack = () => {
    scrollRef.current.scrollTo({ x: 0 });
  };

  const onLoginFaceId = async () => {
    const hasAuth = await LocalAuthentication.hasHardwareAsync();
    if (hasAuth) {
      const res: any = await LocalAuthentication.authenticateAsync();
      if (!!res) {
        setInfo({ name: 'Nguyen Van A', password: password, accountNumber: phone, amount: 0 });
        LocalStorage.setUser({ name: 'Nguyen Van A', password: password, accountNumber: phone, amount: 0 })
        setLogIn();
        dispatch(setLogin(true));
        return LocalStorage.setLogin();
      }
    }
  };

  const onLogin = () => {
    if (!(Boolean(phone.trim()) && Boolean(password.trim())))
      return Alert.alert('Số điện thoại và mật khẩu không được bỏ trống, vui lòng kiểm tra lại');
    setLoading(true);
    setTimeout(async () => {
      setLoading(false);
      setInfo({ name: 'Nguyen Van A', password: password, accountNumber: phone, amount: 0 });
      // Alert.alert('Đăng nhập thành công!');
      LocalStorage.setUser({ name: 'Nguyen Van A', password: password, accountNumber: phone, amount: 0 })
      setLogIn();
      dispatch(setLogin(true));
      return LocalStorage.setLogin();
    }, 1000);
  };

  return (
    <ImageBackground source={require('../../assets/bg-login.png')} style={{ flex: 1 }}>
      <View style={styles.container}>
        <ScrollView ref={scrollRef} scrollEnabled={false} horizontal pagingEnabled style={styles.contain}>
          {/* Tên đăng nhập */}
          <View style={{ width: dimens.screenWidth, alignItems: 'center' }}>
            <View style={styles.topContain}>
              <Image source={require('../../assets/logoScan/vcb.png')}
                style={[styles.icon, { width: 200, height: 35 }]}
                resizeMode='cover'
              />
              <Text style={styles.title}>Chào mừng quý khách đến với ứng dụng VCB Digibank</Text>
            </View>
            <View style={styles.bottomContain}>
              <TextInput
                value={phone}
                onChangeText={setPhone}
                style={styles.input}
                placeholder="Số điện thoại đăng nhập"
                placeholderTextColor={colors.white}
                maxLength={10}
                keyboardType='numeric'
              />
              <Text style={styles.note}>(Nhập số điện thoại đăng kí dịch vụ)</Text>
              <TouchableOpacity onPress={onNextStep}>
                <LinearGradient
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  colors={['#5db422', '#2f9929', '#047d30']}
                  style={{ padding: 15, borderRadius: 10 }}>
                  <Text style={styles.txtNext}>Tiếp tục</Text>
                </LinearGradient>
              </TouchableOpacity>
              <View style={styles.txtContain}>
                {/* <TouchableOpacity onPress={onRegister}>
                  <Text style={styles.txtSignUp}>Đăng kí tài khoản ABC Digibank</Text>
                </TouchableOpacity> */}
                <Text style={styles.txtSignUp}>Mở tài khoản/đăng ký VCB Digibank</Text>
                <Text style={styles.txtSignUp}>Hướng dẫn chuyển đổi</Text>
                <Text style={styles.txtSignUp}>VCB Digibank</Text>
                <Text style={styles.txtSignUp}>Đặt lịch hẹn với VCB Digibank</Text>
              </View>
            </View>
          </View>
          {/* Mật khẩu*/}
          <View style={{ width: dimens.screenWidth, alignItems: 'center' }}>
            <TouchableOpacity
              onPress={goBack}
              style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start' }}>
              <Ionicons name="chevron-back" size={30} color={colors.white} style={styles.iconBack} />
              <Text style={styles.txtBack}>Quay lại</Text>
            </TouchableOpacity>
            <View style={styles.topContain}>
              <Text style={styles.title}>VCB Digibank</Text>
              <View style={styles.avatarContain}>

                <MaterialIcons
                  name="person"
                  size={45}
                  color={colors.main}
                  style={{
                    alignSelf: 'center',
                    color: 'white',
                  }}
                />
              </View>
              <Text style={styles.txtName}>{"NGUYEN VAN A"}</Text>
              <Text style={styles.txtName}>{phone.substring(0, 2) + "******" + phone.substring(8)}</Text>
            </View>
            <View style={styles.bottomContain}>
              <View style={styles.passContain}>
                <TextInput
                  secureTextEntry={!showPassword}
                  style={styles.inputPassword}
                  placeholder="Mật khẩu"
                  placeholderTextColor={colors.white}
                  value={password}
                  onChangeText={setPassword}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  {showPassword ? (
                    <Entypo name="eye-with-line" size={20} color={colors.lightGray} />
                  ) : (
                    <Entypo name="eye" size={20} color={colors.lightGray} />
                  )}
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={{ marginTop: 20, alignSelf: 'flex-start', marginBottom: 40 }}>
                <Text style={styles.txtForgotPass}>Quên mật khẩu</Text>
              </TouchableOpacity>
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={onLogin} style={styles.btnLogin}>
                  <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    colors={['#5db422', '#2f9929', '#047d30']}
                    style={{ padding: 15, borderRadius: 10 }}>
                    <Text style={styles.txtNext}>Đăng nhập</Text>
                  </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity onPress={onLoginFaceId}>
                  <Image source={require('../../assets/images/face_id.png')} style={{ height: 40, width: 40 }} />
                </TouchableOpacity>
              </View>
              <View style={styles.rowView}>
                <View style={styles.iconContain}>
                  <FontAwesome name="mobile-phone" size={30} color={colors.white} />
                  <Text style={styles.txtIcon}>GD an toàn</Text>
                </View>
                <View style={styles.iconContain}>
                  <FontAwesome name="qrcode" size={30} color={colors.white} />
                  <Text style={styles.txtIcon}>Dịch vụ QR</Text>
                </View>
                <View style={styles.iconContain}>
                  <FontAwesome name="qrcode" size={30} color={colors.white} />
                  <Text style={styles.txtIcon}>Tạo OTP</Text>
                </View>
                <View style={styles.iconContain}>
                  <FontAwesome name="qrcode" size={30} color={colors.white} />
                  <Text style={styles.txtIcon}>Hướng dẫn</Text>
                </View>
                <View style={styles.iconContain}>
                  <AntDesign name="infocirlceo" size={30} color={colors.white} />
                  <Text style={styles.txtIcon}>Hỗ trợ</Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
      <View
        style={{
          backgroundColor: 'green',
          height: 70,
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
        }}>
        <Feather name="map-pin" size={20} color={colors.white} style={{ marginBottom: 25 }} />
        <Text style={styles.txtMap}>Tìm kiếm ATM/ chi nhánh gần đây</Text>
      </View>
      <Loading visible={loading} />
    </ImageBackground>
  );
}
