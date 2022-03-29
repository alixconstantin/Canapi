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

  cart__items.innerHTML = article;



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

  //* Basket Delete function on all the producs

  //* Baskete Changing quantity function on all the producs
  let val = document.querySelectorAll('.itemQuantity');
  for (index in basket) {

    val[index].addEventListener('blur', () => {
      for (let i = 0; i < val.length; i++) {
        let newValue = new Basket();
        newValue.changeQuantity({
          id: basket[i].id
        }, val[i].value);
        location.reload();
      }
    });
  }
}

function getPrice() {

  let priceProduct = document.querySelectorAll('.product_price');
  let id = new Basket();
  let idProduct = id.getAllId();
  let quantity = []
  for (index in basket ){
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


function totalPrice() {

  let priceDom = document.querySelector("#totalPrice");
  let Total = 0;
  let id = new Basket();
  let idProduct = id.getAllId();
  let quantity = []
  for (index in basket ){
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

function sendOrder() {

  btnOrder.addEventListener('click', (evt) => {
    evt.preventDefault();
    let basket = new Basket();

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

    let textRegExp = new RegExp("^[a-zA-Z ,.'-]+$");
    let addressRegExp = new RegExp("^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+");
    let emailRegExp = new RegExp("^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$");

    let testForm1 = textRegExp.test(order.contact.firstName);
    let testForm2 = textRegExp.test(order.contact.lastName);
    let testForm3 = textRegExp.test(order.contact.city);
    let testForm4 = addressRegExp.test(order.contact.address);
    let testForm5 = emailRegExp.test(order.contact.email);

    if (testForm1 && testForm2 && testForm3 && testForm4 && testForm5) {

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
      alert("Il y a eu une erreur dans le formulaire, merci de revoir les champs de saisie");
    }
  })

}



function main() {

  getArticles();
  getPrice();
  totalPrice();
  sendOrder();

}

main();