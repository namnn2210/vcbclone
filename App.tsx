import React, { useState, useEffect, useRef } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { RootNavigator } from './src/Navigators/index';
import { LogBox } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './src/store/index';
import { initializeApp } from 'firebase/app';

LogBox.ignoreAllLogs();

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBf60TO16OIuQ7Hz2qtzIMdZE-PNhzNIfg",
  authDomain: "vcb-clone.firebaseapp.com",
  projectId: "vcb-clone",
  storageBucket: "vcb-clone.appspot.com",
  messagingSenderId: "296276456346",
  appId: "1:296276456346:web:36a62460a238027b1f8023",
  measurementId: "G-DD5XRFLEWQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

function App() {

  return (
    <GestureHandlerRootView
      style={{
        flex: 1,
      }}>
      <Provider store={store}>
        <RootNavigator />
      </Provider>
    </GestureHandlerRootView>
  );
}

export default App;
