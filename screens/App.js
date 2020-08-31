import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView from 'react-native-maps'
import * as Permissions from 'expo-permissions'
import * as Location from 'expo-location'

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      region: null,
    }
  this._getLocationAsync();
  }


  _getLocationAsync = async () => {
    let {status} = await Permissions.askAsync(Permissions.LOCATION);
      if(status !== 'granted')
        console.log('Permission to access location was denied.');
    let location = await Location.getCurrentPositionAsync({enableHighAccuracy: true});
    
    let region={
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.0045,
      longitudeDelta: 0.0045,
    }
    this.setState({ region: region })
  }
  render() {
    return (
      <View style={styles.container}>
       <MapView
          initialRegion ={this.state.region}
          showsUserLocation={true} 
          showsMyLocationButton={true}
          showCompass={true}
          rotateEnabled={false}
          style={{flex: 1}}
        />        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});