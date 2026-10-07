/* =========================
   MOBILE MENU
========================= */

function toggleMenu() {

  const menu = document.getElementById("mobileMenu");

  menu.classList.toggle("show");

}


/* =========================
   LIKE BUTTON
========================= */

function likePuja(button) {

  const card = button.closest(".puja-card");

  const countElement =
    card.querySelector(".like-count");

  let count =
    parseInt(countElement.textContent);

  if (button.classList.contains("liked")) {

    count--;

    button.classList.remove("liked");

    button.innerHTML = "♡";

  } else {

    count++;

    button.classList.add("liked");

    button.innerHTML = "♥";

  }

  countElement.textContent = count;

}


/* =========================
   SEARCH PUJA
========================= */

function searchPuja() {

  const input =
    document.getElementById("searchInput");

  const searchText =
    input.value.toLowerCase().trim();

  const cards =
    document.querySelectorAll(".puja-card");


  cards.forEach(function(card) {

    const cardText =
      card.innerText.toLowerCase();

    if (cardText.includes(searchText)) {

      card.style.display = "";

    } else {

      card.style.display = "none";

    }

  });

}


/* =========================
   CATEGORY BUTTONS
========================= */

const categories =
  document.querySelectorAll(".category");


categories.forEach(function(category) {

  category.addEventListener("click", function() {

    categories.forEach(function(item) {

      item.classList.remove("active");

    });

    this.classList.add("active");

  });

});


/* =========================
   COMING SOON
========================= */

function showComingSoon() {

  alert(
    "🚀 Puja Committee Registration will be available soon!"
  );

}


/* =========================
   PAGE LOADED
========================= */

console.log(
  "🪔 PujaMap loaded successfully!"
);
