var currentUser;
function writeClasses(userId) { // Function to write classes to Firestore
    const classesRef = db.collection("users").doc(userId).collection("classes"); // Creates a reference to the classes collection for the current user.

    return Promise.all([ // Adds multiple classes to the Firestore database. (Page does not redirect until classes are all added) #WRITE
        classesRef.add({
            name: "Projects 1",
            code: "COMP1800",
            profName: "Hasam Alizadeh",
            campus: "Vancouver",
            lectures: "Tuesday 10:20 - 12:20",
            details: "Will go over...",

            last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time
        }),
        classesRef.add({
            name: "Programing Methods",
            code: "COMP1510",
            profName: "Christopher Thompson",
            campus: "Vancouver",
            lectures: "Thursday 2:30 - 5:20",
            details: "Will go over...",

            last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time
        }),
        classesRef.add({
            name: "Web Development 1",
            code: "COMP1537",
            profName: "Nabil Al-Rousan",
            campus: "Vancouver",
            lectures: "tuesday 8:30 - 10:20",
            details: "Will go over...",

            last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time
        }),
        classesRef.add({
            name: "Applied Mathematics",
            code: "COMP1113",
            profName: "Julian Fekety",
            campus: "Vancouver",
            lectures: "Wednesday 8:30 - 10:20",
            details: "Will go over...",

            last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time
        }),
        classesRef.add({
            name: "Business Analysis and System Design",
            code: "COMP1712",
            profName: "Maryam Khezrzadeh",
            campus: "Vancouver",
            province: "Wednesday 12:30 - 2:20",
            details: "Will go over...",

            last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time
        }),
        classesRef.add({
            name: "Business Communications 1",
            code: "COMP1116",
            profName: "Sam Lee",
            campus: "Vancouver",
            lectures: "Friday 8:30 - 10:20",
            details: "Will go over...",

            last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time
        }),
    ]);
};

function writeAssignments(userId) { // Function to write 3 placeholder assignments to Firestore #WRITE
    const classesRef = db.collection("users").doc(userId).collection("classes"); 

    return classesRef.get().then((classSnapshot) => { // Retrieves all the classes for the current user.
        const assignmentPromises = []; // Array to store the assignment promises.
        classSnapshot.forEach((classDoc) => { // Loops through each class document.
            console.log(`Adding assignments to class: ${classDoc.id}`); 
            const assignmentsRef = classDoc.ref.collection("assignments");

            assignmentPromises.push( // Adds multiple assignments to the Firestore database.
                assignmentsRef.add({ // Adds the first assignment to the Firestore database. #WRITE
                    type: "Assignment",
                    title: "Assignment 1",
                    description: "Complete the first task",
                    dueDate: "2024-12-01",
                    urgency: "High",
                    completed: false,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp()
                }),

                assignmentsRef.add({ // Adds the second assignment to the Firestore database. #WRITE
                    type: "Assignment",
                    title: "Assignment 2",
                    description: "Prepare for the midterm exam",
                    dueDate: "2024-12-15",
                    urgency: "Medium",
                    completed: false,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp()
                }),

                assignmentsRef.add({ // Adds the third assignment to the Firestore database. #WRITE
                    type: "Assignment",
                    title: "Assignment 3",
                    description: "Submit the group project",
                    dueDate: "2025-01-10",
                    urgency: "Low",
                    completed: false,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp()
                }),
            );
            console.log(`Assignments added to class: ${classDoc.id}`);
        });
        return Promise.all(assignmentPromises); // Returns a promise that resolves when all assignments have been added. (Page does not redirect until all assignments are added)
    });
}


function populateUserInfo() { // Function to populate the user's information on the page in a form for the first time.
    firebase.auth().onAuthStateChanged(user => {
        if (user) { // Checks if a user is signed in.
            currentUser = db.collection("users").doc(user.uid)
            currentUser.get().then(userDoc => { // Retrieves the user's document from Firestore.
                if (userDoc.exists) {
                    let userName = userDoc.data().name;
                    let userSchool = userDoc.data().school;
                    let userSet = userDoc.data().set;
                    let userCity = userDoc.data().city;
                    let userCountry = userDoc.data().country;

                    if (userName != null) {
                        document.getElementById("nameInput").value = userName;
                    }
                    if (userSchool != null) {
                        document.getElementById("schoolInput").value = userSchool;
                    }
                    if (userSet != null) {
                        document.getElementById("setInput").value = userSet;
                    }
                    if (userCity != null) {
                        document.getElementById("cityInput").value = userCity;
                    }
                    if (userCountry != null) {
                        document.getElementById("countryInput").value = userCountry;
                    }
                } else {
                    console.log("User document does not exist in Firestore.");
                }
            });
        } else {
            console.log("No user is signed in");
        }
    });
}

function editUserInfo() { // Function to enable editing of user information.
    document.getElementById('personalInfoFields').disabled = false;
}

function saveUserInfo() { // Function to save the user's information to Firestore.
    let userName = document.getElementById('nameInput').value;
    let userSchool = document.getElementById('schoolInput').value;
    let userSet = document.getElementById('setInput').value;
    let userCity = document.getElementById('cityInput').value;
    let userCountry = document.getElementById('countryInput').value;
    if (!userName || !userSchool || !userSet || !userCity || !userCountry) { // Checks if any of the fields are empty.
        alert("Please fill out all fields.");
        return
    }

    currentUser.update({ // Updates the user's document in Firestore with the new information. #UPDATE
        name: userName,
        school: userSchool,
        set: userSet,
        city: userCity,
        country: userCountry,
        firstTime: false
    })
        .then(() => { 
            console.log("Document successfully updated!");
            writeClasses(firebase.auth().currentUser.uid).then(() => { // Writes the classes to Firestore.
                writeAssignments(firebase.auth().currentUser.uid).then(() => { // Writes the assignments to Firestore.
                    window.location.href = "main.html"; // Redirects to the main page after the user's information has been saved and classes and assignments are done being written to the database.
                });
            });

        })
        .catch(error => {
            console.error("Error updating document: ", error);
        });

    document.getElementById('personalInfoFields').disabled = true;
}
populateUserInfo(); // Calls the function to populate the user's information on the page.
editUserInfo(); // Calls the function to enable editing of user information.
