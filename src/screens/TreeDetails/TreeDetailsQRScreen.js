import React from 'react';
import { 
  View,
  ToastAndroid,
  PermissionsAndroid
} from 'react-native'
import RNFetchBlob from 'rn-fetch-blob'
import RNFS from 'react-native-fs';
import QRCode from 'react-native-qrcode-svg';
import { 
  H2 ,
  Button,
  Text,
} from 'native-base';
import ViewShot from "react-native-view-shot";
import material from '../../../native-base-theme/variables/material';
import AsyncStorage from '@react-native-community/async-storage';

function TreeDetailsQRScreen ({ navigation }) {
  let viewRef = null;
  const tree = navigation.getParam('tree'); 
  const dirs = RNFetchBlob.fs.dirs;

  const requestStoragePermission = async () => {
    try {
      const permRaw = await AsyncStorage.getItem('@kayou_write_perm');
      let perm = JSON.parse(permRaw);

      if (!perm) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Kayou Storage Permission',
            message:
              'Kayou needs access to be able to write to your storage',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        )

        
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          perm = true;
        } else {
          perm = false;
        }

        await AsyncStorage.setItem('@kayou_write_perm', JSON.stringify(perm));
      }

      return perm
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  const saveQRCode = async () => {
    const perm = await requestStoragePermission();

    console.log(perm);
    if (!perm) {
      ToastAndroid.show(`Kayou needs write permissions to save the QR image.`, ToastAndroid.SHORT);

      return
    }
    const filename = `kayou-${tree.id}.jpg`
    const filepath = `${dirs.PictureDir}/${filename}`

    viewRef.capture()
      .then((data) => {
        RNFS.writeFile(filepath, data, 'base64')
          .then((success) => {
            RNFS.scanFile(filepath);
            ToastAndroid.show(`QR code saved to gallery.`, ToastAndroid.SHORT)
          })
      });
  }

  return (
    <View 
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <ViewShot
        ref={(ref) => viewRef = ref}
        options={{
          result: 'base64'
        }}
        style={{ paddingTop: 24, paddingBottom: 24, paddingLeft: 16, paddingRight: 16, backgroundColor: '#ffffff'}}
      >
        <H2
          style={{ 
            fontWeight: '700',
            color: material.brandPrimary,
            marginBottom: 24,
            textTransform: 'uppercase',
            letterSpacing: 1,
            textAlign: 'center',
          }}
        >
          {`Kayou Tree #${tree.id}`}
        </H2>
        <QRCode
          value={`kayou-${tree.id || 1}`}
          size={320}
          getRef={(ref) => svg = ref}
        />
      </ViewShot>
      <View
        style={{
          paddingLeft: 16,
          paddingRight: 16,
          paddingTop: 32,
          width: '100%',
        }}
      >
        <Button 
          primary 
          block
          onPress={() => saveQRCode()}
        >
          <Text style={{ fontWeight: '700'}}>Save QR Code</Text>
        </Button>
      </View>
    </View>
  )
}

export default TreeDetailsQRScreen;