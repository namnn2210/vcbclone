import React from 'react';
import { CommonActions, NavigationContainerRef, StackActions } from '@react-navigation/native';

export const navigationRef = React.createRef<NavigationContainerRef<any>>();

export const navigate = (name: string, params: any = {}) => {
  if (navigationRef.current?.isReady()) {
    navigationRef.current?.navigate(name, params);
  }
};

export const navigatePush = (name: string, params: any = {}) => {
  if (navigationRef.current?.isReady()) {
    navigationRef.current?.dispatch(StackActions.push(name, params));
  }
};

export const navigateAndReset = (routes = [], index = 0) => {
  if (navigationRef.current?.isReady()) {
    navigationRef.current?.dispatch(
      CommonActions.reset({
        index,
        routes: routes.map(route => ({ name: route })),
      }),
    );
  }
};

export const navigateAndSimpleReset = (name: string, index = 0) => {
  if (navigationRef.current?.isReady()) {
    navigationRef.current?.dispatch(
      CommonActions.reset({
        index,
        routes: [{ name }],
      }),
    );
  }
};

export const navigateAndSimpleResetWithParams = (name: string, params: any = {}, index = 0) => {
  if (navigationRef.current?.isReady()) {
    navigationRef.current?.dispatch(
      CommonActions.reset({
        index,
        routes: [{ name, params }],
      }),
    );
  }
};

export function navigateReplace(name: string, param: any) {
  if (navigationRef.current?.isReady()) {
    navigationRef.current?.dispatch(
      StackActions.replace(name, {
        param,
      }),
    );
  }
}

export const goBack = () => {
  navigationRef.current?.goBack();
};

export const screenOptions: any = {
  headerShown: false, // default header is making screen flicker on android
  // statusBarAnimation: 'slide',
  animation: 'slide_from_right',
  gestureEnabled: false,
};
