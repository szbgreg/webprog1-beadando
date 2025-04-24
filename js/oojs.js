// Termék osztály
class Product {
  constructor(name, price) {
    this.name = name;
    this.price = price;
  }

  getName() {
    return this.name;
  }

  getPrice() {
    return this.price;
  }

  // Létrehozunk egy listaelemet a termékhez
  render() {
    const li = document.createElement("li");
    li.className = "product-item";

    const title = document.createElement("h2");
    title.textContent = this.getName();
    li.appendChild(title);

    const price = document.createElement("p");
    price.textContent = `Ár: ${this.getPrice()} Ft`;
    li.appendChild(price);

    return li;
  }
}

// Laptop osztály
class Laptop extends Product {
  constructor(name, price, ram, storage) {
    super(name, price);
    this.ram = ram;
    this.storage = storage;
  }

  getSpecs() {
    return `${this.ram} RAM, ${this.storage}`;
  }

  // Kiegészítjük a Product osztály render metódusát
  render() {
    const li = super.render();
    const specs = document.createElement("p");

    specs.textContent = `Specifikáció: ${this.getSpecs()}`;

    li.appendChild(specs);

    return li;
  }
}

// Mobil osztály
class Mobile extends Product {
  constructor(name, price, camera) {
    super(name, price);
    this.camera = camera;
  }

  getCamera() {
    return `${this.camera} kamera`;
  }

  // Kiegészítjük a Product osztály render metódusát
  render() {
    const li = super.render();
    const cam = document.createElement("p");

    cam.textContent = `Kamera: ${this.getCamera()}`;

    li.appendChild(cam);

    return li;
  }
}

// Tablet osztály
class Tablet extends Product {
  constructor(name, price, screenSize) {
    super(name, price);
    this.screenSize = screenSize;
  }

  getScreenSize() {
    return `${this.screenSize} kijelző`;
  }

  // Kiegészítjük a Product osztály render metódusát
  render() {
    const li = super.render();
    const screen = document.createElement("p");

    screen.textContent = `Kijelzőméret: ${this.getScreenSize()}`;

    li.appendChild(screen);

    return li;
  }
}

// Termékek létrehozása
const products = [
  new Laptop("Dell XPS 13", 150000, "16GB", "512GB SSD"),
  new Laptop("MacBook Pro", 250000, "32GB", "1TB SSD"),
  new Mobile("Samsung Galaxy S21", 200000, "108MP"),
  new Mobile("iPhone 13", 250000, "12MP"),
  new Tablet("iPad Pro", 300000, '12.9"'),
  new Tablet("Samsung Galaxy Tab S7", 200000, '11"'),
];

// Listaelemek megjelenítése a listában
products.forEach((product) => {
  const li = product.render();

  document.getElementById("product-list").appendChild(li);
});
