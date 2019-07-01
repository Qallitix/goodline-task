'use strict';
import React, { Component } from 'react';
import GridScreen from './GridScreen';
import PhotoScreen from './PhotoScreen';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import{
  AppRegistry,
  Image,
  ListView,
  StyleSheet,
  Text,
  View,
  BackHandler,
} from 'react-native';

const AppNavigator = createStackNavigator({
  Grid: {
    screen: GridScreen,
  },
  Photo: {
      screen: PhotoScreen,
    },
}, {
    initialRouteName: 'Grid',
});

const AppContainer = createAppContainer(AppNavigator);

export default class GoodlineTask extends Component{
  render() {
    return (
      <AppContainer/>
 );
  }
};

AppRegistry.registerComponent('GoodlineTask', () => GoodlineTask);