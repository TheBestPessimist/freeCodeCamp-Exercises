'use strict';
let QuotesNamespace = {};

function CreateQuote(quote, author) {
    this.quote = quote;
    this.author = author;
}

QuotesNamespace.allQuotes = [];
QuotesNamespace.allQuotes.push(new CreateQuote("The last of the Goo Balls were...<br> ...<br> ...uh oh...<br> ...there aren't any more Goo Balls.<br> They must have all been sucked away by the pipe system... <br>All the Goo Balls from the entire world!", "—your friend, the Telescope Operator"));
QuotesNamespace.allQuotes.push(new CreateQuote("Balancing on the edge of the Big Recycle Bin, the last of the Goo Balls didn't seem to know that they were extremely explosive <br>or that all the mail files in the history of the Information Superhighway were about to be undeleted!", "—your friend, the Virtual Sign Painter"));
QuotesNamespace.allQuotes.push(new CreateQuote("Happy New Year!<br> The last of the Goo Balls didn't seem to notice... <br>they were part of an internationally televised World of Goo Corporation Product Launch Event. <br>The color pamphlet they were handing out indicates the product will change the world forever. <br>Shhh...! <br>They are about to reveal World of Goo Corporation's new 'Product Z'...!", "—see you after the show, the Sign Painter"));
QuotesNamespace.allQuotes.push(new CreateQuote("The last of the Goo Balls didn't seem to notice they were in some sort of giant Beauty Pageant Machine.<br> Pretty ones over there, Ugly ones over here.<br> Personally, I think everyone is beautiful.<br> Mostly me.", "—the devastating Sign Painter"));
QuotesNamespace.allQuotes.push(new CreateQuote("The last of the Goo Balls didn't seem to know that they were extremely delicious or about the nature of the smelly pit in which they found themselves.<br> They said something about this being the last level of the first chapter... whatever that means.", "—the Sign Painter"));
QuotesNamespace.allQuotes.push(new CreateQuote("That must be the thing that renders all the graphics. The creative heart of the Information Superhighway.<br> Once it's upgraded, the manual says it will offer 256 stunning colors! <br>But my favorite color will always be green.", "—the Virtual Sign Painter"));
//        QuotesNamespace.allQuotes.push(new CreateQuote("", ""));
//        QuotesNamespace.allQuotes.push(new CreateQuote("", ""));
//        QuotesNamespace.allQuotes.push(new CreateQuote("", ""));

let lastQuoteUsedIndex = 0;
/*don't show the current quote 2 times in a row*/

let newQuoteButton = document.getElementById("button-generate-new-quote");
newQuoteButton.addEventListener("click", generateRandomQuote);

function generateRandomQuote() {
    let quoteList = QuotesNamespace.allQuotes;

    let quoteTextElement = document.getElementById("quote-text");
    let quoteAuthorElement = document.getElementById("quote-author");

    let nextQuoteIndex = randIntExceptValue(quoteList.length, lastQuoteUsedIndex);
    lastQuoteUsedIndex = nextQuoteIndex;

    // this is used to dynamically set the font size of the quote text
    computeNewTextSize(quoteTextElement, quoteList[nextQuoteIndex].quote);

    // now i have the right font size
    quoteTextElement.innerHTML = quoteList[nextQuoteIndex].quote;
    quoteAuthorElement.innerHTML = quoteList[nextQuoteIndex].author;

    quoteAuthorElement.innerHTML += window.getComputedStyle(document.getElementById(quoteTextElement.id), null).getPropertyValue('font-size');

}

function randIntExceptValue(maxValue, exceptValue) {
    let number = Math.floor(Math.random() * maxValue);
    return number === exceptValue ? (number + 1) % maxValue : number;
}

function computeNewTextSize(originalElement, theQuote) {
    let cloneElement = originalElement.cloneNode(true);
    cloneElement.id = "aClone";
    // cloneElement.style.visibility = "hidden";
    document.body.appendChild(cloneElement);           // this element should be at the end of body, so nothing should be moved by it
    cloneElement.innerHTML = theQuote;

    let originalHeight = parseInt(window.getComputedStyle(originalElement).getPropertyValue('height'));
    let aa = parseInt(window.getComputedStyle(originalElement).getPropertyValue('outer-height'));
    let cloneHeight = parseInt(window.getComputedStyle(cloneElement).getPropertyValue('height'));

    while (cloneHeight > originalHeight) {
        let cloneFontSize = parseInt(window.getComputedStyle(document.getElementById(cloneElement.id), null).getPropertyValue('font-size'));
        cloneElement.style.fontSize = cloneFontSize - 0.5 + "px";
        cloneElement.innerHTML = theQuote;
        break;
    }
    originalElement.style.fontSize = window.getComputedStyle(document.getElementById(cloneElement.id), null).getPropertyValue('font-size');
    originalElement.innerHTML += window.getComputedStyle(document.getElementById(originalElement.id), null).getPropertyValue('font-size') + "|" + window.getComputedStyle(document.getElementById(cloneElement.id), null).getPropertyValue('font-size');

    document.body.removeChild(cloneElement);
}


//    function countNumberOfLines(theElement) {
//        let divHeight = theElement.offsetHeight;
//        let lineHeight = parseInt(window.getComputedStyle(theElement, null).getPropertyValue('font-size')) * 1.2;
//        return divHeight / lineHeight;
//    }
