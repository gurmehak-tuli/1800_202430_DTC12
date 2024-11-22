//---------------------------------------------------
// This function loads the parts of your skeleton 
// (navbar, footer, and other things) into html doc. 
//---------------------------------------------------
function loadSkeleton() {

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // If the "user" variable is not null, then someone is logged in
            // User is signed in.
            // Do something for the user here.
            console.log($('#navbarPlaceholder').load('./text/nav_after_login.html'));
            console.log($('#footerPlaceholder').load('./text/footer.html'));
        } else {
            // No user is signed in.
            console.log($('#navbarPlaceholder').load('./text/nav_before_login.html'));
            console.log($('#footerPlaceholder').load('./text/footer.html'));
            if (window.location.pathname !== '/index.html' && window.location.pathname !== '/login.html' && window.location.pathname !== '/contact.html' && window.location.pathname !== '/aboutus.html') {
                window.location.href = '/index.html';
            }
        }
    });
}
loadSkeleton(); //invoke the function

var userSet = localStorage.getItem("set");
function loadSet() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // Reference the current user in Firestore
            var currentUser = db.collection("users").doc(user.uid);
            currentUser.get().then(doc => {
                if (doc.exists) {
                    const userSet = doc.data().set;

                    if (!userSet) {
                        console.log("User set is null or undefined.");
                    } else if (userSet === "F") {
                        console.log("User set is F.");
                        document.getElementById("setPlaceholder").src = "https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=America%2FVancouver&mode=MONTH&title=CST%20FALL%202024%20SET%20F%20SCHEDULE&src=N2Q5MDkzMzA2ZTU1MmI3NWE2N2RiN2ViYjBiM2NkMmQzYjViNmJhNmE3YmE0ZTIwZWM4ZjE4ZGExZTgxMzMwM0Bncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=ZW4tZ2IuY2FuYWRpYW4jaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20&color=%23B39DDB&color=%230B8043";
                    } else if (userSet === "E") {
                        console.log("User set is E.");
                        document.getElementById("setPlaceholder").src = "https://calendar.google.com/calendar/embed?src=your_calendar_e%40gmail.com&ctz=Your_Time_Zone";
                    } else {
                        console.log("User set is not recognized.");
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
loadSet();