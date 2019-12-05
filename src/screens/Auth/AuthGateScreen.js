
import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';
import { LOGIN_SCREEN } from 'src/navigation';
import { connect } from 'react-redux';
import { Navigation } from 'react-native-navigation';

class AuthGateScreen extends PureComponent {
  constructor (props) {
    super(props)
  }
  
  componentDidMount () {
    Navigation.push(this.props.componentId, {
      component: {
        name: LOGIN_SCREEN,
        options: {
          topBar: {
            visible: false,
          },
        }
      }
    })
  }

  render () {
    return (
      <View
        style={{
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  trees: state.trees.trees,
});

const mapDispatchToProps = dispatch => ({
  sampleDispatch: (trees = []) => dispatch({ type: 'SAMPLE_WORKER', trees }),
})

export default connect(mapStateToProps, mapDispatchToProps)(AuthGateScreen)
 