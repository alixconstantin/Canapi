// * Got the ID from the URL, and add it to a specific DOM element.
let query = window.location.search;
let urlParams = new URLSearchParams(query);
let orderID = urlParams.get('orderId');

const orderId = document.querySelector("#orderId");
orderId.innerText = orderID;

localStorage.clear();

