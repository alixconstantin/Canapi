//* Global DOM functions

/**
 *  add Dom element to Html
 * @param {domElement} parent where dom is added
 * @param {domElement} element which element is added
 * @returns add an element to dom
 */

function append(parent, element) {
    return parent.appendChild(element);
}



/** 
 * create a dom element 
 * @param {html} element html balise with " "
 */

function createNode(element) {
    return document.createElement(element);
}



/**
 * add a dom element after a specific html element
 * @param {*} newNode the element you want to add
 * @param {*} existingNode after which element it will be added
 */

function insertAfter(newNode, existingNode) {
    existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
}



/** 
 *  add Text to an element
 * @param {domElement} parent element who got text
 * @param {string} element text ( from api )
 * @returns add text from api to the element
 */

function addContent(parent, element) {
    return parent.innerText = element;
}



/**
 * @returns the actual basket with all products
 */
function getBasket() {
    return localStorage.getItem('basket');
}


//* LocalStorage basket constructor, with the methods for the management of the basket

class Basket {
    constructor() {
        let basket = localStorage.getItem("basket");
        if (basket == null) {
            this.basket = [];
        } else {
            // * If the basket exist, transform basket {strings} (localStorage) to Json Object
            this.basket = JSON.parse(basket);
        }
    }


    /**
     *  save the basket as strings in localStorage in JsonFormat
     */

    save() {
        localStorage.setItem("basket", JSON.stringify(this.basket));
    }


    /** 
     *  add a product in the localStorage
     * @param {object} product an object with data product
     */

    add(product) {
        let sameProduct = this.basket.find(pdt => pdt.id == product.id && pdt.color == product.color);
        if (sameProduct != null) {
            sameProduct.quantity += product.quantity;
            if (sameProduct.quantity > 100) {
                sameProduct.quantity = 100;
                alert("Bonjour, Vous posséder 100 exemplaire de ce produit, ce qui est le maximum");
            }
        } else {

            this.basket.push(product);
        }
        this.save();
    }


    /** 
     * Remove a product on the basket by his ID and Color
     * @param {object} product object with only the Id and Color of the object to remove
     */

    remove(product) {
        console.log(product);
        this.basket = this.basket.filter(pdt => pdt.id != product.id || pdt.color != product.color);
        this.save();
    }


    /**
     * change the quantity of a product to another quantity
     * @param {object} product object with only the Id and Color of the object to remove
     * @param {number} quantity the new quantity
     * @return change the quantity of the product or, throw an error if quantity is < 1 or > 100
     */

    changeQuantity(product, quantity) {

        let sameProduct = this.basket.find(pdt => pdt.id == product.id && pdt.color == product.color);
        if (sameProduct != null) {
            sameProduct.quantity = quantity;
            if (sameProduct.quantity > 100) {
                sameProduct.quantity = 100;
                alert('Bonjour, la quantité ne peut excéder 100');
            } else if (sameProduct.quantity < 1) {
                sameProduct.quantity = 1;
                alert('Bonjour, vous ne pouvez rentrer une valeur inférieur a 1');
            }
        }
        this.save();
    }


    /**
     * @returns All the ID products in the basket
     */

    getAllId() {

        let allId = [];
        for (let product of this.basket) {
            let Id = product.id;
            allId.push(Id);
        }
        return allId;
    }


    /**
     * @returns All the products in the basket
     */
    getNumberProduct() {
        let number = 0;
        for (let product of this.basket) {
            number += parseInt(product.quantity);
        }
        return number;
    }
}