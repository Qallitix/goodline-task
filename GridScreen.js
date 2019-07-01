'use strict';
import React, { Component } from 'react';
import {
  FlatList,
  Platform,
  StyleSheet,
  Text,
  View,
  Alert,
  Image,
  Button,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';


var ACCESS_KEY = '74e3629f83cbb39d0731ba7f0ed4492d9e9f1bb5cb382c9da1d7435837ea06bc';
var API_URL = 'https://api.unsplash.com/photos';
var PER_PAGE = '10';
var PARAMS = '?client_id=' + ACCESS_KEY + '&per_page=' + PER_PAGE;
var REQUEST_URL = API_URL + PARAMS;
var device_width = Dimensions.get('window').width;
var device_height = Dimensions.get('window').height;

export default class GridScreen extends Component{

    state = {
    isLoading: false,
    isLoadingTail: false,
    currentScreenWidth: device_width,
    currentScreenHeight: device_height,
    viewHeight: 200,
    currentPage: 1,
    maxPage: 10,
    minPage: 1,
    };

static navigationOptions = ({ navigation }) => {
    return {
      headerRight: (
        <Button
          onPress={navigation.getParam('increasePage')}
          title="NextPage"
          color="#046"
        />
      ),
      headerLeft: (
              <Button
                onPress={navigation.getParam('decreasePage')}
                title="PrevPage"
                color="#046"
              />
      ),
    };
  };

_increasePage = () => {
    if (this.state.currentPage === this.state.maxPage){
        return
    }
    this.setState ({
        currentPage: this.state.currentPage + 1
    }, function() {
       isLoading: true,
       this.webCall();
    });
}

_decreasePage = () => {
    if (this.state.currentPage === this.state.minPage){
        return
    }
    this.setState ({
        currentPage: this.state.currentPage - 1
    }, function() {
       isLoading: true,
       this.webCall();
    });
}

urlForFetch = () =>{
    return(REQUEST_URL + '&page=' + this.state.currentPage);
}

 FlatListItemSeparator = () => {
   return (
     <View
       style={{
         height: 1,
         width: "100%",
         backgroundColor: "#000",
       }}
     />
   );
 }

 webCall=()=>{

  return fetch(this.urlForFetch())
         .then((response) => response.json())
         .then((responseJson) => {
           this.setState({
             isLoading: false,
             dataSource: responseJson
           }, function() {
           //
           });
         })
         .catch((error) => {
           console.error(error);
         });

 }

 componentDidMount(){
    this.props.navigation.setParams({ increasePage: this._increasePage });
    this.props.navigation.setParams({ decreasePage: this._decreasePage });
    this.webCall();

 }

_selectPhoto(photoUrl){
    const { navigate } = this.props.navigation;
    navigate('Photo', { photo: photoUrl });

}

 render() {

   if (this.state.isLoading) {
     return (

      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>

         <ActivityIndicator size="large" />

       </View>

     );

   }

   return (
   <View style={styles.mainContainer}>
       <FlatList
            data={ this.state.dataSource }
            numColumns={2}
            ItemSeparatorComponent = {this.FlatListItemSeparator}
            renderItem={({item}) =>
            <TouchableWithoutFeedback onPress = {this._selectPhoto.bind(this, item.urls.raw)}>
                <View style={{flex:1, flexDirection: 'column'}}>
                      <Image source = {{ uri: item.urls.raw }} style={styles.imageView} />
                </View>
            </TouchableWithoutFeedback>
              }
            keyExtractor={(item, index) => index.toString()}
            extraData={this.state}
        />
   </View>
   );
 }
}

const styles = StyleSheet.create({

mainContainer :{

    justifyContent: 'center',
    flex:1,
    margin: 5,
},

imageView: {

    width: '98%',
    height: device_height*0.2 ,
    margin: 1,
    borderRadius : 7

}

});