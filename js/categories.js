// Load products by categories
function loadCategories() {
    const category4 = document.getElementById('category-4month');
    const category5 = document.getElementById('category-5month');
    const category6 = document.getElementById('category-6month');

    if (category4) {
        const products = store.getProductsByAgeCategory('4-month-old chickens');
        renderCategory(category4, products);
    }
    if (category5) {
        const products = store.getProductsByAgeCategory('5-month-old chickens');
        renderCategory(category5, products);
    }
    if (category6) {
        const products = store.getProductsByAgeCategory('6-month-old chickens and older');
        renderCategory(category6, products);
    }
}

function renderCategory(container, products) {
    if (products.length === 0) {
        container.innerHTML = '<p class="no-products" style="color: var(--text-light); font-style: italic;">No chickens in this category.</p>';
        return;
    }

    container.innerHTML = products.map(product => `
        <div class="product-card">
            <img src="../${product.image}" alt="${product.name}" class="product-image" onerror="this.src='../images.jpg'">
            <div class="product-info">
                <span class="product-badge">${product.age} months</span>
                <h3 class="product-name">${product.name}</h3>
                <p class="product-breed">Breed: ${product.breed}</p>
                <p class="product-price">$${product.price.toFixed(2)}</p>
                <p class="product-description">${product.description}</p>
                <span class="product-availability ${product.availability ? 'availability-in' : 'availability-out'}">
                    ${product.availability ? 'Available' : 'Out of Stock'}
                </span>
                <div class="product-actions">
                    <a href="product-details.html?id=${product.id}" class="btn btn-primary">View Details</a>
                </div>
            </div>
        </div>
    `).join('');
}

document.addEventListener('DOMContentLoaded', loadCategories);