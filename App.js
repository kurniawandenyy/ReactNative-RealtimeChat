import React, {Component} from 'react';
import {Platform, StyleSheet, View, StatusBar, Image} from 'react-native';
import Routes from './src/Routes';
import {DoubleBounce} from 'react-native-loader';
import {MenuProvider} from 'react-native-popup-menu';

console.disableYellowBox = true;
class App extends Component {
  constructor() {
    super();
    this.state = {
      isVisible: true,
    };
  }

  Hide_Splash_Screen = () => {
    this.setState({
      isVisible: false,
    });
  };

  componentDidMount() {
    var that = this;
    setTimeout(function() {
      that.Hide_Splash_Screen();
    }, 5000);
  }

  render() {
    let Splash_Screen = (
      <View style={styles.SplashScreen_RootView}>
        <View style={styles.SplashScreen_ChildView}>
          {/* Put all your components Image and Text here inside Child view which you want to show in Splash Screen. */}
          <Image
            source={require('./src/img/logo.png')}
            // eslint-disable-next-line react-native/no-inline-styles
            style={styles.image}
          />
        </View>
        <View style={styles.loader}>
          <DoubleBounce size={20} color="#BC2C3D" />
        </View>
      </View>
    );
    return (
      <>
        {this.state.isVisible === true ? (
          <View style={styles.MainContainer}>
            <StatusBar backgroundColor="#1c313a" barStyle="light-content" />
            {Splash_Screen}
          </View>
        ) : (
          <Routes />
        )}
      </>
    );
  }
}

export const Apps = () => (
  <MenuProvider>
    <App />
  </MenuProvider>
);

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
  },

  SplashScreen_RootView: {
    justifyContent: 'center',
    flex: 1,
    margin: 10,
    position: 'absolute',
    width: '120%',
    height: '120%',
  },

  SplashScreen_ChildView: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#EFD2BC',
    // flex: 3,
  },

  image: {
    width: '50%',
    height: '80%',
    resizeMode: 'contain',
  },

  loader: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#EFD2BC',
    // marginTop: 30,
  },
});
