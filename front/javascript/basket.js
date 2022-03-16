let article = "";
let cart_items = document.querySelector('.cart__items');
let articles = getBasket();
let basket = JSON.parse(articles);
let btnOrder = document.querySelector('#order');

// TODO : réparer parseInt de l'objet 4 et 8 ( pb : string en début d'id )

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
        <p>${basket[index].price} €</p>
      </div>
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p>Qté : </p>
          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${basket[index].quantity}" onblur="changeQuantity(${basket[index].id})">
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem" onclick="deleteArticle(${basket[index].id})">Delete</p>
        </div>
      </div>
    </div>
  </article>`
  console.log(basket[index].id);
  }
 
  cart__items.innerHTML = article;
}

function deleteArticle(identifiant) {

  let basket = new Basket()
  basket.remove({
    id:`' ${identifiant}' ` 
  });
  location.reload();
}

function changeQuantity(identifiant) {

  for (index in basket) {
    let cat = new Basket()
    const val = document.querySelectorAll('input')[index].value;
    cat.changeQuantity({
      id: identifiant
    }, val);
    location.reload();
  }
}

function totalPrice() {

  let priceDom = document.querySelector("#totalPrice");
  let basket = new Basket();
  let priceAmount = basket.getTotalPrice();
  priceDom.innerText = priceAmount;
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
     products : ["107fb5b75607497b96722bda5b50496"]
     //  JSON.stringify(basket.getAllId())
    }
    // console.log(order);

 

    
    const options = {
      method: "POST",
      body: JSON.stringify(order),
      headers: { "Content-Type": "application/json" },
    };

    fetch("http://localhost:3000/api/products/order", options)
        .then((response) => response.json())
        .then((data) => {
          
          console.log(data)

        })
        .catch((err) => {
          alert("Il y a eu une erreur : " + err);
        }); 

        /*
        const url = "http://localhost:3000/api/products/order";
        fetch(url, {
          method: "POST",
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(order)
      }) */
    

    
  })

}



function main() {

  getArticles();
  totalPrice();
  sendOrder();

} 

 main();
