/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';
import React from 'react';

// add translations
import "./i18n.config"
import { AppContainer } from './src/AppContainer';

function App(): JSX.Element {
  return <NavigationContainer>
    <AppContainer />
  </NavigationContainer>
}

export default App;
