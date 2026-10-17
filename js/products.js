// Load all products
function loadAllProducts() {
    const container = document.getElementById('allProducts');
    if (!container) return;

    const products = store.getAllProducts();
    
    if (products.length === 0) {
        container.innerHTML = '<p class="no-products">No chickens available at this time.</p>';
        return;
    }

    container.innerHTML = products.map(product => `
        <div class="product-card">
            <img src="../${product.image}" alt="${product.name}" class="product-image" onerror="this.src='../images.jpg'">
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
                    <a href="product-details.html?id=${product.id}" class="btn btn-primary">View Details</a>
                </div>
            </div>
        </div>
    `).join('');
}

document.addEventListener('DOMContentLoaded', loadAllProducts);