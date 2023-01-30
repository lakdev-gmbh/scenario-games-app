/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// add translations
import "./i18n.config"
import { AppContainer } from './src/AppContainer';

function App(): JSX.Element {
  return <NavigationContainer>
    <GestureHandlerRootView style={{flex: 1}}>
      <AppContainer />
    </GestureHandlerRootView>
  </NavigationContainer>
}

export default App;
