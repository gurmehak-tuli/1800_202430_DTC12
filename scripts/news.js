// function populateNewsCards() {
//     let newsCardTemplate = document.getElementById("newsCardTemplate");
//     let newsCardGroup = document.getElementById("newsCardGroup");

//     db.collection("news")
//         .get()
//         .then((querySnapshot) => {
//             querySnapshot.forEach((doc) => {
//                 let newsData = doc.data();
//                 let headline = newsData.headline;
//                 let subheading = newsData.subheading;
//                 let description = newsData.description;
//                 let imageCode = newsData.imageCode;

//                 // Clone the template
//                 let newsCard = newsCardTemplate.content.cloneNode(true);

//                 // Populate template with news data
//                 newsCard.querySelector(".headline").innerHTML = headline;
//                 newsCard.querySelector(".subheading").innerHTML = subheading;
//                 newsCard.querySelector(".description").innerHTML = description;
//                 let imgElement = newsCard.querySelector(".news-img");
//                 imgElement.src = "../images/" + imageCode + ".jpg";

//                 // Append to news card group
//                 newsCardGroup.appendChild(newsCard);
//             });
//         })
//         .catch((error) => {
//             console.error("Error fetching news data: ", error);
//         });
// }

// populateNewsCards();

function populateNewsCards() {
    let newsCardTemplate = document.getElementById("newsCardTemplate");
    let newsCardGroup = document.getElementById("newsCardGroup");

    db.collection("news")
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                let newsData = doc.data();
                let headline = newsData.headline;
                let subheading = newsData.subheading;
                let description = newsData.description;
                let imageUrl = newsData.imageUrl; // Use the imageUrl field directly

                // Clone the template
                let newsCard = newsCardTemplate.content.cloneNode(true);

                // Populate template with news data
                newsCard.querySelector(".headline").innerHTML = headline;
                newsCard.querySelector(".subheading").innerHTML = subheading;
                newsCard.querySelector(".description").innerHTML = description;

                // Set the img source to imageUrl
                let imgElement = newsCard.querySelector(".news-img");
                if (imageUrl) {
                    imgElement.src = imageUrl;
                } else {
                    console.warn("No imageUrl found for document:", doc.id); // Log missing imageUrl for debugging
                    imgElement.src = "https://via.placeholder.com/300"; // Use a default placeholder if no URL is provided
                }
                


                // Append to news card group
                newsCardGroup.appendChild(newsCard);
            });
        })
        .catch((error) => {
            console.error("Error fetching news data: ", error);
        });
}

populateNewsCards();
