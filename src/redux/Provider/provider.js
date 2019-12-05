import React, { PureComponent } from 'react';
import { Provider } from 'react-redux';
import { store, persistor } from '../store';
import { PersistGate } from 'redux-persist/integration/react';
import { StyleProvider } from 'native-base';
import getTheme from '../../../native-base-theme/components';
import material from '../../../native-base-theme/variables/material';

class AppStoreProvider extends PureComponent {
  render () {
    const { children } = this.props;

    return (
      <Provider store={store}>
        <PersistGate 
          persistor={persistor}
        >
          <StyleProvider style={getTheme(material)}>
            {children}
          </StyleProvider>
        </PersistGate>
      </Provider>
    )
  }
}

export default AppStoreProvider;
