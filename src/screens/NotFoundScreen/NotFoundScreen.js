import React, { PureComponent } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Text } from 'native-base';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
})

export default class NotFoundScreen extends PureComponent {
  render () {
    return (
      <View style={styles.wrapper}>
        <Image 
          source={require('assets/img/404.png')}
          style={{width: 256, height: 256, marginBottom: 16}}
        />
        <Text style={{ fontSize: 17 }}>Sorry the page you're looking for doesn't exist.</Text>
      </View>
    )
  }
}