// Load featured products on home page
function loadFeaturedProducts() {
    const container = document.getElementById('featuredProducts');
    if (!container) return;

    const featuredProducts = store.getFeaturedProducts(3);
    
    if (featuredProducts.length === 0) {
        container.innerHTML = '<p class="no-products">No featured chickens available at this time.</p>';
        return;
    }

    container.innerHTML = featuredProducts.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" class="product-image" onerror="this.src='images.jpg'">
            <div class="product-info">
                <span class="product-badge">${product.ageCategory}</span>
                <h3 class="product-name">${product.name}</h3>
                <p class="product-breed">Breed: ${product.breed}</p>
                <p class="product-price">$${product.price.toFixed(2)}</p>
                <p class="product-description">${product.description}</p>
                <span class="product-availability ${product.availability ? 'availability-in' : 'availability-out'}">
                    ${product.availability ? 'Available' : 'Out of Stock'}
                </span>
                <div class="product-actions">
                    <a href="pages/product-details.html?id=${product.id}" class="btn btn-primary">View Details</a>
                </div>
            </div>
        </div>
    `).join('');
}

document.addEventListener('DOMContentLoaded', loadFeaturedProducts);