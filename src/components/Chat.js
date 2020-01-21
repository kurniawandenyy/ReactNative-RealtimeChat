import React, {Component} from 'react';
import {GiftedChat, Bubble} from 'react-native-gifted-chat';
import Fire from '../config/Fire';
import {View, StyleSheet, Text} from 'react-native';
import {Bubbles} from 'react-native-loader';
import {Actions} from 'react-native-router-flux';

class Chat extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      message: [],
      user: {},
      url: '',
    };
  }

  get user() {
    return {
      name: Fire.shared.name,
      _id: Fire.shared.uid,
      avatar: this.state.url !== undefined ? this.state.url : null,
      receiverId: this.props.data[0],
    };
  }

  renderBubble = props => {
    return (
      <Bubble
        {...props}
        textStyle={{
          right: {
            color: '#BC2C3D',
          },
          left: {
            color: '#EFD2BC',
          },
        }}
        wrapperStyle={{
          left: {
            backgroundColor: '#c41e3a',
          },
          right: {
            backgroundColor: '#F8B878',
          },
        }}
      />
    );
  };

  onPressAvatar = () => {
    Actions.friend({
      title: this.props.data[1],
      email: this.props.data[2],
      address: this.props.data[3],
      image: this.props.data[4],
    });
  };

  render() {
    return this.state.isLoading ? (
      <View style={styles.loader}>
        <Text style={styles.loadingText}>Please Wait...</Text>
        <Bubbles size={15} color="#BC2C3D" />
      </View>
    ) : (
      <GiftedChat
        messages={this.state.messages}
        onSend={Fire.shared.send}
        user={this.user}
        renderBubble={this.renderBubble}
        onPressAvatar={this.onPressAvatar}
      />
    );
  }

  componentDidMount() {
    this.getImg();
    this.msg();
  }

  msg() {
    Fire.shared.on(
      message =>
        this.setState(previous => ({
          messages: GiftedChat.append(previous.messages, message),
          isLoading: false,
        })),
      this.props.data[0],
    );
  }

  getImg() {
    Fire.shared
      .getImage(Fire.shared.uid)
      .then(url => {
        this.setState({url});
      })
      .catch(err => {
        console.log(err);
      });
  }

  componentWillUnmount() {
    Fire.shared.off();
  }
}

export default Chat;

const styles = StyleSheet.create({
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
