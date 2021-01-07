var admin = require('firebase-admin');
var serviceAccount = require("./dsc-jgi-fb430-firebase-adminsdk-kasv1-e5262ca1b7.json")


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// db.collection('upcoming_events').get()
// .then((snapshot) => {
//   snapshot.forEach((doc) => {
//     console.log(doc.id, '=>', doc.data());
//   });
// })
// .catch((err) => {
//   console.log(err);
// })

// db.collection('upcoming_events').get().then(function(snapshot, err){
//   if(err){
//     console.log(err)
//   }
//   else
//   {
//     snapshot.forEach(function(doc){
//       console.log(doc.id, '=>', doc.data().photo);
//     })
//   }
// })
var email = "pariharnikhil92.com"
// var Password = "dsvdv"
// var count = 1
// db.collection('web_user').get().then(function(snapshot, err){
//   if(err){
//     console.log(err)
//   }
//   else
//   {
//     snapshot.forEach(function(doc){
//       if(doc.data().Email == email && doc.data().Password == Password){
//         count++;
//       }
//     })
//     if(count > 1){
//       console.log("Logged in")
//     }
//     else{
//       console.log("Invalid")
//     }
//   }
// })   

// let profileRef = db.collection('web_user');
// let query = profileRef.where('capital', '==', true).get()
//   .then(snapshot => {
//     if (snapshot.empty) {
//       console.log('No matching documents.');
//       return;
//     }  

//     snapshot.forEach(doc => {
//       console.log(doc.id, '=>', doc.data());
//     });
//   })
//   .catch(err => {
//     console.log('Error getting documents', err);
//   });

db.collection('web_user').doc("B1YeEE9hQ73YQ902wdQK").collection("Personal Details").get()
.then((snapshot) => {
  // snapshot.forEach((doc) => {
  //   console.log(doc.id, '=>', doc.data());
  // });
  console.log(snapshot.data().Phone);
})
