let article = "";
let cart_items = document.querySelector('.cart__items');
let articles = getBasket();
let basket = JSON.parse(articles);
let btnOrder = document.querySelector('#order');


/**
 * Create all products from the basket ( localStorage )
 */

function getArticles() {

  for (index in basket) {

    article += `<article class="cart__item" data-id="${basket[index].id}" data-color="${basket[index].color}">
    <div class="cart__item__img">
      <img src="${basket[index].imageUrl}" alt="${basket[index].altTxt}">
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__description">
        <h2>${basket[index].name}</h2>
        <p>${basket[index].color}</p>
        <p class="product_price"> €</p>
      </div>
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p>Qté : </p>
          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${basket[index].quantity}">
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem">Delete</p>
        </div>
      </div>
    </div>
  </article>`

  }
  // * Add all the basket products in ONE time in the html
  cart__items.innerHTML = article;
}


/**
 * Change the quantity of a specific product
 */

function changeTheQuantity() {

  let val = document.querySelectorAll('.itemQuantity');
  for (index in basket) {

    val[index].addEventListener('blur', () => {
      for (let i = 0; i < val.length; i++) {
        let newValue = new Basket();
        newValue.changeQuantity({
          id: basket[i].id,
          color: basket[i].color
        }, val[i].value);
        location.reload();
      }
    });
  }
}


/**
 * Delete a specific product
 */

function Delete() {

  const deleteOption = document.querySelectorAll('.deleteItem');

  for (let i = 0; i < deleteOption.length; i++) {

    deleteOption[i].addEventListener('click', (event) => {

      let actualArticle = event.currentTarget.closest(".cart__item");
      let targetID = actualArticle.dataset.id;
      let targetColor = actualArticle.dataset.color;
      let suppr = new Basket();
      suppr.remove({
        id: targetID,
        color: targetColor
      });
      location.reload();
    })
  }
}


/**
 * Get the total price of one product
 */

function getPrice() {

  let priceProduct = document.querySelectorAll('.product_price');
  let id = new Basket();
  let idProduct = id.getAllId();
  let quantity = []
  for (index in basket) {
    quantity.push(parseInt(basket[index].quantity));
  }

  for (let i = 0; i < idProduct.length; i++) {

    fetch(`http://localhost:3000/api/products/${idProduct[i]}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let productPriceValue = data.price;
        priceProduct[i].innerText = productPriceValue * quantity[i] + ' €';
      })
  }
}


/**
 * Get the total price of all the products
 */

function totalPrice() {

  let priceDom = document.querySelector("#totalPrice");
  let Total = 0;
  let id = new Basket();
  let idProduct = id.getAllId();
  let quantity = []
  for (index in basket) {
    quantity.push(parseInt(basket[index].quantity));
  }

  for (let i = 0; i < idProduct.length; i++) {

    fetch(`http://localhost:3000/api/products/${idProduct[i]}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let productPriceValue = data.price;
        Total += parseInt(productPriceValue * quantity[i]);
        priceDom.innerText = Total;
      })
  }
}

function getTotalProducts (){

  let totalProducts = new Basket();
  let total = totalProducts.getNumberProduct();
  document.querySelector("#totalQuantity").innerText = total;
}

getTotalProducts();
/**
 * Sends the command if it is validated, otherwise returns a specific error
 */

function sendOrder() {

  // * Regular expression to improve form security
  let textRegExp = new RegExp("^[a-zA-Zàâäéèêëïîôöùûüç ,.'-]+$");
  let addressRegExp = new RegExp("^([0-9]{1,5})+[a-zA-Z1-9 ]+$");
  let emailRegExp = new RegExp("^[a-zA-Z0-9-.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$");

  btnOrder.addEventListener('click', (evt) => {
    evt.preventDefault();
    let basket = new Basket();

    // * The order object will contain all the data sent by the form and the IDs of the objects ordered
    let order = {
      contact: {
        "firstName": firstName.value,
        "lastName": lastName.value,
        "address": address.value,
        "city": city.value,
        "email": email.value,
      },
      products: basket.getAllId()

    }

    // * Regex test on the data received by the form
    let testForm1 = textRegExp.test(order.contact.firstName);
    let testForm2 = textRegExp.test(order.contact.lastName);
    let testForm3 = addressRegExp.test(order.contact.address);
    let testForm4 = textRegExp.test(order.contact.city);
    let testForm5 = emailRegExp.test(order.contact.email);

    // * Sends the order if there are products in the basket, and the form is correctly completed
    if (testForm1 && testForm2 && testForm3 && testForm4 && testForm5 && order.products.length > 0) {

      const options = {
        method: "POST",
        body: JSON.stringify(order),
        headers: {
          "Content-Type": "application/json"
        },
      };

      fetch("http://localhost:3000/api/products/order", options)
        .then((response) => response.json())
        .then((data) => {
          localStorage.clear();
          let orderID = data.orderId;
          document.location.href = "confirmation.html" + "?orderId=" + orderID;
        })
        .catch((err) => {
          alert("Il y a eu une erreur : " + err);
        });

    } else {
      // * Otherwise, returns an error, either where the form contains an error, or where the cart is empty

      if (testForm1 == false) {

        let errorDom = document.querySelector("#firstName");
        let error = createNode("p");
        error.id = id = "firstNameErrorMsg";
        error.innerText = "Erreur dans le champs de saisie";
        error.style.color = "red";
        error.style.fontWeight = "bold";
        insertAfter(error, errorDom);

        errorDom.addEventListener("change", () => {
          error.remove();
        });

      } else if (testForm2 == false) {

        let errorDom = document.querySelector("#lastName");
        let error = createNode("p");
        error.id = id = "lastNameErrorMsg";
        error.innerText = "Erreur dans le champs de saisie";
        error.style.color = "red";
        error.style.fontWeight = "bold";
        insertAfter(error, errorDom);
        errorDom.addEventListener("change", () => {
          error.remove();
        });

      } else if (testForm3 == false) {

        let errorDom = document.querySelector("#address");
        let error = createNode("p");
        error.id = id = "addressErrorMsg";
        error.innerText = "Erreur dans le champs de saisie";
        error.style.color = "red";
        error.style.fontWeight = "bold";
        insertAfter(error, errorDom);
        errorDom.addEventListener("change", () => {
          error.remove();
        });

      } else if (testForm4 == false) {

        let errorDom = document.querySelector("#city");
        let error = createNode("p");
        error.id = id = "cityErrorMsg";
        error.innerText = "Erreur dans le champs de saisie";
        error.style.color = "red";
        error.style.fontWeight = "bold";
        insertAfter(error, errorDom);
        errorDom.addEventListener("change", () => {
          error.remove();
        });

      } else if (testForm5 == false) {

        let errorDom = document.querySelector("#email");
        let error = createNode("p");
        error.id = id = "emailErrorMsg";
        error.innerText = "Erreur dans le champs de saisie";
        error.style.color = "red";
        error.style.fontWeight = "bold";
        insertAfter(error, errorDom);
        errorDom.addEventListener("change", () => {
          error.remove();
        });


      } else {

        alert("Votre panier est vide.");
      }

    }
  })

}



function main() {

  getArticles();
  Delete();
  changeTheQuantity();
  getPrice();
  totalPrice();
  sendOrder();
}

main();