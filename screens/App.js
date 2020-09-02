import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView, {Marker} from 'react-native-maps'
import * as Permissions from 'expo-permissions'
import * as Location from 'expo-location'

import { CurrentLocationButton } from './../components/CurrentLocationButton'

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      region: null,
      markers: []
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

  centerMap() {
    const { 
      latitude, 
      longitude, 
      latitudeDelta, 
      longitudeDelta } = this.state.region;

    this.map.animateToRegion({
      latitude,
      longitude,
      latitudeDelta,
      longitudeDelta
    })
  }
  onMapPress(e) {
    alert("coordinates:" + JSON.stringify(e.nativeEvent.coordinate));
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView            
          initialRegion ={this.state.region}
          region={this.state.region}
          showsUserLocation={true} 
          showCompass={true}
          ref={(map) => {this.map = map}}
          rotateEnabled={false}
          style={{flex: 1}}
          onPress={(e) => this.setState({ markers: [...this.state.markers, { latlng: e.nativeEvent.coordinate }]})
          }>
          {
            this.state.markers.map((marker, i) => (
                <MapView.Marker key={i} coordinate={marker.latlng} />
            ))
          }
        </MapView>     
        <CurrentLocationButton cb={() => { this.centerMap() }} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});