//* Global DOM functions
 export function append(parent, element) {
    return parent.appendChild(element);
}

export function createNode(element) {
    return document.createElement(element);
}
export function addContent(parent, element) {
    return parent.innerText = element;
}

//* Basket cookies functions