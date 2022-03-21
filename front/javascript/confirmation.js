const orderId = document.querySelector("#orderId");
orderId.innerText = localStorage.getItem("orderId");
localStorage.clear();

