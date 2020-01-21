import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Avatar, Icon} from 'react-native-elements';
import {ScrollView} from 'react-native-gesture-handler';

const Profile = props => {
  return (
    <View style={styles.Maincontainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.containerImage}>
          <Avatar
            size="xlarge"
            title="Photo"
            titleStyle={{fontSize: 28}}
            rounded
            activeOpacity={0.7}
            source={{
              uri:
                props.datas[3] ||
                'data:image/jpeg;base64,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',
            }}
          />
        </View>
        <View style={styles.row}>
          <View style={styles.column}>
            <Icon raised name="user" type="font-awesome" color="#BC2C3D" />
          </View>
          <View style={styles.column2}>
            <View style={styles.detail}>
              <Text style={styles.detailHeader}>Name</Text>
              <Text style={styles.detailBody}>{props.datas[0]}</Text>
            </View>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.column}>
            <Icon raised name="at" type="font-awesome" color="#BC2C3D" />
          </View>
          <View style={styles.column2}>
            <View style={styles.detail}>
              <Text style={styles.detailHeader}>Email</Text>
              <Text style={styles.detailBody}>{props.datas[1]}</Text>
            </View>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.column}>
            <Icon
              raised
              name="map-marker"
              type="font-awesome"
              color="#BC2C3D"
            />
          </View>
          <View style={styles.column2}>
            <View style={styles.detail}>
              <Text style={styles.detailHeader}>Address</Text>
              <Text style={styles.detailBody}>{props.datas[2]}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },

  containerImage: {
    alignSelf: 'center',
    marginTop: 30,
    marginBottom: 20,
  },

  row: {
    flexDirection: 'row',
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 20,
    marginTop: 10,
    backgroundColor: '#fff',
  },

  detail: {
    marginTop: 10,
    marginLeft: 5,
    marginBottom: 15,
  },

  detailHeader: {
    fontSize: 12,
    fontWeight: '600',
    color: '#9e9e9e',
    alignSelf: 'stretch',
  },

  column: {
    flexDirection: 'column',
  },

  column2: {
    flexDirection: 'column',
    flex: 1,
  },

  detailBody: {
    fontSize: 18,
    fontWeight: '900',
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
