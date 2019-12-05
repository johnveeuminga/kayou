import React, { PureComponent } from 'react'
import { View, ScrollView, ActivityIndicator, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { Text, Button, H2 } from 'native-base'
import { Navigation } from 'react-native-navigation'
import { USER_LOGIN, USER_LOGOUT, NAV_SET_CURRENT_SCREEN, NAV_SET_CURRENT_COMPONENT_ID } from '../../constants/action-types'
import LoginScreen from '..//Auth/LoginScreen'
import { PROFILE_SCREEN } from '../../navigation/Screens'
import { pushMainApp } from 'src/navigation/Navigation'
import { Avatar } from 'react-native-elements'
import material from '../../../native-base-theme/variables/material'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const styles = StyleSheet.create({
  loaderWrapper: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    position: "absolute",
    ...StyleSheet.absoluteFillObject,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  loaderContent: {
    width: '80%',
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderRadius: 4,
    backgroundColor: '#fff',
    position: 'relative',
    zIndex: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

class ProfileScreen extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
    }
  }

  logout() {
    this.props.logout();
    this.props.navigation.navigate('GuestStack')
  }

  render () {
    const Loader = () => (
      <View style={styles.loaderWrapper}>
        <View style={styles.loaderContent}>
          <Text>Fetching profile...</Text>
          <ActivityIndicator />
        </View>
      </View>
    )

    return (
      <ScrollView 
        contentContainerStyle={{
          padding: 15,
        }}
      >
        {
          this.props.isFetching &&
            <Loader />
        }
        {
          !this.isFetching &&
            <View style={{ flex: 1, marginTop: 60, alignItems: 'center', justifyContent: 'center'}}>
              <Avatar 
                title={`${this.props.user.firstName.charAt(0)}${this.props.user.lastName.charAt(0)}`}
                size={128}
                overlayContainerStyle={{
                  backgroundColor: material.brandInfo,
                }}
                containerStyle={{
                  marginBottom: 32,
                }}
                rounded
              />
              <H2 style={{textTransform: 'uppercase', letterSpacing: 1, fontWeight: '700', marginBottom: 32,}}>{ this.props.user.firstName } {this.props.user.lastName}</H2>
              <Button
                onPress={ () => this.logout() }
              >
                <Text>Logout</Text>
              </Button>
            </View>
        }
      </ScrollView>
    )
  }
}

const mapStateToProps = state => ({ 
  user: state.user.user,
  isFetching: state.user.isFetching,
});

const mapDispatchToProps = dispatch => {
  return {
    login: () => dispatch({ type: USER_LOGIN }),
    logout: () => dispatch({ type: USER_LOGOUT }),
    setCurrentScreenToProfile: () => dispatch({ type: NAV_SET_CURRENT_SCREEN, screen: PROFILE_SCREEN }),
    setCurrentNavIdToProfile: (id) => dispatch({ type: NAV_SET_CURRENT_COMPONENT_ID, id }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen)