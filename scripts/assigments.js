function displayAssignmentInfo() {
    let params = new URL(window.location.href); //get URL of search bar
    let ID = params.searchParams.get("docID"); //get value for key "id"
    console.log(ID);

    // doublecheck: is your collection called "Reviews" or "reviews"?
    db.collection("assignment")
        .doc(ID)
        .get()
        .then(doc => {
            thisAssignment = doc.data();
            assignmentCode = doc.data().code;
            assignmentName = doc.data().name;


            document.getElementById("assignmentName").innerHTML = assignmentName;
            // let imgEvent = document.querySelector("#assignmentImage");       
            // imgEvent.src = "../images/" + assignmentCode + ".jpg";
        });
}


function saveAssigmentDocumentIDAndRedirect() {
    let params = new URL(window.location.href) //get the url from the search bar
    let ID = params.searchParams.get("docID");
    localStorage.setItem('assignmentDocID', ID);
    window.location.href = 'addassignment.html';
}

function populateAssignmentReviews() {
    console.log("Fetching assignment info...");
    let assignmentCardTemplate = document.getElementById("assignmentCardTemplate");
    let assignmentCardGroup = document.getElementById("assignmentCardGroup");

    let params = new URL(window.location.href); // Get the URL from the search bar
    let assignmentID = params.searchParams.get("docID");

    // Double-check: is your collection called "Reviews" or "reviews"?
    db.collection("assignments")
        .where("assignmentDocID", "==", assignmentID)
        .get()
        .then((allReviews) => {
            let reviews = allReviews.docs;
            console.log("Reviews found:", reviews);
            reviews.forEach((doc) => {
                let title = doc.data().title;
                let description = doc.data().description;
                let dueDate = doc.data().dueDate;
                let urgency = doc.data().urgency;
                let time = doc.data().timestamp.toDate();
                console.log(time);

                let reviewCard = assignmentCardTemplate.content.cloneNode(true);
                reviewCard.querySelector(".title").innerHTML = title;
                reviewCard.querySelector(".due-date").innerHTML = `Due Date: ${dueDate}`;
                reviewCard.querySelector(".description").innerHTML = `Description: ${description}`;
                reviewCard.querySelector(".urgency").innerHTML = `Urgency: ${urgency}`;
                reviewCard.querySelector(".time").innerHTML = new Date(time).toLocaleString();

                assignmentCardGroup.appendChild(reviewCard);
            });
        });
}

displayAssignmentInfo();
populateAssignmentReviews();
