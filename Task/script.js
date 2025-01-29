// Target the container where items will be displayed
const container = document.querySelector(".container");
const nav = document.querySelector(".navBar");
let searchBtn = document.querySelector(".search-button");
let searchItem = document.querySelector(".search-input");
// console.log(searchBtn);
let closeBtn = document.querySelector(".close");
let cartItem = document.querySelector(".cart-item");

// To close cartItem
closeBtn.addEventListener("click", function () {
  cartItem.classList.add("hidden");
  // console.log('clicked');
});

document.addEventListener('click', function() {
    cartItem.classList.add("hidden");
})

// Rendering img using JS
const baseImageUrl1 =
  "https://s3-alpha-sig.figma.com/img/55dc/cf92/71625a611101e66f079d5d04ae8cbb17?Expires=1737331200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=I8iE49jtweaWpxWkiE3EapOd5FKkJ8GYc3LmUQzF2JCttpR2ofM77Pg5hZSdous7hJmpsdatR4Gq88ctSPDr1vX~QLOL0SBHuc6AFxHejHHQcK4-RfELcxfi6kHTmZf2iWX6yMORUMLOte0VkmsK-zvDqy-j~Gs1GG~8osG-ND34lkjmeEHILDTsiATL7pZklDZjiKFeEUc6b2iE8xu6qU4xjShQGF9Um6n4olNIE3~i66Mw9pqejuJNEVSObJaNj~oefEYIjVYrOq1txEZayoVoF3dfvrfuDsWejz9-a2CnQyGPhV9nsodd88fpxIyz9C9qadK13fS49GHmwHfxxw__";

const baseImageUrl2 =
  "https://s3-alpha-sig.figma.com/img/3036/7bfe/4a45e8b3e0cfdf4f68902e3df043cf02?Expires=1737331200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ns2qld4AV54z0qP8JiwW37mWeuvXo4JeQdlh5ral1pwSijUMKKAmwQmUDW~q7owCTVX8bVf-sF1dwxw-qU9AwfK0tKtIvMOF4Li7plp4gqvM3JZvNsGuU7EabD2~mRhNBS9RPzG9T84~qkA~0keyhl6AHA5TVm6vnFFUXxFOT-y6caMDtCWMsWAolJV-xskzmWQYBfPVjXrtn~A9S449OssO~43mQVfGSggOHT9NQ-ORuPDIfsfDUALifVL525mZ5bfVko4cVShSPdlkZ2y-c~9sIYFqvKjdcgzlu4GM~gccDKbJZcPP-wF2vd~zOpp9fLgS0wDpkoGTfgIfMsEHQQ__";

const baseName1 = "Solid lycra polo ...";

const baseName2 = "Dio shirts";

const products = [
  {
    src: baseImageUrl1,
    proNum: 1,
    name: baseName1,
    price: "₹500",
  },
  {
    src: baseImageUrl2,
    proNum: 2,
    name: baseName2,
    price: "₹700",
  },
  {
    src: baseImageUrl1,
    proNum: 3,
    name: baseName1,
    price: "₹500",
  },
  {
    src: baseImageUrl2,
    proNum: 4,
    name: baseName2,
    price: "₹700",
  },
  {
    src: baseImageUrl1,
    proNum: 5,
    name: baseName1,
    price: "₹500",
  },
  {
    src: baseImageUrl2,
    proNum: 6,
    name: baseName2,
    price: "₹700",
  },
  {
    src: baseImageUrl1,
    proNum: 7,
    name: baseName1,
    price: "₹500",
  },
];

let totalCount = 0;
let cartItems = [];

// To show cart items
document.addEventListener("click", function (e) {
  const cartElement = e.target.closest(".cart");
  if (cartElement) {
    displayCart();
    console.log("cart clicked");
  }
});

let cartContainer = document.querySelector(".cart-items");
function displayCart() {
    cartContainer.innerHTML = "";
  cartItems.forEach((item) => {
    let html = `<div class="items">
          <span>${item.name}</span>
          <h5>Quantity: ${item.quantity}</h5>
      </div>`;
      cartContainer.insertAdjacentHTML("afterbegin", html);
  });
  cartItem.classList.remove("hidden");
}

products.forEach((product) => {
  // Create the item container
  const item = document.createElement("div");
  item.className = "items";

  // Create the image element
  const img = document.createElement("img");
  img.src = product.src;
  img.alt = product.name;

  // Create the product number
  const number = document.createElement("div");
  number.className = "number";
  number.textContent = product.proNum;

  // Create the product description
  const overlay = document.createElement("div");
  overlay.className = "overlay";
  overlay.textContent = product.name;

  // Create the add-to-cart button
  const button = document.createElement("button");
  button.className = "btn2";
  button.textContent = "Add to cart";

  // Implement cart functionality
  button.addEventListener("click", function () {
    // confirm('Item added!');

    // find if item is already in cart
    const exisitingItem = cartItems.findIndex(
      (item) => item.proNum === product.proNum
    );

    if (exisitingItem !== -1) {
      cartItems[exisitingItem].quantity++;
    } else {
      cartItems.push({
        proNum: product.proNum,
        name: product.name,
        quantity: 1,
      });
    }

    totalCount++;
    let html = `<span class="cart">${totalCount}</span>`;
    nav.insertAdjacentHTML("beforebegin", html);
    // console.log(cartItems);
  });

  // Append everything to the item container
  item.appendChild(img);
  item.appendChild(number);
  item.appendChild(overlay);
  item.appendChild(button);

  // Append the item container to the main container
  container.appendChild(item);
});

// console.log(cartItems);

// Implement search functionality
searchBtn.addEventListener("click", performSearch);
searchItem.addEventListener(
  "keydown",
  debounce(function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      // console.log(event.key);
      performSearch();
    }
    performSearch();
  }, 500)
);

// Add debouncing
function debounce(fun, delay) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => fun(...args), delay);
  };
}

function performSearch() {
  const query = searchItem.value.toLowerCase();

  const itemElements = document.querySelectorAll(".items");

  itemElements.forEach((item, index) => {
    const productName = products[index].name.toLowerCase();
    if (productName.includes(query)) {
      item.classList.remove("hidden");
    } else {
      item.classList.add("hidden");
    }
  });
}
