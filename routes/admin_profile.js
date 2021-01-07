var express = require("express")
var router = express()
var bodyParser = require("body-parser");
var admin = require('firebase-admin');
var db = admin.firestore();
var dict = {}
router.get("/admin/:id",function(req, res){
    var id = req.params.id;
    var Email = "";
    db.collection('Admin').get().then(function(snapshot, err){
        if(err){
          console.log(err)
        }
        else
        {
            snapshot.forEach(function(doc){
                if(doc.id == id){
                    Email = doc.data().Email
                    db.collection('Admin').doc(id).collection('Profile').get().then(function(snaps, er){
                        if(er){
                            console.log(er)
                        }
                        else{
                            snaps.forEach(function(docs){
                                
                                dict['doc'] = docs;
                                dict['Email'] = Email;
                                dict['id'] = id;
                                res.render("admin_profile/index", {dict: dict})
                            })
                        }
                    })
                }
            })
        }
      }) 
    
})

router.get("/admin/:id/add",function(req, res){
    res.render("admin_profile/addEvent", {dict: dict})
})
router.post("/admin/:id/add",function(req, res){
    let addDoc = db.collection('web_db').add({
        event_name: req.body.event_name,
        about_event: req.body.about_event,
        about_workshop: req.body.about_workshop,
        note_for_student: req.body.note_for_student,
        registration_process: req.body.registration_process,
        learning_for_student: req.body.learning_for_student,
        image: req.body.image,
        event_small: req.body.event_small,
        MemberTeams: Number(req.body.MemberTeams),
        Flag: "Enable"
      }).then(ref => {
        reference = ref.id
        var promises = [];
        promises.push(db.collection('web_db').doc(reference).collection('Students').add({}));
        Promise.all(promises).then(function() {
            res.redirect("/admin/" + dict.id);
        })
        
      });
})

router.get("/admin/:id/delete",function(req, res){
    res.render("admin_profile/deleteEvent", {dict: dict})
})
router.post("/admin/:id/delete",function(req, res){
    var event_name = req.body.event_name;
    db.collection('web_db').get().then(function(snapshot, err){
        if(err){
          console.log(err)
        }
        else
        {
            snapshot.forEach(function(doc){
                if(doc.data().event_name == event_name){
                    let deleteDoc = db.collection('web_db').doc(doc.id).delete();
                    res.redirect("/admin/" + dict.id)
                }
            })
        }
      })   
})
router.get("/admin/:id/user", function(req, res){
    var dict1 = {}
    var count = 0;
    var count1 = 0
    db.collection('web_user').get().then(function(snapshot, err){
        if(err){
          console.log(err)
        }
        else
        {
            snapshot.forEach(function(doc){
                dict1[doc.data().Email] = ""
                count++;
                db.collection('web_user').doc(doc.id).collection('Personal Details').get().then(function(snaps, er){
                    if(er){
                        console.log(er)
                    }
                    else{
                        snaps.forEach(function(docs){
                            dict1[doc.data().Email] = docs.data()
                            count1++;
                            if(count ==  count1){
                                res.render("admin_profile/user", {dict: dict, studentProfile: dict1})
                            }
                        })
                    }
                })
            })
        }
      }) 
    
})



module.exports = router;