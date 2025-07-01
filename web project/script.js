//!SEARCH FUNCTIONALITY
let searchField = document.getElementById("search_field");
let TiffinContainer = document.getElementById("menu_two");
let TiffinCards = document.querySelectorAll(".card_container");
searchField.addEventListener("input", () => {
  let searchTerm = searchField.value.toLowerCase().trim();
  let hasResults = false;
  TiffinCards.forEach((card) => {
    let name = card.id;
    if (name.includes(searchTerm)) {
      card.style.display = "flex";
      hasResults = true;
    } else {
      card.style.display = "none";
      hasResults = false;
    }
  });
});

let cartQuantity = document.getElementById("quantity");
let cartPrice = document.getElementById("price");

let cart = {};

let totalQuantity = 0;
let totalPrice = 0;

let cards = document.querySelectorAll(".card_container");
cards.forEach((card) => {
  let itemId = card.id;
  let itemName = card.querySelector(".food_title").innerText;
  let itemPrice = Number(
    card.querySelector(".food_price").innerText.replace("₹", "")
  );
  let itemQuantity = card.querySelector("span");
  let minusBtn = card.querySelectorAll(".quantity_btns")[0];
  let plusBtn = card.querySelectorAll(".quantity_btns")[1];

  cart[itemId] = {
    name: itemName,
    price: itemPrice,
    quantity: 0,
  };

  plusBtn.addEventListener("click", () => {
    cart[itemId].quantity++;
    totalQuantity++;
    totalPrice += itemPrice;
    itemQuantity.innerText = cart[itemId].quantity;
    updateCart();
  });

  minusBtn.addEventListener("click", () => {
    if (cart[itemId].quantity > 0) {
      cart[itemId].quantity--;
      totalQuantity--;
      totalPrice -= itemPrice;
      itemQuantity.innerText = cart[itemId].quantity;
      updateCart();
    }
  });
});

function updateCart() {
  cartQuantity.innerText = totalQuantity;
  cartPrice.innerText = `₹${totalPrice.toFixed(2)}`;
}

let cart_icon = document.getElementById("cart_icon");
let closeBtn = document.querySelector("#popup_container>button");
let main = document.querySelector("main");

cart_icon.addEventListener("click", () => {
  main.style.display = "flex";
  renderCartDetails();
});
closeBtn.addEventListener("click", () => {
  main.style.display = "none";
});

const checkoutBtn = document.getElementById("checkout_btn");

checkoutBtn.addEventListener("click", () => {
  alert("Redirecting to payment...");
  handlePayment();
});


let cartDetails = document.getElementById("cart_details");
let cart_total_items = document.querySelector("#cart_total_items>span");
let cart_total_price = document.querySelector("#cart_total_price>span");


function renderCartDetails() {
  cartDetails.innerHTML = ""
  let hasResults = false
  for (let id in cart) {
    let name = cart[id].name
    let price = cart[id].price
    let quantity = cart[id].quantity
    if (quantity > 0) {
      hasResults = true;
      let para = document.createElement("p")
      para.innerHTML = `${name} x ${quantity} = ₹ ${(price * quantity).toFixed(2)}`
      cartDetails.append(para)
    }
  }
  if (hasResults == false) {
    cartDetails.innerHTML = `<p>No items in the cart</p>`
  }

  cart_total_items.innerText = totalQuantity
  cart_total_price.innerText = totalPrice.toFixed(2)
}

//  login
const loginPage = document.getElementById("login_page");
const loginBtn = document.getElementById("login_btn");
const loginMessage = document.getElementById("login_message");


window.addEventListener("load", () => {
  loginPage.style.display = "flex";
});

loginBtn.addEventListener("click", () => {
  const email = document.getElementById("login_email").value;
  const password = document.getElementById("login_password").value;

  if (email === "Tweety@gmail.com" && password === "2511") {
    loginMessage.innerText = "Login successful!";
    loginPage.style.display = "none";
  } else {
    loginMessage.innerText = "Invalid email or password.";
  }
});

let options = {
  key: "",
  amount: totalPrice * 100,
  currency: "INR",
  name: "TiffinBites",
  description: "Order Payment",
  handler: function (response) {
    alert("Payment Successful! Payment ID: " + response.razorpay_payment_id);
  },
  prefill: {
    name: "Customer",
    email: "customer@example.com",
    contact: "9876543210"
  },
  theme: {
    color: "#c22300"
  }
};

let rzp = new Razorpay(options);
rzp.open();
