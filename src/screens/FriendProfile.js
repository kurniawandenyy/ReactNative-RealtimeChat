import React from 'react';
import {ImageBackground, Platform, StyleSheet} from 'react-native';
import Profile from '../components/FriendProfile';
import {
  Container,
  Header,
  Left,
  Button,
  Icon,
  Body,
  Title,
  Right,
} from 'native-base';
import {Actions} from 'react-native-router-flux';

const FriendProfile = props => {
  return (
    <Container style={styles.MainContainer}>
      <Header style={styles.header} androidStatusBarColor="#BC2C3D">
        <Left>
          <Button transparent onPress={Actions.pop}>
            <Icon name="arrow-back" style={styles.icon} />
          </Button>
        </Left>
        <Body>
          <Title style={styles.headerText}>
            {props.title.split(' ')[0]}'s Profile
          </Title>
        </Body>
        <Right>
          <Button transparent>
            <Icon name="ios-chatbubbles" style={styles.icon} />
          </Button>
        </Right>
      </Header>
      <ImageBackground
        source={require('../img/bg.png')}
        style={styles.backgroundImage}>
        <Profile datas={[props.title, props.email, props.address]} />
      </ImageBackground>
    </Container>
  );
};

export default FriendProfile;

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
  headerText: {
    color: '#BC2C3D',
    marginLeft: -10,
    fontSize: 20,
    fontWeight: '900',
  },
  icon: {
    color: '#BC2C3D',
    fontSize: 26,
  },
});
