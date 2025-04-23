// Worker üzenetben elküldi a számláló értékét
let count = 0;

setInterval(() => {
  count++;
  postMessage("Számláló: " + count);
}, 1000);
