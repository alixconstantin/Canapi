let params = (new URL(document.location)).searchParams;
let id = params.get('id');

function getProduct() {
    fetch(`http://localhost:3000/api/products/${id}`)

        .then((response) => {
            if (response.ok) {
                return response.json()
            }
        })

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

            append(imageContainer, image);
            addContent(titleContainer, title);
            addContent(descriptionContainer, description);
            addContent(priceContainer, prix);
        })

        .catch((err) => {
            let productContainer = document.querySelector(".item");
            productContainer.innerHTML = `<h2>Problème de chargement du produit, motif de l'erreur : " ${err.message} "<br> Merci de contacter l'équipe de support a : kanap@gmail.com</h2>`;

        })
}



let addBasketButton = document.querySelector('#addToCart');
let productQuantity = document.querySelector('#quantity');
let colorSelected = document.querySelector('#colors');

function addBaskets() {

    fetch(`http://localhost:3000/api/products/${id}`)

        .then((response) => {
            if (response.ok) {
                return response.json()
            }
        })

        .then((data) => {
            let produit = data;
            addBasketButton.addEventListener('click', () => {
                if ((productQuantity.value != 0 && productQuantity.value <= 100) && (colorSelected.value != "")) {
                    let basket = new Basket;
                    let item = {
                        "id": produit._id,
                        "name": produit.name,
                        "color": colorSelected.value,
                        "quantity": Number(productQuantity.value),
                        "price": produit.price,
                        "imageUrl": produit.imageUrl,
                        "altTxt":produit.altTxt
                         
                    }
                    basket.add(item);
                    console.log(item);
                }
            })

        })
}

getProduct();
addBaskets();