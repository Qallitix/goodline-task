'use strict';
import React, { Component } from 'react';
import{
  Image,
    ScrollView,
    StyleSheet,
    Text,
    View,
    Dimensions,
} from 'react-native';

var device_width = Dimensions.get('window').width;
var device_height = Dimensions.get('window').height;

export default class PhotoScreen extends Component{
  render() {
    return (
      <View style={styles.contentContainer}>
        <Image
          source={{uri: this.props.navigation.state.params.photo}}
          style={styles.detailsImage}
        />
      </View>
    );
  }
};

var styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 5,
    overflow: 'hidden',
    backgroundColor: '#ddd',
  },
  detailsImage: {
    flex: 1,
    alignSelf: 'stretch',
  },
});