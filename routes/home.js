var express = require("express")
var router = express()
var bodyParser = require("body-parser");
var admin = require('firebase-admin');
var db = admin.firestore();

router.get("/", function(req, res){
    res.redirect("/home");
})

router.get("/home", function(req, res){
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
router.get("/home/events", function(req, res){
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

router.get("/home/story", function(req, res){
    res.render("home/story");
})

router.get("/home/contact", function(req, res){
    res.render("home/contact");
})

router.get("/home/blog", function(req, res){
    res.render("home/blog");
})

router.get("/home/:id", function(req, res){
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
})

module.exports = router
