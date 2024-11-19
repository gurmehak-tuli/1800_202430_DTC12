// var currentUser

// firebase.auth().onAuthStateChanged((user) => {
//     currentUser = user;
// })

// function getAllAssignments() {
//     db.collection("users").doc("hx6UKSV0M4QjljI830sJZUL9Idw2").collection("classes").get().then(classes => {
//         for (theclass of classes.docs) {
//             theclassdata = theclass.data();

//             // displayClassName({ ...theclassdata.data(), id: theclassdata.id })
//             // getAssignmentInfo(theclass.ref.collection("assignments"))

//         }
//     })
// }

// function displayClassName(theClass) {
//     theName = theClass.name;
//     id = theClass.id;

//     new_URL = new URL("addassignments.html", window.location.href);
//     new_URL.searchParams.append("id", theClass.id);

//     classes = document.getElementById("classes");
//     classes.innerHTML +=
//         `<div class="row">
//         <div class="col-md-4" id="comp1510">
//             <h2>${theName}</h2>
//             <ul class="list-group" id="assignment-list-comp1510"></ul>
//             <a href="${new_URL}" class="btn btn-primary mt-2">Add Assignment</a>
//         </div>
//     </div>`;
// }


// function getAssignmentInfo(assignments) {
//     let params = new URL(window.location.href); //get URL of search bar
//     let ID = params.searchParams.get("docID"); //get value for key "id"
//     console.log(ID);

//     // doublecheck: is your collection called "Reviews" or "reviews"?

//     assignments.get().then(doc => {
//         for (assignment of doc.docs) {

//             assignmentdoc = assignment.data();
//             displayAssignmentInfo({ ...assignmentdoc, id: assignment.id });

//             // thisAssignment = doc.data();
//             // assignmentCode = doc.data().code;
//             // assignmentName = doc.data().name;



//             document.getElementById("assignmentName").innerHTML = assignmentName;
//             // let imgEvent = document.querySelector("#assignmentImage");       
//             // imgEvent.src = "../images/" + assignmentCode + ".jpg";
//         }
//     })
// }

// function displayAssignmentInfo(assignment) {

//     name = assignment.name;

// }


// function saveAssigmentDocumentIDAndRedirect() {
//     let params = new URL(window.location.href) //get the url from the search bar
//     let ID = params.searchParams.get("docID");
//     localStorage.setItem('assignmentDocID', ID);
//     window.location.href = 'addassignment.html';
// }

// var assignemntDocID = localStorage.getItem("assignmentDocID");    //visible to all functions on this page

// function getAssignmentName(id) {
//     db.collection("added assignemnts")
//         .doc(id)
//         .get()
//         .then((thisAssignment) => {
//             var hikeName = thisAssignment.data().name;
//             document.getElementById("assignmentName").innerHTML = hikeName;
//         });
// }

// getAssignmentName(assignemntDocID);

// function writeAssignments() {
//     window.location.href = 'thanks.html';
// }
// var currentUser = localStorage.getItem("currentUser");
// function populateAssignmentReviews() {
//     console.log("Fetching assignment info...");
//     let assignmentCardTemplate = document.getElementById("assignmentCardTemplate");
//     let assignmentCardGroup = document.getElementById("assignmentCardGroup");

//     let params = new URL(window.location.href); // Get the URL from the search bar
//     let assignmentID = params.searchParams.get("docID");

//     db.collection("added assignments")
//         .where("assignmentDocID", "==", assignmentID)
//         .get()
//         .then((allAssignments) => {
//             let assignments = allAssignments.docs;
//             console.log("assignemnts added:", assignments);
//             assignment.forEach((doc) => {
//                 let title = document.data().title;
//                 let description = document.data().description;
//                 let dueDate = document.data().dueDate;
//                 let urgency = document.data().urgency;
//                 let time = document.data().timestamp.toDate();
//                 console.log(time);

//                 let reviewCard = assignmentCardTemplate.content.cloneNode(true);
//                 reviewCard.querySelector(".title").innerHTML = title;
//                 reviewCard.querySelector(".due-date").innerHTML = `Due Date: ${dueDate}`;
//                 reviewCard.querySelector(".description").innerHTML = `Description: ${description}`;
//                 reviewCard.querySelector(".urgency").innerHTML = `Urgency: ${urgency}`;
//                 reviewCard.querySelector(".time").innerHTML = new Date(time).toLocaleString();

//                 assignmentCardGroup.appendChild(reviewCard);
//             });
//         });
// }

// getAssignmentInfo();
// populateAssignmentReviews();

var assignmentDocID = localStorage.getItem("assignmentDocID");    //visible to all functions on this page

function getAssignmentName(id) {
    db.collection("added assignemnts")
        .doc(id)
        .get()
        .then((thisAssignment) => {
            var hikeName = thisAssignment.data().name;
            document.getElementById("assignmentName").innerHTML = hikeName;
        });
}


function addAssignment() {
    console.log("Adding assignment...");
    let assignmentTitle = document.getElementById("title").value;
    let assignmentDescription = document.getElementById("description").value;
    let assignmentDueDate = document.getElementById("due date").value;
    let assignmentUrgancy = document.getElementById("urgancy").value;
    
    
    console.log(assignmentTitle, assignmentDescription, assignmentDueDate, assignmentUrgancy);

    var user = firebase.auth().currentUser;
    if (user) {
        var currentUser = db.collection("added assignments").doc(user.uid);
        var userID = user.uid;

        db.collection("added assignments").add({
            // assignmentDocID: assignmentDocID,
            // assignementID: assignmentID,
            title: assignmentTitle,
            description: assignmentDescription,
            dueDate: assignmentDueDate,
            urgency: assignmentUrgancy,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        }).then(() => {
            window.location.href = "thanks.html"; 
        });
    } else {
        console.log("No user is signed in");
        window.location.href = 'review.html';
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const assignmentsList = document.getElementById("assignments-list");

    if (!assignmentsList) return;

    db.collection("added assignments")
        .orderBy("dueDate") 
        .get()
        .then(snapshot => {
            if (snapshot.empty) {
                const noAssignments = document.createElement("li");
                noAssignments.className = "list-group-item";
                noAssignments.textContent = "No upcoming assignments.";
                assignmentsList.appendChild(noAssignments);
                return;
            }

            snapshot.forEach(doc => {
                const assignment = doc.data();

                const listItem = document.createElement("li");
                listItem.className = "list-group-item d-flex justify-content-between align-items-center";

                const name = document.createElement("span");
                name.textContent = `${assignment.course}: ${assignment.title}`;

                const dueDate = document.createElement("span");
                dueDate.className = "badge bg-primary rounded-pill";
                dueDate.textContent = new Date(assignment.dueDate.days).toLocaleDateString();

                listItem.appendChild(name);
                listItem.appendChild(dueDate);
                assignmentsList.appendChild(listItem);
            });
        })
        .catch(error => {
            console.error("Error fetching assignments: ", error);
            const errorItem = document.createElement("li");
            errorItem.className = "list-group-item text-danger";
            errorItem.textContent = "Failed to load assignments.";
            assignmentsList.appendChild(errorItem);
        });
});