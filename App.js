/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment} from 'react';
import { createAppContainer } from 'react-navigation';
import { createMainApp } from 'src/navigation';
import {
  MainAppNavigator
} from 'src/navigation';
import { Provider } from 'src/redux';

const App = () => {
  return (
    <Provider>
      <MainAppNavigator />
    </Provider>
  );
};

export default App;
