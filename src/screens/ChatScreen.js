import React from 'react';
import Chat from '../components/Chat';
import {
  Header,
  Container,
  Left,
  Button,
  Icon,
  Body,
  Title,
  Right,
} from 'native-base';
import {StyleSheet, Platform, ImageBackground} from 'react-native';
import {Actions} from 'react-native-router-flux';

const ChatScreen = props => {
  return (
    <Container style={styles.MainContainer}>
      <Header style={styles.header} androidStatusBarColor="#BC2C3D">
        <Left>
          <Button transparent onPress={Actions.pop}>
            <Icon name="arrow-back" style={styles.icon} />
          </Button>
        </Left>
        <Body>
          <Title style={styles.headerText}>{props.title}</Title>
        </Body>
        <Right>
          <Button transparent>
            <Icon name="call" style={styles.icon} />
          </Button>
        </Right>
      </Header>
      <ImageBackground
        source={require('../img/bg.png')}
        style={styles.backgroundImage}>
        <Chat
          data={[
            props.receiverId,
            props.title,
            props.email,
            props.address,
            props.image,
          ]}
        />
      </ImageBackground>
    </Container>
  );
};

export default ChatScreen;

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
