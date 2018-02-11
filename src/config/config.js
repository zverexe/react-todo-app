import * as firebase from 'firebase';
  // Initialize Firebase
  let config = {
    apiKey: "AIzaSyALtlPVAq2PLYiXF3CT_EFFs9210VCPcvo",
    authDomain: "react-todo-app-4b652.firebaseapp.com",
    databaseURL: "https://react-todo-app-4b652.firebaseio.com",
    projectId: "react-todo-app-4b652",
    storageBucket: "react-todo-app-4b652.appspot.com",
    messagingSenderId: "535168616242"
  };

  firebase.initializeApp(config);

  export const database = firebase.database();
  export const storage = firebase.storage().ref();