import React, { PureComponent } from 'react';

import QRCodeScanner from 'react-native-qrcode-scanner';
import { ScrollView } from 'react-native';
import { Text } from 'native-base';
import { connect } from 'react-redux';
import { Navigation } from 'react-native-navigation';

class ScanQrScreen extends PureComponent {
  onQrRead(e) {
    const { trees, navigation } = this.props;
    const id = e.data.replace('kayou-', '');

    const tree = trees.find(tree => tree.id == id);

    if (tree) {
      navigation.navigate('TreeDetailsScreen', {
        treeId: tree.id,
      })
    } else {
      navigation.navigate('NotFoundScreen')
    }
  }

  render() {
    return(
      <ScrollView style={{ flex: 1 }}>
        <QRCodeScanner 
          onRead={(e) => this.onQrRead(e)}
          bottomContent={
            <Text style={{ flex: 1, textAlign: 'center', fontSize: 16}}>
              Scan a QR by fitting the QR Code within the camera viewport. 
            </Text>
          }
          bottomViewStyle={{
            marginTop: 68,
            paddingTop: 16,
            paddingBottom: 16,
          }}
          topViewStyle={{
            flex: 0,
          }}
        />
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  trees: state.trees.trees,
})

export default connect(mapStateToProps, () => ({}))(ScanQrScreen)