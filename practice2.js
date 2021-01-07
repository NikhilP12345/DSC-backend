var express = require("express"),
    app = express(),
    bodyParser = require("body-parser");

    
var admin = require('firebase-admin');
var firebase = require('firebase');
var firebase = require("firebase/app");
var passport = require('passport')
var localStrategy = require('passport-local')
require("firebase/auth");
require("firebase/firestore");
var serviceAccount = require("./dsc-jgi-fb430-firebase-adminsdk-kasv1-e5262ca1b7.json")
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

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
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
var db = admin.firestore();
app.use(require("express-session")({
    secret: "Rusty is the best and cutest dog in the world",
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize());
app.use(passport.session());




app.get("/", function(req, res){
    res.redirect("/home");
})

app.get("/home", function(req, res){
    db.collection('web_db').get().then(function(snapshot, err){
        if(err){
          console.log(err)
        }
        else
        {
            res.render("home/index", {snapshot: snapshot});
        }
      })      
})
app.get("/home/new", function(req, res){
    res.render("home/new")
})
// app.post("/home", function(req, res){
//     db.collection('web'),set
// })
app.get("/home/events", function(req, res){
    db.collection('web_db').get().then(function(snapshot, err){
        if(err){
          console.log(err)
        }
        else
        {
            res.render("home/events", {snapshot: snapshot});
        }
      }) 
})

app.get("/home/story", function(req, res){
    res.render("home/story");
})

app.get("/home/contact", function(req, res){
    res.render("home/contact");
})

app.get("/home/blog", function(req, res){
    res.render("home/blog");
})

app.get("/login", function(req, res){
    var errorMessage = ""
    res.render("login/login_page", {error: errorMessage})
})

app.post("/login",function(req, res){
    var email = req.body.email;
    var password = req.body.pass;



    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        if(errorMessage){
            console.log(error)
        }
            // ...
      });

      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            res.render("home/practice")
        } else {
            res.redirect("/login")
        }
    });

})

app.get("/home/:id", function(req, res){
    db.collection('web_db').get().then(function(snapshot, err){
        if(err){
          console.log(err)
        }
        else
        {
            snapshot.forEach(function(doc){
                if(doc.data().event_name == req.params.id){
                    res.render("home/show", {doc: doc});
                }
            })
        }
      })   
    console.log(req.params.id);
})
app.get("/logout", function(req, res){
    firebase.auth().signOut().then(function(){
        res.redirect("/login")
    }).catch(function(error){
        console.log(error)
    })
})

// function isLoggedIn(){

// }
// function isLoggedin(){

// }
app.listen(3200, process.env.IP, function(){
    console.log("Server is running");
})
