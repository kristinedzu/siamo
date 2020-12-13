"use strict";

// hide all pages
function hideAllPages() {
    let pages = document.querySelectorAll(".page");
    for (let page of pages) {
        page.style.display = "none";
    }
}

// show page or tab
function showPage(pageId) {
    hideAllPages();
    document.querySelector(`#${pageId}`).style.display = "block";
    setActiveTab(pageId);
}

// sets active tabbar/ menu item
function setActiveTab(pageId) {
    let pages = document.querySelectorAll(".tabbar div a");
    for (let page of pages) {
        if (`#${pageId}` === page.getAttribute("href")) {
            page.classList.add("active");
        } else {
            page.classList.remove("active");
        }
    }
}

// navigate to a new view/page by changing href
function navigateTo(pageId) {
    location.href = `#${pageId}`;
}

// set default page or given page by the hash url
function pageChange() {
    let page = "home";
    if (location.hash) {
        page = location.hash.slice(1);
    }

    showPage(page);
}

pageChange();

// loader
function showLoader(show) {
    let loader = document.querySelector('#loader');
    if (show) {
        loader.classList.remove("hide");
    } else {
        loader.classList.add("hide");
    }
}


// hide navigation on scroll down, show on scroll up
(function () {

    var doc = document.documentElement;
    var w = window;

    var prevScroll = w.scrollY || doc.scrollTop;
    var curScroll;
    var direction = 0;
    var prevDirection = 0;

    var header = document.getElementById('tabbar');

    var checkScroll = function () {

        /* Find the direction of scroll */
        curScroll = w.scrollY || doc.scrollTop;
        if (curScroll > prevScroll) {
            //scrolled up
            direction = 2;
        }
        else if (curScroll < prevScroll) {
            //scrolled down
            direction = 1;
        }

        if (direction !== prevDirection) {
            toggleHeader(direction, curScroll);
        }

        prevScroll = curScroll;
    };
    // sets the height of scrolling
    var toggleHeader = function (direction, curScroll) {
        if (direction === 2 && curScroll > 1) {

            header.classList.add('hidebar');
            prevDirection = direction;
        }
        else if (direction === 1) {
            header.classList.remove('hidebar');
            prevDirection = direction;
        }
    };

    window.addEventListener('scroll', checkScroll);

})();

