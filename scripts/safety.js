function populateSafetyCards() {
    let safetyCardTemplate = document.getElementById("safetyCardTemplate");
    let safetyCardGroup = document.getElementById("safetyCardGroup");

    // Fetch safety tips from Firestore
    db.collection("safety")
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                let safetyData = doc.data();
                let title = safetyData.title;
                let summary = safetyData.summary;
                let details = safetyData.details;
                let imageUrl = safetyData.imageUrl;

                // Clone the template
                let safetyCard = safetyCardTemplate.content.cloneNode(true);

                // Populate template with safety data
                safetyCard.querySelector(".safety-title").innerHTML = title;
                safetyCard.querySelector(".safety-summary").innerHTML = summary;
                safetyCard.querySelector(".safety-details").innerHTML = details;

                // Set the img source to imageUrl
                let imgElement = safetyCard.querySelector(".safety-img");
                if (imageUrl) {
                    imgElement.src = imageUrl;
                } else {
                    imgElement.src = "https://via.placeholder.com/300";
                }

                // Append to safety card group
                safetyCardGroup.appendChild(safetyCard);
            });
        })
        .catch((error) => {
            console.error("Error fetching safety data: ", error);
        });
}

// Call the function to populate safety cards
populateSafetyCards();
