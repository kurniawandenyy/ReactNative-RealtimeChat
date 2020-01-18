import React from 'react';

import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Form from '../components/Auth';
import {Actions} from 'react-native-router-flux';
import Logo from '../components/Logo';
// import {ScrollView} from 'react-native-gesture-handler';

const goBack = () => {
  Actions.login();
};

const Register = () => {
  return (
    <View style={styles.container}>
      {/* <ScrollView showsVerticalScrollIndicator={false}> */}
      <Logo />
      <Form type="Sign Up" />
      <View style={styles.signupTextCont}>
        <Text style={styles.signupText}>Already have an account?</Text>

        <TouchableOpacity onPress={goBack}>
          <Text style={styles.signupButton}> Sign in</Text>
        </TouchableOpacity>
      </View>
      {/* </ScrollView> */}
    </View>
  );
};

export default Register;

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
