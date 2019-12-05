import React from 'react';

import { Navigation } from "react-native-navigation";
import { 
  HOME_SCREEN,
  AUTHGATE_SCREEN,
  LOGIN_SCREEN,
  TREE_DETAILS_SCREEN,
  TREE_DETAILS_QR_SCREEN,
  PROFILE_SCREEN,
  ADD_TREE_SCREEN,
  SCAN_QR_SCREEN,
  ADD_TREE_SELECT_LOCATION,
  NOT_FOUND_SCREEN
} from "./Screens";
import { 
  HomeScreen,
  AuthGateScreen,
  LoginScreen,
  TreeDetailsScreen,
  TreeDetailsQRScreen,
  ProfileScreen,
  AddTreeScreen,
  ScanQrScreen,
  AddTreeSelectLocation,
  NotFoundScreen,
} from "src/screens";
import { Provider } from 'src/redux';
import Drawer from '../components/Drawer';

function WrapperComponent (Component) {
  return function inject(props) {
    const EnhancedComponent = () => (
      <Provider>
        <Component 
          {...props}
        />
      </Provider>
    );

    return <EnhancedComponent />
  }
}

export default function () {
  Navigation.registerComponent(AUTHGATE_SCREEN, () => WrapperComponent(AuthGateScreen));
  Navigation.registerComponent(LOGIN_SCREEN, () => WrapperComponent(LoginScreen));
  Navigation.registerComponent(HOME_SCREEN, () => WrapperComponent(HomeScreen));
  Navigation.registerComponent(TREE_DETAILS_SCREEN, () => WrapperComponent(TreeDetailsScreen));
  Navigation.registerComponent(TREE_DETAILS_QR_SCREEN, () => WrapperComponent(TreeDetailsQRScreen));
  Navigation.registerComponent(PROFILE_SCREEN, () => WrapperComponent(ProfileScreen));
  Navigation.registerComponent(ADD_TREE_SCREEN, () => WrapperComponent(AddTreeScreen))
  Navigation.registerComponent(SCAN_QR_SCREEN, () => WrapperComponent(ScanQrScreen));
  Navigation.registerComponent(ADD_TREE_SELECT_LOCATION, () => WrapperComponent(AddTreeSelectLocation))
  Navigation.registerComponent(NOT_FOUND_SCREEN, () => WrapperComponent(NotFoundScreen))
  Navigation.registerComponent('kayou.Drawer', () => WrapperComponent(Drawer));
}