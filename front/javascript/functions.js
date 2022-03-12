//* Global DOM functions
function append(parent, element) {
    return parent.appendChild(element);
}

function createNode(element) {
    return document.createElement(element);
}
function addContent(parent, element) {
    return parent.innerText = element;
}

//* Basket cookies functions

function saveBasket (basket) {
    localStorage.setItem("basket", basket);
}

function getBasket() {
    return localStorage.getItem("basket");
}