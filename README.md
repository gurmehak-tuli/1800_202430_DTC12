# The myBCIT+ App

## 1. Project Description
State your app in a nutshell, or one-sentence pitch. Give some elaboration on what the core features are.  
Our team DTC-12 is developing a revised and improved BCIT app to help students with their productivity with a better UI and more beneficial features unlike the current app.

## 2. Names of Contributors
List team members and/or short bio's here... 
* Hi my name is Gurmehak Tuli. I am very excited to start this journey of making an application.
* Hi my name is Dilinder Garcha. I am so excited to help with this project.
* Hi my name is Rajan Sidhu. I am so thrilled to work on this project.
	
## 3. Technologies and Resources Used
List technologies (with version numbers), API's, icons, fonts, images, media or data sources, and other resources that were used.
* HTML, CSS, JavaScript
* Bootstrap 5.0 (Frontend library)
* Firebase 8.0 (BAAS - Backend as a Service)
* RSS (To fetch news from BCIT news webiste)

## 4. Complete setup/installion/usage
State what a user needs to do when they come to your project.  How do others start using your code or application?
Here are the steps ...
* Sign up using your email.
* Add information to the form.
* Now you are all set and can start using the app.

## 5. Known Bugs and Limitations
Here are some known bugs:
* We have to require cors-anywhere demo access, however this issue can be resolved when we intergrate a backend. #CONSTRAINT
* ...
* ...

## 6. Features for Future
What we'd like to build in the future:
* Have LearningHub intergrated so users dont have to manually add assignemnts.
* Connect the LearningHub to google calender so it gets auto updated when new tasks come out.
* Auto RSS without having to use the temporary server
	
## 7. Contents of Folder
Content of the project folder:

```
Top level of project folder: 
├── .gitignore               # Git ignore file
├── 404.html                 # 404 Error page
├── aboutus.html             # About Us page
├── academics.html           # Academics page
├── addassignments.html      # Add Assignments page
├── communications.html      # Communications page
├── contact.html             # Contact methods page
├── contactus.html           # Contact Us form
├── edittask.html            # Edit tasks page
├── index.html               # Landing HTML file, this is what users see when they visit the URL
├── login.html               # Login page
├── main.html                # Main application dashboard
├── map.html                 # Campus Map
├── news.html                # BCIT News Feed
├── newsDetail.html          # BCIT News Details page
├── profile.html             # User profile page
├── profileFirstTime.html    # First-time user profile setup page
├── README.md                # Project overview and documentation
├── reply.html               # Replies section for posts
├── resources.html           # Resources page
├── schedule.html            # Schedule page
├── seeAssignments.html      # View assignments page
├── template.html            # HTML template file
├── thanks.html              # Acknowledgment page for added assignments
├── thankscontact.html       # Acknowledgment page for contact submissions
├── thanksPostSubmit.html    # Acknowledgment page for post submissions
├── thankyouReply.html       # Acknowledgment page for reply submissions

It has the following subfolders and files:
├── images                   # Folder for images
    ├── COMP1113.jpg            # Image for the COMP1113 class (Sourced from LearningHub)
    ├── COMP1116.jpg            # Image for the COMP1116 class (Sourced from LearningHub)
    ├── COMP1510.jpg            # Image for the COMP1510 class (Sourced from LearningHub)
    ├── COMP1537.jpg            # Image for the COMP1537 class (Sourced from LearningHub)
    ├── COMP1712.jpg            # Image for the COMP1712 class (Sourced from LearningHub)
    ├── COMP1800.jpg            # Image for the COMP1800 class (Sourced from LearningHub)
    ├── image-removebg-preview.png # App Logo (Made using AI)
├── scripts                  # Folder for scripts
    ├── addAssignments.js       # Script for adding new assignments
    ├── assignmentList.js       # Logic for managing and displaying assignment lists
    ├── assignments.js          # Core logic for managing assignments by class
    ├── authentication.js       # Firebase authentication and user setup
    ├── communications.js       # Posting and displaying posts in the communications section
    ├── contactus.js            # Script for the contact form functionality
    ├── dgclasses.js            # Dynamic class and assignment management
    ├── edittask.js             # Script for editing existing assignments
    ├── firebaseAPI_DTC12.js    # Firebase API integration script
    ├── mostRecentPost.js       # Logic for displaying the latest post
    ├── nav.js                  # Navigation bar functionality
    ├── news.js                 # RSS feed integration for BCIT news
    ├── profile.js              # User profile management script
    ├── profileFirstTime.js     # Logic for first-time user profile setup
    ├── reply.js                # Script for handling post replies
    ├── schedule.js             # Logic for displaying class schedules
    ├── script.js               # Core application logic
    ├── seeAssignments.js       # Logic for displaying assignments by class
    ├── skeleton.js             # Script for loading navbar and footer dynamically
├── styles                   # Folder for styles
    ├── nav_after_login.css     # Styles for the navigation bar after login
    ├── nav_before_login.css    # Styles for the navigation bar before login
    ├── news.css                # Styles specific to the News page
    ├── style.css               # Main stylesheet with custom overrides and design enhancements
├── text                    # Folder containing reusable HTML components for the project
    ├── footer.html             # Footer section of the website
    ├── nav_after_login.html    # Navigation bar for logged-in users
    ├── nav_before_login.html   # Navigation bar for visitors or logged-out users
├── trash                   # Trash folder for unused or temporary files

```


