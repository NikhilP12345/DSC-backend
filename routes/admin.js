var express = require("express")
var router = express()
var bodyParser = require("body-parser");
var admin = require('firebase-admin');
var db = admin.firestore();

router.get("/admin",function(req, res){
    var errorMessage = ""
    res.render("admin/admin_login", {error: errorMessage})
})
router.post("/admin", function(req, res){
    var email = req.body.email;
    var password = req.body.pass;
    var secretCode = req.body.secret;
    var count = 1;
    var id = "";
    db.collection('Admin').get().then(function(snapshot, err){
      if(err){
        console.log(err)
      }
      else
      {
        snapshot.forEach(function(doc){
          if(doc.data().Email == email && doc.data().Password == password && doc.data().SecretCode == secretCode){
            id = doc.id;
            count++;
          }
        })
      }
      if(count > 1){
        res.redirect("/admin/" + id)
      }
      else{
        res.render("admin/admin_login", {error: "Invalid Email or Password"})
      }
    }) 
  
})

module.exports = router;