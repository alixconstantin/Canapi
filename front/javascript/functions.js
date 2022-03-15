//* Global DOM functions

/**
 *  add Dom to Html
 * @param {domElement} parent where dom is added
 * @param {domElement} element which element is added
 * @returns add an element to dom
 */
function append(parent, element) {
    return parent.appendChild(element);
}


/** 
 * create a dom element 
 * @param {domElement} element 
 */
function createNode(element) {
    return document.createElement(element);
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

//* Basket cookies functions


class Basket {
    constructor() {
        let basket = localStorage.getItem("basket");
        if (basket == null) {
            this.basket = [];
        } else {
            this.basket = JSON.parse(basket); // * If the basket exist, transform basket {strings} (localStorage) to Json Object
        }
    }


    /**
     *  save the basket as strings in localStorage in JsonFormat
     */
    save() {
        localStorage.setItem("basket", JSON.stringify(this.basket));
    }

    /** 
     *  add product in the localStorage
     * @param {string-jsonFormat} product json format but as strings
     */
    add(product) {
        let sameProduct = this.basket.find(pdt => pdt.id == product.id && pdt.color == product.color);
        if (sameProduct != null) {
            sameProduct.quantity += product.quantity;
        } else {

            this.basket.push(product);
        }
        this.save();
    }

    /** 
     * Remove a product on the basket ( id )
     * @param {string-jsonFormat} product json format but as strings
     */
    remove(product) {
        this.basket = this.basket.filter(pdt => pdt.id != product.id);
        this.save();
    }

    /**
     * Add quantity to One product +=
     * @param {string-jsonFormat} product json format but as strings
     * @param {number} quantity quantity added to product
     */
    addQuantity(product, quantity) {
        let sameProduct = this.basket.find(pdt => pdt.id == product.id);
        if (sameProduct != null) {
            sameProduct.quantity += quantity;
        }
        this.save();
    }

    /**
     * change the quantity to another
     * @param {string-jsonFormat} product json format but as strings
     * @param {number} quantity the new quantity
     */
    changeQuantity(product, quantity) {

        let sameProduct = this.basket.find(pdt => pdt.id == product.id);
        if (sameProduct != null) {
            sameProduct.quantity = quantity;
        }
        this.save();
    }

    /**
     * @returns The total quantity of all the products inside the basket
     */
    getTotalProducts() {
        let number = 0;
        for (let product of this.basket) {
            number += product.quantity;
        }
        return number;
    }

    /**
     * @returns The total price of all products 
     */
    getTotalPrice() {
        let total = 0;
        for (let product of this.basket) {
            total += product.quantity * product.price;
        }
        return total;
    }

}