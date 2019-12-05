import React, { PureComponent } from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import MapView from 'react-native-maps'
import { Item, Input, Text, Picker, Button, Textarea } from 'native-base';
import material from '../../../native-base-theme/variables/material';
import { connect } from 'react-redux';
import { ADD_TREE } from '../../constants/action-types';

const styles = StyleSheet.create({
  label: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: '#333',
    paddingBottom: 8,
    fontSize: 12,
  },
  formWrapper: {
    paddingTop: 16,
  },
  item: {
    marginBottom: 15,
  },
  mapWrapper: {
    position: 'relative',
    minHeight: 250,
    height: 250,
    width: '100%',
    marginBottom: 8,
  },
  locationLabel: {
    display: "flex",
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "space-between",
    paddingBottom: 8,
  },
  editLocationButton: {
    paddingTop: 0,
    paddingBottom: 8,
  }
});

class AddTreeForm extends PureComponent {
  map = null;

  constructor(props) {
    super(props);

    this.state = {
      form: {
        stemQuality: '0',
        status: 'Alive',
        category: 'Natural',
        cause: 'Infestation',
      }
    }
  }

  async onFormSubmit () {
    const { location } = this.props;
    const userId = this.props.user.id

    const tree = {
      ...this.state.form,
      userId,
      location,
    }

    await this.props.addTree(tree);
    this.props.onFormProcessed(this.props.recentlyAddedId);
  }

  onEditLocationPressed () {
    this.props.onEditLocationPressed();
  }

  handleInputChange(key, val) {
    this.setState(state => {
      return {
        ...state,
        form: {
          ...state.form,
          [key]: val,
        }
      }
    })
  }

  render() {
    const Label = ({text}) => (
      <Text style={styles.label}>{ text }</Text>
    )

    const { location } = this.props;
    const { form } = this.state;

    const { 
      specie,
      dbh,
      mh,
      th,
      volume,
      status,
      category,
      cause,
      stemQuality,
      actions,
    } = form;

    const isValid = form.category !== null && form.specie && form.status !== null && form.dbh && location;

    return (
      <View style={styles.formWrapper}>
        <Label text='Specie'/>
        <Item
          style={styles.item}
          regular
          picker
        >
          <Picker
            mode='dropdown'
            style={{ width: undefined }}
            placeholder={"Specie"}
            selectedValue={specie}
            onValueChange={(val) => this.handleInputChange('specie', val)}
          >
            <Picker.Item label='Select a specie' value={''} color={'#575757'}/>
            <Picker.Item label='Benguet Pine' value={'Benguet Pine'}/>
          </Picker>
        </Item>
        <Label text='Diameter at breast height' />
        <Item 
          style={styles.item}
          regular
        >
          <Input
            value={dbh}
            onChangeText={(text) => this.handleInputChange('dbh', text)} 
            placeholder={'Diameter at breast height(in centimeters)'}
            keyboardType={'numeric'}
          />
        </Item>
        <Label text='Tree Category' />
        <Item
          style={styles.item}
          regular
          picker
        >
          <Picker
            mode='dropdown'
            style={{ width: undefined }}
            selectedValue={category || 0}
            onValueChange={(val) => this.handleInputChange('category', val)}
          >
            <Picker.Item label='Planted' value={'Planted'}/>
            <Picker.Item label='Natural' value={'Natural'}/>
          </Picker>
        </Item>
        <Label text='Status' />
        <Item
          style={styles.item}
          regular
          picker
        >
          <Picker
            mode='dropdown'
            style={{ width: undefined }}
            selectedValue={status}
            onValueChange={(val) => this.handleInputChange('status', val)}
          >
            <Picker.Item label='Alive' value={'Alive'}/>
            <Picker.Item label='Sick' value={'Sick'}/>
            <Picker.Item label='Dead' value={'Dead'}/>
          </Picker>
        </Item>
        {
          status === 'Sick' && 
          <View>
            <Label text='Cause' />
            <Item
              style={styles.item}
              regular
              picker
            >
              <Picker
                mode='dropdown'
                style={{ width: undefined }}
                selectedValue={cause}
                onValueChange={(val) => this.handleInputChange('cause', val)}
              >
                <Picker.Item label='Infestation' value={'Infestation'}/>
                <Picker.Item label='Man-made cause' value={'Man-made cause'}/>
              </Picker>
            </Item>
            <Label text='Actions to be taken' />
            <Textarea 
              rowSpan={5} 
              style={{ marginBottom: 15 }} 
              bordered 
              value={actions}
              onChangeText={(text) => this.handleInputChange('actions', text)} 
              placeholder={'Actions to be taken'}>
            </Textarea>
          </View>
        }
        {
          status === 'Dead' && 
          <View>
            <Label text='Cause' />
            <Item
              style={styles.item}
              regular
              picker
            >
              <Picker
                mode='dropdown'
                style={{ width: undefined }}
                selectedValue={cause}
                onValueChange={(val) => this.handleInputChange('cause', val)}
              >
                <Picker.Item label='Infestation' value={'Infestation'}/>
                <Picker.Item label='Man-made cause' value={'Man-made cause'}/>
                <Picker.Item label='Natural calamity' value={'Natural calamity'}/>
              </Picker>
            </Item>
          </View>
        }
        <View style={ styles.locationLabel }>
          <Label text='Location' />
          <TouchableWithoutFeedback
            style={ styles.editLocationButton }
            block={ false }
            onPress={() => this.onEditLocationPressed()}
          >
            <Text style={{ color: material.brandPrimary, textTransform: 'uppercase', letterSpacing: .2, fontWeight: '700', fontSize: 14 }}>Edit</Text>
          </TouchableWithoutFeedback>
        </View>
        <View style={ styles.mapWrapper }>
          <MapView 
            style={{ ...StyleSheet.absoluteFillObject }}
            initialRegion={{
              latitude: 16.399374973054897,
              latitudeDelta: 0,
              longitude: 120.61284525319934,
              longitudeDelta: 0.
            }}
            ref={ ref => {
              this.map = ref;
            }}
            onMapReady={ () => {
              this.map.fitToCoordinates([{
                latitude: 16.4144431,
                longitude: 120.6212997
              }, {
                latitude: 16.3843072,
                longitude: 120.6043911
              }]);
            }}
          >
            {this.props.location &&
              <MapView.Marker
                coordinate={{...this.props.location}}
              />
            }
          </MapView>
        </View>
        <View style={{ marginBottom: 32 }}>
          <Button 
            block
            onPress={() => this.onFormSubmit()}
            disabled={!isValid}
          >
            <Text style={{ fontWeight: '700', }}>Submit</Text>
          </Button>
        </View>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  recentlyAddedId: state.trees.recentlyAddedId,
  user: state.user.user,
})

const mapDispatchToProps = dispatch => ({
  addTree: (tree) => dispatch({type: ADD_TREE, tree}),
});

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(AddTreeForm);
