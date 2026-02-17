const API_URL = "https://fakestoreapi.com";

const productsGrid = document.getElementById('all-products');
const trendingGrid = document.getElementById('trending-products');
const categoriesContainer = document.getElementById('categories-container');
const cartSidebar = document.getElementById('cart-sidebar');
const overlay = document.getElementById('overlay');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotalPrice = document.getElementById('cart-total-price');
const modal = document.getElementById('product-modal');
const modalDetails = document.getElementById('modal-product-details');

let allProducts = [];
let cart = JSON.parse(localStorage.getItem('swiftcart_cart')) || [];

async function init() {
    updateCartUI();
    initScrollSpy();
    fetchCategories();

    try {
        const res = await fetch(`${API_URL}/products`);
        allProducts = await res.json();

        renderTrending(allProducts);
        renderProducts(allProducts);

    } catch (error) {
        console.error("Error fetching products:", error);
    }
}

async function fetchCategories() {
    try {
        const res = await fetch(`${API_URL}/products/categories`);
        const categories = await res.json();

        categories.forEach(cat => {
            const btn = document.createElement('button');
            btn.className = 'filter-btn';
            btn.textContent = cat;
            btn.dataset.category = cat;
            btn.onclick = () => filterProducts(cat, btn);
            categoriesContainer.appendChild(btn);
        });
    } catch (error) {
        console.error("Error fetching categories:", error);
    }
}

function renderProducts(products) {
    productsGrid.innerHTML = products.map(product => createProductCard(product)).join('');
}

function renderTrending(products) {
    const trending = [...products].sort((a, b) => b.rating.rate - a.rating.rate).slice(0, 3);
    trendingGrid.innerHTML = trending.map(product => createProductCard(product)).join('');
}

function createProductCard(product) {
    return `
        <div class="product-card">
            <div class="product-image">
                <img src="${product.image}" alt="${product.title}">
            </div>
            <div class="product-info">
                <span class="product-category">${product.category}</span>
                <h3 class="product-title">${product.title}</h3>
                <div class="product-rating">
                    ${getStarRating(product.rating.rate)}
                    <span>(${product.rating.count})</span>
                </div>
                <div class="product-price">$${product.price}</div>
                <div class="product-actions">
                    <button class="btn btn-outline btn-sm" onclick="openProductModal(${product.id})">
                        <i class="far fa-eye"></i> Details
                    </button>
                    <button class="btn btn-primary btn-sm" onclick="addToCart(${product.id})">
                        <i class="fas fa-shopping-cart"></i> Add
                    </button>
                </div>
            </div>
        </div>
    `;
}

function getStarRating(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    let html = '';

    for (let i = 0; i < fullStars; i++) {
        html += '<i class="fas fa-star"></i>';
    }
    if (hasHalfStar) {
        html += '<i class="fas fa-star-half-alt"></i>';
    }
    return html;
}

function filterProducts(category, btn) {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    if (category === 'all') {
        renderProducts(allProducts);
        return;
    }

    const filtered = allProducts.filter(p => p.category === category);
    renderProducts(filtered);
}

document.querySelector('.filter-btn[data-category="all"]').onclick = function () {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    this.classList.add('active');
    renderProducts(allProducts);
};

function openProductModal(id) {
    const product = allProducts.find(p => p.id === id);
    if (!product) return;

    modalDetails.innerHTML = `
        <div class="modal-img">
            <img src="${product.image}" alt="${product.title}">
        </div>
        <div class="modal-info">
            <span class="product-category">${product.category}</span>
            <h2 class="modal-title">${product.title}</h2>
            <div class="product-rating">
                ${getStarRating(product.rating.rate)}
                <span>(${product.rating.count} reviews)</span>
            </div>
            <p class="modal-desc">${product.description}</p>
            <div class="product-price" style="font-size: 2rem; margin-bottom: 2rem;">$${product.price}</div>
            <button class="btn btn-primary" onclick="addToCart(${product.id}); closeModal('product-modal')">
                Add to Cart
            </button>
        </div>
    `;
    modal.classList.add('active');
    overlay.classList.add('active');
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
    overlay.classList.remove('active');
    cartSidebar.classList.remove('active');
}

function addToCart(id) {
    const product = allProducts.find(p => p.id === id);
    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCartUI();
    saveCart();
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCartUI();
    saveCart();
}

function updateCartUI() {
    const count = cart.length;
    document.querySelectorAll('.cart-count').forEach(el => el.textContent = count);

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart-msg">Your cart is empty.</p>';
    } else {
        cartItemsContainer.innerHTML = cart.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.title}">
                <div class="cart-item-info">
                    <div class="cart-item-title">${item.title}</div>
                    <div class="cart-item-price">$${item.price}</div>
                    <span class="cart-item-remove" onclick="removeFromCart(${item.id})">Remove</span>
                </div>
            </div>
        `).join('');
    }

    const total = cart.reduce((sum, item) => sum + item.price, 0);
    cartTotalPrice.textContent = `$${total.toFixed(2)}`;
}

function saveCart() {
    localStorage.setItem('swiftcart_cart', JSON.stringify(cart));
}

function toggleCart() {
    cartSidebar.classList.toggle('active');
    overlay.classList.toggle('active');
}

function toggleMenu() {
    document.getElementById('mobile-menu').classList.toggle('active');
}

function checkout() {
    if (cart.length === 0) return;
    alert("Checkout functionality coming soon!");
}

function initScrollSpy() {
    const sections = document.querySelectorAll('section, header#home, footer#contact');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });
}

init();
