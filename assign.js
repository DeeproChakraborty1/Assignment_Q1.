const userCards = document.getElementById('user-cards');
const cartItems = document.getElementById('cart-items');

// Fetch user data from local storage or initialize with an empty array
const storedUsers = localStorage.getItem('users');
const users = storedUsers ? JSON.parse(storedUsers) : [];

// Function to render user cards
function renderUsers() {
  userCards.innerHTML = '';
  users.forEach(user => {
    const card = document.createElement('div');
    card.classList.add('user-card');
    card.innerHTML = `
      <h3>${user.name}</h3>
      <p>${user.email}</p>
      <button class="add-to-cart">Add to Cart</button>
    `;
    userCards.appendChild(card);

    const addToCartBtn = card.querySelector('.add-to-cart');
    addToCartBtn.addEventListener('click', () => {
      addToCart(user);
    });
  });
}

// Function to add a user to the cart
function addToCart(user) {
  const cartItem = document.createElement('li');
  cartItem.textContent = user.name;
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.addEventListener('click', () => {
    removeFromCart(user);
  });
  cartItem.appendChild(deleteBtn);
  cartItems.appendChild(cartItem);

  // Update local storage
  const cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
  cart.push(user);
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Function to remove a user from the cart
function removeFromCart(user) {
  const cart = JSON.parse(localStorage.getItem('cart'));
  const updatedCart = cart.filter(item => item.id !== user.id);
  localStorage.setItem('cart', JSON.stringify(updatedCart));
  renderCart();
}

// Function to render the cart
function renderCart() {
  cartItems.innerHTML = '';
  const cart = JSON.parse(localStorage.getItem('cart'));
  cart.forEach(user => {
    const cartItem = document.createElement('li');
    cartItem.textContent = user.name;
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => {
      removeFromCart(user);
    });
    cartItem.appendChild(deleteBtn);
    cartItems.appendChild(cartItem);
  });
}

// Initial render
renderUsers();
renderCart();