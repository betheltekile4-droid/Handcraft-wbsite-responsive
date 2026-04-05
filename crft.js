document.addEventListener("DOMContentLoaded", function () {
  let cartData = [];


  const btn = document.getElementById("viewAllBtn");
const hiddenItems = document.querySelectorAll(".hidden-item");

if (btn) {
  btn.addEventListener("click", function (e) {
    e.preventDefault();

    hiddenItems.forEach((item) => {
      item.style.display = "flex"; 
      item.style.marginTop = "25px";
    });

      hiddenItems.forEach((item, index) => {
    
       const imgDiv = item.querySelector(".img");
       if (imgDiv) {
         if (index === 0) imgDiv.style.backgroundImage = "url('bag2.jpg')";
         if (index === 1) imgDiv.style.backgroundImage = "url('mag2.jpg')";
       }
     });
    });
  }

  const signupBtn = document.getElementById("signupBtn");
  const signupBox = document.getElementById("signupBox");
  const closeBtn = document.getElementById("closeSignup");
  const createAccount = document.getElementById("createAccount");
  const backSignup = document.getElementById("backSignup");
  const saveDetails = document.getElementById("saveDetails");
  const signupForm = document.getElementById("signupForm");
  const nextForm = document.getElementById("nextForm");

  if (signupBtn) {
    signupBtn.addEventListener("click", (e) => {
      e.preventDefault();
      signupBox.style.display = "block";
      signupForm.style.display = "block";
      nextForm.style.display = "none";
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      signupBox.style.display = "none";
    });
  }

  if (createAccount) {
    createAccount.addEventListener("click", () => {
      signupForm.style.display = "none";
      nextForm.style.display = "block";
    });
  }

  if (backSignup) {
    backSignup.addEventListener("click", () => {
      signupForm.style.display = "block";
      nextForm.style.display = "none";
    });
  }

  if (saveDetails) {
    saveDetails.addEventListener("click", () => {
      signupBox.style.display = "none";
      alert("Signup Complete!");
    });
  }

  const cartIcon = document.querySelector(".right span");
  const cartModal = document.getElementById("cartModal");
  const closeCart = document.getElementById("closeCart");
  const cartItemsList = document.getElementById("cartItemsList");
  const totalPriceEl = document.getElementById("totalPrice");
  const cartCount = document.getElementById("cartCount");

  if (cartIcon) {
    cartIcon.addEventListener("click", (e) => {
      e.preventDefault();
      cartModal.classList.add("active");
      renderCart();
    });
  }

  if (closeCart) {
    closeCart.addEventListener("click", () => {
      cartModal.classList.remove("active");
    });
  }

  document.querySelectorAll(".bag").forEach((bagSpan) => {
    bagSpan.addEventListener("click", (e) => {
      e.preventDefault();

      const card = bagSpan.closest(".card");
      const name = card.querySelector("h3").innerText.replace("🛍️", "").trim();
      const rawPrice = card.querySelector("p").innerText;
      const price = parseFloat(rawPrice.replace(/[^0-9.]/g, "")) || 0;

      cartData.push({ name, price });

      if (cartCount) cartCount.innerText = cartData.length;

      alert(`${name} added to cart!`);
      renderCart();
    });
  });

  function renderCart() {
    cartItemsList.innerHTML = "";

    if (cartData.length === 0) {
      cartItemsList.innerHTML = "<li>Your cart is empty</li>";
    } else {
      cartData.forEach((item) => {
        const li = document.createElement("li");
        li.style.display = "flex";
        li.style.justifyContent = "space-between";
        li.innerHTML = `<span>${item.name}</span> <span>$${item.price.toFixed(2)}</span>`;
        cartItemsList.appendChild(li);
      });
    }

    updateTotal();
  }

  function updateTotal() {
    const total = cartData.reduce((sum, item) => sum + item.price, 0);
    totalPriceEl.innerText = `$${total.toFixed(2)}`;
  }
});
