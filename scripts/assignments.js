var currentUser;
function doAll() { // Function to check if a user is signed in and display the classes dynamically.
    firebase.auth().onAuthStateChanged(user => { 
        if (user) {
            currentUser = db.collection("users").doc(user.uid); //global
            console.log(currentUser); 
            displayClassesDynamically(); 
        } else {
            console.log("No user is signed in");
        }
    });
}
doAll(); 

function displayClassesDynamically() { // Function to display the classes dynamically on the page.
    let cardTemplate = document.getElementById("assignmentCardTemplate");

    currentUser.get().then((userDoc) => { // Retrieves the user's document from Firestore. #READ
        const classesRef = db.collection("users").doc(userDoc.id).collection("classes");

        classesRef.get().then((querySnapshot) => { // Retrieves all the classes for the current user. #READ
            querySnapshot.forEach((doc) => { // Loops through each class document. #READ
                const classData = doc.data();
                const docID = doc.id;
                let newCard = cardTemplate.content.cloneNode(true);

                newCard.querySelector(".card-title").innerText = classData.name;
                newCard.querySelector(".card-text").innerText = classData.profName || "No details available.";
                newCard.querySelector(".card-image").src = `./images/${classData.code}.jpg`;
                newCard.querySelector(".card-image").alt = classData.name || "N/A";

                const addBtn = newCard.querySelector(".add-assignment-btn"); // Retrieves the add assignment button.
                addBtn.addEventListener("click", () => { // Adds an event listener to the add assignment button.
                    window.location.href = `addassignments.html?classId=${docID}`; // Redirects to the add assignment page with the class ID if clicked.
                });

                const viewBtn = newCard.querySelector(".view-assignments-btn"); // Retrieves the view assignments button.
                viewBtn.addEventListener("click", () => { // Adds an event listener to the view assignments button.
                    window.location.href = `seeAssignments.html?classId=${docID}`; // Redirects to the view assignments page with the class ID if clicked.
                });

                document.getElementById("assignments-go-here").appendChild(newCard); 
            });
        });
    });
}