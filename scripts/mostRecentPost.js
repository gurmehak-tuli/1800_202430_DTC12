function displayLatestPost() {
    const latestPostCard = document.getElementById("latestPostCard");
    const latestPostTitle = document.getElementById("latestPostTitle");
    const latestPostContent = document.getElementById("latestPostContent");
    const latestPostTimestamp = document.getElementById("latestPostTimestamp");
    const viewPostButton = document.getElementById("viewPostButton");

    // Fetch the most recent post from Firestore
    db.collection("posts")
        .orderBy("timestamp", "desc") // Order by timestamp, most recent first
        .limit(1) // Limit to 1 post
        .get()
        .then(querySnapshot => {
            if (!querySnapshot.empty) {
                // Get the most recent post
                const post = querySnapshot.docs[0].data();

                // Display post details
                latestPostTitle.innerText = post.title;
                latestPostContent.innerText = post.content;
                latestPostTimestamp.innerText = post.timestamp ? post.timestamp.toDate().toLocaleString() : '';

                // Link to the post page (or modify as needed)
                const postId = querySnapshot.docs[0].id;
                viewPostButton.href = `communications.html`; // Make sure to adjust this link to your post page
            } else {
                latestPostCard.innerHTML = "<p>No posts available</p>";
            }
        })
        .catch(error => {
            console.error("Error fetching the latest post: ", error);
        });
}

// Call the function to display the latest post when the page loads
displayLatestPost();