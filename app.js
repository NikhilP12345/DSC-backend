var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var admin = require('firebase-admin');
var serviceAccount = require("./dsc-jgi-fb430-firebase-adminsdk-kasv1-e5262ca1b7.json")

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
var db = admin.firestore();

var HomeRoutes = require("./routes/home")
var LoginRoutes = require("./routes/login")
var userProfileRoutes = require("./routes/user_profile")
var admin = require("./routes/admin")
var adminProfile = require("./routes/admin_profile")

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.use(HomeRoutes);
app.use(LoginRoutes);
app.use(userProfileRoutes);
app.use(admin);
app.use(adminProfile);




app.listen(3200, process.env.IP, function(){
    console.log("Server is running");
})
