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


function writeAssignments() {
    //define a variable for the collection you want to create in Firestore to populate data
    const classes = db.collection("classes");

    classes.add({
        code: "COMP1800",
        profName: "Hasam Alizadeh",
        campus: "Vancouver",
        lectures: "Tuesday 10:20 - 12:20",
        details: "Will go over...",

        last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time
    });
    classes.add({
        code: "COMP1510",
        profName: "Chris Tomphson",
        campus: "Vancouver",
        lectures: "Thursday 2:30 - 5:20",
        details: "Will go over...",

        last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time
    });
    classes.add({
        code: "COMP1537",
        profName: "Assignment 2",
        campus: "Vancouver",
        lectures: "tuesday 8:30 - 10:20",
        details: "Will go over...",

        last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time
    });
    classes.add({
        code: "COMP1113",
        profName: "Julian Fekety",
        campus: "Vancouver",
        lectures: "Wednesday 8:30 - 10:20",
        details: "Will go over...",

        last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time
    });
    classes.add({
        code: "COMP1712",
        profName: "Maryam",
        campus: "Vancouver",
        province: "Wednesday 12:30 - 2:20",
        details: "Will go over...",

        last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time
    });
    classes.add({
        code: "COMP1116",
        profName: "Sam Lee",
        campus: "Vancouver",
        lectures: "Friday 8:30 - 10:20",
        details: "Will go over...",

        last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time
    });


}

function displayCardsDynamically(collection) {
    let cardTemplate = document.getElementById("assignmentCardTemplate");

    db.collection(collection).get()
        .then(allAssignments => {
            allAssignments.forEach(doc => {
                var assignmentData = doc.data();
                var assignmentCode = assignmentData.code;
                var assignmentName = assignmentData.name;
                var details = assignmentData.details;
                // var level = assignmentData.level;
                var campus = assignmentData.campus;
                // var imageSrc = assignmentData.image;
                var docID = doc.id;

                let classContainer = document.getElementById(`assigmentCardGroup`);
                if (!classContainer) {
                    classContainer = document.createElement("div");
                    classContainer.id = `class-${assignmentCode}`;
                    classContainer.classList.add("class-container");

                    let classTitle = document.createElement("h3");
                    classTitle.innerHTML = assignmentCode;
                    classContainer.appendChild(classTitle);

                    document.getElementById(collection + "-go-here").appendChild(classContainer);
                }

                let newcard = cardTemplate.content.cloneNode(true);

                newcard.querySelector('.card-title').innerHTML = assignmentName;
                newcard.querySelector('.card-text').innerHTML = `${details} <br> Campus: ${campus} <br>`;

                newcard.querySelector('.card-image').src = `./images/${assignmentCode}.jpg`;

                newcard.querySelectorAll('a').forEach(button => {
                    button.href = `addedassignments.html?docID=${docID}`;
                })
                newcard.querySelectorAll('a').forEach(button => {
                    button.href = `addassignments.html?docID=${docID}`;
                })
                
                // .href = "addassignments.html?docID=" + docID;

                newcard.querySelector('i').id = 'save-' + docID;
                newcard.querySelector('i').onclick = () => saveBookmark(docID);

                // currentUser.get().then(userDoc => {
                //     var bookmarks = userDoc.data().bookmarks || [];
                //     if (bookmarks.includes(docID)) {
                //         document.getElementById('save-' + docID).innerText = 'bookmark';
                //     }
                // });

                classContainer.appendChild(newcard);
            });
        });
}


function addAssignment() {
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const dueDate = document.getElementById("due date").value; 
    const urgency = document.getElementById("urgancy").value; 

    const user = firebase.auth().currentUser;
    if (!user) {
        alert("You need to be logged in to add assignments!");
        return;
    }

    db.collection("users")
        .doc(user.uid)
        .collection("added assignments")
        .add({
            title: title,
            description: description,
            dueDate: dueDate,
            urgency: urgency,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        .then(() => {
            alert("Assignment added successfully!");
            window.location.href = "addedassignments.html"; 
        })
        .catch((error) => {
            console.error("Error adding assignment: ", error);
            alert("Error adding assignment. Please try again.");
        });
}

function addAssignment() {
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const dueDate = document.getElementById("due date").value;
    const urgency = document.getElementById("urgancy").value; 
    const user = firebase.auth().currentUser;
    if (!user) {
        alert("You need to be logged in to add assignments!");
        return;
    }

    db.collection("users")
        .doc(user.uid)
        .collection("added assignments")
        .add({
            title: title,
            description: description,
            dueDate: dueDate,
            urgency: urgency,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        .then(() => {
            alert("Assignment added successfully!");
            window.location.href = "addedassignments.html"; 
        })
        .catch((error) => {
            console.error("Error adding assignment: ", error);
            alert("Error adding assignment. Please try again.");
        });
}

