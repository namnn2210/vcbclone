import React from 'react';
import { Platform, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerBox: {
    width: '100%',
    // height: 70,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    backgroundColor: '#4aa924',
    paddingTop: 45,
  },
  logoMain: {
    height: 55,
    width: 150,
  },
  title: {
    alignSelf: 'center',
    fontSize: 25,
    color: 'white',
    fontFamily: 'Gotham Bold Regular',
  },
  subTitle: {
    alignSelf: 'center',
    fontSize: 22,
    color: 'white',
    fontFamily: 'Gotham Medium',
  },
  section1: {
    height: 620,
    // backgroundColor: 'rgba(20, 38, 44, 0.97)',
  },
  section2: {
    height: 600,
    // backgroundColor: 'rgba(20, 38, 44, 0.97)',
    marginTop: 2,
    paddingVertical: 60,
    paddingHorizontal: 30,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  bottomSheet: {
    width: '100%',
    height: 50,
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // backgroundColor: 'rgba(20, 38, 44, 0.97)',
  },
  iconBottom: {
    alignSelf: 'center',
    color: 'white',
  },
  contentContainer: {
    flex: 1,
    width: '100%',
    // marginTop: 70,
    marginBottom: 50,
  },
  notiImg: {
    width: '100%',
    height: 200,
    // borderRadius: 20,
    overflow: 'hidden',
    // borderWidth: 3,
    alignSelf: 'center',
    marginTop: 20,
  },
  prominentIcon: {
    width: '95%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  prominentChild: {
    height: 65,
    width: 65,
    borderRadius: 20,
    justifyContent: 'center',
    margin: 5,
  },

  infoUser: {
    marginTop: 20,
    padding: 40,
  },
  info: {
    marginTop: 20,
    flexDirection: 'row',
  },
  avatar: {
    borderWidth: 2,
    borderColor: 'white',
    height: 70,
    width: 70,
    backgroundColor: '#bee472',
    borderRadius: 50,
    justifyContent: 'center',
  },
  avatarEdit: {
    height: 20,
    width: 20,
    backgroundColor: '#6cc102',
    borderRadius: 20,
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    left: 50,
  },
  infoText: {
    justifyContent: 'space-between',
    marginLeft: 30,
  },
  accBalance: {
    flexDirection: 'row',
  },
  accountListBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  accountListChild: {
    height: 50,
    width: 150,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  functionIcon: {
    height: 60,
    width: 60,
    justifyContent: 'center',
    borderRadius: 20,
    marginBottom: 5,
  },
  prominentChildIcon: {
    width: 55,
    height: 55,
    overflow: 'hidden',
    borderRadius: 20,
  },
  section2Child: {
    width: '33%',
    alignItems: 'center',
    marginBottom: 30,
  },
  prominentText: {
    color: 'white',
    alignSelf: 'flex-start',
    fontWeight: '300',
    fontSize: 12,
    width: 70,
    textAlign: 'center',
    fontFamily: '',
  },
  section2Title: {
    color: 'rgba(255, 255, 255, 0.6)',
    textAlign: 'center',
    fontSize: 12,
    fontFamily: '',
    width: 70,
  },
});

export default styles;
