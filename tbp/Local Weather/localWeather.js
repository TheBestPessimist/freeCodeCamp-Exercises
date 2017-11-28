'use strict';

let locationAcquireOptions = {
    enableHighAccuracy: true,
    timeout: 5 * 1000,              // 5 seconds?
};

// navigator.geolocation.watchPosition(locationAcquireSuccess, locationAcquireError, locationAcquireOptions);
navigator.geolocation.getCurrentPosition(locationAcquireSuccess, locationAcquireError, locationAcquireOptions);

const degree_fahrenheit = "\u2109";
const degree_celsius = "\u2103";

function locationAcquireSuccess(position) {
    let WeatherProviderURL = "https://fcc-weather-api.glitch.me/api/current?lat={lat}&lon={lon}";
    let client = new HttpClient();
    client.get(WeatherProviderURL.formatUnicorn({lat: position.coords.latitude, lon: position.coords.longitude}),
        displayWeatherInfo);

    // google gives me timisoara in some weird way, i must iterate over it and get the "locality". fcc gives me some stupid location.
    // let gString = "https://maps.googleapis.com/maps/api/geocode/json?latlng={lat},{lon}&sensor=true";
    // client.get(gString.formatUnicorn({lat: position.coords.latitude, lon: position.coords.longitude}),
    //     displayWeatherInfo);

    // let date = new Date(position.timestamp);
    // let a = document.getElementById("1");
    // a.innerHTML = "Location data:";
    // a.innerHTML += " latitude: >>{0}<<".formatUnicorn(position.coords.latitude);
    // a.innerHTML += " longitude: >>{0}<<".formatUnicorn(position.coords.longitude);
    // a.innerHTML += " altitude: >>{0}<<".formatUnicorn(position.coords.altitude);
    // a.innerHTML += " accuracy: >>{0}<<".formatUnicorn(position.coords.accuracy);
    // a.innerHTML += " altitudeAccuracy: >>{0}<<".formatUnicorn(position.coords.altitudeAccuracy);
    // a.innerHTML += " heading: >>{0}<<".formatUnicorn(position.coords.heading);
    // a.innerHTML += " speed: >>{0}<<".formatUnicorn(position.coords.speed);
    // a.innerHTML += " aaaa: >>{0}<<".formatUnicorn(date.toString());
    // new HttpClient().get("https://fcc-weather-api.glitch.me/api/current?lat=45.760561&lon=21.2509194")
    // let anHttpRequest = new XMLHttpRequest();
    // anHttpRequest.open("GET", WeatherProviderURL, true);
    // anHttpRequest.send(null);
    // a.innerHTML += anHttpRequest.responseText + "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";
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

/**
 * From stackoverflow
 *
 * @constructor
 */
function HttpClient() {
    this.get = function (theURL, theCallback) {
        let theHttpRequest = new XMLHttpRequest();
        theHttpRequest.onreadystatechange = function () {
            if (theHttpRequest.readyState === 4 && theHttpRequest.status === 200)
                theCallback(theHttpRequest.responseText);
        };

        theHttpRequest.open("GET", theURL, true);
        theHttpRequest.send(null);
    }
}


/**
 * Allows me to format strings nicely.
 * Examples:
 *
 * "aaaa: --{0}--".formatUnicorn("this is a string");       // results in "aaaa: --this is a string--"
 * "https://fcc-weather-api.glitch.me/api/current?lat={lat}&lon={lon}".formatUnicorn({lon: "TheLongitude",lat: "TheLatitude"});     // results in "https://fcc-weather-api.glitch.me/api/current?lat=TheLatitude&lon=TheLongitude"
 *
 * From stackoverflow: https://stackoverflow.com/questions/610406/javascript-equivalent-to-printf-string-format
 *
 * @type {Function}
 */
String.prototype.formatUnicorn = String.prototype.formatUnicorn ||
    function () {
        "use strict";
        let str = this.toString();
        if (arguments.length) {
            let t = typeof arguments[0];
            let key;
            let args = ("string" === t || "number" === t) ?
                Array.prototype.slice.call(arguments)
                : arguments[0];

            for (key in args) {
                str = str.replace(new RegExp("\\{" + key + "\\}", "gi"), args[key]);
            }
        }

        return str;
    };

function displayWeatherInfo(weatherInfoString) {
    let jsonData = JSON.parse(weatherInfoString);

    let a = document.getElementById("1");
    a.innerHTML = "<br><br>Location data:" + weatherInfoString;

    let location = document.getElementById("location");
    location.innerHTML = "Weather in {0}".formatUnicorn(jsonData.name);
    let weather_description = document.getElementById("weather_description");
    weather_description.innerHTML = jsonData.weather[0].description;


    let temperature = document.getElementById("temperature");
    temperature.innerHTML = "Temperature: {0}{1}".formatUnicorn(jsonData.main.temp, degree_celsius);
    let sunrise = document.getElementById("sunrise");
    sunrise.innerHTML = "Sunrise: {0}".formatUnicorn(new Date(jsonData.sys.sunrise * 1000).toLocaleTimeString());     // *1000 because i need millis, not epoch!
    let sunset = document.getElementById("sunset");
    sunset.innerHTML = "Sunset: {0}".formatUnicorn(new Date(jsonData.sys.sunset * 1000).toLocaleTimeString());

}

function showTheBloodyGoogleMap() {
    let map = new google.maps.Map(document.getElementById('google_map'), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 13
    });

    navigator.geolocation.getCurrentPosition(function (position) {
        let pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        };
        map.setCenter(pos);
    });
}
