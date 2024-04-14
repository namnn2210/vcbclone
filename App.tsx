import React, { useState, useEffect, useRef } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { RootNavigator } from './src/Navigators/index';
import { LogBox } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './src/store/index';


LogBox.ignoreAllLogs();



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
