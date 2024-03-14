// import { Section } from './section.js';



let titles = [...document.querySelectorAll('h1, h2, h3, h4, h5, h6')];
// let topTitles = titles.filter(title => title.tagName == 'H2')
let topTitles = titles.filter(title => title.tagName == titles[0].tagName)
let secondTopTitles;
if (topTitles.length <= 3) {
    secondTopTitles = titles.filter(title => title.tagName == titles[topTitles.length].tagName)
}else{
    secondTopTitles = topTitles
}

console.log(topTitles)
console.log(secondTopTitles)


let sections = []
function initializeExtension() {
    secondTopTitles.forEach(title => {
        let sec = new Section(title)
        sec.create()
        sections.push(sec)
    })
}

function collapseAll() {
    console.log("collapseAll");
    sections.forEach(sec => {
        sec.toggle("none")
    })
}

function expandAll() {
    sections.forEach(sec => {
        sec.toggle("block")
    })
}


// Define a function to be called
function myFunction() {
    console.log("Function called from content.js");
}

// Listen for messages
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action == "collapseAll") {
        collapseAll(); // Call the function when requested
    }
});



// Initialize the extension when the page is loaded
window.addEventListener('load', initializeExtension);
console.log("BO0OM")
