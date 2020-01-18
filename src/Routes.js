import React from 'react';
import {Router, Stack, Scene} from 'react-native-router-flux';
import Login from './screens/Login';
import Signup from './screens/Register';
import Home from './screens/Home';
import Chat from './screens/ChatScreen';
import Friend from './screens/FriendProfile';

const Routes = () => {
  return (
    <Router>
      <Stack key="root" hideNavBar={true}>
        <Scene key="login" component={Login} title="Login" initial={true} />
        <Scene key="signup" component={Signup} title="Register" />
        <Scene key="home" component={Home} title="Home" />
        <Scene key="chat" component={Chat} title="Chat" />
        <Scene key="friend" component={Friend} title="Friend" />
      </Stack>
    </Router>
  );
};

export default Routes;
