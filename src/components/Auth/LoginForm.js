import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Form,
  Item,
  Input,
  Button,
  Text,
} from 'native-base';
import material from '../../../native-base-theme/variables/material';
import { USER_LOGIN } from '../../constants/action-types';
import { connect } from 'react-redux';

const styles = StyleSheet.create({
  formWrapper: {
    marginTop: 32,
  },
  formItem: {
    width: '100%',
    marginBottom: 16,
  },
  label: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: material.brandPrimary,
    paddingBottom: 8,
    fontSize: 12,
  },
  item: {
    marginBottom: 15,
  },
})

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      form: {
        username: '',
        password: '',
      },
      hasError: false,
    }
  }

  onInputChange(key, val) {
    this.setState(state => {
      return {
        ...state,
        form: {
          ...state.form,
          [key]: val,
        },
        hasError: false,
      }
    })
  }

  onFormSubmit () {
    const { form } = this.state;

    if (form.username === 'admin' && form.password === 'admin') {
      this.props.login();
      this.props.onLoginSuccess();
    } else {
      this.setState(state => {
        return {
          ...state,
          hasError: true,
        }
      })
    }
  }

  render () {
    const { form, hasError } = this.state;

    const Label = ({text}) => (
      <Text style={styles.label}>{ text }</Text>
    );

    return (
      <Form
        style={{
          ...styles.formWrapper,
          padding: this.props.hasPadding ? 15 : 0,
        }}
      >
        <View style={styles.formItem}>
          <Label text={'Username'}/>
          <Item
            style={{ width: '100%' }}
            error={hasError}
            regular
          >
            <Input
              value={form.username}
              onChangeText={(text) => this.onInputChange('username', text)}
              placeholder='Username'
            />
          </Item>
          {
            hasError &&
              <Text style={{ color: material.brandDanger, fontSize: 12 }}>Sorry. The username or password provided is not correct.</Text>
          }
        </View>
        <View style={styles.formItem}>
          <Label text={'Password'}/>
          <Item 
            style={{ width: '100%' }}
            regular
          >
            <Input 
              value={form.password}
              onChangeText={(text) => this.onInputChange('password', text)}
              placeholder='Password' 
              secureTextEntry 
            />
          </Item>
        </View>
        <Button 
          onPress={() => this.onFormSubmit()}
          primary 
          block
        >
          <Text style={{ fontWeight: '700' }}>Login</Text>
        </Button>
      </Form>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    login: () => dispatch({ type: USER_LOGIN }),
  }
}

export default connect(() => ({}), mapDispatchToProps)(LoginForm)
