import React, { Component } from 'react';
import {
  View,
  ScrollView,
  ImageBackground,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Container, Form, Text, Item, Input, Button, } from 'native-base';
import LoginForm from 'src/components/Auth/LoginForm'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const styles = StyleSheet.create({
  logoWrapper: {
    marginTop: 40,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    // marginBottom: 40,
  },
  formWrapper: {
    paddingLeft: 16,
    paddingRight: 16,
    marginTop: 60,
    width: '100%',
  },
  formItem: {
    width: '100%',
    marginBottom: 16,
  },
})

export default class LoginScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props)
  }

  onLoginSuccess() {
    this.props.navigation.navigate('UserStack')
  }

  render () {
    const { loginFormPadded = true } = this.props;

    return (
      <KeyboardAwareScrollView
        contentContainerStyle={{
          backgroundColor: '#fafafa'
        }}
      >
        <View
          style={styles.logoWrapper}
        >
          <Image 
            source={require('assets/img/kayou-logo.png')}
            style={{ width: 145, height: 210 }}
          />
        </View>
        <View>
          <LoginForm 
            hasPadding={loginFormPadded}
            onLoginSuccess={() => this.onLoginSuccess()}
          />
        </View>
      </KeyboardAwareScrollView>
    )
  }
}
