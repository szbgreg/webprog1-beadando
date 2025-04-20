// Itt megadunk pár tesztadatot
const testData = [
  {
    name: "Kiss Péter",
    birthYear: "2000",
    study: "Mérnökinformatikus",
    code: "ABC123",
  },
  {
    name: "Nagy Anna",
    birthYear: "1998",
    study: "Programtervező informatikus",
    code: "DEF456",
  },
  {
    name: "Szabó János",
    birthYear: "1999",
    study: "Üzemmérnök informatikus",
    code: "GHI789",
  },
  {
    name: "Tóth Eszter",
    birthYear: "2001",
    study: "Logsztikai mérnök",
    code: "JKL012",
  },
];

// Ez a változó tárolja a kiválasztott sort, amelyet szerkeszteni szeretnénk
let selectedRow = null;

// A táblázat feltöltése a tesztadatokkal
function loadTable() {
  testData.forEach((data) => {
    insertRow(data);
  });
}

window.onload = function () {
  loadTable();
};

// Form validálása gombnyomásra
function handleSubmit(e) {
  e.preventDefault();

  // Form adatok kiolvasása
  const form = e.target;
  const name = form.name.value;
  const birthYear = form.birthYear.value;
  const study = form.study.value;
  const code = form.code.value;

  const formData = { name, birthYear, study, code };

  if (!validateForm(formData)) {
    return;
  }

  // Ha van kiválasztott sor, akkor frissítjük azt, különben új sort adunk hozzá
  if (selectedRow) {
    updateRow(formData);
  } else {
    insertRow(formData);
  }

  form.reset();
}

// A form validálása
function validateForm(formData) {
  const { name, birthYear, study, code } = formData;
  const nameElement = document.getElementById("nameValidationError");
  const birthYearElement = document.getElementById("birthYearValidationError");
  const studyElement = document.getElementById("studyValidationError");
  const codeElement = document.getElementById("codeValidationError");
  let isValid = true;

  // Hibaüzenetek alaphelyzetbe állítjuk, hogy ne maradjanak meg a régi üzenetek
  nameElement.innerText = "";
  nameElement.style.display = "none";
  birthYearElement.innerText = "";
  birthYearElement.style.display = "none";
  studyElement.innerText = "";
  studyElement.style.display = "none";
  codeElement.innerText = "";
  codeElement.style.display = "none";

  // A név mező kitöltése kötelező
  if (!name) {
    nameElement.innerText = "A mező kitöltése kötelező!";
    nameElement.style.display = "inline-block";
    isValid = false;
  }

  // A születési év max 4 számjegy kell, hogy legyen
  const birthYearRegex = /^\d{4}$/;
  if (!birthYear || !birthYearRegex.test(birthYear)) {
    birthYearElement.innerText = "A születési évnek 4 számjegyből kell állnia!";
    birthYearElement.style.display = "inline-block";
    isValid = false;
  }

  // A szak hossza max 30 karakter lehet
  if (study.length > 30 || study.length < 1) {
    studyElement.innerText = "Kötelező mező! Maximum 30 karakter lehet!";
    studyElement.style.display = "inline-block";
    isValid = false;
  }

  // A kód mező hossza 6 karakter kell, hogy legyen
  if (code.length !== 6) {
    codeElement.innerText = "A kódnak 6 karakter hosszúnak kell lennie!";
    codeElement.style.display = "inline-block";
    isValid = false;
  }

  return isValid;
}

// Új sor hozzáadása a táblázathoz
function insertRow(formData) {
  const { name, birthYear, study, code } = formData;
  const table = document.getElementById("student-table");
  const newRow = table.insertRow();

  newRow.insertCell(0).innerText = name;
  newRow.insertCell(1).innerText = birthYear;
  newRow.insertCell(2).innerText = study;
  newRow.insertCell(3).innerText = code.toUpperCase();
  newRow.insertCell(4).innerHTML = `<a onclick="editRow(this)">Szerkesztés</a>`;
  newRow.insertCell(5).innerHTML = `<a onclick="deleteRow(this)">Törlés</a>`;
}

// Sor frissítése a táblázatban
function updateRow(formData) {
  const { name, birthYear, study, code } = formData;
  selectedRow.cells[0].innerText = name;
  selectedRow.cells[1].innerText = birthYear;
  selectedRow.cells[2].innerText = study;
  selectedRow.cells[3].innerText = code;

  selectedRow = null;
}

// Sor szerkesztése
function editRow(button) {
  selectedRow = button.parentElement.parentElement;

  document.getElementById("name").value = selectedRow.cells[0].innerHTML;
  document.getElementById("birthYear").value = selectedRow.cells[1].innerHTML;
  document.getElementById("study").value = selectedRow.cells[2].innerHTML;
  document.getElementById("code").value = selectedRow.cells[3].innerHTML;
}

// Sor törlése
function deleteRow(button) {
  if (confirm("Biztosan törlöd ezt a sort?")) {
    const row = button.parentElement.parentElement;
    const table = document.getElementById("student-table");
    table.deleteRow(row.rowIndex);
  }
}
