function initMap() {
    const bcitCampus = { lat: 49.2835, lng: -123.1153 };

    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 15,
        center: bcitCampus,
    });

    const service = new google.maps.places.PlacesService(map);

    const legend = document.getElementById("legend");
    map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(legend);

    function displayPlaces(request, markerIcon, category) {
        service.nearbySearch(request, (results, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                results.forEach((place) => {
                    const marker = new google.maps.Marker({
                        position: place.geometry.location,
                        map: map,
                        title: place.name,
                        icon: markerIcon,
                    });

                    const infowindow = new google.maps.InfoWindow();
                    marker.addListener("click", () => {
                        infowindow.setContent(`
              <div>
                <strong>${place.name}</strong><br>
                ${place.vicinity || "No address available"}<br>
                Rating: ${place.rating || "N/A"}
                <br>
                <button onclick="saveToFavorites('${place.place_id}', '${place.name}', '${category}', '${place.vicinity || "No address"}')">Save to Favorites</button>
              </div>
            `);
                        infowindow.open(map, marker);
                    });
                });
            } else {
                console.error("Places API request failed: ", status);
            }
        });
    }

    const restaurantRequest = {
        location: bcitCampus,
        radius: 500,
        type: "restaurant",
    };
    const restaurantIcon = "http://maps.google.com/mapfiles/ms/icons/red-dot.png";
    displayPlaces(restaurantRequest, restaurantIcon, "Restaurant");

    const transitRequest = {
        location: bcitCampus,
        radius: 500,
        type: "transit_station",
    };
    const transitIcon = "http://maps.google.com/mapfiles/ms/icons/blue-dot.png";
    displayPlaces(transitRequest, transitIcon, "Transit Station");
}

function saveToFavorites(placeId, name, category, address) {
    const user = firebase.auth().currentUser;
    if (!user) {
        alert("You need to log in to save favorites!");
        return;
    }

    const userId = user.uid;
    const db = firebase.firestore();
    db.collection("users")
        .doc(userId)
        .collection("favorites")
        .doc(placeId)
        .set({
            name: name,
            category: category,
            address: address,
            savedAt: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then(() => {
            alert(`${name} has been added to your favorites!`);
        })
        .catch((error) => {
            console.error("Error saving to favorites: ", error);
        });
}

window.onload = initMap;
