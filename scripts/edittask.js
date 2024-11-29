const params = new URLSearchParams(window.location.search);
const assignmentId = params.get("assignmentId");
const classId = params.get("classId");

firebase.auth().onAuthStateChanged(user => {
    if (user && assignmentId && classId) {
        const assignmentRef = db.collection("users")
            .doc(user.uid)
            .collection("classes")
            .doc(classId)
            .collection("assignments")
            .doc(assignmentId);

        assignmentRef.get().then(doc => {
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
                window.location.href = `seeAssignments.html?classId=${classId}`;
            }
        }).catch(error => {
            console.error("Error fetching assignment:", error);
        });

        document.getElementById("saveButton").addEventListener("click", (e) => {
            e.preventDefault();

            const typeDropdown = document.getElementById("type").value;
            const otherType = document.getElementById("otherType").value.trim();
            const type = (typeDropdown === "Other" && otherType) ? otherType : typeDropdown;

            const updatedData = {
                title: document.getElementById("title").value.trim(),
                description: document.getElementById("description").value.trim(),
                dueDate: document.getElementById("dueDate").value,
                urgency: document.getElementById("urgency").value,
                type: type
            };

            assignmentRef.update(updatedData)
                .then(() => {
                    alert("Assignment updated successfully.");
                    window.location.href = `seeAssignments.html?classId=${classId}`;
                })
                .catch(error => {
                    console.error("Error updating assignment:", error);
                });
        });

        document.getElementById("cancelButton").addEventListener("click", () => {
            window.location.href = `seeAssignments.html?classId=${classId}`;
        });

        document.getElementById("type").addEventListener("change", toggleOtherTypeInput);
    } else {
        alert("Invalid or missing assignment details.");
        window.location.href = "academics.html";
    }
});

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
