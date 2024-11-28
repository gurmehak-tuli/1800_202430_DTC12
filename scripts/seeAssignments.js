function displayClassAndAssignments(userId) {
    const params = new URL(window.location.href);
    const classId = params.searchParams.get("classId");

    if (!classId) {
        alert("Missing class information. Please try again.");
        return;
    }

    const classDocRef = db.collection("users").doc(userId).collection("classes").doc(classId);
    const assignmentsContainer = document.getElementById("assigmentCardGroup");
    const assignmentCardTemplate = document.getElementById("assignmentCardTemplate");

    classDocRef.get().then((doc) => {
        if (doc.exists) {
            const classData = doc.data();
            document.getElementById("className").innerText = classData.name;
            document.getElementById("classImage").src = `./images/${classData.code}.jpg`;
        } else {
            alert("Class not found.");
        }
    }).catch((error) => {
        console.error("Error fetching class details:", error);
    });

    classDocRef.collection("assignments").get().then((querySnapshot) => {
        if (querySnapshot.empty) {
            assignmentsContainer.innerHTML = "<p>No assignments available for this class.</p>";
            return;
        }

        querySnapshot.forEach((doc) => {
            const assignmentData = doc.data();

            const assignmentCard = assignmentCardTemplate.content.cloneNode(true);

            assignmentCard.querySelector(".card-title").innerText = assignmentData.title;
            assignmentCard.querySelector(".due-date").innerText = assignmentData.dueDate;
            assignmentCard.querySelector(".urgency").innerText = assignmentData.urgency;
            assignmentCard.querySelector(".description").innerText = assignmentData.description;

            assignmentsContainer.appendChild(assignmentCard);
        });
    }).catch((error) => {
        console.error("Error fetching assignments:", error);
    });
}

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        displayClassAndAssignments(user.uid);
    } else {
        alert("You need to log in to view assignments.");
        window.location.href = "login.html";
    }
});
