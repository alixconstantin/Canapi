//*  Url api de l'ensemble des produits
const url = 'http://localhost:3000/api/products'

//* Interroge l'API, si requête OK convertie la réponse API en Json
fetch(url)
    .then(function (response) {
        if (response.ok) {
            return response.json()
        }
    })

    //* Si la requête a l'API n'est pas bonne, envoie un message personnalisé sur la page, avec le message de l'erreur
    .catch(function (err) {
        let productsContainer = document.querySelector(".items");
        productsContainer.innerText = `Impossible de charger l'API, motif de l'erreur : " ${err.message} "`;
    })

    //* Si la requête est OK & convertie en Json => Stock les tableaux dans une variables
    .then(function (data) {
        let liste = document.querySelector(".items");
        let produits = data;
        let products = "";
        for (index in produits) {
            products += `<a href="./product.html?${produits[index]._id}">
            <article>
              <img src="${produits[index].imageUrl}" alt="${produits[index].altTxt}">
              <h3 class="productName">${produits[index].name}</h3>
              <p class="productDescription">${produits[index].description}</p>
            </article>
          </a>
            `
        }
        liste.innerHTML = products;
    })

    