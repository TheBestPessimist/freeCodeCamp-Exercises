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

function prepareUserSearchLink(searchTerm) {
    let getParams = {
        format: 'json',
        utf8: 1,
        action: "query",
        list: 'search',
        srsearch: 'The Unix Haters Handbook',
        formatversion: 1,
        origin: '*',
    };
    getParams["srsearch"] = searchTerm;
    return ENDPOINT + formatParams(getParams);
}

function handleUserSelection(userSelection) {
    let getParams = {
        action: "query",
        format: "json",
        origin: "*",
        prop: "info",
        pageids: "",
        redirects: 1,
        utf8: 1,
        inprop: "url"
    };
    getParams["pageids"] = userSelection;
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


window.onload = function () {
    document.querySelector("#search").addEventListener("submit", searchTerm);
};


function searchTerm(e) {
    e.preventDefault();
    let searchTerm = this[0].value;

    let client = new HttpClient();
    client.get(prepareUserSearchLink(searchTerm), showOutput);
}

function showOutput(someOutput) {
    // let q = document.getElementById("query-response");
    // if (q == null) {
    //     q = document.createElement("pre");
    //     q.id = "query-response";
    //     document.body.appendChild(q);
    // }

    let searchResults = document.getElementById("search-results");
    // remove already existing search results
    while (searchResults.firstChild) {
        searchResults.removeChild(searchResults.firstChild);
    }

    let jsonSearchResults = JSON.parse(someOutput)["query"]["search"];
    for (let json in jsonSearchResults) {
        let e = divCreator(jsonSearchResults[json]);
        searchResults.appendChild(e);
    }

}

function divCreator(json) {
    let title = json["title"];
    let description = json["snippet"];

    let div = document.createElement("div");
    addOnClickHandlerToSearchResult(div);
    div.classList.add("search-result");
    let pTitle = document.createElement("p");
    pTitle.classList.add("search-result__title");
    let pDescription = document.createElement("p");
    pDescription.classList.add("search-result__description");

    div.appendChild(pTitle);
    div.appendChild(pDescription);
    pTitle.innerHTML = title;
    pDescription.innerHTML = description;
    return div;
}

//
//
// window.onclick = e => {
//     console.log(e.target);
//     console.log(e.target.tagName);
// };
//
// window.onclick = e => {
//     console.log(e.target.innerText);
// };
//
//

function addOnClickHandlerToSearchResult(div) {
    div.addEventListener("click", handleSearchResultOnClick);
}

function handleSearchResultOnClick(e) {
    let div = e.target;
    while (!div.classList.contains("search-result")) {
        div = div.parentNode;
    }
    alert(div.innerText);
}
