//*  Url API of all products
const localhosting = 'http://localhost:3000/api/products'

//* Request API, if request is ok, return Json data
fetch(localhosting)
    .then((response) => {
        if (response.ok) {
            return response.json()
        }
    })

    //* If request is and got json response from API, data can be used from the parameter, here data
    .then((data) => {
        let liste = document.querySelector(".items");
        let produits = data;
        let products = "";
        for (index in produits) {
            products += `<a href="./product.html?id=${produits[index]._id}">
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

    //* If the request to the API is not good, sends a personalized message to the page, with the error message
    .catch((err) => {
        let productsContainer = document.querySelector(".items");
        productsContainer.innerHTML = `<h2>Problème de chargement des articles, motif de l'erreur : " ${err.message} "<br> Merci de contacter l'équipe de support a : kanap@gmail.com</h2>`;
    })