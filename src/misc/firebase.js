import firebase from 'firebase/app';
import 'firebase/auth'
import 'firebase/database'

const config = {
    apiKey: "AIzaSyBvkRMqR5skCzB1Zmg_TJpS42HXMweH7zw",
    authDomain: "chat-web-app-f7736.firebaseapp.com",
    databaseURL: "https://chat-web-app-f7736-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "chat-web-app-f7736",
    storageBucket: "chat-web-app-f7736.appspot.com",
    messagingSenderId: "434257146201",
    appId: "1:434257146201:web:fb576846d7d301665f9c48"
  };

  const app=firebase.initializeApp(config);
  export const auth=app.auth();
  export const database=app.database();