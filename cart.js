
var productsDiv = document.querySelector(".Products");
var sidebar = document.querySelector(".sidebar");

var products = [
    { Name: "iPhone 13", Cost: 500, Image: "./image/iphone13.jpg" },
    { Name: "MacBook Pro", Cost: 1000, Image: "./image/MackBookPro.jpg" },
    { Name: "Sony WH-1000XM4", Cost: 150, Image: "./image/SonyWH.jpg" },
    { Name: "Apple Watch Series 7", Cost: 200, Image: "./image/appleW7.jpg" },
    { Name: "Canon EOS R5", Cost: 800, Image: "./image/EOSR50.jpg" },
    { Name: "Nintendo Switch", Cost: 300, Image: "./image/Ninten.jpg" },
    { Name: "Kindle Paperwhite", Cost: 100, Image: "./image/kindle.jpg" },
    { Name: "Nike Air Force 1", Cost: 120, Image: "./image/Nike.jpeg" },
    { Name: "Dyson V11", Cost: 600, Image: "./image/Dyson.jpg"},
    { Name: "Lego Star Wars Millennium Falcon", Cost: 800, Image: "./image/falcon.jpg"},
    { Name: "Samsung Galaxy S21", Cost: 799,Image: "./image/SamsungS21.jpg"},
    { Name: "Oculus Quest 2", Cost: 299,Image: "./image/oculusquest2.jpg"},
    { Name: "Bose QuietComfort 35 II", Cost: 249, image: "./image/QuietComfort35.jpeg"},
    { Name: "Fitbit Charge 5", Cost: 179.95,Image: "./image/charge5.png"}, 
    { Name: "GoPro Hero 10 Black", Cost: 499.99,Image: "./image/Gopro.jpg"}, 
    { Name: "Amazon Echo Dot (4th Gen)", Cost: 49.99,Image: "./image/echo.jpg"},
    { Name: "Microsoft Surface Pro 8", Cost: 1099.99,Image: "./image/surface.jpg"}, 
    { Name: "LG OLED C1 TV", Cost: 1799.99,Image:".\\image\\LGoled.jpg"},
    { Name: "Sonos Roam", Cost: 169,Image:'.\\image\\SonosRoam.jpg'},
    { Name: "Dell XPS 13", Cost: 999.99,Image: './image/dell13.png'},
    { Name: "Razer Blade 15", Cost: 1699.99,Image: './image/RazerB.jpg'}, 
    { Name: "Apple AirPods Pro", Cost: 249,Image:'./image/airpods.png'},
    { Name: "Samsung Galaxy Watch 4", Cost: 249.99,Image: './image/SGW4.jpg'},
    { Name: "Logitech MX Master 3", Cost: 99.99,Image: './image/LMM3.jpeg'}
];

products.forEach(function (product) {
    var productDiv = document.createElement("div");
    productDiv.setAttribute("class", "product");

    var productName = document.createElement("h3"); // Use an <h3> element for the product name
    productName.textContent = product.Name;
    var productPrice = document.createElement("p"); // Use a <p> element for the product price
    productPrice.textContent = "$" + product.Cost;
    var productImage = document.createElement("img");
    productImage.setAttribute("src", product.Image);
    productImage.setAttribute("alt", product.Name);
    var productButton = document.createElement("button");
    productButton.textContent = "Add to Cart";


    productButton.addEventListener("click", function () {
        addToCart(product);
        updateCartSidebar();
    })

    productDiv.appendChild(productImage);
    productDiv.appendChild(productName);
    productDiv.appendChild(productPrice);
    productDiv.appendChild(productButton);

    productsDiv.appendChild(productDiv);
}
);


function openNav() {
    document.querySelector(".sidebar").classList.add("open");
    updateCartSidebar();
}


function closeNav() {
    document.querySelector(".sidebar").classList.remove("open");
}

var cartBtn = document.querySelector(".nav li:nth-child(2) a");
cartBtn.addEventListener("click", openNav);


var cartItems = JSON.parse(localStorage.getItem("cart")) || [];
var sidebar = document.querySelector(".sidebar");




// Function to update the cart sidebar
function updateCartSidebar() {
    // Clear only the cart items, not the close button and title
    var cartContent = sidebar.querySelectorAll(".item");
    cartContent.forEach(function (itemDiv) {
        sidebar.removeChild(itemDiv);
    });

    var totalCost = 0;

    // Add items back to the sidebar
    cartItems.forEach(function (item) {
        var itemDiv = document.createElement("div");
        itemDiv.setAttribute("class", "item");

        var itemName = document.createElement("p")
        itemName.textContent = item.Name
        // var itemName = document.createTextNode(item.Name);
        var itemPrice = document.createElement("p")
        itemPrice.textContent = "$" + item.Cost;

        // Create a delete button for each cart item
        var deleteButton = document.createElement("button");
        deleteButton.textContent = "❌"; 
        deleteButton.addEventListener("click", function () {
            removeFromCart(item);
        });

        itemDiv.appendChild(itemName);
        itemDiv.appendChild(itemPrice);
        itemDiv.appendChild(deleteButton);

        sidebar.appendChild(itemDiv);

        totalCost += item.Cost;
    });

    var totalCostElement = document.getElementById("totalCost");
    totalCostElement.textContent = totalCost;
}

function addToCart(item) {
    cartItems.push(item);
    localStorage.setItem("cart", JSON.stringify(cartItems)); // Update local storage
}


// Function to remove an item from the cart
function removeFromCart(item) {
    var index = cartItems.indexOf(item);
    if (index !== -1) {
        cartItems.splice(index, 1); // Remove the item from the cartItems array
        localStorage.setItem("cart", JSON.stringify(cartItems)); // Update local storage
        updateCartSidebar(); // Update the cart sidebar
    }
}


var style = document.createElement("style");
style.textContent = `
  .Products {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
  }

  .product {
    margin: 10px;
    padding: 10px;
    border: 1px solid black;
    width: 200px;
    height: 300px;
    text-align: center;
  }

  .product img {
    width: 150px;
    height: 150px;
  }
`;
document.head.appendChild(style);