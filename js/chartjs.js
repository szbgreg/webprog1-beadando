const table = document.getElementById("dataTable");
const tableBody = document.getElementById("dataTable").querySelector("tbody");
const ctx = document.getElementById("chart").getContext("2d");

// Az 5x5-ös táblázat számai
const data = [
  [30, 20, 10, 40, 50],
  [28, 6, 43, 22, 11],
  [15, 16, 45, 23, 36],
  [33, 41, 13, 3, 65],
  [46, 12, 56, 23, 70],
];

// A táblázat feltöltése számokkal
data.forEach((row) => {
  const tableRow = document.createElement("tr");

  row.forEach((number) => {
    const td = document.createElement("td");
    td.textContent = number;
    tableRow.appendChild(td);
  });

  tableBody.appendChild(tableRow);
});

// Diagram
let chart = new Chart(ctx, {
  type: "line",
  data: {
    labels: ["1", "2", "3", "4", "5"],
    datasets: [
      {
        label: "Kiválasztott sor adatai",
        data: [],
        borderColor: "#e7b50f",
        borderWidth: 2,
        fill: false,
      },
    ],
  },
  options: {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});

// A táblázatban egy sorra kattintásakor
// a kiválasztott sor adatait megjelenítjük a grafikonon
for (let row of table.rows) {
  row.addEventListener("click", () => {
    const values = Array.from(row.cells).map((cell) =>
      Number(cell.textContent)
    );

    chart.data.datasets[0].data = values;
    chart.update();
  });
}
