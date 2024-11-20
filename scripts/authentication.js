// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());
var uiConfig = {
    callbacks: {
        signInSuccessWithAuthResult: function (authResult, redirectUrl) {
            const user = authResult.user; // Get user object
            const userRef = db.collection("users").doc(user.uid); // Reference user's document
            // User successfully signed in.
            // Return type determines whether we continue the redirect automatically
            // or whether we leave that to developer to handle.
            //------------------------------------------------------------------------------------------
            // The code below is modified from default snippet provided by the FB documentation.
            //
            // If the user is a "brand new" user, then create a new "user" in your own database.
            // Assign this user with the name and email provided.
            // Before this works, you must enable "Firestore" from the firebase console.
            // The Firestore rules must allow the user to write. 
            //------------------------------------------------------------------------------------------
            if (authResult.additionalUserInfo.isNewUser) {
                // Handle new user creation
                userRef.set({
                    name: user.displayName,
                    email: user.email,
                    country: "Canada",
                    school: "BCIT",
                    firstTime: true
                }).then(function () {
                    console.log("New user added to Firestore.");
                    window.location.assign("profileFirstTime.html");
                }).catch(function (error) {
                    console.error("Error adding new user to Firestore:", error);
                });
            } else {
                userRef.get().then(function (doc) {
                    if (doc.exists) {
                        const userData = doc.data();

                        if (userData.firstTime) {
                            console.log("Redirecting first-time user to profile setup.");
                            window.location.assign("profileFirstTime.html");
                            userRef.update({ firstTime: false }).catch(function (error) {
                                console.error("Error updating firstTime flag:", error);
                            });
                        } else {
                            console.log("Redirecting returning user to main page.");
                            window.location.assign("main.html");
                        }
                    } else {
                        console.error("User document not found!");
                    }
                })
                    .catch(function (error) {
                        console.error("Error fetching user document:", error);
                    });
            }
            return false;
        },
    },
    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    signInFlow: 'popup',
    signInSuccessUrl: "index.html",
    signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        // firebase.auth.GithubAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        // firebase.auth.PhoneAuthProvider.PROVIDER_ID
    ],
    // Terms of service url.
    tosUrl: '<your-tos-url>',
    // Privacy policy url.
    privacyPolicyUrl: '<your-privacy-policy-url>'
};

ui.start('#firebaseui-auth-container', uiConfig);