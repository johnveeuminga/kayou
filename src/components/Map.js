import _ from 'lodash';
import React, { Component } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Text, H2, H3, Button } from 'native-base';
import Geocoder from 'src/modules/Geocoder';

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  overview: {
    flex: 1,
    width: '100%',
    maxWidth: '90%',
    zIndex: 100,
    paddingHorizontal: 15,
    paddingVertical: 20,
    backgroundColor: '#ffffff',
    borderRadius: 10,
  },
  overviewWrapper: {
    position: 'absolute',
    bottom: 15,
    left: 0,
    right: 0,
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overviewTitle: {
    marginBottom: 12,
    fontWeight: '700',
    color: '#42723F',
  },
  overviewRow: {
    marginBottom: 4,
    display: 'flex',
    flexDirection: 'row',
  },
  overviewLabel: {
    fontWeight: '700',
    marginRight: 5,
  }
})

export default class Map extends Component {
  constructor (props) {
    super(props);

    this.state = {
      selectedMarker: null,
      selectedMarkerParsedLocation: null,
      isFetchingLocationDetails: false,
    }
  }

  setRegion () {
  }

  getMarker (status) {
    if (status === 0 || status.toLowerCase() === 'alive') {
      return require('src/assets/img/marker-green.png')
    } else if (status.toLowerCase() === 'sick') {
      return require('src/assets/img/marker-yellow.png');
    }

    return require('src/assets/img/marker-red.png')
  }

  setSelectedMarker (tree) {
    const { disableMarkerEvents = false } = this.props
    if(!disableMarkerEvents) {
      this.geocodeLocation(tree.location);
      this.setState((state) => {
        return {
          ...state,
          selectedMarker: tree,
        }
      })
    }
  }

  async onMapPress () {
    this.map.getCamera()
      .then(res => {
        console.log('This is the result: ', res)
      })
    this.setState((state) => {
      return {
        ...state,
        selectedMarker: null,
      }
    })
  }

  onViewMorePress (tree) {
    this.props.onViewMorePress(tree);
  }

  onRegionChangeComplete(region) {
    // PolyUtil.testMethod(region.latitude, region.longitude);
  }

  async geocodeLocation(location) {
    this.setState((state) => {
      return {
        ...this.state,
        selectedMarkerParsedLocation: '',
        isFetchingLocationDetails: true,
      }
    })
    const res = await Geocoder.geocodeFromLocation(location.latitude, location.longitude);

    const parsedLocation = this.parseAddressLine(res.addressLine);

    this.setState((state) => {
      return {
        ...state,
        selectedMarkerParsedLocation: parsedLocation,
        isFetchingLocationDetails: false,
      }
    })
  }

  parseAddressLine(addressLine) {
    if (addressLine.toLowerCase().includes('camp john hay')) {
      return 'Camp John Hay'
    }

    return addressLine
  }

  render () {
    const { selectedMarker, selectedMarkerParsedLocation, isFetchingLocationDetails } = this.state;
    const { trees = [], mapStyle} = this.props; 

    return (
      <View
        style={styles.map}
      >
        <MapView
          style={styles.map}
          initialRegion={{
            latitude : 16.403717363904057,
            longitude : 120.60874113813043,
            latitudeDelta: 0.00041843923979101305,
            longitudeDelta: 0.0003275647759437561,
          }}
          ref={ ref => {
            this.map = ref
          }}
          onRegionChangeComplete={(region) => this.onRegionChangeComplete(region)}
          onMapReady={() => this.setRegion()}
          onPress={() => this.onMapPress()}
          mapType={mapStyle}
        >
          {
            trees.map(tree => (
              <Marker 
                key={tree.id}
                coordinate={tree.location}
                onPress={() => this.setSelectedMarker(tree)}
              >
                <Image source={this.getMarker(tree.status)} style={{ width: 30, height: 39 }}/>
              </Marker>
            ))
          }
          {
            this.props.children
          }
        </MapView>
        {
          selectedMarker &&
            <View
              style={styles.overviewWrapper}
            >
              <View
                style={styles.overview}
              >
                <H3 style={styles.overviewTitle}>{ `Tree #${selectedMarker.id}` }</H3>
                <View style={styles.overviewRow}>
                  <Text style={styles.overviewLabel}>Status: </Text><Text>{_.startCase(selectedMarker.status)}</Text>
                </View>
                {
                  ['Sick', 'Dead'].indexOf(selectedMarker.status) !== -1 &&
                    <View style={styles.overviewRow}>
                      <Text style={styles.overviewLabel}>Cause: </Text><Text>{_.startCase(selectedMarker.cause)}</Text>
                    </View>
                }
                <View style={styles.overviewRow}>
                  <Text style={styles.overviewLabel}>Category: </Text><Text>{_.startCase(selectedMarker.category)}</Text>
                </View>
                <View style={styles.overviewRow}>
                  <Text style={styles.overviewLabel}>Location: </Text><Text>{ isFetchingLocationDetails ? 'Fetching location...' : _.startCase(selectedMarkerParsedLocation)}</Text>
                </View>
                <Button 
                  style={{ marginTop: 10, }}
                  onPress={() => this.onViewMorePress(selectedMarker)}
                  primary 
                  block
                >
                  <Text>Learn More</Text>
                </Button>
              </View>
            </View>
        }
      </View>
    )
  }
}
