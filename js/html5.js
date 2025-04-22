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
