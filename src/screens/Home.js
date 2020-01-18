import React from 'react';
import {Text, StyleSheet, Platform, ImageBackground} from 'react-native';
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
                <MenuOption onSelect={() => alert('Change Password')}>
                  <Text style={styles.menuText}>Change Password</Text>
                </MenuOption>
                <MenuOption onSelect={logout}>
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
