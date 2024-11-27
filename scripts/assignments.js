let currentUser;

firebase.auth().onAuthStateChanged(user => {
    if (user) {
        currentUser = user;

        const currentPage = window.location.pathname;
        if (currentPage.includes('academics.html')) {
            displayClasses();
        } else if (currentPage.includes('addedassignments.html')) {
            const classId = new URLSearchParams(window.location.search).get('classId');
            displayAssignmentCards(classId);
        } else if (currentPage.includes('addassignments.html')) {
            const classId = new URLSearchParams(window.location.search).get('classId');
            document.getElementById('classId').value = classId;
        }
    } else {
        window.location.href = "login.html";
    }
});

function displayClasses() {
    const container = document.getElementById('assignments-go-here');
    const template = document.getElementById('assignmentCardTemplate');

    container.innerHTML = '';

    db.collection("users").doc(currentUser.uid).collection("classes").get()
        .then(snapshot => {
            if (snapshot.empty) {
                container.innerHTML = '<p class="text-center">No classes found</p>';
                return;
            }

            snapshot.forEach(doc => {
                const classData = doc.data();
                const card = template.content.cloneNode(true);

                card.querySelector('.card-title').textContent = classData.code; 
                card.querySelector('.card-text').textContent = classData.description;
                card.querySelector('.card-image').src = `./images/${classData.code.toLowerCase()}.jpg`;

                const addBtn = card.querySelector('.add-assignment-btn');
                addBtn.href = `addassignments.html?classId=${doc.id}`;

                const viewBtn = card.querySelector('.view-assignments-btn');
                viewBtn.href = `addedassignments.html?classId=${doc.id}`;

                container.appendChild(card);
            });
        })
        .catch(error => {
            console.error("Error loading classes:", error);
            container.innerHTML = '<p class="text-center text-danger">Error loading classes</p>';
        });
}

function addAssignment() {
    const classId = document.getElementById('classId').value;
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const dueDate = document.getElementById('dueDate').value;
    const urgency = document.getElementById('urgency').value;

    if (!currentUser) {
        alert("You need to be logged in to add assignments!");
        return;
    }

    db.collection("users")
        .doc(currentUser.uid)
        .collection("classes")
        .doc(classId)
        .collection("assignments")
        .add({
            title: title,
            description: description,
            dueDate: dueDate,
            urgency: urgency,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        .then(() => {
            alert("Assignment added successfully!");
            window.location.href = `addedassignments.html?classId=${classId}`;
        })
        .catch((error) => {
            console.error("Error adding assignment:", error);
            alert("Error adding assignment. Please try again.");
        });
}

function displayAssignmentCards(classId) {
    const cardGroup = document.getElementById("assigmentCardGroup");
    const template = document.getElementById("savedCardTemplate");

    if (!classId) {
        cardGroup.innerHTML = '<p class="text-center">No class selected</p>';
        return;
    }

    cardGroup.innerHTML = '';

    db.collection("users")
        .doc(currentUser.uid)
        .collection("classes")
        .doc(classId)
        .collection("assignments")
        .orderBy("dueDate")
        .get()
        .then(snapshot => {
            if (snapshot.empty) {
                cardGroup.innerHTML = '<p class="text-center">No assignments found</p>';
                return;
            }

            snapshot.forEach(doc => {
                const data = doc.data();
                const card = template.content.cloneNode(true);

                card.querySelector('.card-title').textContent = data.title;
                card.querySelector('.card-description').textContent = data.description;
                card.querySelector('.card-due-date').textContent = `Due: ${data.dueDate}`;
                card.querySelector('.card-urgency').textContent = `Urgency: ${data.urgency}`;

                const cardDiv = card.querySelector('.card');
                switch (data.urgency.toLowerCase()) {
                    case 'high': cardDiv.classList.add('bg-danger', 'text-white'); break;
                    case 'medium': cardDiv.classList.add('bg-warning'); break;
                    case 'low': cardDiv.classList.add('bg-light'); break;
                }

                cardGroup.appendChild(card);
            });
        })
        .catch(error => {
            console.error("Error loading assignments:", error);
            cardGroup.innerHTML = '<p class="text-center text-danger">Error loading assignments</p>';
        });
}

