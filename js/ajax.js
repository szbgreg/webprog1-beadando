const code = "BBBBBBefg456";
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
