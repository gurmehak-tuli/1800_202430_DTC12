const params = new URLSearchParams(window.location.search); // Retrieves the query parameters from the URL.
const assignmentId = params.get("assignmentId"); // Retrieves the assignment ID from the query parameters.
const classId = params.get("classId"); // Retrieves the class ID from the query parameters.

firebase.auth().onAuthStateChanged(user => { // Checks if a user is signed in.
    if (user && assignmentId && classId) { // Checks if a user is signed in and the assignment ID and class ID are valid.
        const assignmentRef = db.collection("users")
            .doc(user.uid)
            .collection("classes")
            .doc(classId)
            .collection("assignments")
            .doc(assignmentId);

        assignmentRef.get().then(doc => { // Retrieves the assignment document from Firestore. #READ
            if (doc.exists) { 
                const data = doc.data();
                console.log("Fetched data:", data);

                document.getElementById("title").value = data.title || ""; 
                document.getElementById("description").value = data.description || "";
                document.getElementById("dueDate").value = data.dueDate || "";
                document.getElementById("urgency").value = data.urgency || "Low";

                if (data.type && ["Quiz", "Test", "Project", "Assignment", "Homework", "Midterm"].includes(data.type)) {
                    document.getElementById("type").value = data.type;
                    document.getElementById("otherTypeContainer").style.display = "none";
                } else {
                    document.getElementById("type").value = "Other";
                    document.getElementById("otherTypeContainer").style.display = "block";
                    document.getElementById("otherType").value = data.type || "";
                }
            } else {
                alert("Assignment not found.");
                window.location.href = `seeAssignments.html?classId=${classId}`; // Redirects to the view assignments page if Assigment not found.
            }
        }).catch(error => {
            console.error("Error fetching assignment:", error);
        });

        document.getElementById("saveButton").addEventListener("click", (e) => { // Adds an event listener to the save button.
            e.preventDefault(); 

            const typeDropdown = document.getElementById("type").value;
            const otherType = document.getElementById("otherType").value.trim();
            const type = (typeDropdown === "Other" && otherType) ? otherType : typeDropdown;

            const updatedData = { // Creates an object with the updated assignment data. #UPDATE
                title: document.getElementById("title").value.trim(),
                description: document.getElementById("description").value.trim(),
                dueDate: document.getElementById("dueDate").value,
                urgency: document.getElementById("urgency").value,
                type: type
            };

            assignmentRef.update(updatedData) // Updates the assignment data in Firestore. #UPDATE
                .then(() => {
                    alert("Assignment updated successfully."); 
                    window.location.href = `seeAssignments.html?classId=${classId}`; // Redirects to the view assignments page after updating the assignment.
                })
                .catch(error => {
                    console.error("Error updating assignment:", error);
                });
        });

        document.getElementById("cancelButton").addEventListener("click", () => { // Adds an event listener to the cancel button.
            window.location.href = `seeAssignments.html?classId=${classId}`; // Redirects to the view assignments page if the cancel button is clicked.
        });

        document.getElementById("type").addEventListener("change", toggleOtherTypeInput); // Adds an event listener to the type dropdown.
    } else {
        alert("Invalid or missing assignment details.");
        window.location.href = "academics.html"; // Redirects to the academics page if the assignment details are invalid or missing.
    }
});

function toggleOtherTypeInput() { // Function to toggle the visibility of the "Other" type input field.
    const typeDropdown = document.getElementById("type"); 
    const otherTypeContainer = document.getElementById("otherTypeContainer"); 

    if (typeDropdown.value === "Other") { 
        otherTypeContainer.style.display = "block";
    } else {
        otherTypeContainer.style.display = "none";
        document.getElementById("otherType").value = "";
    }
}
