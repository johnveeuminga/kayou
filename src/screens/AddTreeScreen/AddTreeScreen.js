import React, { PureComponent } from 'react';
import {
  View,
  ScrollView,
  StyleSheet
} from 'react-native';
import { Text, Container, H1, Content, H3 } from 'native-base';
import { connect } from 'react-redux';
import AddTreeForm from '../../components/AddTree/AddTreeForm';
import { Navigation } from 'react-native-navigation';
import LoginScreen from '../Auth/LoginScreen';
import material from '../../../native-base-theme/variables/material';
import { ADD_TREE_SELECT_LOCATION } from 'src/navigation/Screens';
import { TREE_DETAILS_SCREEN } from '../../navigation/Screens';

const style = StyleSheet.create({
  content: {
    padding: 15,
    backgroundColor: '#fff',
    // flex: 1,
  }
})

class AddTreeScreen extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      location: null,
    }
  }

  showLocationChooser() {
    const { location } = this.state;

    this.props.navigation.navigate('AddTreeSelectLocationModal', {
      onModalClosed: (location) => this.changeLocation(location),
      onLocationSelected: (location) => this.changeLocation(location),
      initialLocation: location,
    })
  }

  changeLocation (location) {
    const { latitude, longitude } = location
    console.log(latitude)
    console.log(longitude)

    if (latitude && longitude) {
      console.log('This is something')
      this.form.map.setCamera({
        center: {
          latitude,
          longitude,
        },
        pitch: 0,
        heading: 0,
        zoom: 16,
      });
      this.setState(state => {
        return {
          ...state,
          location: {
            latitude,
            longitude,
          },
        }
      })
    }
  }

  onFormProcessed(id) {
    // Navigation.push(this.props.componentId, {
    //   component: {
    //     name: TREE_DETAILS_SCREEN,
    //     passProps: {
    //       treeId: id,
    //     },
    //   }
    // })

    this.props.navigation.navigate('TreeDetailsScreen', {
      treeId: id,
    })
  }

  render() {
    return (
      <ScrollView 
        style={{
          ...style.content,
          backgroundColor: '#fff'
        }}
      >
        <View>
          <H3 style={{ fontWeight: '700', color: material.brandPrimary, textTransform: 'uppercase', letterSpacing: 1,}}>Describe The Tree</H3>
          <AddTreeForm 
            onFormProcessed={(id) => this.onFormProcessed(id)}
            onEditLocationPressed={() => this.showLocationChooser()}
            ref={ ref => {
              this.form = ref;
            }}
            location={this.state.location}
          />
        </View>
      </ScrollView>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user.user,
  recentlyAddedId: state.trees.recentlyAddedId,
})


export default connect(mapStateToProps, () => ({}))(AddTreeScreen);
