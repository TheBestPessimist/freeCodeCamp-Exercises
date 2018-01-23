'use strict';

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


/**
 * Format the parameters in a URL-like format
 *
 */
function formatParams(params) {
    return "?" + Object
        .keys(params)
        .map(function (key) {
            return key + "=" + encodeURIComponent(params[key])
        })
        .join("&")
}

function prepareSearchLink(searchTerm) {
    getParams["srsearch"] = searchTerm;
    return ENDPOINT + formatParams(getParams);
}

//
//
//
//
//
//
//
//
//
//
//
//
//
//
const ENDPOINT = "https://en.wikipedia.org/w/api.php";

let searchTerm = "Dakhabrakha";


let getParams = {
    action: "query",
    list: 'search',
    srsearch: 'The Unix Haters Handbook',
    format: 'json',
    formatversion: 2,
    origin: '*',
};

let client = new HttpClient();
client.get(prepareSearchLink(searchTerm),
    showOutput
);


function showOutput(someOutput) {
    let json = JSON.parse(someOutput);
    json = JSON.stringify(json, null, 4);

    let q = document.getElementById("q");
    q.innerHTML = json;

}
