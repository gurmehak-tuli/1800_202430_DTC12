var userSet = localStorage.getItem("set"); // Get the user's set from local storage.
function loadSet() { // Function to load the user's set schedule.
    firebase.auth().onAuthStateChanged(function (user) { // Checks if a user is signed in.
        if (user) {
            var currentUser = db.collection("users").doc(user.uid);
            currentUser.get().then(doc => {
                if (doc.exists) {
                    const userSet = doc.data().set;

                    if (!userSet) { // Checks if the user's set is null or undefined.
                        console.log("User set is null or undefined.");
                    } else if (userSet === "F") { // Checks if the user's set is F.
                        console.log("User set is F.");
                        document.getElementById("setPlaceholder").src = "https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=America%2FVancouver&mode=MONTH&title=CST%20FALL%202024%20SET%20F%20SCHEDULE&src=N2Q5MDkzMzA2ZTU1MmI3NWE2N2RiN2ViYjBiM2NkMmQzYjViNmJhNmE3YmE0ZTIwZWM4ZjE4ZGExZTgxMzMwM0Bncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=ZW4tZ2IuY2FuYWRpYW4jaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20&color=%23B39DDB&color=%230B8043";
                        // If the user's set is F, display the F schedule.
                    } else if (userSet === "E") {
                        console.log("User set is E.");
                        document.getElementById("setPlaceholder").src = "https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=America%2FVancouver&showPrint=0&title=CST%20FALL%202024%20SET%20E%20SCHEDULE&src=NDIxMDFmYjZmZDQzMGI2YTJiNmI2OGFlZGIyYTRjYjAwNzM2N2Q4OGUyNjAwYzc1Yzc0ODFiZDZhMjk4Yzg2MkBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=YWRkcmVzc2Jvb2sjY29udGFjdHNAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&color=%23E67C73&color=%2333B679";
                        // If the user's set is E, display the E schedule.
                    }
                } else {
                    console.error("User document does not exist.");
                }
            })
                .catch(error => {
                    console.error("Error fetching user document:", error);
                });
        } else {
            console.log("No user is signed in.");
        }
    });
}
loadSet(); // Call the function to load the user's set schedule.