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
                let imageUrl = newsData.imageUrl;

                let newsCard = newsCardTemplate.content.cloneNode(true);

                newsCard.querySelector(".headline").innerHTML = headline;
                newsCard.querySelector(".subheading").innerHTML = subheading;
                // newsCard.querySelector(".description").innerHTML = description;

                let imgElement = newsCard.querySelector(".news-img");
                imgElement.src = imageUrl || "https://via.placeholder.com/300";

                let viewMoreBtn = newsCard.querySelector(".view-more-btn");
                viewMoreBtn.href = `newsDetail.html?docID=${doc.id}`;

                newsCardGroup.appendChild(newsCard);
            });
        })
        .catch((error) => {
            console.error("Error fetching news data: ", error);
        });
}

populateNewsCards();