// PROGRAMMER: Trentin Gillis
// DATE (LAST UPDATED): March 17, 2018
// VERSION: 1.0

/*
*  Function to get users geolocation using the HTML5 geolocation functionality. Use the function getUserLoc() to
*  perform user location retrieval. Currently the function is called when the body is loaded on the index page.
*/

// Function to get users geolocation using HTML5 geolocation features
function getUserLoc() {
    // Use HTML5 geolocation to get lat and lng coordinates of user
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(onSuccess, onError, { maximumAge: 600000, timeout: 5000, enableHighAccuracy: true });
    }
    else {
        console.log("Error obtaining location from user");
    }
}

// Function to change hidden input values if getting users geolocation is successful
function onSuccess (position) {
    // Get needed inputs from form
    var latInput = document.querySelector("#lat");
    var lngInput = document.querySelector("#lng");

    // Set values on inputs to desired values
    latInput.value = position.coords.latitude;
    lngInput.value = position.coords.longitude;
}

// Function to print error message if getting users geo location is not successful
function onError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            console.log("User denied request for Geolocation");
            break;
        case error.POSITION_UNAVAILABLE:
            console.log("Location information is unavailable");
            break;
        case error.TIMEOUT:
            console.log("The request to get user location timed out");
            break;
        default:
            console.log("An unknown error occurred");
            break;
    }
}
