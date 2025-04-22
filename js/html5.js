// Lementjük a nevet localStorage-ba
function saveName() {
  const name = document.getElementById("name").value;

  if (name) {
    localStorage.setItem("username", name);
    document.getElementById("output").innerText =
      "A nevedet sikeresen elmentettük!";
  }
}

// Oldal betöltésekor csekkoljuk, hogy van-e lementett név a localStorage-ban
// ha van, akkor üdvözöljük a felhasználót
window.onload = () => {
  const name = localStorage.getItem("username");

  if (name) {
    document.getElementById("output").innerText = "Üdv, " + name + "!";
  }
};

// Belépéskor, lementjük a sessionStorage-ba
function login() {
  const user = document.getElementById("username").value;

  if (user) {
    sessionStorage.setItem("user", user);
    showWelcome();
  }
}

// Kilépéskor töröljük
function logout() {
  sessionStorage.removeItem("user");
  document.getElementById("welcome").style.display = "none";
  document.getElementById("login").style.display = "block";
}

// Üdvözlő üzenet megjelenítése
function showWelcome() {
  const user = sessionStorage.getItem("user");

  if (user) {
    document.getElementById("welcome-message").innerText = "Üdv, " + user + "!";
    document.getElementById("login").style.display = "none";
    document.getElementById("welcome").style.display = "block";
  }
}

// Számláló indítása Web Worker-rel
let worker;

function startWorker() {
  if (typeof Worker !== "undefined") {
    worker = new Worker("js/worker.js");

    worker.onmessage = function (e) {
      document.getElementById("worker-message").innerText = e.data;
    };
  } else {
    alert("A böngésződ nem támogatja a Web Workers-t.");
  }
}

// Számláló leállítása
function stopWorker() {
  if (worker) {
    worker.terminate();
    worker = null;
    document.getElementById("worker-message").innerText = "A számláló leállt.";
  }
}
