import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import Map from 'src/components/Map';
import { Fab, Text, Button } from 'native-base';
import material from '../../../native-base-theme/variables/material';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const styles = StyleSheet.create({
  view: {
    flex: 1,
    position: 'absolute',
    ...StyleSheet.absoluteFillObject,
  }
});

class HomeScreen extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      mapStyle: 'standard',
    }
  }

  setMapStyle() {
    const { mapStyle } = this.state;

    this.setState((state) => {
      const style = mapStyle === 'satellite' ? 'standard' : 'satellite';

      return {
        ...state,
        mapStyle: style,
      }
    })
  }

  async componentDidMount () {
    this.props.sampleDispatch();
  }

  goToTreeDetails (tree) {
    this.props.navigation.navigate('TreeDetailsScreen', {
      treeId: tree.id,
    })
  }

  goToAddTree() {
    if (this.props.user) {
      this.props.navigation.navigate('AddTreeScreen')

      return
    }

    this.props.navigation.navigate('LoginScreen')
  }

  render () {
    const { trees = [] } = this.props;
    const { mapStyle } = this.state;

    return (
      <View
        style={styles.view}
      >
        <Map 
          trees={trees}
          onViewMorePress={(id) => this.goToTreeDetails(id)}
          mapStyle={mapStyle}
        />
        <Fab 
          style={{ backgroundColor: material.brandDanger }}
          position='bottomRight'

          onPress={() => this.goToAddTree()}
        >
          <Icon
            name={'plus'}
          />
        </Fab>
        <Fab
          style={{ backgroundColor: material.brandLight }}
          position='topLeft'
          onPress={() => this.setMapStyle()}
        >
          <Icon 
            name={mapStyle === 'satellite' ? 'map' : 'satellite-variant'}
            color={ material.brandDark }
            style={{ color: material.brandDark }}
          />
        </Fab>
      </View>
    )
  }
}

const mapStateToProps = state => ({ 
  trees: state.trees.trees,
  user: state.user.user,
});
const mapDispatchToProps = dispatch => ({
  sampleDispatch: () => dispatch({ type: 'SAMPLE_WORKER'}),
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
