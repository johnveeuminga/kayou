import React, { PureComponent } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Text, Item, Input, Button } from 'native-base';

const styles = StyleSheet.create({
  mapContainer: {
    height: 300,
    width: '100%',
    position: 'relative',
  },
  label: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: '#333',
    paddingBottom: 8,
    fontSize: 12,
  },
  item: {
    marginBottom: 16, 
  }
});

export default class AddTreeSelectLocation extends PureComponent {
  constructor(props) {
    super(props);

    const { initialLocation } = this.props;

    this.state = {
      latitude: initialLocation && initialLocation.latitude ? initialLocation.latitude : null ,
      longitude: initialLocation && initialLocation.longitude ? initialLocation.longitude : null ,      
      latitudeTemp: initialLocation && initialLocation.latitude ? initialLocation.latitude.toString() : null,
      longitudeTemp: initialLocation && initialLocation.longitude ? initialLocation.longitude.toString() : null ,
    }
  }

  onInputChange(key, val) {
    this.setState(state => {
      return {
        ...state,
        [key]: val,
      }
    })
  }

  setRegion() {
    const { initialLocation } = this.props;

    if (!initialLocation) {
      this.map.fitToCoordinates([{
        latitude: 16.4144431,
        longitude: 120.6212997
      }, {
        latitude: 16.3843072,
        longitude: 120.6043911
      }]);

      return
    }

    this.map.setCamera({
      center: {
        ...initialLocation,
      },
      heading: 0,
      pitch: 0,
      zoom: 16,
    });
  }

  onMapPress(e) {
    const { latitude, longitude } = e.coordinate;
    this.setState(state => {
      this.map.fitToCoordinates([{
        latitude,
        longitude,
      }])

      return {
        ...state,
        latitude,
        longitude,
        latitudeTemp: latitude.toString(),
        longitudeTemp: longitude.toString(),
      }
    })
  }

  onFormSubmit() {
    const { latitude, longitude } = this.state;

    this.props.formSubmit({
      latitude,
      longitude,
    })
  }

  handleUseLatLngPress() {
    this.setState(state => {
      const { latitudeTemp, longitudeTemp } = this.state;

      this.map.fitToCoordinates([{
        latitude: parseFloat(latitudeTemp),
        longitude: parseFloat(longitudeTemp),
      }]);

      return {
        ...state,
        latitude: parseFloat(latitudeTemp),
        longitude: parseFloat(longitudeTemp),
        latitudeTemp,
        longitudeTemp,
      }
    })
  }

  render() {
    const { latitude, latitudeTemp, longitude, longitudeTemp } = this.state;

    console.log(latitude, longitude);

    const Label = ({text}) => (
      <Text style={styles.label}>{ text }</Text>
    );

    return (
      <View style={{ flex: 1 }}>
        <View style={{ paddingHorizontal: 16, paddingBottom: 16,  flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
          <View style={{ width: '100%' }}>
            <Label 
              text={'Latitude'}
            />
            <Item 
              style={styles.item}
              regular
            >
              <Input
                onChangeText={(text) => this.onInputChange('latitudeTemp', text)}
                value={ latitudeTemp }
                placeholder={'Latitude'} 
                keyboardType='numeric'
              />
            </Item>
          </View>
          <View style={{ width: '100%'}}>
            <Label 
              text={'Longitude'}
            />
            <Item 
              style={styles.item}
              regular
            >
              <Input 
                onChangeText={(text) => this.onInputChange('longitudeTemp', text)}
                value={longitudeTemp}
                placeholder={'Longitude'} 
                keyboardType='numeric'
              />
            </Item>
          </View>
          <Button
            onPress={() => this.handleUseLatLngPress()}
            disabled={!latitudeTemp || !longitudeTemp}
          >
            <Text>Use Latitude and Longitude</Text>
          </Button>
        </View>
        <View style={ styles.mapContainer }>
          <MapView
            initialRegion={{
              latitude : 16.397029,
              longitude : 120.6113599,
              latitudeDelta: 0.15,
              longitudeDelta: 0.021,
            }}
            style={{ ...StyleSheet.absoluteFillObject }}
            ref={ ref => {
              this.map = ref
            }}
            onMapReady={() => this.setRegion()}
            onPress={(e) => this.onMapPress(e.nativeEvent)}
          >
            {
              latitude && longitude &&
                <Marker 
                  coordinate={{
                    latitude: parseFloat(latitude),
                    longitude: parseFloat(longitude),
                  }}
                />
            }
          </MapView>
        </View>
        <View style={{ paddingHorizontal: 16, paddingVertical: 16,  flex: 1, }}>
          <Button
            onPress={() => this.onFormSubmit()}
            block
          >
            <Text style={{ fontWeight: '700'}}>USE LOCATION</Text>
          </Button>
        </View>
      </View>
    )
  }
}