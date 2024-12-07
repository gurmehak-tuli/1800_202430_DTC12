function doAll() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            insertNameFromFirestore(user);
        } else {
            console.log("No user is signed in");
        }
    });
}
doAll();
//------------------------------------------------
// Call this function when the "logout" button is clicked
//-------------------------------------------------
function logout() {
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
        console.log("logging out user");
    }).catch((error) => {
        // An error happened.
    });
}
function insertNameFromFirestore(user) { // Function to insert the user's name from Firestore.
    db.collection("users").doc(user.uid).get().then(userDoc => { // Retrieves the user's document from Firestore.
        console.log(userDoc.data().name) 
        userName = userDoc.data().name;
        console.log(userName)
        document.getElementById("name-goes-here").innerHTML = userName; // Inserts the user's name into the HTML.
    })

}