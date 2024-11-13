//Global variable pointing to the current user's Firestore document
var currentUser;

//Function that calls everything needed for the main page  
function doAll() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            currentUser = db.collection("users").doc(user.uid);
            console.log(currentUser);

            const weekday = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
            const d = new Date();
            let day = weekday[d.getDay()];

            displayCardsDynamically("assignments"); 
        } else {
            console.log("No user is signed in");
            window.location.href = "login.html";
        }
    });
}
doAll();
// New instertNameFromFirestore function
// Insert name function using the global variable "currentUser" I created a function in script.js that will insert the user's name into the HTML element with the ID "name-goes-here".
// function insertNameFromFirestore() {
//     currentUser.get().then(userDoc => {
//         //get the user name
//         var user_Name = userDoc.data().name;
//         console.log(user_Name);
//         $("#name-goes-here").text(user_Name); //jquery
//         // document.getElementByID("name-goes-here").innetText=user_Name;
//     })
// }
// Comment out the next line (we will call this function from doAll())
// insertNameFromFirestore();
// Old insertNameFromFirestore function
// function insertNameFromFirestore() {
//     // Check if the user is logged in:
//     firebase.auth().onAuthStateChanged(user => {
//         if (user) {
//             console.log(user.uid); // Let's know who the logged-in user is by logging their UID
//             currentUser = db.collection("users").doc(user.uid); // Go to the Firestore document of the user
//             currentUser.get().then(userDoc => {
//                 // Get the user name
//                 let userName = userDoc.data().name;
//                 console.log(userName);
//                 //$("#name-goes-here").text(userName); // jQuery
//                 document.getElementById("name-goes-here").innerText = userName;
//             })
//         } else {
//             console.log("No user is logged in."); // Log a message when no user is logged in
//         }
//     })
// }
// insertNameFromFirestore();
// New readquote function
// displays the quote based in input param string "tuesday", "monday", etc. 
// function readQuote(day) {
//     db.collection("quotes").doc(day).onSnapshot(doc => {
//         console.log("inside");
//         console.log(doc.data());
//         document.getElementById("quote-goes-here").innerHTML = doc.data().quote;
//     })
// }
// Comment out the next line (we will call this function from doAll())
// readQuote("tuesday");       
// old readQuote function
// function readQuote(day) {
//     db.collection("quotes").doc(day)                                                         //name of the collection and documents should matach excatly with what you have in Firestore
//         .onSnapshot(dayDoc => {                                                              //arrow notation
//             console.log("current document data: " + dayDoc.data());                          //.data() returns data object
//             document.getElementById("quote-goes-here").innerHTML = dayDoc.data().quote;      //using javascript to display the data on the right place

//Here are other ways to access key-value data fields
//$('#quote-goes-here').text(dayDoc.data().quote);         //using jquery object dot notation
//$("#quote-goes-here").text(dayDoc.data()["quote"]);      //using json object indexing
//document.querySelector("#quote-goes-here").innerHTML = dayDoc.data().quote;

//         }, (error) => {
//             console.log("Error calling onSnapshot", error);
//         });
// }
// readQuote("tuesday");        //calling the function

function writeAssignments() {
    //define a variable for the collection you want to create in Firestore to populate data
    var assignmentRef = db.collection("assignments");

    assignmentRef.add({
        code: "COMP1800",
        name: "Project 1", //replace with your own city?
        campus: "Vancouver",
        province: "BC",
        level: "easy",
        details: "A lovely place for lunch walk",
        length: 10,          //number value
        hike_time: 60,       //number value
        lat: 49.2467097082573,
        lng: -122.9187029619698,
        last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time
    });
    // assignmentRef.add({
    //     code: "COMP1510",
    //     name: "Project 1", //replace with your own city?
    //     campus: "Vancouver",
    //     province: "BC",
    //     level: "hard",
    //     details: "start asap, it is hard",
    //     length: 10,          //number value
    //     hike_time: 60,       //number value
    //     lat: 49.2467097082573,
    //     lng: -122.9187029619698,
    //     last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time
    // });
    // assignmentRef.add({
    //     code: "COMP1537",
    //     name: "Assignment 2", //replace with your own city?
    //     campus: "Vancouver",
    //     province: "BC",
    //     level: "Medium",
    //     details: "Prety easy but time consuming",
    //     length: 10,          //number value
    //     hike_time: 60,       //number value
    //     lat: 49.2467097082573,
    //     lng: -122.9187029619698,
    //     last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time
    // });
    // assignmentRef.add({
    //     code: "COMP1113",
    //     name: "Quiz 6", //replace with your own city?
    //     campus: "Vancouver",
    //     province: "BC",
    //     level: "easy",
    //     details: "Make sure to study",
    //     length: 10,          //number value
    //     hike_time: 60,       //number value
    //     lat: 49.2467097082573,
    //     lng: -122.9187029619698,
    //     last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time
    // });
    // assignmentRef.add({
    //     code: "COMP1712",
    //     name: "lab 9", //replace with your own city?
    //     campus: "Vancouver",
    //     province: "BC",
    //     level: "easy",
    //     details: "teamwork makes the dream work",
    //     length: 10,          //number value
    //     hike_time: 60,       //number value
    //     lat: 49.2467097082573,
    //     lng: -122.9187029619698,
    //     last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time
    // });
    // assignmentRef.add({
    //     code: "AM01",
    //     name: "Buntzen Lake Trail", //replace with your own city?
    //     city: "Anmore",
    //     province: "BC",
    //     level: "moderate",
    //     details: "Close to town, and relaxing",
    //     length: 10.5,      //number value
    //     hike_time: 80,     //number value
    //     lat: 49.3399431028579,
    //     lng: -122.85908496766939,
    //     last_updated: firebase.firestore.Timestamp.fromDate(new Date("March 10, 2022"))
    // });
    // assignmentRef.add({
    //     code: "NV01",
    //     name: "Mount Seymour Trail", //replace with your own city?
    //     city: "North Vancouver",
    //     province: "BC",
    //     level: "hard",
    //     details: "Amazing ski slope views",
    //     length: 8.2,        //number value
    //     hike_time: 120,     //number value
    //     lat: 49.38847101455571,
    //     lng: -122.94092543551031,
    //     last_updated: firebase.firestore.Timestamp.fromDate(new Date("January 1, 2023"))
    // });
}
//------------------------------------------------------------------------------
// Input parameter is a string representing the collection we are reading from
//------------------------------------------------------------------------------
function displayCardsDynamically(collection) {
    let cardTemplate = document.getElementById("assignmentCardTemplate"); // Retrieve the HTML element with the ID "hikeCardTemplate" and store it in the cardTemplate variable. 

    db.collection(collection).get()   //the collection called "hikes"
        .then(allAssignments => {
            //var i = 1;  //Optional: if you want to have a unique ID for each hike
            allAssignments.forEach(doc => { //iterate thru each doc
                var title = doc.data().name;       // get value of the "name" key
                var details = doc.data().details;  // get value of the "details" key
                var hikeCode = doc.data().code;    //get unique ID to each hike to be used for fetching right image
                var hikeLength = doc.data().length; //gets the length field
                var docID = doc.id;
                let newcard = cardTemplate.content.cloneNode(true); // Clone the HTML template to create a new card (newcard) that will be filled with Firestore data.

                //update title and text and image
                newcard.querySelector('.card-title').innerHTML = title;
                newcard.querySelector('.card-length').innerHTML = hikeLength + "km";
                newcard.querySelector('.card-text').innerHTML = details;
                newcard.querySelector('.card-image').src = `./images/${hikeCode}.jpg`; //Example: NV01.jpg
                newcard.querySelector('a').href = "eachHike.html?docID=" + docID;


                newcard.querySelector('i').id = 'save-' + docID;
                newcard.querySelector('i').onclick = () => saveBookmark(docID);  //guaranteed to be unique
                currentUser.get().then(userDoc => {
                    //get the user name
                    var bookmarks = userDoc.data().bookmarks;
                    if (bookmarks.includes(docID)) {
                        document.getElementById('save-' + docID).innerText = 'bookmark';
                    }
                })

                // newcard.querySelector('.card-length').innerHTML =
                //     "Length: " + doc.data().length + " km <br>" +
                //     "Duration: " + doc.data().hike_time + "min <br>" +
                //     "Last updated: " + doc.data().last_updated.toDate().toLocaleDateString();

                //Optional: give unique ids to all elements for future use
                // newcard.querySelector('.card-title').setAttribute("id", "ctitle" + i);
                // newcard.querySelector('.card-text').setAttribute("id", "ctext" + i);
                // newcard.querySelector('.card-image').setAttribute("id", "cimage" + i);

                //attach to gallery, Example: "hikes-go-here"
                document.getElementById(collection + "-go-here").appendChild(newcard);

                //i++;   //Optional: iterate variable to serve as unique ID
            })
        })
}

// displayCardsDynamically("hikes");  //input param is the name of the collection

//-----------------------------------------------------------------------------
// This function is called whenever the user clicks on the "bookmark" icon.
// It adds the hike to the "bookmarks" array
// Then it will change the bookmark icon from the hollow to the solid version.
//-----------------------------------------------------------------------------
// function saveBookmark(hikeDocID) {
//     currentUser.get().then(userDoc => {
//         var bookmarks = userDoc.data().bookmarks;
//         if (bookmarks.includes(hikeDocID)) {
//             currentUser.update({
//                 bookmarks: firebase.firestore.FieldValue.arrayRemove(hikeDocID)
//             })
//                 .then(function () {
//                     console.log("bookmark has been removed for" + hikeDocID);
//                     let iconID = 'save-' + hikeDocID;
//                     document.getElementById(iconID).innerText = 'bookmark_border';
//                 });
//         } else {
//             // Manage the backend process to store the hikeDocID in the database, recording which hike was bookmarked by the user.
//             currentUser.update({
//                 // Use 'arrayUnion' to add the new bookmark ID to the 'bookmarks' array.
//                 // This method ensures that the ID is added only if it's not already present, preventing duplicates.
//                 bookmarks: firebase.firestore.FieldValue.arrayUnion(hikeDocID)
//             })
//                 // Handle the front-end update to change the icon, providing visual feedback to the user that it has been clicked.
//                 .then(function () {
//                     console.log("bookmark has been saved for" + hikeDocID);
//                     let iconID = 'save-' + hikeDocID;
//                     //console.log(iconID);
//                     //this is to change the icon of the hike that was saved to "filled"
//                     document.getElementById(iconID).innerText = 'bookmark';
//                 });
//         }
//     });
// }
