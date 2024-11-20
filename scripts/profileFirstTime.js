var currentUser;
function populateUserInfo() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            currentUser = db.collection("users").doc(user.uid)
            currentUser.get().then(userDoc => {
                let userName = userDoc.data().name;
                let userSchool = userDoc.data().school;
                let userSet = userDoc.data().set;
                let userCity = userDoc.data().city;
                let userCountry = userDoc.data().country;

                if (userName != null) {
                    document.getElementById("nameInput").value = userName;
                }
                if (userSchool != null) {
                    document.getElementById("schoolInput").value = userSchool;
                }
                if (userSet != null) {
                    document.getElementById("setInput").value = userSet;
                    localStorage.setItem("set", userSet);
                }
                if (userCity != null) {
                    document.getElementById("cityInput").value = userCity;
                }
                if (userCountry != null) {
                    document.getElementById("countryInput").value = userCountry;
                }
            })
        } else {
            console.log("No user is signed in");
        }
    });
}

function editUserInfo() {
    document.getElementById('personalInfoFields').disabled = false;
}

function saveUserInfo() {
    userName = document.getElementById('nameInput').value;
    userSchool = document.getElementById('schoolInput').value;
    userSet = document.getElementById('setInput').value;
    userCity = document.getElementById('cityInput').value;
    userCountry = document.getElementById('countryInput').value;
    currentUser.update({
        name: userName,
        school: userSchool,
        set: userSet,
        city: userCity,
        country: userCountry
    })
        .then(() => {
            console.log("Document successfully updated!");
        })

    document.getElementById('personalInfoFields').disabled = true;
}
populateUserInfo();
editUserInfo();