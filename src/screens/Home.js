import React from 'react';
import {
  Text,
  StyleSheet,
  Platform,
  ImageBackground,
  TouchableOpacity,
  Image,
} from 'react-native';
import {
  Container,
  Header,
  Button,
  Icon,
  Body,
  Title,
  Right,
  Tabs,
  ScrollableTab,
  Tab,
  TabHeading,
  Fab,
} from 'native-base';
import Profile from '../components/Profile';
import ListChat from '../components/ListChat';
import ListFriend from '../components/ListFriend';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import firebase from '../config/Fire';
import {Actions} from 'react-native-router-flux';

const logout = () => {
  firebase.shared.Logout().then(
    function() {
      firebase.shared.off();
      Actions.login();
    },
    function(error) {
      console.log(error);
    },
  );
};

const mapsClick = () => {
  Actions.maps();
};

const Home = () => {
  return (
    <Container style={styles.MainContainer}>
      <Header style={styles.header} androidStatusBarColor="#BC2C3D">
        <Body>
          <Title style={styles.headerText}>Let's Chat</Title>
        </Body>
        <Right>
          <Button transparent>
            <Icon name="search" style={styles.icon} />
          </Button>
          <Button transparent>
            <Menu>
              <MenuTrigger>
                <Icon name="menu" style={styles.icon} />
              </MenuTrigger>
              <MenuOptions>
                <MenuOption
                  onSelect={() => alert('setting')}
                  style={{flexDirection: 'row'}}>
                  <Icon
                    name="ios-settings"
                    style={{color: '#BC2C3D', fontSize: 24}}
                  />
                  <Text style={styles.menuText}>Setting</Text>
                </MenuOption>
                <MenuOption onSelect={logout} style={{flexDirection: 'row'}}>
                  <Icon
                    name="md-log-out"
                    style={{color: '#BC2C3D', fontSize: 24}}
                  />
                  <Text style={styles.menuText}>Logout</Text>
                </MenuOption>
              </MenuOptions>
            </Menu>
          </Button>
        </Right>
      </Header>
      <Tabs renderTabBar={() => <ScrollableTab style={styles.tab} />}>
        <Tab
          heading={
            <TabHeading style={styles.tab}>
              <Text style={styles.tabText}>Chats</Text>
            </TabHeading>
          }>
          <ImageBackground
            source={require('../img/bg.png')}
            style={styles.backgroundImage}>
            <ListChat />
            <Fab
              position="bottomRight"
              style={{backgroundColor: '#EFD2BC'}}
              onPress={mapsClick}>
              <Icon name={'ios-map'} style={{color: '#BC2C3D', fontSize: 34}} />
            </Fab>
          </ImageBackground>
        </Tab>
        <Tab
          heading={
            <TabHeading style={styles.tab}>
              <Text style={styles.tabText}>Friends</Text>
            </TabHeading>
          }>
          <ImageBackground
            source={require('../img/bg.png')}
            style={styles.backgroundImage}>
            <ListFriend />
            <Fab
              position="bottomRight"
              style={{backgroundColor: '#EFD2BC'}}
              onPress={mapsClick}>
              <Icon name={'ios-map'} style={{color: '#BC2C3D', fontSize: 34}} />
            </Fab>
          </ImageBackground>
        </Tab>
        <Tab
          heading={
            <TabHeading style={styles.tab}>
              <Text style={styles.tabText}>Profile</Text>
            </TabHeading>
          }>
          <ImageBackground
            source={require('../img/bg.png')}
            style={styles.backgroundImage}>
            <Profile />
          </ImageBackground>
        </Tab>
      </Tabs>
    </Container>
  );
};

export default Home;

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
  },

  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
  },

  header: {
    backgroundColor: '#EFD2BC',
  },

  tab: {
    backgroundColor: '#EFD2BC',
    marginTop: -5,
  },

  headerText: {
    color: '#BC2C3D',
    marginLeft: 10,
    fontSize: 24,
    fontWeight: '900',
  },

  menu: {
    width: '100',
  },

  menuText: {
    color: '#BC2C3D',
    fontSize: 16,
    margin: 3,
    fontWeight: 'bold',
    marginLeft: 5,
  },

  tabText: {
    color: '#BC2C3D',
    fontSize: 16,
    fontWeight: '700',
  },

  icon: {
    color: '#BC2C3D',
    fontSize: 26,
  },
});
