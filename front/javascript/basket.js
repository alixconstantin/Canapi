
let articlesArray= JSON.parse(getBasket());
let article = "";
let cart_items = document.querySelector('.cart__items');


function getArticles() {
    for (index in articlesArray) {
      
    article += `<article class="cart__item" data-id="${articlesArray[index].id}" data-color="${articlesArray[index].color}">
    <div class="cart__item__img">
      <img src="${articlesArray[index].imageUrl}" alt="${articlesArray[index].altTxt}">
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__description">
        <h2>${articlesArray[index].name}</h2>
        <p>${articlesArray[index].color}</p>
        <p>${articlesArray[index].price} €</p>
      </div>
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p>Qté : </p>
          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${articlesArray[index].quantity}">
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem" onclick="deleteArticle()">Delete</p>
        </div>
      </div>
    </div>
  </article>`

}
cart__items.innerHTML = article;
}

function deleteArticle() {

let article = document.querySelector(".deleteItem");


for ( index in articlesArray ) {
   
  let articleValue = articlesArray[index];
  article.remove(articleValue[index].id);
  console.log(articleValue);

}


}
getArticles();
deleteArticle();