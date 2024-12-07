function addAssignment() { // Function to add a new assignment to the Firestore database.
    const assignmentData = getAssignmentFormData(); // Retrieves the assignment data from the form fields.

    if (!validateAssignmentData(assignmentData)) { // Adds a new assignment to the Firestore database after validating form data. #WRITE
        return;
    }

    saveAssignmentToFirestore(assignmentData) // Saves the assignment to the Firestore database.
        .then(() => {
            alert("Assignment added successfully!"); // Alerts the user that the assignment was added successfully.
            window.location.href = "academics.html"; // Redirects to the academics page after adding the assignment.
        })
        .catch((error) => {
            console.error("Error adding assignment: ", error); // Logs an error message if the assignment cannot be added.
            alert("An error occurred while adding the assignment. Please try again."); // Alerts the user if an error occurs.
        });
}

function getAssignmentFormData() {
    const title = document.getElementById("title").value.trim(); // Retrieves the assignment data from the form fields.
    const description = document.getElementById("description").value.trim(); // Trims the data to remove any leading or trailing whitespace.
    const dueDate = document.getElementById("dueDate").value; // Retrieves the due date from the form field.
    const urgency = document.getElementById("urgency").value; // Retrieves the urgency level from the form field.
    const typeDropdown = document.getElementById("type").value; // Retrieves the assignment type from the form field.
    const otherType = document.getElementById("otherType") ? document.getElementById("otherType").value.trim() : ""; // Retrieves the "Other" type if selected.
    const type = (typeDropdown === "Other" && otherType) ? otherType : typeDropdown; // Sets the type to "Other" if selected, otherwise uses the selected type.

    const classId = new URLSearchParams(window.location.search).get("classId"); // Retrieves the class ID from the URL query parameters.

    return { title, description, dueDate, urgency, type, classId }; // Returns an object containing the assignment data.
}

function toggleOtherTypeInput() { // Function to toggle the visibility of the "Other" type input field.
    const typeDropdown = document.getElementById("type"); // Retrieves the assignment type dropdown element.
    const otherTypeContainer = document.getElementById("otherTypeContainer"); // Retrieves the "Other" type input container element.

    if (typeDropdown.value === "Other") { // Checks if the selected type is "Other" and displays the input field if true.
        otherTypeContainer.style.display = "block"; 
    } else { // Hides the input field if the selected type is not "Other".
        otherTypeContainer.style.display = "none";
        document.getElementById("otherType").value = "";
    }
}

function validateAssignmentData({ title, description, dueDate, urgency, type, classId }) { // Function to validate the assignment data.
    if (!title || !description || !dueDate || !urgency || !type) { // Checks if any of the required fields are empty.
        alert("Please fill in all fields.");
        return false;
    }

    if (!classId) { // Checks if a class has been selected.
        alert("No class selected. Please try again.");
        return false;
    }

    const currentUser = firebase.auth().currentUser; // Retrieves the current user from Firebase authentication.
    if (!currentUser) {
        alert("You must be logged in to add an assignment.");
        return false;
    }

    return true;
}

function saveAssignmentToFirestore({ title, description, dueDate, urgency, type, classId }) { // Function to save the assignment to the Firestore database. #WRITE
    const userId = firebase.auth().currentUser.uid; // Retrieves the current user's ID from Firebase authentication.

    const assignmentsRef = db // Creates a reference to the assignments collection for the current user, class, and assignment.
        .collection("users")
        .doc(userId)
        .collection("classes")
        .doc(classId)
        .collection("assignments");

    return assignmentsRef.add({ // Adds the assignment data to the Firestore database.
        title: title,
        description: description,
        dueDate: dueDate,
        urgency: urgency,
        type: type,
        completed: false,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
}
