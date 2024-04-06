import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, TextInput, Keyboard, Alert } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import Feather from '@expo/vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../../constants/colors';
import { styles } from './styles';
import { goBack } from '../../Navigators/NavigationUtils';
import strings from '../../constants/strings';
import Loading from '../../components/modal/Loading';

export default function RegisterScreen() {
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPass, setShowConfirmPass] = useState<boolean>(false);
  const [phone, setPhone] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [accountNumber, setAccountNumber] = useState<string>('');

  const onRegister = () => {
    Keyboard.dismiss();
    if (validate()) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        AsyncStorage.setItem(strings.CURRENT_PHONE, phone.trim());
        AsyncStorage.setItem(
          phone.trim(),
          JSON.stringify({
            name: name.trim(),
            phone: phone.trim(),
            password: password.trim(),
            accountNumber: accountNumber.trim(),
            amount: '0'
          }),
        );
        // Alert.alert('Đăng ký tài khoản thành công!');
        return goBack();
      }, 1000);
    }
  };

  const validate = () => {
    if (!(Boolean(phone.trim()) && Boolean(password.trim()) && Boolean(confirmPassword.trim()) && Boolean(accountNumber.trim())))
      return Alert.alert('Các trường dữ liệu không được bỏ trống, vui lòng kiểm tra lại!');
    if (phone.trim().length !== 10) return Alert.alert('Số điện thoại không hợp lệ, vui lòng thử lại!');
    if (password.trim() !== confirmPassword.trim())
      return Alert.alert('Mật khẩu và xác nhận mật khẩu không giống nhau, vui lòng thử lại!');
    return true;
  };

  return (
    <ImageBackground source={require('../../assets/BG.jpg')} style={{ flex: 1 }}>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={goBack}
          style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start' }}>
          <Ionicons name="chevron-back" size={30} color={colors.white} style={styles.iconBack} />
          <Text style={styles.txtBack}>Quay lại</Text>
        </TouchableOpacity>
        <View style={styles.topContain}>
          <Ionicons name="logo-angular" size={40} color={colors.white} style={styles.icon} />
          <Text style={styles.title}>Đăng kí tài khoản</Text>
        </View>

        <View style={styles.bottomContain}>
          <TextInput
            style={styles.input}
            placeholder="Họ và tên"
            placeholderTextColor={colors.white}
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Số tài khoản"
            placeholderTextColor={colors.white}
            value={accountNumber}
            onChangeText={setAccountNumber}
            keyboardType="number-pad"
            maxLength={12}
          />
          <TextInput
            style={styles.input}
            placeholder="Số điện thoại"
            placeholderTextColor={colors.white}
            value={phone}
            onChangeText={setPhone}
            keyboardType="number-pad"
            maxLength={10}
          />
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
          <View style={styles.passContain}>
            <TextInput
              secureTextEntry={!showConfirmPass}
              style={styles.inputPassword}
              placeholder="Xác nhận mật khẩu"
              placeholderTextColor={colors.white}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            <TouchableOpacity onPress={() => setShowConfirmPass(!showConfirmPass)}>
              {showConfirmPass ? (
                <Entypo name="eye-with-line" size={20} color={colors.lightGray} />
              ) : (
                <Entypo name="eye" size={20} color={colors.lightGray} />
              )}
            </TouchableOpacity>
          </View>

          {Boolean(confirmPassword) && confirmPassword !== password ? (
            <Text style={styles.txtError}>Xác nhận mật khẩu không giống mật khẩu đã nhập!</Text>
          ) : null}
          <TouchableOpacity onPress={onRegister} style={{ marginTop: 20 }}>
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              colors={['#5db422', '#2f9929', '#047d30']}
              style={{ padding: 15, borderRadius: 10 }}>
              <Text style={styles.txtSignUp}>Đăng kí</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          backgroundColor: 'rgba(26, 101, 26, 0.6)',
          height: 50,
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
        }}>
        <Feather name="map-pin" size={20} color={colors.white} />
        <Text style={styles.txtMap}>Tìm kiếm ATM/ chi nhánh gần đây</Text>
      </View>
      <Loading visible={loading} />
    </ImageBackground>
  );
}
