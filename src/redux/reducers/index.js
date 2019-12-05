import { persistCombineReducers } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import trees from './trees-reducer';
import user from './user-reducer';
import navigation from './nav-reducer';


const config = {
  key: 'LIFTED_REDUX_STORE',
  blacklist: ['navigation'],
  storage: AsyncStorage,
};

export default persistCombineReducers(config, {
  trees,
  user,
  navigation,
});
