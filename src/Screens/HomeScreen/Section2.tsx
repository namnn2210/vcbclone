import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles from './styles';
import { navigate } from '../../Navigators/NavigationUtils';

const chuyentientrongvcb = require('../../assets/imageSection2/chuyentientrongvcb.png');
const chuyentiennhanh247 = require('../../assets/imageSection2/chuyentiennhanh247.png');
const chuyentiendinuocngoai = require('../../assets/imageSection2/chuyentiendinuocngoai.png');
const chuyentienngoaivcb = require('../../assets/imageSection2/chuyentienngoaivcb.png');
const chuyentienmat = require('../../assets/imageSection2/chuyentienmat.png');
const quatang = require('../../assets/imageSection2/quatang.png');
const trangthaichuyentien = require('../../assets/imageSection2/trangthaichuyentien.png');

export enum MAIN_NAVIGATION {
  MAIN = '[APP] MAIN',
  SCAN = '[APP] SCAN',
  TRANSFER = '[APP] TRANSFER',
  CONFIRM = '[APP] CONFIRM',
  BILL = '[APP] BILL',
  SETTING = '[APP] SETTING',
  LIST_ACC = '[APP] LIST_ACC',
  HISTORY = '[APP] HISTORY',
}

const ChildSection = ({ txt, image }: { txt: string; image: any }) => {
  return (
    <>
      {txt === "Chuyển tiền nhanh24/7 ngoài VCB" ?
        <TouchableOpacity
          onPress={() => navigate(MAIN_NAVIGATION.TRANSFER)}
          style={styles.section2Child}
        >
          <View style={styles.functionIcon}>
            <Image style={styles.prominentChildIcon} source={image} resizeMode="contain" />
          </View>
          <View>
            <Text style={styles.section2Title}>{txt}</Text>
          </View>
        </TouchableOpacity >
        :
        <View style={styles.section2Child}>
          <View style={styles.functionIcon}>
            <Image style={styles.prominentChildIcon} source={image} resizeMode="contain" />
          </View>
          <View>
            <Text style={styles.section2Title}>{txt}</Text>
          </View>
        </View>
      }
    </>
  );
};

const Section2 = () => {
  return (
    <View style={styles.section2}>
      <ChildSection txt="Chuyển tiền trong VCB" image={chuyentientrongvcb} />
      <ChildSection txt="Chuyển tiền nhanh24/7 ngoài VCB" image={chuyentiennhanh247} />
      <ChildSection txt="Chuyển tiền đi nước ngoài" image={chuyentiendinuocngoai} />
      <ChildSection txt="Chuyển tiền ngoài VCB" image={chuyentienngoaivcb} />
      <ChildSection txt="Chuyển tiền mặt" image={chuyentienmat} />
      <ChildSection txt="Quà tặng" image={quatang} />
      <ChildSection txt="Trạng thái chuyển tiền" image={trangthaichuyentien} />
    </View>
  );
};

export default Section2;
