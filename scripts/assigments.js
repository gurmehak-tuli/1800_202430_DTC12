var currentUser

firebase.auth().onAuthStateChanged((user) => {
    currentUser = user;
})



function getAllAssignments() {
    db.collection("users").doc("hx6UKSV0M4QjljI830sJZUL9Idw2").collection("classes").get().then(classes => {
        for (theclass of classes.docs) {
            theclassdata = theclass.data();

            // displayClassName({ ...theclassdata.data(), id: theclassdata.id })
            // getAssignmentInfo(theclass.ref.collection("assignments"))

        }
    })
}

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

function populateAssignmentReviews() {
    console.log("Fetching assignment info...");
    let assignmentCardTemplate = document.getElementById("assignmentCardTemplate");
    let assignmentCardGroup = document.getElementById("assignmentCardGroup");

    let params = new URL(window.location.href); // Get the URL from the search bar
    let assignmentID = params.searchParams.get("docID");

    // Double-check: is your collection called "Reviews" or "reviews"?
    db.collection("assignments")
        .where("assignmentDocID", "==", assignmentID)
        .get()
        .then((allReviews) => {
            let reviews = allReviews.docs;
            console.log("Reviews found:", reviews);
            reviews.forEach((doc) => {
                let title = doc.data().title;
                let description = doc.data().description;
                let dueDate = doc.data().dueDate;
                let urgency = doc.data().urgency;
                let time = doc.data().timestamp.toDate();
                console.log(time);

                let reviewCard = assignmentCardTemplate.content.cloneNode(true);
                reviewCard.querySelector(".title").innerHTML = title;
                reviewCard.querySelector(".due-date").innerHTML = `Due Date: ${dueDate}`;
                reviewCard.querySelector(".description").innerHTML = `Description: ${description}`;
                reviewCard.querySelector(".urgency").innerHTML = `Urgency: ${urgency}`;
                reviewCard.querySelector(".time").innerHTML = new Date(time).toLocaleString();

                assignmentCardGroup.appendChild(reviewCard);
            });
        });
}

//getAssignmentInfo();
//populateAssignmentReviews();
