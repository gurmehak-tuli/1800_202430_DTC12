

function submitPost() {
    const postTitle = document.getElementById("title").value;
    const postContent = document.getElementById("content").value;

    db.collection("posts").add({
        title: postTitle,
        content: postContent,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
        .then(() => {
            console.log("Post successfully submitted!");
            window.location.href = 'thanksPostSubmit.html';
        })
        .catch((error) => {
            console.error("Error submitting post: ", error);
        });
}


function displayPosts() {
    const postGroup = document.getElementById("postGroup");
    postGroup.innerHTML = "";

    db.collection("posts")
        .orderBy("timestamp", "desc")
        .get()
        .then(querySnapshot => {
            querySnapshot.forEach(doc => {
                const post = doc.data();
                const postCard = `
                    <div class="col-md-6">
                        <div class="card mb-4">
                            <div class="card-body">
                                <h5 class="card-title">${post.title}</h5>
                                <p class="card-text">${post.content}</p>
                                <p class="text-muted">${post.timestamp ? post.timestamp.toDate().toLocaleString() : ''}</p>
                                <a href="reply.html?postId=${doc.id}" class="btn btn-primary">View & Reply</a>
                            </div>
                        </div>
                    </div>
                    `;

                postGroup.insertAdjacentHTML('beforeend', postCard);
            });
        })
        .catch(error => {
            console.error("Error fetching posts: ", error);
        });
}

displayPosts();