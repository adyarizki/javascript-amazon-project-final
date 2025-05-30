import {cart, addToCart, calculateCartQuantity} from '../data/cart.js';
import {products, loadProducts} from '../data/products.js';
import {formatCurency} from "./utils/money.js";

loadProducts(renderProductsGrid);

function renderProductsGrid() {
  
  let productsHTML = '';

  const url = new URL(window.location.href);
  const search = url.searchParams.get('search');
  let filteredProducts = products;

  // If a search exists in the URL parameters,
  // filter the products that match the search.
  if (search) {
    filteredProducts = products.filter((product) => {
      let matchingKeyword = false;

      product.keywords.forEach((keyword) => {
        if (keyword.toLowerCase().includes(search.toLowerCase())) {
          matchingKeyword = true;
        }
      });

      return matchingKeyword ||
        product.name.toLowerCase().includes(search.toLowerCase());
    });
  }

  filteredProducts.forEach((products) => {
      productsHTML +=`
          <div class="product-container">
            <div class="product-image-container">
              <img class="product-image"
                src="${products.image}">
            </div>

            <div class="product-name limit-text-to-2-lines">
              ${products.name}
            </div>

            <div class="product-rating-container">
              <img class="product-rating-stars"
                src="${products.getStartUrl()}">
              <div class="product-rating-count link-primary">
                ${products.rating.count}
              </div>
            </div>

            <div class="product-price">
              ${products.getPrice()}
            </div>

            <div class="product-quantity-container">
              <select>
                <option selected value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </div>

            ${products.extraInfoHTML()}

            <div class="product-spacer"></div>

            <div class="added-to-cart">
              <img src="images/icons/checkmark.png">
              Added
            </div>

            <button class="add-to-cart-button button-primary js-add-to-cart" 
            data-product-id="${products.id}">
              Add to Cart
            </button>
          </div>
      `;
      
  });

      
      document.querySelector('.js-products-grid')
          .innerHTML = productsHTML;

      

      function uppdateCartQuantity() {
                  
        const cartQuantity = calculateCartQuantity();

          document.querySelector('.js-cart-quantity')
          .innerHTML = cartQuantity;

        
      }
      
    uppdateCartQuantity();

      document.querySelectorAll('.js-add-to-cart')
          .forEach((button) => {
              button.addEventListener('click', () => {
                  const productId = button.dataset.productId;
                  
                  addToCart(productId);
                  uppdateCartQuantity();
                  
                  
                  
              });
          });
       document.querySelector('.js-search-button')
        .addEventListener('click', () => {
          const search = document.querySelector('.js-search-bar').value;
          window.location.href = `amazon.html?search=${search}`;
    });

    document.querySelector('.js-search-bar')
    .addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        const searchTerm = document.querySelector('.js-search-bar').value;
        window.location.href = `amazon.html?search=${searchTerm}`;
      }
    });
};