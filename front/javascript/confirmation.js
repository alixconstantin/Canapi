let params = (new URL(document.location)).searchParams;
let id = params.get('id');
console.log(id);

const orderId = document.querySelector("#orderId");
orderId.innerText = localStorage.getItem("orderId");
localStorage.clear();

