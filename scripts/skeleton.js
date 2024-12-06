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

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('active');
}