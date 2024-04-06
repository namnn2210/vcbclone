import React, { useEffect, useMemo, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { navigationRef, screenOptions } from './NavigationUtils';
import { AuthNavigator } from './AuthNavigator';
import { MainNavigator } from './MainNavigator';
import { LocalStorage } from '../localStore/index';
import { setLogin, useAppSelector } from '../store/index';
import { useDispatch } from 'react-redux';

export enum ROOT_ROUTES {
  AUTH_NAVIGATION = 'AUTH_NAVIGATION',
  APP_NAVIGATION = 'APP_NAVIGATION',
}

export type RootStackParam = {
  [ROOT_ROUTES.APP_NAVIGATION]: undefined;
  [ROOT_ROUTES.AUTH_NAVIGATION]: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParam>();

export function RootNavigator() {
  const [mainLoading, setMainloading] = useState(true);
  const { isLogin } = useAppSelector((state: any) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const Login = async () => {
      setMainloading(true);
      const response = await LocalStorage.getUser();
      response ? dispatch(setLogin(true)) : dispatch(setLogin(false));
      setMainloading(false);
    };
    Login();
  }, [isLogin]);

  const chooseScreen = useMemo(() => {
    return isLogin ? (
      <RootStack.Screen name={ROOT_ROUTES.APP_NAVIGATION} component={MainNavigator} />
    ) : (
      <RootStack.Screen name={ROOT_ROUTES.AUTH_NAVIGATION} component={AuthNavigator} />
    );
  }, [isLogin]);

  return (
    <NavigationContainer ref={navigationRef}>
      <RootStack.Navigator screenOptions={screenOptions as any}>{chooseScreen}</RootStack.Navigator>
    </NavigationContainer>
  );
}
