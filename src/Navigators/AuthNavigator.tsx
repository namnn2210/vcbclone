import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { screenOptions } from './NavigationUtils';
import LoginScreen from '../Screens/login/LoginScreen';
import RegisterScreen from '../Screens/register/RegisterScreen';

export enum AUTH_NAVIGATION {
  LOGIN_SCREEN = '[AUTH] LOGIN_SCREEN',
  REGISTER_SCREEN = '[AUTH] REGISTER_SCREEN',
}

export type AuthStackParam = {
  [AUTH_NAVIGATION.LOGIN_SCREEN]: undefined;
  [AUTH_NAVIGATION.REGISTER_SCREEN]: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParam>();

export function AuthNavigator() {
  return (
    <Stack.Navigator initialRouteName={AUTH_NAVIGATION.LOGIN_SCREEN} screenOptions={screenOptions}>
      <Stack.Screen component={LoginScreen} name={AUTH_NAVIGATION.LOGIN_SCREEN} />
      <Stack.Screen component={RegisterScreen} name={AUTH_NAVIGATION.REGISTER_SCREEN} />
    </Stack.Navigator>
  );
}
