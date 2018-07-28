var page = $('html, body');

/*************************************************************
 * Use jQuery to scroll animated to the target of an anchor.
 *
 * Also use some Stackoverflow trickery so that the scroll animation is stopped when the user
 * scrolls/clicks another anchor, etc.
 *
 * magics: https://stackoverflow.com/questions/18445590/jquery-animate-stop-scrolling-when-user-scrolls-manually
 */
$(".scroll-animated").click(function () {
    var $elementHref = $(this).attr("href");
    var $elementToScrollTo = $($elementHref);


    page.on("scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove", function () {
        page.stop();
    });


    page.animate(
        {scrollTop: $elementToScrollTo.offset().top - $("#top-nav-and-progress").outerHeight()},
        900, "easeInOutCubic",
        function () {
            page.off("scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove");
        }
    );

    return false; // so that the default action (anchor-move) doesn't happen
});


/*************************************************************************
 * This is for the top bar which shows the scroll progress.
 *
 * Magics for getting the scroll percentage.
 * Stackoverflow trickery.
 *
 * @returns {number}
 */
function getScrollPercent() {
    return 100 * $(window).scrollTop() / ($(document).height() - $(window).height());
}

function updateTopProgressBar() {
    var theScrollPercent = getScrollPercent();

    var topProgressBar = $("#top-progress-bar")[0];
    topProgressBar.style.width = theScrollPercent + "%";
    topProgressBar.setAttribute("aria-valuenow", theScrollPercent.toString());
}

window.onscroll = updateTopProgressBar;


//    /**
//     * @deprecated: since using jQuery scroll to anchor
//     *
//     * This script is used to handle clicking the anchors and handling the variable-size bootstrap navbar
//     *
//     * i have to bind both the window resize and load because
//     * - onLoad the padding may be wrong
//     * - onResize the padding will be wrong (because navbar size changes)
//     * note that resize means zooming the page, or actually resizing the browser window.
//     */
//    $(window).bind("resize load", function () {
//        $(".dynamically-positioned-anchor").each(function () {
//            var navbarHeight = $("#top-nav-and-progress").outerHeight();
//
//            // in this case, what is "this"???? the html elements??? why are they "this" and not some named variable???
//            // 20 is used because otherwise the text will still be placed under the freaking navbar
//            // the 20 may or may not be wrong on low-res devices (ya know, dpi and such)
//            $(this)[0].style.paddingTop = navbarHeight + "px";
//            $(this)[0].style.marginTop = -1 * (navbarHeight) + "px";
//        });
//    });
