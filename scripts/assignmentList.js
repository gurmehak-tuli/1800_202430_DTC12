function doAll() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            loadAssignments(user.uid);
        } else {
            alert("You need to log in to view assignments.");
            window.location.href = "login.html";
        }
    });
}
doAll();

/**
 * Loads assignments for a given user and displays them in the assignments container.
 * 
 * @param {string} userID - The ID of the user whose assignments are to be loaded.
 * 
 * @description
 * This function retrieves the classes for a user from the Firestore database, then fetches the assignments for each class.
 * It filters out completed assignments, sorts them by urgency, and displays them in the DOM.
 * 
 * @returns {void}
 * 
 * @example
 * loadAssignments('user123');
 * 
 * @throws Will log an error to the console if there is an issue fetching classes or assignments from Firestore.
 */
function loadAssignments(userID) {
    const db = firebase.firestore();
    const classesRef = db.collection("users").doc(userID).collection("classes");
    const urgencyLevels = { "Low": 1, "Medium": 2, "High": 3 };

    classesRef.get().then((querySnapshot) => {
        const assignmentsContainer = document.getElementById("assignments-container");
        assignmentsContainer.innerHTML = "";

        querySnapshot.forEach((classDoc) => {
            const classData = classDoc.data();
            const className = classData.name;
            const classID = classDoc.id;
            const assignmentsRef = classDoc.ref.collection("assignments");

            assignmentsRef.get().then((assignmentSnapshot) => {
                const assignments = [];

                assignmentSnapshot.forEach((doc) => {
                    const assignment = doc.data();
                    assignment.id = doc.id;
                    if (assignment.completed !== true) {
                        assignments.push(assignment);
                    }
                });

                assignments.sort((a, b) => urgencyLevels[b.urgency] - urgencyLevels[a.urgency]);

                if (assignments.length > 0) {
                    const classSection = document.createElement("div");
                    classSection.className = "class-section mb-4";
                    classSection.innerHTML = `
                        <h3>${className}</h3>
                        <ul id="class-${classID}-assignments" class="list-group"></ul>
                    `;
                    assignmentsContainer.appendChild(classSection);

                    const classAssignmentList = document.getElementById(`class-${classID}-assignments`);
                    assignments.forEach((assignment) => {
                        const listItem = document.createElement("li");
                        listItem.className = "list-group-item";
                        listItem.innerHTML = `
                            <strong>${assignment.type}</strong>
                            <br>
                            <strong>${assignment.title}</strong> (${assignment.dueDate})
                            <br>
                            <span>Description:</span> ${assignment.description}
                            <br>
                            <span>Urgency:</span> ${assignment.urgency}
                            <br>
                        `;
                        classAssignmentList.appendChild(listItem);
                    });
                }
            }).catch((error) => {
                console.error(`Error fetching assignments for class ${className}:`, error);
            });
        });
    }).catch((error) => {
        console.error("Error fetching classes:", error);
    });
}
