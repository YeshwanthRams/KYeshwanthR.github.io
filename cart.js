
var productsDiv = document.querySelector(".Products");
var sidebar = document.querySelector(".sidebar");

var products = [
    { Name: "iPhone 13", Cost: 500, Image: "iphone13.jpg" },
    { Name: "MacBook Pro", Cost: 1000, Image: "MackBookPro.jpg" },
    { Name: "Sony WH-1000XM4", Cost: 150, Image: "SonyWH.jpg" },
    { Name: "Apple Watch Series 7", Cost: 200, Image: "appleW7.jpg" },
    { Name: "Canon EOS R5", Cost: 800, Image: "EOSR50.jpg" },
    { Name: "Nintendo Switch", Cost: 300, Image: "Ninten.jpg" },
    { Name: "Kindle Paperwhite", Cost: 100, Image: "kindle.jpg" },
    { Name: "Nike Air Force 1", Cost: 120, Image: "Nike.jpeg" },
    { Name: "Dyson V11", Cost: 600, Image: "Dyson.jpg" },
    { Name: "Lego Star Wars Millennium Falcon", Cost: 800, Image: "falcon.jpg" }
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