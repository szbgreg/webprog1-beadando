const code = "BBBBBBxqz789";
const url = "http://gamf.nhely.hu/ajax2/";

document.getElementById("code").textContent = code;

// Read
async function read() {
  let response = await fetch(url, {
    method: "post",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `code=${code}&op=read`,
  });
  let data = await response.json();
  const list = data.list;

  // Táblázat összeállítása
  let html =
    "<table><thead><tr><th>id</th><th>name</th><th>height</th><th>weight</th><th>code</th></tr></thead>";
  html += "<tbody>";
  list.forEach((item) => {
    html += `<tr><td>${item.id}</td><td>${item.name}</td><td>${item.height}</td><td>${item.weight}</td><td>${item.code}</td></tr>`;
  });
  html += "</tbody>";
  html += "</table>";

  document.getElementById("dataTable").innerHTML = html;

  // Magasságok összegyűjtése tömbbe
  const heights = list.map((i) => parseFloat(i.height) || 0);

  // Összeg számítása
  let sum = 0;

  for (let i = 0; i < heights.length; i++) {
    sum += heights[i];
  }

  // Átlag számítása
  const avg = heights.length ? sum / heights.length : 0;

  // Legnagyobb számítása
  let max = heights.length ? heights[0] : 0;

  for (let i = 1; i < heights.length; i++) {
    if (heights[i] > max) {
      max = heights[i];
    }
  }

  document.getElementById(
    "statistics"
  ).innerHTML = `<strong>Összeg:</strong> ${sum} <strong>Átlag:</strong> ${avg} <strong>Legnagyobb:</strong> ${max}`;
}

// Oldal betöltéskor Read hívás
window.onload = read;

// Create
async function create() {
  const nameVal = document.getElementById("name1").value;
  const heightVal = document.getElementById("height1").value;
  const weightVal = document.getElementById("weight1").value;

  if (validate(nameVal) && validate(heightVal) && validate(weightVal)) {
    let resp = await fetch(url, {
      method: "post",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `code=${code}&op=create&name=${nameVal}&height=${heightVal}&weight=${weightVal}`,
    });

    let result = await resp.text();
    document.getElementById("createMessage").textContent =
      result > 0 ? "Hozzáadás sikeres!" : "Sikertelen hozzáadás!";

    document.getElementById(`name1`).value = "";
    document.getElementById(`height1`).value = "";
    document.getElementById(`weight1`).value = "";

    read();
  } else {
    document.getElementById("createMessage").textContent =
      "Kötelező a mezők kitöltése! (Max. 30 karakter)";
  }
}

// Update
async function update() {
  const id = document.getElementById("idUpd").value;
  const nameVal = document.getElementById("name2").value;
  const heightVal = document.getElementById("height2").value;
  const weightVal = document.getElementById("weight2").value;

  if (id && validate(nameVal) && validate(heightVal) && validate(weightVal)) {
    let resp = await fetch(url, {
      method: "post",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `code=${code}&op=update&id=${id}&name=${nameVal}&height=${heightVal}&weight=${weightVal}`,
    });
    let result = await resp.text();

    document.getElementById("updateMessage").textContent =
      result > 0 ? "Sikeres módosítás!" : "A módosítás sikertelen!";

    document.getElementById(`name2`).value = "";
    document.getElementById(`height2`).value = "";
    document.getElementById(`weight2`).value = "";
    document.getElementById(`idUpd`).value = "";

    read();
  } else {
    document.getElementById("updateMessage").textContent =
      "Kötelező a mezők kitöltése! (Max. 30 karakter)";
  }
}

// Adat betöltése az ID alapján
async function getDataForId() {
  const id = parseInt(document.getElementById("idUpd").value);

  if (!id) return;

  let resp = await fetch(url, {
    method: "post",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `code=${code}&op=read`,
  });

  let data = await resp.json();
  /* console.log(data); */
  const item = data.list.find((i) => i.id === id);

  if (item) {
    document.getElementById("name2").value = item.name;
    document.getElementById("height2").value = item.height;
    document.getElementById("weight2").value = item.weight;
  }
}

// Delete
async function deleteF() {
  const id = document.getElementById("idDel").value;

  if (id) {
    let resp = await fetch(url, {
      method: "post",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `code=${code}&op=delete&id=${id}`,
    });

    let result = await resp.text();

    document.getElementById("deleteMessage").textContent =
      result > 0 ? "A törlés sikeres!" : "A törlés sikertelen!";

    document.getElementById("idDel").value = "";

    read();
  } else {
    document.getElementById("deleteMessage").textContent =
      "Kötelező a mezők kitöltése! (Max. 30 karakter)";
  }
}

// validáció
function validate(val) {
  return val.length > 0 && val.length <= 30;
}
