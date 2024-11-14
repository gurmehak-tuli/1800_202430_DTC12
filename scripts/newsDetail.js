function displayNewsDetail() {
    let params = new URLSearchParams(window.location.search);
    let docID = params.get("docID");

    console.log("Document ID from URL:", docID);

    if (!docID) {
        console.error("No document ID found in URL.");
        return;
    }

    db.collection("news").doc(docID).get()
        .then((doc) => {
            if (doc.exists) {
                let newsData = doc.data();

                document.getElementById("newsHeadline").innerText = newsData.headline || "No Headline";
                document.getElementById("newsSubheading").innerText = newsData.subheading || "No Subheading";
                document.getElementById("newsDescription").innerText = newsData.description || "No Description";

                let newsImage = document.getElementById("newsImage");
                newsImage.src = newsData.imageUrl || "https://via.placeholder.com/300";
            } else {
                console.error("No document found with the provided ID.");
            }
        })
        .catch((error) => {
            console.error("Error fetching news details: ", error);
        });
}

displayNewsDetail();
