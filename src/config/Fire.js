import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';
import {
  API_KEY,
  AUTH_DOMAIN,
  DATABASE_URL,
  PROJECT_ID,
  STORAGE_BUCKET,
  MESSAGING_SENDER_ID,
  APP_ID,
  MEASUREMENT_ID,
} from 'react-native-dotenv';

class Firebase {
  constructor() {
    this.init();
  }

  init = () => {
    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: API_KEY,
        authDomain: AUTH_DOMAIN,
        databaseURL: DATABASE_URL,
        projectId: PROJECT_ID,
        storageBucket: STORAGE_BUCKET,
        messagingSenderId: MESSAGING_SENDER_ID,
        appId: APP_ID,
        measurementId: MEASUREMENT_ID,
      });
    }
  };

  current() {
    return firebase.auth().currentUser;
  }

  onLogin(data) {
    return firebase
      .auth()
      .signInWithEmailAndPassword(data.email, data.password);
  }

  onRegister(data) {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(data.email, data.password)
      .then(res => {
        this.updateDisplayName(data);
      });
  }

  updateData(data, id, img, lat, lng) {
    return firebase
      .database()
      .ref('user/' + id)
      .set({
        name: data.name,
        email: data.email,
        address: data.address,
        avatar: img,
        latitude: lat,
        longitude: lng,
      })
      .then(() => {
        this.updateDisplayName(data);
        let user = this.current();
        user.updateEmail(data.email);
      });
  }

  getDatas(id) {
    return firebase
      .database()
      .ref('/user/' + id)
      .once('value');
  }

  getImage(id) {
    return firebase
      .storage()
      .ref('images/photos/' + id)
      .getDownloadURL();
  }

  updateImage(id, blob) {
    return firebase
      .storage()
      .ref()
      .child('images/photos/' + id)
      .put(blob);
  }

  updateDisplayName(data) {
    let user = this.current();
    if (user) {
      user.updateProfile({
        displayName: data.name,
      });
    }
  }

  Logout() {
    return firebase.auth().signOut();
  }

  addUserData(data, lat, lng) {
    let user = this.current();
    let userId = firebase.auth().currentUser.uid;
    return firebase
      .database()
      .ref('user/' + userId)
      .set({
        name: data.name,
        email: user.email,
        latitude: lat,
        longitude: lng,
      });
  }

  removeUser(id) {
    return firebase
      .database()
      .ref('user')
      .child(id)
      .remove();
  }

  removeImage(id) {
    return firebase
      .storage()
      .ref('images/photos/' + id)
      .delete();
  }

  getAlluser = async listUser => {
    firebase
      .database()
      .ref('user/')
      .once('value', list => {
        const datas = [];
        list.forEach(element => {
          if (element.key !== this.uid) {
            const temp = element.val();
            const keys = element.key;
            datas.push({temp, keys});
          }
        });
        listUser(datas);
      });
  };

  get uid() {
    return (this.current() || {}).uid;
  }

  get name() {
    return firebase.auth().currentUser.displayName;
  }

  get ref() {
    return firebase.database().ref('messages');
  }

  parse = snapshot => {
    const {timestamp, text, user} = snapshot.val();
    const {key: _id} = snapshot;
    const createdAt = new Date(timestamp);
    const message = {
      _id,
      createdAt,
      text,
      user,
    };
    return message;
  };

  on = async (callback, id) => {
    const uid = this.uid;
    let messageId = uid + '_' + id;
    const searchMessage = id + '_' + uid;
    await firebase
      .database()
      .ref('/messages/')
      .child(searchMessage)
      .once('value', function(snapshot) {
        if (snapshot.val()) {
          messageId = snapshot.key;
        }
      });
    firebase
      .database()
      .ref('/messages/' + messageId)
      .on('child_added', snapshot => callback(this.parse(snapshot)));
  };

  get timestamp() {
    return firebase.database.ServerValue.TIMESTAMP;
  }
  // send the message to the Backend
  send = messages => {
    const uid = this.uid;
    for (let i = 0; i < messages.length; i++) {
      const {text, user} = messages[i];
      const message = {
        text,
        user,
        timestamp: this.timestamp,
      };
      const receiverId = messages[i].user.receiverId;
      let messageId = uid + '_' + receiverId;
      const searchMessage = receiverId + '_' + uid;
      firebase
        .database()
        .ref('/messages/' + searchMessage)
        .once('value', function(snapshot) {
          if (snapshot.val()) {
            messageId = snapshot.key;
          }
        });
      firebase
        .database()
        .ref('messages/' + messageId + '/')
        .push(message);
    }
  };

  append = message => this.ref.push(message);

  // close the connection to the Backend
  off() {
    this.ref.off();
  }
}

Firebase.shared = new Firebase();
export default Firebase;
