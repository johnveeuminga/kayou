import React, { Component } from 'react'
import { 
  View ,
  StyleSheet,
  PermissionsAndroid,
  ToastAndroid,
  Dimensions,
} from 'react-native'
import { Text } from 'native-base'
import MapView from 'react-native-maps'
import MapViewDirections from 'react-native-maps-directions'
import Geolocation from 'react-native-geolocation-service'

const GOOGLE_MAPS_KEY = 'AIzaSyBQcCL0haEzmeridZVvnFbYu-c-BWSuMVs'

const { width, height } = Dimensions.get('window');

export default class TreeDirectionsScreen extends Component {
  constructor (props) {
    super(props)

    this.state = {
      position: null,
    }
  }

  async componentDidMount () {
    const perm = await this.setUpPermissions();

    console.log("Perm: ", perm);

    if (perm) {
      this.getCurrentPosition();
    }
  }

  async setUpPermissions() {
    try {
      const perm = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
      
      if (!perm) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );

        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          ToastAndroid.show("Kayou needs permission to generate directions.", ToastAndroid.SHORT);

          return false;
        }

        return true;
      }

      return true;
    } catch(err) {
      console.log(err)

      return false;
    }
  }

  getCurrentPosition () {
    Geolocation.getCurrentPosition(
      (position) => {
        this.setState((state) => {
          return {
            ...state,
            position,
          }
        })
      },
      (error) => {
        console.log(error);
      }
    )
  }

  render () {
    const { position } = this.state;
    const tree = this.props.navigation.getParam('tree');

    console.log(tree);
    return (
      <View
        style={{ flex: 1 }}
      >
        <MapView 
          style={{...StyleSheet.absoluteFillObject }}
          ref={c => this.mapView = c}
        >
          {
            position && 
              <MapView.Marker coordinate={{
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              }} />
          }
          <MapView.Marker coordinate={tree.location} />
          {
            position && 
              <MapViewDirections
                origin={{
                  latitude: position.coords.latitude,
                  longitude: position.coords.longitude,
                }}
                destination={tree.location}
                strokeColor={"hotpink"}
                strokeWidth={4}
                apikey={GOOGLE_MAPS_KEY}
                onReady={result => {
                  console.log('Distance: ${result.distance} km')
                  console.log('Duration: ${result.duration} min.')
                  
                  this.mapView.fitToCoordinates(result.coordinates), {
                    edgePadding: {
                      right: (width / 20),
                      bottom: (height / 20),
                      left: (width / 20),
                      top: (height / 20),
                    }
                  };
                }}
              />
          }
        </MapView>
      </View>
    )
  }
}