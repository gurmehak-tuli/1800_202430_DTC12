const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get("postId");
// Print to ensure that the post ID is being recieved
console.log("Retrieved postId:", postId);
// Print to tell if post ID is not found to help with debugging
if (!postId) {
    console.error("No postId found in the query string.");
}
// Display the post and replies
function displayPostAndReplies() {
    if (!postId) return;
    // Retreieve the posts from the database
    db.collection("posts").doc(postId).get()
        .then(doc => {
            if (doc.exists) {
                const post = doc.data();
                document.getElementById("postTitle").innerText = post.title;
                document.getElementById("postContent").innerText = post.content;
                document.getElementById("postTimestamp").innerText = post.timestamp ? post.timestamp.toDate().toLocaleString() : '';
            } else {
                console.error("No such post!");
            }
        })
        .catch(error => {
            console.error("Error fetching post: ", error);
        });

    displayReplies(postId);
}

displayPostAndReplies();

function displayReplies(postId) {
    const replyGroup = document.getElementById("replyGroup");
    replyGroup.innerHTML = "";
    // Display the replies
    db.collection("posts").doc(postId).collection("replies")
        .orderBy("timestamp", "asc")
        .get()
        .then(querySnapshot => {
            querySnapshot.forEach(doc => {
                const reply = doc.data();
                const replyCard = `
                    <div class="card mb-3">
                        <div class="card-body">
                            <p class="card-text">${reply.content}</p>
                            <p class="text-muted small">${reply.timestamp ? reply.timestamp.toDate().toLocaleString() : ''}</p>
                        </div>
                    </div>
                `;
                replyGroup.insertAdjacentHTML('beforeend', replyCard);
            });
        })
        .catch(error => {
            console.error("Error fetching replies: ", error);
        });
}

function submitReply() {
    const replyContent = document.getElementById("replyContent").value;

    console.log("Submitting reply for postId:", postId);

    if (!postId) {
        console.error("No postId found, cannot submit reply.");
        return;
    }

    db.collection("posts").doc(postId).collection("replies").add({
        content: replyContent,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
        .then(() => {
            console.log("Reply successfully submitted!");
            window.location.href = `thankyouReply.html?postId=${postId}`;
        })
        .catch((error) => {
            console.error("Error submitting reply: ", error);
        });
}
