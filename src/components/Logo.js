import React from 'react';
import {View, StyleSheet, Image} from 'react-native';

const Logo = () => {
  return (
    <View style={styles.container}>
      <Image
        // eslint-disable-next-line react-native/no-inline-styles
        style={styles.image}
        source={require('../img/logo.png')}
      />
    </View>
  );
};

export default Logo;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  logoText: {
    marginVertical: 15,
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.7)',
  },

  image: {
    alignItems: 'center',
  },
});
