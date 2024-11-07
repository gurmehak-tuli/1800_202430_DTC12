// Retrieve assignment ID from localStorage
var assignmentDocID = localStorage.getItem("assignmentDocID");

// Function to get assignment name by document ID and display it
function getAssignmentName(id) {
    db.collection("assignments")
        .doc(id)
        .get()
        .then((thisAssignment) => {
            var assignmentName = thisAssignment.data().name;
            document.getElementById("assignmentName").innerHTML = assignmentName;
        });
}

// Call the function to get assignment name and display it
getAssignmentName(assignmentDocID);

// Function to handle assignment submission
function submitAssignment() {
    let assignmentTitle = document.getElementById("assignmentName").value;
    let assignmentDescription = document.getElementById("shortDescription").value;
    let assignmentDueDate = document.getElementById("dueDate").value;
    let assignmentUrgency = document.getElementById("urgency").value;

    // Get the current authenticated user
    var user = firebase.auth().currentUser;

    if (user) {
        var currentUser = db.collection("users").doc(user.uid);
        var userID = user.uid;

        // Add assignment details to the "assignments" collection
        db.collection("assignments").add({
            assignmentDocID: assignmentDocID,
            userID: userID,
            title: assignmentTitle,
            description: assignmentDescription,
            dueDate: assignmentDueDate,
            urgency: assignmentUrgency,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        }).then(() => {
            window.location.href = "thanks.html"; // Redirect to the thank-you page
        });
    } else {
        console.log("No user is signed in");
        window.location.href = 'assignment.html';
    }
}
