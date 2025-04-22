<?php
header('Content-Type: text/event-stream');
header('Cache-Control: no-cache');

$products = [
    ["name" => "Laptop",        "price" => 349000],
    ["name" => "Okostelefon",   "price" => 189000],
    ["name" => "Tablet",        "price" => 129000],
    ["name" => "Fülhallgató",   "price" => 25000],
    ["name" => "Okosóra",       "price" => 49000],
    ["name" => "Monitor",       "price" => 59900],
    ["name" => "Billentyűzet",  "price" => 12000],
    ["name" => "Egér",          "price" => 8000],
    ["name" => "Hangszóró",     "price" => 17900],
    ["name" => "Power Bank",    "price" => 9900],
];

$randomProduct = $products[array_rand($products)];

echo "data: " . json_encode($randomProduct) . "\n\n";
flush();
