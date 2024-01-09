
// Fetching products from the server API and then display them
function fetchProducts() {
    fetch('/api/products')
        .then(response => response.json())
        .then(products => {
            displayProducts(products);
            updateCartSidebar(); // Update cart sidebar in case there are items in the cart
        })
        .catch(error => console.error('Error fetching products:', error));
}

// Function to display products
function displayProducts(products) {
    const productsDiv = document.querySelector('.Products');
    // Clear the productsDiv before adding new product details
    productsDiv.innerHTML = '';

    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';

        const productName = document.createElement('h3');
        productName.textContent = product.Name;

        const productPrice = document.createElement('p');
        productPrice.textContent = `$${product.Cost}`;

        const productImage = document.createElement('img');
        productImage.src = product.Image;
        productImage.alt = product.Name;

        const productButton = document.createElement('button');
        productButton.textContent = 'Add to Cart';
        productButton.addEventListener('click', function () {
            addToCart(product);
            updateCartSidebar();
        });

        productDiv.appendChild(productImage);
        productDiv.appendChild(productName);
        productDiv.appendChild(productPrice);
        productDiv.appendChild(productButton);

        productsDiv.appendChild(productDiv);
    });
}

var cartItems = JSON.parse(localStorage.getItem("cart")) || [];

// Existing cart functionality code here...
function openNav() {
    document.querySelector(".sidebar").classList.add("open");
    updateCartSidebar();
}


function closeNav() {
    document.querySelector(".sidebar").classList.remove("open");
}

var cartBtn = document.querySelector(".nav li:nth-child(2) a");
cartBtn.addEventListener("click", openNav);

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
    updateCartSidebar(); 
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

// Call fetchProducts on page load to display products
document.addEventListener('DOMContentLoaded', fetchProducts);