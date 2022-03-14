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

function saveBasket(basket) {
    localStorage.setItem("basket", JSON.stringify(basket));
}

function getBasket() {
    let basket = localStorage.getItem("basket");
    if (basket == null) {
        return [];
    } else {
        return JSON.parse(basket);
    }
}

function addBasket(product) {
    let basket = getBasket();
    let sameProduct = basket.find(pdt => pdt.id == product.id);
    if (sameProduct != null) {
        sameProduct.quantity++;
    } else {
        product.quantity = 1;
        basket.push(product);
    }

    saveBasket(basket);
}

function removeProductFromBasket(product) {
    let basket = getBasket();
    basket = basket.filter(pdt => pdt.id != product.id);
    saveBasket(basket);
}

function addQuantity(product, quantity) {
    let basket = getBasket();
    let sameProduct = basket.find(pdt => pdt.id == product.id);
    if (sameProduct != null) {
        sameProduct.quantity += quantity;
    }
    saveBasket(basket);
}

function changeQuantity(product, quantity) {
    let basket = getBasket();
    let sameProduct = basket.find(pdt => pdt.id == product.id);
    if (sameProduct != null) {
        sameProduct.quantity = quantity;
    }
    saveBasket(basket);
}


function getTotalProducts() {
    let basket = getBasket();
    let number = 0;
    for(let product of basket) {
        number += product.quantity;
    }
    return number;
}

function getTotalPrice() {
    let basket = getBasket();
    let total = 0;
    for(let product of basket) {
        total += product.quantity * product.price;
    }
    return total;
}