var express = require("express")
var router = express()
var bodyParser = require("body-parser");
var admin = require('firebase-admin');
var db = admin.firestore();
var dict1 = {}
var eventArr = []
var eventInfo = []
router.get("/profile/:id/register", (req, res) => {
    eventArr = []
    var count = 0;
    var count1 = 0;
    db.collection('web_db').get().then(function(snapshot, err){
        if(err){
          console.log(err)
        }
        else
        {
            snapshot.forEach(doc => {
                eventArr.push(doc.data())
                eventArr[count]["id"] = doc.id
                count++;
                if(count == 4){
                    // res.render("user_profile/eventList", {dict: dict1, eventArr: eventArr})
                    console.log("hello")
                }
            })

        }  
    }) 

})
router.get("/profile/:id/register/:id", (req, res) => {
    var eventInfo = []
    var eventName = req.params.id;
    var error = ""
    for(var i = 0 ; i < eventArr.length ; i++){
        if(eventArr[i].event_name == eventName){
            eventInfo.push(eventArr[i])
            res.render("user_profile/eventRegister", {dict: dict1, eventInfo: eventInfo, error: error})
        }
    }
})

router.post("/profile/:id/register/:id", (req, res) => {
    var studEventList = []
    var id = ""
    eventName = req.params.id;
    regObj = req.body;
    let temp = 0;
    const list = Object.values(regObj)
    for(var i = 0 ; i < list.length ; i++){
        for(var j = i+1 ; j < list.length ; j++){
            if(list[i] == list[j]){
                temp++;
                break;
            }
        }
    }
    if(temp == 0){
        var count = 0;
        var count1 = 0;
        var totalUser = []
        db.collection('web_user').get().then(function(snapshot, err){
            if(err){
              console.log(err)
            }
            else
            {
                snapshot.forEach(function(doc){
                    totalUser.push(doc.data().Email)
                    
                })
                for(var i = 0 ; i < list.length ; i++){
                    for(var j = 0 ; j < totalUser.length ; j++){
                        if(list[i] == totalUser[j]){
                            count++;
                            break;
                        }
                    }
                }
                if(count != list.length){
                    res.render("user_profile/eventRegister", {dict: dict1, eventInfo: eventInfo, error: "Email id not found of the member"})
                }
                else{
                    snapshot.forEach(function(doc){
                        for(var i = 0; i < list.length; i++){
                            if(list[i] == doc.data().Email){
                               for(var j = 0 ; j < doc.data().eventList.length ; i++){
                                   if(eventName == doc.data().eventList[j]){
                                       count1++;
                                       break;
                                   }
                                }
                                if(count1 > 0){
                                    break;
                                }
                            } 
                        }
                    })
                    if(count1 > 0){
                        res.render("user_profile/eventRegister", {dict: dict1, eventInfo: eventInfo, error: "Member email id already registered"})
                    }
                    else{
                        snapshot.forEach((doc) => {
                            for(var i = 0 ; i < list.length ; i++){
                                if(list[i] == doc.data().Email){
                                    // studEventList = doc.data().eventList;
                                    // studEventList.push(eventName);
                                    // let updateNested = db.collection('web_user').doc(doc.id).update({
                                    //     eventList: studEventList
                                    // });
                                    console.log("registered")
                                    count1++;
                                    break;
                                }
                            }
                            if(count1 == list.length){
                                db.collection('web_db').get().then(function(snapshots, err){
                                    if(err){
                                      console.log(err)
                                    }
                                    else
                                    {
                                        var a = 0;
                                        snapshots.forEach((docs) => {
                                            if(docs.data().event_name == eventName){
                                                id = docs.id
                                                a++;
                                            }
                                        })
                                        if(a == 1){
                                            let addDoc = db.collection('web_db').doc(id).collection("Students").add(regObj).then(ref => {res.redirect("/profile/"+dict1.id )});
                                        }
                                    }
                                })   
                            }
                        })
                    }

                }
            }
        }) 
    }
    else{
        res.render("user_profile/eventRegister", {dict: dict1, eventInfo: eventInfo, error: "Email cant be same"})
    }

    // var id = ""
    // for(var i = 0 ; i < eventArr.length ; i++){
    //     if(eventArr[i].event_name == eventName){
    //         id = eventArr[i].id
    //     }
    // }
    // let addDoc = db.collection('web_db').doc(id).collection("Students").add(regObj).then(ref => {res.redirect("/profile/"+dict1.id )});
})


router.get("/profile/:id",function(req, res){
    var id = req.params.id;
    var count = 0
    let profileRef = db.collection('web_user').doc(id);
    let getDoc = profileRef.get()
    .then(doc => {
        if (!doc.exists) {
        console.log('No such document!');
        } else {
            dict1["email"] = doc.data().Email;
            dict1[doc.data().Email] = ""
            dict1["id"] = id
            db.collection('web_user').doc(id).collection('Personal Details').get().then(function(snaps, er){
                if(er){
                    console.log(er)
                }
                else{
                    snaps.forEach(function(docs){
                        dict1[doc.data().Email] = docs.data()
                        res.render("user_profile/profile", {dict: dict1})
                    })
                }
            })
        }
    })
    .catch(err => {
        console.log('Error getting document', err);
    });
})


// router.get("/logout", function(req, res){
//     req.logout();
//     res.redirect("/home")
// })

module.exports = router;

