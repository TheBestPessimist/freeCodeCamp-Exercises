'use strict';

let initialQuoteTextFontSize;
let initialQuoteTextHeight;
let lastQuoteUsedIndex = 0;
/*don't show the current quote 2 times in a row*/

// quoteList.push(new CreateQuote("The last of the Goo Balls were...<br> ...<br> ...uh oh...<br> ...there aren't any more Goo Balls.<br> They must have all been sucked away by the pipe system... <br>All the Goo Balls from the entire world!", "—your friend, the Telescope Operator"));
let newQuoteButton = document.getElementById("button-generate-new-quote");

newQuoteButton.addEventListener("click", generateRandomQuote);

function CreateQuote(quote, author) {
    this.quote = quote;
    this.author = author;

}

let quoteList = [];
quoteList.push(new CreateQuote("The last of the Goo Balls were...<br> ...<br> ...uh oh...<br> ...there aren't any more Goo Balls.<br> They must have all been sucked away by the pipe system... <br>All the Goo Balls from the entire world!", "—your friend, the Telescope Operator"));
quoteList.push(new CreateQuote("Balancing on the edge of the Big Recycle Bin, the last of the Goo Balls didn't seem to know that they were extremely explosive <br>or that all the mail files in the history of the Information Superhighway were about to be undeleted!", "—your friend, the Virtual Sign Painter"));
quoteList.push(new CreateQuote("Happy New Year!<br> The last of the Goo Balls didn't seem to notice... <br>they were part of an internationally televised World of Goo Corporation Product Launch Event. <br>The color pamphlet they were handing out indicates the product will change the world forever. <br>Shhh...! <br>They are about to reveal World of Goo Corporation's new 'Product Z'...!", "—see you after the show, the Sign Painter"));
quoteList.push(new CreateQuote("The last of the Goo Balls didn't seem to notice they were in some sort of giant Beauty Pageant Machine.<br> Pretty ones over there, Ugly ones over here.<br> Personally, I think everyone is beautiful.<br> Mostly me.", "—the devastating Sign Painter"));
quoteList.push(new CreateQuote("The last of the Goo Balls didn't seem to know that they were extremely delicious or about the nature of the smelly pit in which they found themselves.<br> They said something about this being the last level of the first chapter... whatever that means.", "—the Sign Painter"));
quoteList.push(new CreateQuote("That must be the thing that renders all the graphics. The creative heart of the Information Superhighway.<br> Once it's upgraded, the manual says it will offer 256 stunning colors! <br>But my favorite color will always be green.", "—the Virtual Sign Painter"));
//        quoteList.push(new CreateQuote("", ""));
//        quoteList.push(new CreateQuote("", ""));
//        quoteList.push(new CreateQuote("", ""));
function generateRandomQuote() {
    let quoteTextElement = document.getElementById("quote-text");
    let quoteAuthorElement = document.getElementById("quote-author");

    let nextQuoteIndex = randIntExceptValue(quoteList.length, lastQuoteUsedIndex);
    lastQuoteUsedIndex = nextQuoteIndex;

    // this is used to dynamically set the font size of the quote text
    computeNewTextSize(quoteTextElement, quoteList[nextQuoteIndex].quote);

    // now i have the right font size
    quoteTextElement.innerHTML = quoteList[nextQuoteIndex].quote;
    quoteAuthorElement.innerHTML = quoteList[nextQuoteIndex].author;

    quoteAuthorElement.innerHTML += window.getComputedStyle(quoteTextElement).getPropertyValue('font-size') + "|" + window.getComputedStyle(quoteTextElement).getPropertyValue('height');

}

function randIntExceptValue(maxValue, exceptValue) {
    let number = Math.floor(Math.random() * maxValue);
    return number === exceptValue ? (number + 1) % maxValue : number;
}

function computeNewTextSize(originalElement, theQuote) {
    if (typeof initialQuoteTextFontSize === 'undefined') {
        initialQuoteTextFontSize = parseFloat(window.getComputedStyle(originalElement).getPropertyValue('font-size'));
        initialQuoteTextHeight = parseFloat(window.getComputedStyle(originalElement).getPropertyValue('height'));
    }
    let cloneElement = originalElement.cloneNode(true);
    cloneElement.id = "aClone";
    cloneElement.style.visibility = "hidden";
    originalElement.parentNode.appendChild(cloneElement);
    cloneElement.style.fontSize = initialQuoteTextFontSize + "px";
    cloneElement.innerHTML = theQuote;


    let cloneHeight = parseFloat(window.getComputedStyle(cloneElement).getPropertyValue('height'));

    while (cloneHeight > initialQuoteTextHeight) {
        let cloneFontSize = parseFloat(window.getComputedStyle(cloneElement).getPropertyValue('font-size'));
        cloneElement.style.fontSize = cloneFontSize - 0.1 + "px";
        // cloneElement.innerHTML = theQuote;
        cloneHeight = parseFloat(window.getComputedStyle(cloneElement).getPropertyValue('height'));
    }

    originalElement.style.fontSize = window.getComputedStyle(cloneElement).getPropertyValue('font-size');
    // originalElement.innerHTML += window.getComputedStyle(originalElement).getPropertyValue('font-size') + "|" + window.getComputedStyle(originalElement).getPropertyValue('height');

    originalElement.parentNode.removeChild(cloneElement);
}
