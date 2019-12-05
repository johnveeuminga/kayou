import React from 'react';

import {
  HomeScreen,
  ScanQrScreen,
  TreeDetailsScreen,
  TreeDetailsQRScreen,
  AddTreeScreen,
  AddTreeSelectLocation,
  LoginScreen,
  ProfileScreen,
  LoadingScreen,
  TreeDirectionsScreen,
  NotFoundScreen,
} from 'src/screens';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator  } from 'react-navigation-tabs';
import Drawer from 'src/components/Drawer';
import { Button, Text } from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import material from '../../native-base-theme/variables/material';

const HeaderButton = ({ onPress, children }) => (
  <Button
    transparent
    iconLeft
    onPress={() => onPress()}
    style={{ paddingVertical: 0, paddingHorizontal: 15 }}
  >
    {children}
  </Button>
);

const defaultNavigationOptions = ({ navigation }) => ({
  headerLeft: () => (
    <HeaderButton
      onPress={() => navigation.toggleDrawer()}
    >
      <MaterialIcons name='menu' style={{ fontSize: 24 }}/>
    </HeaderButton>
  ),
  headerRight: () => (
    <HeaderButton
      onPress={() => navigation.navigate('ScanQrScreen')}
    >
      <MaterialCommunityIcons name='qrcode-scan' style={{ fontSize: 24 }}/>
    </HeaderButton>
  ),
})

const HomeStackNavigator = createStackNavigator({
  Home: HomeScreen,
  ScanQrScreen: ScanQrScreen,
  TreeDetailsScreen: TreeDetailsScreen,
  TreeDetailsQRScreen: TreeDetailsQRScreen,
  TreeDirectionsScreen: TreeDirectionsScreen,
  AddTreeScreen: AddTreeScreen,
  NotFoundScreen: NotFoundScreen,
}, {
  defaultNavigationOptions: ({navigation}) => defaultNavigationOptions({navigation}),
});

const ProfileStackNavigator = createStackNavigator({
  ProfileScreen: ProfileScreen,
  ScanQrScreen: ScanQrScreen,
}, {
  defaultNavigationOptions: ({navigation}) => defaultNavigationOptions({navigation}),
})

const UserTabNavigator = createBottomTabNavigator({
  Home: HomeStackNavigator,
  Profile: ProfileStackNavigator,
}, {
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, horizontal, tintColor }) => {
      const { routeName } = navigation.state;

      if (routeName === 'Home') {
        return (
          <MaterialIcons 
            name='map' 
            style={{ fontSize: 24, color: focused ? material.brandPrimary : material.brandDark }}
          />
        ) 
      } else if (routeName === 'Profile') {
        return (
          <MaterialIcons 
            name='person' 
            style={{ fontSize: 24, color: focused ? material.brandPrimary : material.brandDark }}
          />
        )
      }
    },
    tabBarLabel: ({ focused, horizontal, tintColor }) => {
      const { routeName } = navigation.state;

      return (
        <Text style={{
          fontWeight: focused ? '700' : '400',
          color: focused ? material.brandPrimary : material.brandDark,
          textAlign: 'center',
          fontSize: focused ? 14 : 12,
        }}>{routeName}</Text>
      )
    }
  })
})

const GuestStackNavigator =  createStackNavigator({
  Home: HomeScreen,
  ScanQrScreen: ScanQrScreen,
  TreeDetailsScreen: TreeDetailsScreen,
  TreeDetailsQRScreen: TreeDetailsQRScreen,
  AddTreeScreen: AddTreeScreen,
  TreeDirectionsScreen: TreeDirectionsScreen,
  LoginScreen: LoginScreen,
  NotFoundScreen: NotFoundScreen,
}, {
  initialRouteName: 'Home',
  defaultNavigationOptions: ({navigation}) => ({
    headerLeft: () => (
      <HeaderButton
        onPress={() => navigation.toggleDrawer()}
      >
        <MaterialIcons name='menu' style={{ fontSize: 24 }}/>
      </HeaderButton>
    ),
    headerRight: () => (
      <HeaderButton
        onPress={() => navigation.navigate('ScanQrScreen')}
      >
        <MaterialCommunityIcons name='qrcode-scan' style={{ fontSize: 24 }}/>
      </HeaderButton>
    ),
  })
});


const RootUserStack = createStackNavigator({
  MainUser: UserTabNavigator,
  AddTreeSelectLocationModal: AddTreeSelectLocation,
}, {
  mode: 'modal',
  headerMode: 'none',
});

const RootGuestStack = createStackNavigator({
  Main: GuestStackNavigator,
  AddTreeSelectLocationModal: AddTreeSelectLocation,
}, {
  mode: 'modal',
  headerMode: 'none',
});

const LoadingStackNavigator = createStackNavigator({
  Loading: LoadingScreen,
}, {
  defaultNavigationOptions: {
    header: null,
  }
})

const GuestStack = createAppContainer(RootGuestStack);
const UserStack = createAppContainer(RootUserStack);
const LoadingStack = createAppContainer(LoadingStackNavigator);

const MainSwitchNavigator = createSwitchNavigator({
  LoadingStack: LoadingStack,
  UserStack: UserStack,
  GuestStack: GuestStack,
}, {
  initialRouteName: 'LoadingStack',
});

const MainAppNavigator = createAppContainer(MainSwitchNavigator);

const DrawerNavigator = createDrawerNavigator({
  Main: {
    screen: MainAppNavigator,
  },
}, {
  drawerType: 'back',
  contentComponent: (props) => <Drawer navigation={props.navigation}/>,
});

export default createAppContainer(DrawerNavigator);
