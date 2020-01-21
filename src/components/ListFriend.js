import React, {Component} from 'react';
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import {ListItem} from 'react-native-elements';
import {Actions} from 'react-native-router-flux';
import firebase from '../config/Fire';
import {Bubbles} from 'react-native-loader';
import {ScrollView} from 'react-native-gesture-handler';

export default class ListFriend extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      isLoading: true,
      refresh: false,
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
        Actions.friend({
          title: item.temp.name,
          email: item.temp.email,
          address: item.temp.address,
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

  onRefresh = () => {
    this.setState({refresh: true});
    firebase.shared.getAlluser(this.listUser);
    this.setState({refresh: false});
  };

  render() {
    return this.state.isLoading ? (
      <View style={styles.loader}>
        <Text style={styles.loadingText}>Please Wait...</Text>
        <Bubbles size={15} color="#BC2C3D" />
      </View>
    ) : (
      <ScrollView
        refreshControl={
          <RefreshControl
            onRefresh={this.onRefresh}
            refreshing={this.state.refresh}
          />
        }>
        <FlatList
          keyExtractor={this.keyExtractor}
          data={this.state.users}
          renderItem={this.renderItem}
        />
      </ScrollView>
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
