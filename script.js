/* =========================
   SUPABASE
========================= */

const SUPABASE_URL =
  "https://xarsxumivzvraxjlildl.supabase.co";

const SUPABASE_KEY =
sb_publishable_xSFpu0UyI-RAgQbM7FFQsQ_Hrr0JEm9

const supabaseClient =
  window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
  );


/* =========================
   MOBILE MENU
========================= */

function toggleMenu() {

  const menu =
    document.getElementById("mobileMenu");

  menu.classList.toggle("show");

}


/* =========================
   LOAD PUJAS
========================= */

async function loadPujas() {

  const grid =
    document.getElementById("pujaGrid");

  grid.innerHTML =
    "<p>Loading Puja...</p>";

  const { data, error } =
    await supabaseClient
      .from("pujas")
      .select("*")
      .order("likes", { ascending: false });

  if (error) {

    console.error(error);

    grid.innerHTML =
      "<p>Unable to load Puja data.</p>";

    return;
  }

  if (!data || data.length === 0) {

    grid.innerHTML =
      "<p>No Puja added yet.</p>";

    return;
  }

  grid.innerHTML = "";

  data.forEach(function(puja) {

    const image =
      puja.pandal_image ||
      "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=800&q=80";

    const card = document.createElement("article");

    card.className = "puja-card";

    card.innerHTML = `

      <div class="image-container">

        <img
          src="${image}"
          alt="${escapeHTML(puja.name || "Durga Puja")}"
        >

        <span class="location-tag">
          📍 ${escapeHTML(puja.location || "Location unavailable")}
        </span>

        <button
          class="like-btn"
          onclick="likePuja(this, ${puja.id})"
        >
          ♡
        </button>

      </div>

      <div class="card-content">

        <span class="card-category">
          Durga Puja
        </span>

        <h3>
          ${escapeHTML(puja.name || "Durga Puja")}
        </h3>

        <p class="committee">
          🏛️ ${escapeHTML(
            puja.committee_name || "Puja Committee"
          )}
        </p>

        <div class="card-bottom">

          <span class="likes">
            ❤️
            <span class="like-count">
              ${puja.likes || 0}
            </span>
          </span>

          <button
            class="details-btn"
            onclick="openMaps('${escapeAttribute(puja.maps_url || "")}')"
          >
            Explore →
          </button>

        </div>

      </div>
    `;

    grid.appendChild(card);

  });

}


/* =========================
   LIKE PUJA
========================= */

async function likePuja(button, pujaId) {

  const card =
    button.closest(".puja-card");

  const countElement =
    card.querySelector(".like-count");

  let count =
    parseInt(countElement.textContent) || 0;

  if (button.classList.contains("liked")) {

    return;

  }

  count++;

  button.classList.add("liked");

  button.innerHTML = "♥";

  countElement.textContent = count;

  const { error } =
    await supabaseClient
      .from("pujas")
      .update({ likes: count })
      .eq("id", pujaId);

  if (error) {

    console.error(error);

  }

}


/* =========================
   SEARCH
========================= */

function searchPuja() {

  const input =
    document.getElementById("searchInput");

  const searchText =
    input.value.toLowerCase().trim();

  const cards =
    document.querySelectorAll(".puja-card");

  cards.forEach(function(card) {

    const text =
      card.innerText.toLowerCase();

    card.style.display =
      text.includes(searchText)
        ? ""
        : "none";

  });

}


/* =========================
   CATEGORY BUTTONS
========================= */

const categories =
  document.querySelectorAll(".category");

categories.forEach(function(category) {

  category.addEventListener(
    "click",
    function() {

      categories.forEach(function(item) {

        item.classList.remove("active");

      });

      this.classList.add("active");

    }
  );

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
   GOOGLE MAPS
========================= */

function openMaps(url) {

  if (url) {

    window.open(url, "_blank");

  } else {

    alert("Google Maps location is not available yet.");

  }

}


/* =========================
   SECURITY HELPERS
========================= */

function escapeHTML(value) {

  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

}

function escapeAttribute(value) {

  return String(value)
    .replaceAll("\\", "\\\\")
    .replaceAll("'", "\\'")
    .replaceAll('"', "&quot;");

}


/* =========================
   START
========================= */

document.addEventListener(
  "DOMContentLoaded",
  function() {

    loadPujas();

    console.log(
      "🪔 PujaMap + Supabase loaded!"
    );

  }
);
