import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  PermissionsAndroid,
} from 'react-native';
import AwesomeAlerts from 'react-native-awesome-alerts';
import {Actions} from 'react-native-router-flux';
import firebase from '../config/Fire';
import * as Yup from 'yup';
import {Formik} from 'formik';
import {Bubbles} from 'react-native-loader';
import Geolocation from 'react-native-geolocation-service';

class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: this.props.type,
      showAlert: false,
      message: '',
      color: '',
      title: '',
      isLoading: false,
    };
  }

  componentDidMount() {
    this.state.type === 'Sign Up' && this.getLocation();
  }

  LocationPermission = async () => {
    const granted = PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: `Let's Chat Location Permission`,
        message: `Let's Chat App needs access to your location`,
      },
    );
    if (granted) {
      return true;
    }
    return false;
  };

  getLocation = async () => {
    const hasLocationPermission = await this.LocationPermission();
    if (!hasLocationPermission) {
      return;
    }

    this.setState(() => {
      Geolocation.getCurrentPosition(
        position => {
          this.setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
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

  onRegister = async values => {
    this.setState({isLoading: true});
    firebase.shared
      .onRegister(values)
      .then(res => {
        this.setState({
          title: 'Register Success',
          message: 'Your account was successfully created',
          showAlert: true,
          color: '#29B6F6',
          isLoading: false,
        });
        const latitude = this.state.latitude || '';
        const longitude = this.state.longitude || null;
        firebase.shared.addUserData(values, latitude, longitude);
      })
      .catch(err => {
        console.log(err);
        this.setState({
          showAlert: true,
          color: '#E53935',
          title: 'Register Failed',
          message: err.message,
          isLoading: false,
        });
      });
  };

  onLogin = values => {
    this.setState({isLoading: true});
    firebase.shared
      .onLogin(values)
      .then(res => {
        this.setState({
          title: 'Login Success',
          message: '',
          showAlert: true,
          color: '#29B6F6',
          isLoading: false,
        });
      })
      .catch(err => {
        this.setState({
          showAlert: true,
          title: 'Login Failed!',
          message: err.message,
          color: '#E53935',
          isLoading: false,
        });
      });
  };

  showAlert = () => {
    this.setState({
      showAlert: true,
    });
  };

  hideAlert = () => {
    this.setState({
      showAlert: false,
    });
  };

  render() {
    const {showAlert, message, color, title, isLoading, type} = this.state;
    return (
      <View style={styles.container}>
        {isLoading ? (
          <View style={styles.loader}>
            <Text style={styles.loadingText}>Please Wait...</Text>
            <Bubbles size={15} color="#BC2C3D" />
          </View>
        ) : type === 'Login' ? (
          [
            <Formik
              initialValues={{
                email: '',
                password: '',
              }}
              onSubmit={values => this.onLogin(values)}
              validationSchema={Yup.object().shape({
                email: Yup.string()
                  .label('email')
                  .email('Enter a valid email')
                  .required('Please enter an email'),
                password: Yup.string()
                  .label('password')
                  .required()
                  .min(6, 'Password must have more than 6 characters '),
              })}>
              {({
                values,
                handleChange,
                errors,
                setFieldTouched,
                touched,
                handleSubmit,
              }) => (
                <>
                  <TextInput
                    style={styles.inputBox}
                    underlineColorAndroid="rgba(0,0,0,0)"
                    placeholder="Email"
                    placeholderTextColor="#9e9e9e"
                    selectionColor="#fff"
                    value={values.email}
                    onChangeText={handleChange('email')}
                    onBlur={() => setFieldTouched('email')}
                  />
                  {touched.email && errors.email && (
                    <Text style={styles.textError}>{errors.email}</Text>
                  )}
                  <TextInput
                    style={styles.inputBox}
                    underlineColorAndroid="rgba(0,0,0,0)"
                    placeholder="Password"
                    value={values.password}
                    onChangeText={handleChange('password')}
                    onBlur={() => setFieldTouched('password')}
                    secureTextEntry={true}
                    placeholderTextColor="#9e9e9e"
                  />
                  {touched.password && errors.password && (
                    <Text style={styles.textError}>{errors.password}</Text>
                  )}
                  <TouchableOpacity
                    style={styles.button}
                    onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Sign In</Text>
                  </TouchableOpacity>
                </>
              )}
            </Formik>,
          ]
        ) : (
          [
            <Formik
              initialValues={{
                email: '',
                password: '',
                confirmPassword: '',
              }}
              onSubmit={values => this.onRegister(values)}
              validationSchema={Yup.object().shape({
                name: Yup.string()
                  .label('name')
                  .required(),
                email: Yup.string()
                  .label('email')
                  .email('Enter a valid email')
                  .required('Please enter an email'),
                password: Yup.string()
                  .label('password')
                  .required()
                  .min(6, 'Password must have more than 6 characters '),
                confirmPassword: Yup.string()
                  .required()
                  .label('Confirm password')
                  .test('passwords-match', 'Passwords must match ', function(
                    value,
                  ) {
                    return this.parent.password === value;
                  }),
              })}>
              {({
                values,
                handleChange,
                errors,
                setFieldTouched,
                touched,
                handleSubmit,
              }) => (
                <>
                  <TextInput
                    style={styles.inputBox}
                    underlineColorAndroid="rgba(0,0,0,0)"
                    placeholder="Name"
                    placeholderTextColor="#9e9e9e"
                    selectionColor="#fff"
                    value={values.name}
                    onChangeText={handleChange('name')}
                    onBlur={() => setFieldTouched('name')}
                  />
                  {touched.name && errors.name && (
                    <Text style={styles.textError}>{errors.name}</Text>
                  )}
                  <TextInput
                    style={styles.inputBox}
                    underlineColorAndroid="rgba(0,0,0,0)"
                    placeholder="Email"
                    placeholderTextColor="#9e9e9e"
                    selectionColor="#fff"
                    value={values.email}
                    onChangeText={handleChange('email')}
                    onBlur={() => setFieldTouched('email')}
                  />
                  {touched.email && errors.email && (
                    <Text style={styles.textError}>{errors.email}</Text>
                  )}
                  <TextInput
                    style={styles.inputBox}
                    underlineColorAndroid="rgba(0,0,0,0)"
                    placeholder="Password"
                    value={values.password}
                    onChangeText={handleChange('password')}
                    onBlur={() => setFieldTouched('password')}
                    secureTextEntry={true}
                    placeholderTextColor="#9e9e9e"
                  />
                  {touched.password && errors.password && (
                    <Text style={styles.textError}>{errors.password}</Text>
                  )}
                  <TextInput
                    style={styles.inputBox}
                    underlineColorAndroid="rgba(0,0,0,0)"
                    placeholder="Confirm Password"
                    value={values.confirmPassword}
                    onChangeText={handleChange('confirmPassword')}
                    onBlur={() => setFieldTouched('confirmPassword')}
                    secureTextEntry={true}
                    placeholderTextColor="#9e9e9e"
                  />
                  {touched.confirmPassword && errors.confirmPassword && (
                    <Text style={styles.textError}>
                      {errors.confirmPassword}
                    </Text>
                  )}
                  <TouchableOpacity
                    style={styles.button}
                    onPress={handleSubmit}>
                    <Text style={styles.buttonText}>{this.props.type}</Text>
                  </TouchableOpacity>
                </>
              )}
            </Formik>,
          ]
        )}
        <AwesomeAlerts
          show={showAlert}
          showProgress={false}
          title={title}
          message={message}
          closeOnTouchOutSide={true}
          closeOnHardwareBackPress={false}
          showCancelButton={false}
          showConfirmButton={true}
          confirmText="OK"
          confirmButtonColor={color}
          onConfirmPressed={() => {
            this.hideAlert();
            title === 'Register Success'
              ? Actions.login()
              : title === 'Login Success'
              ? Actions.home()
              : this.forceUpdate();
          }}
        />
      </View>
    );
  }
}

export default Auth;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  textError: {
    fontSize: 10,
    color: 'red',
  },

  inputBox: {
    width: 300,
    backgroundColor: '#BC2C3D',
    borderRadius: 25,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#ffffff',
    marginVertical: 10,
  },

  button: {
    width: 300,
    backgroundColor: '#BC2C3D',
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 13,
  },

  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
    textAlign: 'center',
  },
  loader: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  loadingText: {
    fontSize: 22,
    fontWeight: 'bold',
  },
});
