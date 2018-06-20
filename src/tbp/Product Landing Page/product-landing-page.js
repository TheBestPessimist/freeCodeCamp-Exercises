"use strict";

const setCorrectFCCTest = function () {
    const currentTest = "product-landing-page";

    // noinspection JSValidateTypes
    const /*HTMLSelectElement*/ testSuite = document.getElementById("test-suite-selector");
    testSuite.value = currentTest;

    FCC_Global.selectProject(currentTest);
};

window.onload = setCorrectFCCTest;
