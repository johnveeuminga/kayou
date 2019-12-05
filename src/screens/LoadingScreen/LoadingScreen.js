import React, { PureComponent } from 'react';
import { View, Image, ActivityIndicator, PermissionsAndroid } from 'react-native';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage'
import material from '../../../native-base-theme/variables/material';

class LoadingScreen extends PureComponent {
  async getStoragePermission () {
    try {
      const permission = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
      
      await AsyncStorage.setItem('@kayou_write_perm', JSON.stringify(permission));

      return permission
    } catch(err) {
      console.log(err);

      return err;
    }
  }

  async componentDidMount() {
    await this.getStoragePermission();
    
    setTimeout(() => {
      if (this.props.user) {
        this.props.navigation.navigate('UserStack');
        return
      }

      this.props.navigation.navigate('GuestStack');
    }, 2000)
  }

  render() {
    return (
      <View
        style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#e5ffe4'}}
      >
        <Image 
          source={require('assets/img/kayou-logo-310.png')}
          style={{ width: 207, height: 300, marginBottom: 24 }}
          resizeMode={'contain'}
        />
        <ActivityIndicator 
          size='large'
          color={material.brandPrimary}
        />
      </View>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user.user
})

export default connect(mapStateToProps, ({}))(LoadingScreen);
