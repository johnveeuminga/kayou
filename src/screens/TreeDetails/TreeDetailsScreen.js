import React, { Component } from 'react';
import _ from 'lodash';
import { 
  View,
  ScrollView,
  StyleSheet,
  Image,
} from 'react-native';
import { Container, H2, Text, Button, H3 } from 'native-base';
import MapView, { Marker } from 'react-native-maps';
import { Navigation } from 'react-native-navigation';
import material from '../../../native-base-theme/variables/material';
import { TREE_DETAILS_QR_SCREEN, TREE_DETAILS_SCREEN } from '../../navigation/Screens';
import { connect } from 'react-redux';

const styles = StyleSheet.create({
  wrapper: {
    padding: 15,
  }
});

class TreeDetails extends Component {
  constructor(props) {
    super(props);

    const { trees, navigation } = this.props;
    const treeId = navigation.getParam('treeId');

    this.tree = trees.find(tree => tree.id == treeId);
  }

  
  getMarker (status) {
    if (status === 0 || status.toLowerCase() === 'alive') {
      return require('src/assets/img/marker-green.png')
    } else if (status.toLowerCase() === 'sick') {
      return require('src/assets/img/marker-yellow.png');
    }

    return require('src/assets/img/marker-red.png')
  }


  goToQRScreen () {
    const { navigation } = this.props;
    const { tree } = this;

    navigation.navigate('TreeDetailsQRScreen', {
      tree,
    });
  }

  goToDirectionsScreen () {
    const { navigation } = this.props;
    const { tree } = this;

    navigation.navigate('TreeDirectionsScreen', {
      tree
    });
  }
  
  render () {
    const { tree = {} } = this;

    const Details = ({label, value}) => (
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          marginBottom: 10,
          flexWrap: 'wrap'
        }}
      >
        <Text style={{ fontWeight: '700', marginRight: 4, marginBottom: 4, textTransform: 'uppercase', letterSpacing: .4, fontSize: 14, width: '100%'}}>{label}</Text>
        <Text>{value}</Text>
      </View>
    )

    return (
      <ScrollView>
        <View
          style={styles.wrapper}
        >
          <H3
            style={{ 
              fontWeight: '700',
              color: material.brandPrimary,
              marginBottom: 16,
              textTransform: 'uppercase',
              letterSpacing: 1,
            }}
          >
            {`Tree #${tree.id}`}
          </H3>
          <Details 
            label='Age: '
            value={`${tree.age} years old`}
          />
          <Details 
            label='Specie: '
            value={`${tree.specie}`}
          />
          <Details 
            label='Diameter at breast height: '
            value={`${tree.dbh} meters`}
          />
          <Details 
            label='Category: '
            value={ _.startCase(tree.category) }
          />
          <Details 
            label='Status: '
            value={ _.startCase(tree.status) }
          />
          {
            ['Sick', 'Dead'].indexOf(tree.status) !== -1 &&
              <Details 
                label='Cause: '
                value={ _.startCase(tree.cause) }
              />
          }
          {
            tree.status === 'Sick' && tree.actions && 
            <Details 
                label='Actions to be taken: '
                value={ _.startCase(tree.actions) }
              /> 
          }
        </View>
          <View
            style={{
              height: 300,
              width: '100%',
              position: 'relative',
              marginBottom: 16,
            }}
          >
          <MapView
            style={{
              ...StyleSheet.absoluteFillObject,
            }}
            initialRegion={{
              latitude: tree.location.latitude,
              longitude: tree.location.longitude,
              latitudeDelta: 0.00041843923979101305,
              longitudeDelta: 0.0003275647759437561,
            }}
          >
            <Marker
              coordinate={{
                latitude: tree.location.latitude,
                longitude: tree.location.longitude,
              }}
            >
              <Image source={this.getMarker(tree.status)} style={{ width: 30, height: 39 }}/>
            </Marker>
          </MapView>
        </View>
        <View
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 16,
            paddingTop: 0,
          }}
        >
          <Button 
            onPress={ () => this.goToQRScreen() }
            primary
            block
          >
            <Text>View QR Code</Text>
          </Button>
        </View>
        <View
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 16,
            paddingTop: 0,
          }}
        >
          <Button 
            onPress={ () => this.goToDirectionsScreen() }
            primary
            block
          >
            <Text>Get Directions</Text>
          </Button>
        </View>
      </ScrollView>
    )
  }
}

const mapStateToProps = state => ({
  trees: state.trees.trees,
});

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(TreeDetails);
