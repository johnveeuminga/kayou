import React, { PureComponent } from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
} from 'react-native'
import { H3, Text } from 'native-base';
import material from '../../../native-base-theme/variables/material';
import AddTreeSelectLocation from 'src/components/AddTree/AddTreeSelectLocation';

const styles = StyleSheet.create({
  heading: {
    letterSpacing: 1,
    fontWeight: '700',
    textTransform: "uppercase",
    color: material.brandPrimary,
    marginBottom: 8,
  },
})

export default class AddTreeSelectLocationScreen extends PureComponent {
  constructor(props) {
    super(props)
  }
  
  componentDidMount() {
    const onModalClosed = this.props.navigation.getParam('onModalClosed');

    this.didBlurSubscription = this.props.navigation.addListener(
      'willBlur',
      () => {
        onModalClosed({
          latitude: this.form.state.latitude,
          longitude: this.form.state.longitude,
        });
      }
    )
  }

  componentWillUnmount () {
    this.didBlurSubscription && this.didBlurSubscription.remove();
  }

  handleFormSubmit(coordinates) {
    const onLocationSelected = this.props.navigation.getParam('onLocationSelected')
    onLocationSelected(coordinates);

    this.props.navigation.goBack();
  }

  render() {
    const initialLocation = this.props.navigation.getParam('initialLocation')
    return (
      <ScrollView style={{ flex: 1 }}>
        <View style={{ paddingTop: 32, paddingBottom: 16, paddingHorizontal: 16, }}>
          <H3 style={ styles.heading }>Choose a location</H3>
          <Text>Enter a latitude/longitude below or press any location on the map to select a location. Press Use Location below the map to use the location displayed.</Text>
        </View>
        <View style={{ flex: 1, width: '100%' }}>
          <AddTreeSelectLocation 
            formSubmit={(coordinates) => this.handleFormSubmit(coordinates)}
            initialLocation={initialLocation}
            ref={ ref => {
              this.form = ref
            }}
        />
        </View>
      </ScrollView>
    )
  }
}