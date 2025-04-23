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

// Server-Sent Events indítása
function getProduct() {
  if (typeof EventSource !== "undefined") {
    const eventSource = new EventSource("sse.php");

    eventSource.onmessage = function (event) {
      const data = JSON.parse(event.data);
      const div = document.getElementById("product");

      div.style.display = "block";
      div.innerHTML = `<strong>Termék neve:</strong> ${data.name}<br>
      <strong>Ár:</strong> ${data.price} Ft`;
      eventSource.close();
    };
  } else {
    document.getElementById("result").innerText =
      "A böngésződ nem támogatja a Server-Sent Events-t.";
  }
}

// Drop engedélyezése
function allowDrop(ev) {
  ev.preventDefault();
}

// A dataTransfer.setData() metódus beállítja az adattípust és a húzott adatok értékét
function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

// A dataTransfer.getData() metódussal lekérjük a húzott elem azonosítóját, és hozzáadjuk a cél elemhez
function drop(ev) {
  ev.preventDefault();
  const id = ev.dataTransfer.getData("text");
  const dragged = document.getElementById(id);

  ev.target.appendChild(dragged);
}
