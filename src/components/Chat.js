import React from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import Fire from '../config/Fire';
import {View, StyleSheet, Text} from 'react-native';
import {Bubbles} from 'react-native-loader';

class Chat extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      message: [],
      user: {},
    };
  }

  get user() {
    return {
      name: Fire.shared.name,
      _id: Fire.shared.uid,
      avatar: this.props.data[1] || null,
      receiverId: this.props.data[0],
    };
  }

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
      />
    );
  }

  componentDidMount() {
    Fire.shared.on(
      message =>
        this.setState(previous => ({
          messages: GiftedChat.append(previous.messages, message),
          isLoading: false,
        })),
      this.props.data[0],
    );
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
