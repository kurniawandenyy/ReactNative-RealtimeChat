import React, {Component} from 'react';
import Fire from '../config/Fire';
import * as firebase from 'firebase';
import {StyleSheet, PermissionsAndroid, Dimensions} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import mapStyle from '../config/RetroMapStyles.json';

const {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default class Maps extends Component {
  constructor() {
    super();
    this.state = {
      mapRegion: null,
      latitude: 0,
      longitude: 0,
      userList: [],
      uid: null,
    };
  }

  componentDidMount = async () => {
    await this.getUser();
    await this.getLocation();
  };

  getUser = async () => {
    const uid = await Fire.shared.uid;
    this.setState({uid});
    firebase
      .database()
      .ref('/user')
      .on('child_added', result => {
        let dataUser = result.val();
        if (dataUser !== null && result.key !== uid) {
          this.setState(prevDataUser => {
            return {userList: [...prevDataUser.userList, dataUser]};
          });
        }
      });
  };

  hasLocationPermission = async () => {
    const granted = PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: "Let'sChat Location Permission",
        message: "Let'sChat App needs access to your location",
      },
    );
    if (granted) {
      return true;
    }
    return false;
  };

  getLocation = async () => {
    const hasLocationPermission = await this.hasLocationPermission();
    if (!hasLocationPermission) {
      return;
    }
    this.setState(() => {
      Geolocation.getCurrentPosition(
        position => {
          let region = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.00922,
            longitudeDelta: 0.00421 * 1.5,
          };
          this.setState({
            mapRegion: region,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            loading: false,
          });
        },
        error => {
          this.setState({errorMessage: error});
        },
        {
          enableHighAccuracy: true,
          timeout: 8000,
          maximumAge: 8000,
          distanceFilter: 50,
          forceRequestLocation: true,
        },
      );
    });
  };

  render() {
    return (
      <>
        <MapView
          style={styles.map}
          showsMyLocationButton={true}
          showsIndoorLevelPicker={true}
          showsUserLocation={true}
          showsCompass={true}
          customMapStyle={mapStyle}
          toolbarEnabled={true}
          showsTraffic={true}
          zoomControlEnabled={true}
          zoomEnabled={true}
          region={this.state.mapRegion}
          initialRegion={{
            latitude: -6.2261391,
            longitude: 106.8517583,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}>
          {this.state.userList.map(item => {
            return (
              <Marker
                key={item.name}
                title={item.name}
                description={item.email}
                coordinate={{
                  latitude: item.latitude || 0,
                  longitude: item.longitude || 0,
                }}
              />
            );
          })}
        </MapView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
