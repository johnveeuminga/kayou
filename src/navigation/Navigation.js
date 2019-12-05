import { Navigation } from 'react-native-navigation';
import registerScreens from './registerScreens';
import { 
  HOME_SCREEN,
  AUTHGATE_SCREEN,
  PROFILE_SCREEN,
} from './Screens';

import {
  HomeScreen
} from 'src/screens';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import variables from '../../native-base-theme/variables/material'

import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';

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

const DrawerNavigator = createDrawerNavigator({
  Home: {
    screen: () => WrapperComponent(HomeScreen), 
  },
});

export function createMainApp() {
  return createAppContainer(DrawerNavigator)
}

// export function pushMainApp () {
//   Promise.all([
//     MaterialIcons.getImageSource('map', 25),
//     MaterialIcons.getImageSource('person', 25),
//     MaterialCommunityIcons.getImageSource('qrcode-scan', 25),
//     MaterialIcons.getImageSource('menu', 25),
//   ]).then(([mapIcon, personIcon, qrCode, menu]) => {
//     Navigation.setDefaultOptions({
//       bottomTab: {
//         selectedFontSize: 14,
//         selectedTextColor: variables.brandPrimary,
//         selectedIconColor: variables.brandPrimary,
//       },
//     })
//     Navigation.setRoot({
//       root: {
//         sideMenu: {
//           left: {
//             component: {
//               id: 'Drawer',
//               name:'kayou.Drawer'
//             },
//             visible: false,
//           },
//           center: {
//             bottomTabs: {
//               id: 'MainAppTabs',
//               children: [
//                 {
//                   stack: {
//                     id: 'HomeStack',
//                     children: [{
//                       component: {
//                         name: HOME_SCREEN,
//                         options: {
//                           topBar: {
//                             leftButtons: [{
//                               id: 'ToggleDrawer',
//                               icon: menu,
//                             }],
//                             rightButtons: [{
//                               id: 'QR',
//                               icon: qrCode,
//                             }],
//                           }
//                         }
//                       }
//                     }],
//                     options: {
//                       bottomTab: {
//                         text: 'Map',
//                         icon: mapIcon,
//                         testID: 'MAP_TAB_BAR_BUTTON',
//                       },
//                     }
//                   }
//                 },
//                 {
//                   stack: {
//                     id: 'ProfileStack',
//                     children: [{
//                       component: {
//                         name: PROFILE_SCREEN,
//                         options: {
//                           topBar: {
//                             rightButtons: [{
//                               id: 'QR',
//                               icon: qrCode,
//                             }],
//                           }
//                         }
//                       }
//                     }],
//                     options: {
//                       bottomTab: {
//                         text: 'Profile',
//                         icon: personIcon,
//                         testID: 'PERSON_TAB_BAR_BUTTON'
//                       }
//                     }
//                   },
//                 }
//               ],
//               options: {
//                 bottomTabs: {
//                   titleDisplayMode: 'alwaysShow',
//                 },
//                 topTabs: {
//                   visible: false,
//                 }
//               },
//             }
//           }
//         }
//       }
//     })
//   });
// }

// export function pushAuthStack () {
//   Navigation.setRoot({
//     root: {
//       stack: {
//         children: [
//           {
//             component: {
//               name: AUTHGATE_SCREEN,
//               options: {
//                 topBar: {
//                   visible: false,
//                 },
//               }
//             }, 
//           },
//         ],
//       },
//     }
//   });
// }
