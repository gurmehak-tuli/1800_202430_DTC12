var currentUser;
function doAll() {
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

function insertNameFromFirestore(user) {
    db.collection("users").doc(user.uid).get().then(userDoc => {
        console.log(userDoc.data().name)
        userName = userDoc.data().name;
        console.log(userName)
        document.getElementById("name-goes-here").innerHTML = userName;
    })

}

function displayClassesDynamically() {
    let cardTemplate = document.getElementById("assignmentCardTemplate");

    currentUser.get().then((userDoc) => {
        const classesRef = db.collection("users").doc(userDoc.id).collection("classes");

        classesRef.get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                const classData = doc.data();
                const docID = doc.id;
                let newCard = cardTemplate.content.cloneNode(true);

                newCard.querySelector(".card-title").innerText = classData.name;
                newCard.querySelector(".card-text").innerText = classData.details || "No details available.";
                newCard.querySelector(".card-image").src = `./images/${classData.code}.jpg`;
                newCard.querySelector(".card-image").alt = classData.name || "N/A";

                const addBtn = newCard.querySelector(".add-assignment-btn");
                addBtn.addEventListener("click", () => {
                    window.location.href = `addassignments.html?classId=${docID}`;
                });

                const viewBtn = newCard.querySelector(".view-assignments-btn");
                viewBtn.addEventListener("click", () => {
                    window.location.href = `seeAssignments.html?classId=${docID}`;
                });

                document.getElementById("assignments-go-here").appendChild(newCard);
            });
        });
    });
}