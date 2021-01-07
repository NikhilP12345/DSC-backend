firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        console.log("signed")
    } else {
        console.log("not signed")
    }
  });

function login(){
    var email = document.getElementById("email").value;
    var password = document.getElementById("pass").value;

    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage)
        // ...
      });

}

