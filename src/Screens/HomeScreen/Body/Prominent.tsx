import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles from '../styles';
import { navigate } from '../../../Navigators/NavigationUtils';
import { MAIN_NAVIGATION } from '../../../Navigators/MainNavigator';

const Prominent = () => {
  return (
    <View style={styles.prominentIcon}>
      <View>
        <View style={styles.prominentChild}>
          <Image
            style={styles.prominentChildIcon}
            source={require('../../../assets/imgFromRealApp/pay.jpg')}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.prominentText}>Apple Pay</Text>
      </View>
      <View>
        <View style={styles.prominentChild}>
          <Image
            style={styles.prominentChildIcon}
            source={require('../../../assets/imgFromRealApp/logo1.png')}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.prominentText}>VCB Rewards</Text>
      </View>
      <View>
        <View style={styles.prominentChild}>
          <Image
            style={styles.prominentChildIcon}
            source={require('../../../assets/imgFromRealApp/logo1.png')}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.prominentText}>Khóa Thẻ</Text>
      </View>
      <View>
        <View style={styles.prominentChild}>
          <Image
            style={styles.prominentChildIcon}
            source={require('../../../assets/imgFromRealApp/taxi.jpg')}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.prominentText}>VNPAY Taxi</Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          navigate(MAIN_NAVIGATION.SETTING);
        }}>
        <View style={styles.prominentChild}>
          <Image
            style={styles.prominentChildIcon}
            source={require('../../../assets/imgFromRealApp/logo4.png')}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.prominentText}>Cài đặt</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Prominent;
