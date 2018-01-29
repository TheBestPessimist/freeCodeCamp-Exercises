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

function prepareUserSelectionLink(userSelection) {
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

function logJSONObject(obj) {
    console.log(JSON.stringify(obj, null, 4));
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
    document.getElementById("random-button").addEventListener("click", openRandomPage)
};


function searchTerm(e) {
    e.preventDefault();
    let searchTerm = this[0].value;

    if (searchTerm !== undefined && searchTerm !== null) {
        return;
    }

    let client = new HttpClient();
    client.get(prepareUserSearchLink(searchTerm), showOutput);
}

function showOutput(someOutput) {
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
    let pageId = json["pageid"];

    let div = document.createElement("div");
    addOnClickHandlerToSearchResult(div);
    div.classList.add("js-search-result");

    let pTitle = document.createElement("p");
    pTitle.classList.add("js-search-result__title");
    pTitle.innerHTML = title;
    div.appendChild(pTitle);

    let pDescription = document.createElement("p");
    pDescription.classList.add("js-search-result__description");
    pDescription.innerHTML = description;
    div.appendChild(pDescription);

    let pPageId = document.createElement("p");
    pPageId.classList.add("js-search-result__hidden-metadata");
    pPageId.innerHTML = pageId;
    div.appendChild(pPageId);

    return div;
}

function addOnClickHandlerToSearchResult(div) {
    div.addEventListener("click", handleSearchResultOnClick);
}

function handleSearchResultOnClick(event) {
    let div = event.target;
    while (!div.classList.contains("js-search-result")) {
        div = div.parentNode;
    }

    let pageId = div.querySelector(".js-search-result__hidden-metadata").textContent;

    let client = new HttpClient();
    client.get(prepareUserSelectionLink(pageId), openWikipediaInNewTab);

}

function openWikipediaInNewTab(response) {
    let json = JSON.parse(response);
    let pageId = Object.keys(json["query"]["pages"])[0];
    let url = json["query"]["pages"][pageId]["fullurl"];

    window.open(url, "_blank");
}

// https://stackoverflow.com/questions/23667086/why-is-my-variable-unaltered-after-i-modify-it-inside-of-a-function-asynchron

function openRandomPage() {
    const randomPageLink = "https://en.wikipedia.org/wiki/Special:Random";
    window.open(randomPageLink, "_blank");
}
