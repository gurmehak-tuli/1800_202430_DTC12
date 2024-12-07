var currentUser;

function doAll() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            currentUser = db.collection("users").doc(user.uid);
            console.log(currentUser);
            setupContactForm();
        } else {
            console.log("No user is signed in");
        }
    });
}
doAll();

function setupContactForm() {
    const contactForm = document.querySelector('form');
    contactForm.addEventListener('submit', handleContactSubmission);
}
// sends messages to admins
function handleContactSubmission(e) {
    e.preventDefault(); 

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('description').value.trim();

    if (!validateContactData({ name, email, message })) {
        return;
    }

    saveContactToFirestore({ name, email, message })
        .then(() => {
            alert("Message sent successfully!");
            document.querySelector('form').reset(); 
        })
        .catch((error) => {
            console.error("Error sending message: ", error);
            alert("An error occurred while sending your message. Please try again.");
        });
}
// makes sure all fields are filled out
function validateContactData({ name, email, message }) {
    if (!name || !email || !message) {
        alert("Please fill in all fields.");
        return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("Please enter a valid email address.");
        return false;
    }

    return true;
}
// sends the info to the database
function saveContactToFirestore({ name, email, message }) {
    const userId = firebase.auth().currentUser.uid;
    
    return db.collection("users")
        .doc(userId)
        .collection("contactMessages")
        .add({
            name: name,
            email: email,
            message: message,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            status: "unread"
        });
}