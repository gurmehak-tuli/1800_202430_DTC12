function populateEventCards() {
    let eventCardTemplate = document.getElementById("eventCardTemplate");
    let eventCardGroup = document.getElementById("eventCardGroup");

    // Fetch events from Firestore
    db.collection("events")
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                let eventData = doc.data();
                let eventName = eventData.name;
                let eventDate = eventData.date;
                let eventDescription = eventData.description;
                let imageUrl = eventData.imageUrl; // Use the imageUrl field directly

                // Clone the template
                let eventCard = eventCardTemplate.content.cloneNode(true);

                // Populate template with event data
                eventCard.querySelector(".event-name").innerHTML = eventName;
                eventCard.querySelector(".event-date").innerHTML = eventDate;
                eventCard.querySelector(".event-description").innerHTML = eventDescription;

                // Set the img source to imageUrl
                let imgElement = eventCard.querySelector(".event-img");
                if (imageUrl) {
                    imgElement.src = imageUrl;
                } else {
                    console.warn("No imageUrl found for document:", doc.id); // Log missing imageUrl for debugging
                    imgElement.src = "https://via.placeholder.com/300"; // Use a default placeholder if no URL is provided
                }

                // Append to event card group
                eventCardGroup.appendChild(eventCard);
            });
        })
        .catch((error) => {
            console.error("Error fetching event data: ", error);
        });
}

// Call the function to populate event cards
populateEventCards();
