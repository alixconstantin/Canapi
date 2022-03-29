let queryString = window.location.search;
let urlParams = new URLSearchParams(queryString);
let orderID = urlParams.get('orderId');

const orderId = document.querySelector("#orderId");
orderId.innerText = orderID;

localStorage.clear();

