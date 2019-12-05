import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import {
  Text, Button
} from 'native-base';
import { connect } from 'react-redux';
import { HOME_SCREEN } from 'src/navigation/Screens';
import material from '../../native-base-theme/variables/material';
import { Navigation } from 'react-native-navigation';
import { SET_DRAWER_STATUS, USER_LOGIN, USER_LOGOUT } from '../constants/action-types';
import { ADD_TREE_SCREEN, PROFILE_SCREEN, SCAN_QR_SCREEN, LOGIN_SCREEN } from '../navigation/Screens';
import { pushMainApp } from '../navigation/Navigation';

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#fafafa',
    flex: 1,
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '100%',
    position: 'relative',
  },
  navItem: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 16,
    paddingRight: 16,
    width: '100%'
  },
  navText: {
    color: '#5a5a5a',
    textTransform:'uppercase',
    letterSpacing: 1,
  },
  actionButtonContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },

  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingTop: 16,
    width: '100%',
  },
});

class Drawer extends React.PureComponent {
  componentDidUpdate() {
    const { componentId } = this.props;
  }

  navigateToPage(navName = '') {
    this.props.navigation.closeDrawer();

    this.props.navigation.navigate(navName);
  }

  handleActionCta() {
    if (this.props.user) {
      this.props.logout();
      // pushMainApp();
    } else {
      this.props.navigation.closeDrawer();
      this.navigateToPage('LoginScreen');
    }
  }

  render () {
    const { user, navigation } = this.props;

    const NavigationItem = ({navName = '', linkText}) => {
      let textStyle = styles.navText;

      return (
        <TouchableOpacity 
          style={ styles.navItem }
          onPress={() => this.navigateToPage(navName)}
        >
          <Text style={ textStyle }>{linkText}</Text>
        </TouchableOpacity>
      )
    }

    return (
      <View style={ styles.wrapper }>
        <View style={styles.logoContainer}>
          <Image 
            source={require('assets/img/kayou-logo.png')}
            style={{ width: 145, height: 210 }}
            resizeMode={'contain'}
          />
        </View>
        <NavigationItem
          navName={ 'Home' }
          linkText={'Home'}
        />
        <NavigationItem
          navName={ 'ScanQrScreen' }
          linkText={'Scan QR'}
        />
        {
          user &&
            <NavigationItem 
              navName={ 'ProfileScreen' }
              linkText={'Profile'}
            />
        }
        <View style={ styles.actionButtonContainer }>
          <Button 
            style={{ height: 60, borderRadius: 0 }}
            onPress={ () => this.handleActionCta() }
            block
          >
            <Text>{ user ? 'Sign Out' : 'Sign In' }</Text>
          </Button>
        </View>
      </View>
    )
  }
}

const mapStateToProps = state => ({ user: state.user.user });

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch({ type: USER_LOGOUT }),
})

export default connect(mapStateToProps, mapDispatchToProps)(Drawer)