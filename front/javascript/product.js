let params = (new URL(document.location)).searchParams;
let id = params.get('id');


/**
 * Got a specific product by fetching the ID of the product on the API
 */
function getProduct() {
    fetch(`http://localhost:3000/api/products/${id}`)

        .then((response) => {
            if (response.ok) {
                return response.json()
            }
        })

        // * Create a DOM element specific to the data retrieved by the API of the product
        .then((data) => {
            let produit = data;

            let image = createNode('img');
            image.src = produit.imageUrl;
            image.alt = produit.altTxt;

            let title = produit.name;
            let prix = produit.price;
            let description = produit.description;
            let couleurs = produit.colors;

            let couleursContainer = document.querySelector("#colors");
            let imageContainer = document.querySelector(".item__img");
            let titleContainer = document.querySelector("#title");
            let priceContainer = document.querySelector("#price");
            let descriptionContainer = document.querySelector("#description");

            for (let i = 0; i < couleurs.length; i++) {
                let optionColor = document.createElement("option");
                optionColor.value = couleurs[i];
                optionColor.innerText = couleurs[i];
                append(couleursContainer, optionColor);
            }

            // * Add the specific picture to the DOM, and the specific data of the product
            append(imageContainer, image);
            addContent(titleContainer, title);
            addContent(descriptionContainer, description);
            addContent(priceContainer, prix);
        })

        // * If the fetch API fail, write the specific error on the page
        .catch((err) => {
            let productContainer = document.querySelector(".item");
            productContainer.innerHTML = `<h2>Problème de chargement du produit, motif de l'erreur : " ${err.message} "<br> Merci de contacter l'équipe de support a : kanap@gmail.com</h2>`;

        })
}


let addBasketButton = document.querySelector('#addToCart');
let productQuantity = document.querySelector('#quantity');
let colorSelected = document.querySelector('#colors');

/**
 * add to LocalStorage the product
 */
function addBaskets() {

    fetch(`http://localhost:3000/api/products/${id}`)

        .then((response) => {
            if (response.ok) {
                return response.json()
            }
        })

        // * If the product have a correct quantity and selected a color
        .then((data) => {
            let produit = data;
            addBasketButton.addEventListener('click', () => {
                if ((productQuantity.value >= 1 && productQuantity.value <= 100) && (colorSelected.value != "")) {
                    let basket = new Basket;
                    let item = {
                        "id": produit._id,
                        "name": produit.name,
                        "color": colorSelected.value,
                        "quantity": Number(productQuantity.value),
                        "imageUrl": produit.imageUrl,
                        "altTxt": produit.altTxt

                    }
                    // * Add the product to localStorage sends a dynamic message with the name, quantity and color of the added product
                    basket.add(item);
                    alert(`Produit : ${item.name}\rCouleur : ${item.color}\rQuantité : ${item.quantity}\rVient d'être ajouter ajouté au panier.`)

                    // * Or send the specific error relative to the quantity or color
                } else {
                    if (productQuantity.value < 1) {
                        alert(`La quantité d'un produit ne peut pas être inférieur a 1.\rQuantité actuel : ${productQuantity.value}`);
                    } else if (productQuantity.value > 100) {
                        alert(`Pour être ajouté au panier, la quantité ne peut pas être supérieur a 100\r Quantité actuel : ${productQuantity.value}`);
                    } else {
                        alert('Vous devez préciser une couleur pour ajouter le produit.')
                    }

                }
            })

        })
}

function main() {
    getProduct();
    addBaskets();
}

main();