var currentUser;
function writeClasses(userId) {
    const classesRef = db.collection("users").doc(userId).collection("classes");

    return Promise.all([
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
            profName: "Chris Tomphson",
            campus: "Vancouver",
            lectures: "Thursday 2:30 - 5:20",
            details: "Will go over...",

            last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time
        }),
        classesRef.add({
            name: "Web Development",
            code: "COMP1537",
            profName: "Nabil",
            campus: "Vancouver",
            lectures: "tuesday 8:30 - 10:20",
            details: "Will go over...",

            last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time
        }),
        classesRef.add({
            name: "Mathematics",
            code: "COMP1113",
            profName: "Julian Fekety",
            campus: "Vancouver",
            lectures: "Wednesday 8:30 - 10:20",
            details: "Will go over...",

            last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time
        }),
        classesRef.add({
            name: "Business Analysis",
            code: "COMP1712",
            profName: "Maryam",
            campus: "Vancouver",
            province: "Wednesday 12:30 - 2:20",
            details: "Will go over...",

            last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time
        }),
        classesRef.add({
            name: "Comunications",
            code: "COMP1116",
            profName: "Sam Lee",
            campus: "Vancouver",
            lectures: "Friday 8:30 - 10:20",
            details: "Will go over...",

            last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time
        }),
    ]);
};

function writeAssignments(userId) {
    const classesRef = db.collection("users").doc(userId).collection("classes");

    return classesRef.get().then((classSnapshot) => {
        const assignmentPromises = [];
        classSnapshot.forEach((classDoc) => {
            console.log(`Adding assignments to class: ${classDoc.id}`);
            const assignmentsRef = classDoc.ref.collection("assignments");

            assignmentPromises.push(
                assignmentsRef.add({
                    type: "Assignment",
                    title: "Assignment 1",
                    description: "Complete the first task",
                    dueDate: "2024-12-01",
                    urgency: "High",
                    timestamp: firebase.firestore.FieldValue.serverTimestamp()
                }),

                assignmentsRef.add({
                    type: "Assignment",
                    title: "Assignment 2",
                    description: "Prepare for the midterm exam",
                    dueDate: "2024-12-15",
                    urgency: "Medium",
                    timestamp: firebase.firestore.FieldValue.serverTimestamp()
                }),

                assignmentsRef.add({
                    type: "Assignment",
                    title: "Assignment 3",
                    description: "Submit the group project",
                    dueDate: "2025-01-10",
                    urgency: "Low",
                    timestamp: firebase.firestore.FieldValue.serverTimestamp()
                }),
            );
            console.log(`Assignments added to class: ${classDoc.id}`);
        });
        return Promise.all(assignmentPromises);
    });
}


function populateUserInfo() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            currentUser = db.collection("users").doc(user.uid)
            currentUser.get().then(userDoc => {
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

function editUserInfo() {
    document.getElementById('personalInfoFields').disabled = false;
}

function saveUserInfo() {
    let userName = document.getElementById('nameInput').value;
    let userSchool = document.getElementById('schoolInput').value;
    let userSet = document.getElementById('setInput').value;
    let userCity = document.getElementById('cityInput').value;
    let userCountry = document.getElementById('countryInput').value;
    if (!userName || !userSchool || !userSet || !userCity || !userCountry) {
        alert("Please fill out all fields.");
        return
    }

    currentUser.update({
        name: userName,
        school: userSchool,
        set: userSet,
        city: userCity,
        country: userCountry,
        firstTime: false
    })
        .then(() => {
            console.log("Document successfully updated!");
            writeClasses(firebase.auth().currentUser.uid).then(() => {
                writeAssignments(firebase.auth().currentUser.uid).then(() => {
                    window.location.href = "main.html";
                });
            });

        })
        .catch(error => {
            console.error("Error updating document: ", error);
        });

    document.getElementById('personalInfoFields').disabled = true;
}
populateUserInfo();
editUserInfo();
