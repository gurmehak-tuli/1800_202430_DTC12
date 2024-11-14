import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
const provider = new GoogleAuthProvider();
const result = await signInWithPopup(auth, provider);
const calendarButton = document.getElementById('connect-to-calendar');
calendarButton.addEventListener('click', async () => {
    const consentResponse = await gapi.client.calendar.authorize();
    // Handle consent response and store access_token securely
});
// Initialize the FirebaseUI Widget using Firebase.
