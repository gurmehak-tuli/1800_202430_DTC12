function addAssignment() {
    const assignmentData = getAssignmentFormData();

    if (!validateAssignmentData(assignmentData)) {
        return;
    }

    saveAssignmentToFirestore(assignmentData)
        .then(() => {
            alert("Assignment added successfully!");
            window.location.href = "academics.html";
        })
        .catch((error) => {
            console.error("Error adding assignment: ", error);
            alert("An error occurred while adding the assignment. Please try again.");
        });
}

function getAssignmentFormData() {
    const title = document.getElementById("title").value.trim();
    const description = document.getElementById("description").value.trim();
    const dueDate = document.getElementById("dueDate").value;
    const urgency = document.getElementById("urgency").value;
    const typeDropdown = document.getElementById("type").value;
    const otherType = document.getElementById("otherType") ? document.getElementById("otherType").value.trim() : "";
    const type = (typeDropdown === "Other" && otherType) ? otherType : typeDropdown;

    const classId = new URLSearchParams(window.location.search).get("classId");

    return { title, description, dueDate, urgency, type, classId };
}

function toggleOtherTypeInput() {
    const typeDropdown = document.getElementById("type");
    const otherTypeContainer = document.getElementById("otherTypeContainer");

    if (typeDropdown.value === "Other") {
        otherTypeContainer.style.display = "block";
    } else {
        otherTypeContainer.style.display = "none";
        document.getElementById("otherType").value = "";
    }
}

function validateAssignmentData({ title, description, dueDate, urgency, type, classId }) {
    if (!title || !description || !dueDate || !urgency || !type) {
        alert("Please fill in all fields.");
        return false;
    }

    if (!classId) {
        alert("No class selected. Please try again.");
        return false;
    }

    const currentUser = firebase.auth().currentUser;
    if (!currentUser) {
        alert("You must be logged in to add an assignment.");
        return false;
    }

    return true;
}

function saveAssignmentToFirestore({ title, description, dueDate, urgency, type, classId }) {
    const userId = firebase.auth().currentUser.uid;

    const assignmentsRef = db
        .collection("users")
        .doc(userId)
        .collection("classes")
        .doc(classId)
        .collection("assignments");

    return assignmentsRef.add({
        title: title,
        description: description,
        dueDate: dueDate,
        urgency: urgency,
        type: type,
        completed: false,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
}
