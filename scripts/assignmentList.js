function doAll() { // This function is called when the page loads
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


function loadAssignments(userID) { // Function to load assignments from Firestore and display them on the page. #READ
    const db = firebase.firestore();
    const classesRef = db.collection("users").doc(userID).collection("classes");
    const urgencyLevels = { "Low": 1, "Medium": 2, "High": 3 };

    classesRef.get().then((querySnapshot) => { // Retrieves all the classes for the current user.
        const assignmentsContainer = document.getElementById("assignments-container"); 
        assignmentsContainer.innerHTML = "";   

        querySnapshot.forEach((classDoc) => { // Loops through each class document.
            const classData = classDoc.data(); 
            const className = classData.name;
            const classID = classDoc.id;
            const assignmentsRef = classDoc.ref.collection("assignments");

            assignmentsRef.get().then((assignmentSnapshot) => { // Retrieves all the assignments for the current class.
                const assignments = [];

                assignmentSnapshot.forEach((doc) => { // Loops through each assignment document.
                    const assignment = doc.data();
                    assignment.id = doc.id;
                    if (assignment.completed !== true) { // Checks if the assignment is not completed.
                        assignments.push(assignment); // Adds the assignment to the list of assignments if not completed.
                    }
                });

                assignments.sort((a, b) => urgencyLevels[b.urgency] - urgencyLevels[a.urgency]); // Sorts the assignments by urgency level.

                if (assignments.length > 0) { // Checks if there are any assignments for the class.
                    const classSection = document.createElement("div");
                    classSection.className = "class-section mb-4";
                    classSection.innerHTML = `
                        <h3>${className}</h3>
                        <ul id="class-${classID}-assignments" class="list-group"></ul>
                    `;
                    assignmentsContainer.appendChild(classSection); 

                    const classAssignmentList = document.getElementById(`class-${classID}-assignments`); 
                    assignments.forEach((assignment) => { // Loops through each assignment to display it on the main page under upcoming. 
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
