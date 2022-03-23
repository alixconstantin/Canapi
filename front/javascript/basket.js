let article = "";
let cart_items = document.querySelector('.cart__items');
let articles = getBasket();
let basket = JSON.parse(articles);
let btnOrder = document.querySelector('#order');



/**
 * Create all products from the basket ( localStorage )
 */
function getArticles()
{

  for (index in basket)
  {

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

  let deleteOption = document.querySelectorAll('.deleteItem');

  //* Basket Delete function on all the producs
  for (index in basket)
  {
    deleteOption[index].addEventListener('click', () =>
    {
      let suppr = new Basket();
      suppr.remove({
        id: basket[index].id,
        color: basket[index].color
      });
       location.reload();
    })

  }

  //* Baskete Changing quantity function on all the producs
  let val = document.querySelectorAll('.itemQuantity');
  for (index in basket)
  {

    val[index].addEventListener('blur', () =>
    {
      for (let i = 0; i < val.length; i++)
      {
        let newValue = new Basket();
        newValue.changeQuantity({
          id: basket[i].id
        }, val[i].value);
        location.reload();
      }
    });
  }
}

function totalPrice()
{

  let priceDom = document.querySelector("#totalPrice");
  let basket = new Basket();
  let priceAmount = basket.getTotalPrice();
  priceDom.innerText = priceAmount;
}

function sendOrder()
{

  btnOrder.addEventListener('click', (evt) =>
  {
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
     console.log(order);




    const options = {
      method: "POST",
      body: JSON.stringify(order),
      headers: {
        "Content-Type": "application/json"
      },
    };

    fetch("http://localhost:3000/api/products/order", options)
      .then((response) => response.json())
      .then((data) =>
      {
      localStorage.clear();
      localStorage.setItem("orderId", data.orderId);
      document.location.href = "confirmation.html";

      })
      .catch((err) =>
      {
        alert("Il y a eu une erreur : " + err);
      });

  })

}



function main()
{

  getArticles();
  totalPrice();
  sendOrder();

}

main();