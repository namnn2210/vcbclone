import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, Linking, StyleSheet, Button } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
// import { Camera, CodeScanner, useCameraDevice } from 'react-native-vision-camera';
import { LinearGradient } from 'expo-linear-gradient';
import { Svg, Defs, Mask, Rect } from 'react-native-svg';
import styles from './styles';
import { goBack, navigate } from '../../Navigators/NavigationUtils';
import colors from '../../constants/colors';
import dimens from '../../constants/dimens';
import { MAIN_NAVIGATION } from '../../Navigators/MainNavigator';
import { BarCodeScanner } from 'expo-barcode-scanner';

const ScanScreen = () => {
  // const device: any = useCameraDevice('back');
  const MARGIN_HORIZONTAL = (dimens.screenWidth - 300) / 2; // 300 là width ô vuông
  const WIDTH_BORDER = 30;

  const [hasPermission, setHasPermission] = useState<any>(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }: any) => {
    setScanned(true);
    console.log("data: ", data);
    if (data !== "hihi" && data) {
      navigate(MAIN_NAVIGATION.TRANSFER, {
        code: data,
        typeScreen: 'SCAN',
      })
    }
  };

  const renderCamera = () => {
    return (
      <View style={{ flex: 1 }}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
        {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
      </View>
    );
  };
  const renderCameraFrame = () => {
    return (
      <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
        <Text style={styles.txtNote}>Quét mã QR để thanh toán, chuyển tiền và rút tiền mặt tại hệ thống ATM</Text>
        <Text style={styles.txtLogo}>VCB Digibank</Text>

        <Svg height="100%" width="100%">
          <Defs>
            <Mask id="mask" height={'100%'} width={'100%'} x="0" y="0">
              <Rect height="100%" width="100%" fill="#fff" />
              <Rect x={MARGIN_HORIZONTAL} y="250" height="300" width="300" fill="black" />
            </Mask>
          </Defs>
          <Rect height="100%" width="100%" fill="rgba(0,0,0,0.8)" mask="url(#mask)" />
          {/* border */}
          <Rect x={MARGIN_HORIZONTAL} y="250" height={WIDTH_BORDER} strokeWidth="5" width="1" stroke={colors.main} />
          <Rect x={MARGIN_HORIZONTAL} y="250" height="1" strokeWidth="5" width={WIDTH_BORDER} stroke={colors.main} />

          <Rect
            x={dimens.screenWidth - MARGIN_HORIZONTAL}
            y="520"
            height={WIDTH_BORDER}
            strokeWidth="5"
            width="1"
            stroke={colors.main}
          />
          <Rect
            x={dimens.screenWidth - MARGIN_HORIZONTAL - WIDTH_BORDER}
            y="550"
            height="1"
            strokeWidth="5"
            width={WIDTH_BORDER}
            stroke={colors.main}
          />

          <Rect x={MARGIN_HORIZONTAL} y="520" height={WIDTH_BORDER} strokeWidth="5" width="1" stroke={colors.main} />
          <Rect x={MARGIN_HORIZONTAL} y="550" height="1" strokeWidth="5" width={WIDTH_BORDER} stroke={colors.main} />

          <Rect
            x={dimens.screenWidth - MARGIN_HORIZONTAL - WIDTH_BORDER}
            y="250"
            height="1"
            strokeWidth="5"
            width={WIDTH_BORDER}
            stroke={colors.main}
          />
          <Rect
            x={dimens.screenWidth - MARGIN_HORIZONTAL}
            y="250"
            height={WIDTH_BORDER}
            strokeWidth="5"
            stroke={colors.main}
          />
        </Svg>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={['#5db422', '#2f9929', '#047d30']}
        style={styles.header}>
        <TouchableOpacity onPress={goBack}>
          <AntDesign name="arrowleft" color={colors.white} size={30} style={{ alignSelf: 'center' }} />
        </TouchableOpacity>
        <Text style={styles.txtQr}>Quét mã QR</Text>
        <TouchableOpacity
          onPress={() => {
            // navigate(MAIN_NAVIGATION.TRANSFER, {
            //   code: '0002010102111531397007040052044600000100695140238540010A000000727012400069704230110khanhnd2410208QRIBFTTA5204513753037045802VN5916NGUYEN DUY KHANH6006Ha Noi6304F56B',
            //   typeScreen: 'SCAN',
            // });
          }}>
          <MaterialIcons name="bolt" color={colors.white} size={30} style={{ alignSelf: 'center' }} />
        </TouchableOpacity>
      </LinearGradient>

      {renderCamera()}
      {renderCameraFrame()}
      <View style={styles.listImage}>
        <Image
          source={require('../../assets/logoScan/viet_qr.png')}
          style={styles.vietQr}
          resizeMode="contain"
        />
        <View style={styles.line} />
        <Image
          source={require('../../assets/logoScan/vietqr.png')}
          style={styles.napas}
          resizeMode="contain"
        />
        <View style={styles.line} />
        <Image
          source={require('../../assets/logoScan/napas.png')}
          style={styles.napas}
          resizeMode="contain"
        />
        <View style={styles.line} />
        <Image
          source={require('../../assets/logoScan/vnpay.png')}
          style={styles.vnPay}
          resizeMode="contain"
        />
      </View>
      <View style={styles.btnContain}>
        <TouchableOpacity style={styles.btnDiscount}>
          <Image
            source={require('../../assets/images/discount.png')}
            style={styles.imageDiscount}
            resizeMode="contain"
          />
          <Text>Mã giảm giá</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnQr}>
          <FontAwesome name="qrcode" size={20} style={styles.icon} />
          <Text>QR nhận tiền</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.btnBottomContain}>
        <TouchableOpacity style={styles.btnApplePay}>
          <Image
            source={require('../../assets/images/apple_pay.png')}
            style={styles.imageApplePay}
            resizeMode="contain"
          />
          <Text style={styles.txtApple}>Apple Pay</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnApplePay}>
          <MaterialCommunityIcons name="history" size={30} style={styles.icon} color={colors.white} />
          <Text style={styles.txtApple}>Lịch sử giao dịch</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnApplePay}>
          <MaterialCommunityIcons name="store" size={30} style={styles.icon} color={colors.white} />
          <Text style={styles.txtApple}>Điểm chấp nhận thanh toán</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnApplePay}>
          <MaterialCommunityIcons name="image-album" size={30} style={styles.icon} color={colors.white} />
          <Text style={styles.txtApple}>Chọn ảnh mã QR từ thư viện</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ScanScreen;
