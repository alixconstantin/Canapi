let article = "";
let cart_items = document.querySelector('.cart__items');
let articles = getBasket();
let basket = JSON.parse(articles);

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
  }

  cart__items.innerHTML = article;
}

function deleteArticle(identifiant) {

  let basket = new Basket()
  basket.remove({
    id: identifiant
  });
  location.reload();

}

function changeQuantity(identifiant) {

  for (index in basket) {
    let basket = new Basket()
    const val = document.querySelectorAll('input')[index].value;
    basket[index].changeQuantity({
      id: identifiant
    }, val);

  }
}



getArticles();