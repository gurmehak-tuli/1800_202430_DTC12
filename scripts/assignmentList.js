// var hikeDocID = localStorage.getItem("added assignments");    //visible to all functions on this page

// function getHikeName(id) {
//     db.collection("hikes")
//         .doc(id)
//         .get()
//         .then((thisHike) => {
//             var hikeName = thisHike.data().name;
//             document.getElementById("hikeName").innerHTML = hikeName;
//         });
// }

// function loadAssignments() {
//     const db = firebase.firestore();
//     const userID = user.uid;
//     const classID = classes.uid;
//     const assignmentList = db.collection("users").doc(userID).collection("classes").doc(classID).collection("assignments");
//     assignmentList.get().then((querySnapshot) => {
//         querySnapshot.forEach((doc) => {
//             const assignment = doc.data();
//             const listItem = document.createElement("li");
//             listItem.innerHTML = `
//                 <strong>${assignment.name}</strong> (${assignment.dueDate})<br>
//                 Description: ${assignment.description}<br>
//                 Priority: ${assignment.priority}<br>
//                 Completed: ${assignment.completed}<br>
//                 <button onclick="editAssignment('${doc.id}')">Edit</button>
//                 <button onclick="deleteAssignment('${doc.id}')">Delete</button>
//             `;
//             assignmentList.appendChild(listItem);
//         })
//             .catch((error) => {
//                 console.error("Error fetching favorites: ", error);
//                 document.getElementById("favoritesList").innerHTML =
//                     "<li>Error loading favorites. Please try again later.</li>";
//             });
//     });
// }
// loadAssignments();

function loadAssignments(userID) {
    const db = firebase.firestore();
    const classesRef = db.collection("users").doc(userID).collection("classes");

    classesRef.get().then((querySnapshot) => {
        querySnapshot.forEach((classDoc) => {
            const assignmentsRef = classDoc.ref.collection("assignments");

            assignmentsRef.get().then((assignmentSnapshot) => {
                const assignmentListElement = document.getElementById("assignments-list");
                assignmentSnapshot.forEach((doc) => {
                    const assignment = doc.data();
                    const listItem = document.createElement("li");
                    listItem.innerHTML = `
                        <strong>${assignment.name}</strong> (${assignment.dueDate})<br>
                        Description: ${assignment.description}<br>
                        Priority: ${assignment.priority}<br>
                        Completed: ${assignment.completed}<br>
                        <button onclick="editAssignment('${doc.id}')">Edit</button>
                        <button onclick="deleteAssignment('${doc.id}')">Delete</button>
                    `;
                    assignmentListElement.appendChild(listItem);
                });
            }).catch((error) => {
                console.error("Error fetching assignments: ", error);
            });
        });
    }).catch((error) => {
        console.error("Error fetching classes: ", error);
    });
}
loadAssignments();