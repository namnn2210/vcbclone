import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { screenOptions } from './NavigationUtils';
import HomeScreen from '../Screens/HomeScreen/index';
import ScanScreen from '../Screens/ScanScreen';
import TransferMoneyScreen from '../Screens/TransferMoneyScreen';
import BillScreen from '../Screens/BillScreen';
import ConfirmScreen from '../Screens/ConfirmScreen';
import SettingScreen from '../Screens/Setting/SettingScreen';
import ListAcc from '../Screens/ListAcc';
import HistoryScreen from '../Screens/HistoryScreen';

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

export type AuthStackParam = {
  [MAIN_NAVIGATION.MAIN]: undefined;
  [MAIN_NAVIGATION.SCAN]: undefined;
  [MAIN_NAVIGATION.TRANSFER]: undefined;
  [MAIN_NAVIGATION.CONFIRM]: undefined;
  [MAIN_NAVIGATION.BILL]: undefined;
  [MAIN_NAVIGATION.SETTING]: undefined;
  [MAIN_NAVIGATION.LIST_ACC]: undefined;
  [MAIN_NAVIGATION.HISTORY]: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParam>();

export function MainNavigator() {
  return (
    <Stack.Navigator initialRouteName={MAIN_NAVIGATION.MAIN} screenOptions={screenOptions}>
      <Stack.Screen component={HomeScreen} name={MAIN_NAVIGATION.MAIN} />
      <Stack.Screen component={ScanScreen} name={MAIN_NAVIGATION.SCAN} />
      <Stack.Screen component={TransferMoneyScreen} name={MAIN_NAVIGATION.TRANSFER} />
      <Stack.Screen component={ConfirmScreen} name={MAIN_NAVIGATION.CONFIRM} />
      <Stack.Screen component={BillScreen} name={MAIN_NAVIGATION.BILL} />
      <Stack.Screen component={SettingScreen} name={MAIN_NAVIGATION.SETTING} />
      <Stack.Screen component={ListAcc} name={MAIN_NAVIGATION.LIST_ACC} />
      <Stack.Screen component={HistoryScreen} name={MAIN_NAVIGATION.HISTORY} />
    </Stack.Navigator>
  );
}
