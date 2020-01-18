import React from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Form from '../components/Auth';
import Logo from '../components/Logo';

const Login = () => {
  return (
    <View style={styles.container}>
      <Logo />

      <Form type="Login" />

      <View style={styles.signupTextCont}>
        <Text style={styles.signupText}>Don't have an account yet?</Text>

        <TouchableOpacity onPress={() => Actions.signup()}>
          <Text style={styles.signupButton}> Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EFD2BC',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  signupTextCont: {
    flexGrow: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingVertical: 16,
    flexDirection: 'row',
  },

  signupText: {
    color: '#BC2C3D',
    fontSize: 16,
  },

  signupButton: {
    color: '#BC2C3D',
    fontSize: 16,
    fontWeight: '500',
  },
});
