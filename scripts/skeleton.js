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
        }
    });
}
loadSkeleton(); //invoke the function
var userSet = localStorage.getItem("set");
function loadset() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            //go to the correct user document by referencing to the user uid
            currentUser = db.collection("users").doc(user.uid)
            //get the document for current user.
            currentUser.get()
                .then(userSet => {
                    
                    if (userSet == null) {
                        console.log("User set is null");
                    }
                    if (userSet == 'F') {
                        // document.getElementById("setInput").value = userSet;
                        console.log($('#setPlaceholder').src = ('https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=America%2FVancouver&mode=MONTH&title=CST%20FALL%202024%20SET%20F%20SCHEDULE&src=N2Q5MDkzMzA2ZTU1MmI3NWE2N2RiN2ViYjBiM2NkMmQzYjViNmJhNmE3YmE0ZTIwZWM4ZjE4ZGExZTgxMzMwM0Bncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=ZW4tZ2IuY2FuYWRpYW4jaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20&color=%23B39DDB&color=%230B8043'));
                    }
                    if (userSet == 'E') {
                        // document.getElementById("setInput").value = userSet;
                        console.log($('#setPlaceholder').load('./text/footer.html'));
                    }
                    else {
                        console.log("User set is not set");
                    }
                })
        }
    });
}
loadset(); //invoke the function