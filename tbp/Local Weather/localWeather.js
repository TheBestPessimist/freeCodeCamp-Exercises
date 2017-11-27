'use strict';

let locationAcquireOptions = {
    enableHighAccuracy: true,
    timeout: 15 * 1000,              // 5 seconds?
};

function locationAcquireSuccess(position) {
    let date = new Date(position.timestamp);
    // date.setMilliseconds(position.timestamp);
    let a = document.getElementById("1");
    a.innerHTML = "Location data:";
    a.innerHTML += " latitude: " + position.coords.latitude;
    a.innerHTML += " longitude: " + position.coords.longitude;
    a.innerHTML += " altitude: " + position.coords.altitude;
    a.innerHTML += " accuracy: " + position.coords.accuracy;
    a.innerHTML += " altitudeAccuracy: " + position.coords.altitudeAccuracy;
    a.innerHTML += " heading: " + position.coords.heading;
    a.innerHTML += " speed: " + position.coords.speed;
    a.innerHTML += " aaaa: " + date;


    // new HttpClient().get("https://fcc-weather-api.glitch.me/api/current?lat=45.760561&lon=21.2509194")

    let theURL = "https://fcc-weather-api.glitch.me/api/current?lat=45.760561&lon=21.2509194";
    let anHttpRequest = new XMLHttpRequest();
    anHttpRequest.open("GET", theURL, true);
    anHttpRequest.send(null);
    a.innerHTML += anHttpRequest.responseText + "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";
}

/**
 * This needs no implementation!
 *
 * @param error
 */
function locationAcquireError(error) {
    // PositionError.code
    // PERMISSION_DENIED 	The acquisition of the geolocation information failed because the page didn't have the permission to do it.
    // 2 	POSITION_UNAVAILABLE 	The acquisition of the geolocation failed because one or several internal source of position returned an internal error.
    // 3 	TIMEOUT
    //
    // PositionError.message
}

function HttpClient() {
    this.get = function (aUrl, aCallback) {
        let anHttpRequest = new XMLHttpRequest();
        anHttpRequest.onreadystatechange = function () {
            if (anHttpRequest.readyState === 4 && anHttpRequest.status === 200)
                aCallback(anHttpRequest.responseText);
        };

        anHttpRequest.open("GET", aUrl, true);
        anHttpRequest.send(null);
    }
}

navigator.geolocation.watchPosition(locationAcquireSuccess, locationAcquireError, locationAcquireOptions);
