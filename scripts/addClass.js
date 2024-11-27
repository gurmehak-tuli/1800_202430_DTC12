function writeAssignments() {
    var classesRef = db.collection("classes"); // creates collection for classes

    classesRef.add({
        name: "Projects 1",
        code: "COMP1800",
        profName: "Hasam Alizadeh",
        campus: "Vancouver",
        lectures: "Tuesday 10:20 - 12:20",
        details: "Will go over...",

        last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time
    });
    classesRef.add({
        name: "Programing Methods",
        code: "COMP1510",
        profName: "Chris Tomphson",
        campus: "Vancouver",
        lectures: "Thursday 2:30 - 5:20",
        details: "Will go over...",

        last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time
    });
    classesRef.add({
        name: "Web Development",
        code: "COMP1537",
        profName: "Nabil",
        campus: "Vancouver",
        lectures: "tuesday 8:30 - 10:20",
        details: "Will go over...",

        last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time
    });
    classesRef.add({
        name: "Mathematics",
        code: "COMP1113",
        profName: "Julian Fekety",
        campus: "Vancouver",
        lectures: "Wednesday 8:30 - 10:20",
        details: "Will go over...",

        last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time
    });
    classesRef.add({
        name: "Business Analysis",
        code: "COMP1712",
        profName: "Maryam",
        campus: "Vancouver",
        province: "Wednesday 12:30 - 2:20",
        details: "Will go over...",

        last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time
    });
    classesRef.add({
        name: "Comunications",
        code: "COMP1116",
        profName: "Sam Lee",
        campus: "Vancouver",
        lectures: "Friday 8:30 - 10:20",
        details: "Will go over...",

        last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time
    });


}

