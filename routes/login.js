var express = require("express")
var router = express()
var bodyParser = require("body-parser");
var admin = require('firebase-admin');
var db = admin.firestore();

router.get("/login", function(req, res){
    var errorMessage = ""
    res.render("login/login_page", {error: errorMessage})
})

router.post("/login", function(req, res){
  var email = req.body.email;
  var password = req.body.pass;
  var count = 1;
  var id = "";
  db.collection('web_user').get().then(function(snapshot, err){
    if(err){
      console.log(err)
    }
    else
    {
      snapshot.forEach(function(doc){
        if(doc.data().Email == email && doc.data().Password == password){
          id = doc.id;
          count++;
        }
      })
    }
    if(count > 1){
      res.redirect("/profile/" + id)
    }
    else{
      res.render("login/login_page", {error: "Invalid Email or Password"})
    }
  }) 

})

router.get("/login/sign_up", function(req, res){
    res.render("login/sign_up", {error: ""})
})

router.post("/login/sign_up", function(req, res){
  var name = req.body.Name;
  var email = req.body.email;
  var gender = req.body.gender;
  var branch = req.body.branch;
  var college = req.body.college;
  var pick_up = req.body.pick_up;
  var phone = req.body.phone;
  var password = req.body.pass;

  //Verification of mobile and email
  var profileDetails = {
    Name: name,
    Gender: gender,
    Branch: branch,
    College: college,
    Pick_Up: pick_up,
    Phone: phone
  }
  if(name.length == 0 || email.length == 0 || gender.length == 0 || branch.length == 0 || college.length == 0 || pick_up.length == 0 || phone.length == 0 || password.length == 0 || phone.length != 10){
    //invalid
    res.render("login/sign_up", {error: "Invalid Credential"})
  }
  else{
    var count = 1;
    db.collection('web_user').get().then(function(snapshot, err){
      if(err){
        console.log(err)
      }
      else
      {
        snapshot.forEach(function(doc){
          if(doc.data().Email == email){
            count++;
          }
        })
        if(count > 1){
          res.render("login/sign_up", {error: "Account Already exists"})
        }
        else if(count == 1){
          let reference = ""
          let addDoc = db.collection('web_user').add({
            Email: email,
            Password: password,
            eventList: []
            }).then(ref => {
            console.log(ref.id)
            reference = ref.id
            var promises = [];
            promises.push(db.collection('web_user').doc(reference).collection('Personal Details').add(profileDetails));
            Promise.all(promises).then(function() {
              res.redirect("/login")
            })
          });
        }
      }
    })
  }
})

//middleware
// function isLoggedIn(req, res, next){
//   if(req.isAuthenticated()){
//     return next();
//   }
//   res.redirect("/login")
// }
module.exports = router