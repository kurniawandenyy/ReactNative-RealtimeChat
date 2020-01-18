import React, {Component} from 'react';
import {FlatList, Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import {ListItem} from 'react-native-elements';
import {Actions} from 'react-native-router-flux';
import firebase from '../config/Fire';
import {Bubbles} from 'react-native-loader';

export default class ListChat extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      isLoading: true,
    };
  }

  componentDidMount() {
    firebase.shared.getAlluser(this.listUser);
  }

  listUser = users => {
    this.setState({users, isLoading: false});
  };

  keyExtractor = (item, index) => index.toString();

  renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() =>
        Actions.chat({
          title: item.temp.name,
          receiverId: item.keys,
          image: item.temp.avatar,
        })
      }>
      <ListItem
        title={item.temp.name}
        subtitle={item.temp.email}
        leftAvatar={{
          source: item.temp.avatar && {uri: item.temp.avatar},
          title: item.temp.name[0],
        }}
        bottomDivider
        chevron
      />
    </TouchableOpacity>
  );
  render() {
    console.log(this.state.users);
    return this.state.isLoading ? (
      <View style={styles.loader}>
        <Text style={styles.loadingText}>Please Wait...</Text>
        <Bubbles size={15} color="#BC2C3D" />
      </View>
    ) : (
      <FlatList
        keyExtractor={this.keyExtractor}
        data={this.state.users}
        renderItem={this.renderItem}
      />
    );
  }
}

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
