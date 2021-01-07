var admin = require('firebase-admin');
var serviceAccount = require("./dsc-jgi-fb430-firebase-adminsdk-kasv1-e5262ca1b7.json")
var firebase = require('firebase');
var firebase = require("firebase/app");

// Add the Firebase products that you want to use
require("firebase/auth");
require("firebase/firestore");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
var db = admin.firestore();

const firebaseConfig = {
    apiKey: "AIzaSyCXLsgSnF7JmH2I1KcwgvN0U8Q46aGjjWU",
    authDomain: "dsc-jgi-fb430.firebaseapp.com",
    databaseURL: "https://dsc-jgi-fb430.firebaseio.com",
    projectId: "dsc-jgi-fb430",
    storageBucket: "dsc-jgi-fb430.appspot.com",
    messagingSenderId: "94455954667",
    appId: "1:94455954667:web:6a76d346eb98786bf2d2ae"
};

firebase.initializeApp(firebaseConfig);

// db.collection('web_db').get().then(function(snapshot, err){
//     if(err){
//       console.log(err)
//     }
//     else
//     {
//         snapshot.forEach(function(doc){
//             console.log(doc)
//         })
//     }
//   })      

// firebase.auth().createUserWithEmailAndPassword("pariharnikhil92@gmail.com", "Nikhil1").catch(function(error) {
//     // Handle Errors here.
//     var errorCode = error.code;
//     var errorMessage = error.message;
//     // ...
//     console.log(errorMessage)
//   })

firebase.auth().signInWithEmailAndPassword("pariharnikhil92@gmail.com", "Nikhil1").catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorMessage)
    // ...
  });