// Load product details
function loadProductDetails() {
    const container = document.getElementById('productDetails');
    if (!container) return;

    // Get product ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (!productId) {
        container.innerHTML = '<p class="error" style="color: var(--danger-color); text-align: center;">Product not found.</p>';
        return;
    }

    const product = store.getProductById(productId);
    
    if (!product) {
        container.innerHTML = '<p class="error" style="color: var(--danger-color); text-align: center;">Product not found.</p>';
        return;
    }

    container.innerHTML = `
        <div class="details-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; margin-top: 2rem;">
            <div class="details-image-container">
                <img src="../${product.image}" alt="${product.name}" class="details-image" style="width: 100%; height: 400px; object-fit: cover; border-radius: 8px; border: 1px solid var(--border-color);" onerror="this.src='../images.jpg'">
            </div>
            <div class="details-info">
                <span class="product-badge" style="margin-bottom: 0.75rem; display: inline-block;">${product.ageCategory}</span>
                <h1 class="details-title" style="font-size: 2rem; font-weight: 700; color: var(--text-dark); margin-bottom: 0.75rem;">${product.name}</h1>
                <p class="details-price" style="font-size: 1.75rem; font-weight: 700; color: var(--primary-color); margin-bottom: 1rem;">$${product.price.toFixed(2)}</p>
                <span class="product-availability ${product.availability ? 'availability-in' : 'availability-out'}" style="display: inline-block; margin-bottom: 1.5rem;">
                    ${product.availability ? 'In Stock - Available' : 'Out of Stock'}
                </span>
                
                <div class="details-section" style="margin-bottom: 1.5rem;">
                    <h2 style="font-size: 1.125rem; font-weight: 600; color: var(--primary-color); margin-bottom: 0.5rem;">Breed</h2>
                    <p style="color: var(--text-light);">${product.breed}</p>
                </div>
                
                <div class="details-section" style="margin-bottom: 1.5rem;">
                    <h2 style="font-size: 1.125rem; font-weight: 600; color: var(--primary-color); margin-bottom: 0.5rem;">Age</h2>
                    <p style="color: var(--text-light);">${product.age} months old</p>
                </div>
                
                <div class="details-section" style="margin-bottom: 1.5rem;">
                    <h2 style="font-size: 1.125rem; font-weight: 600; color: var(--primary-color); margin-bottom: 0.5rem;">Age Category</h2>
                    <p style="color: var(--text-light);">${product.ageCategory}</p>
                </div>
                
                <div class="details-section" style="margin-bottom: 1.5rem;">
                    <h2 style="font-size: 1.125rem; font-weight: 600; color: var(--primary-color); margin-bottom: 0.5rem;">Description</h2>
                    <p style="color: var(--text-light); line-height: 1.7;">${product.description}</p>
                </div>
                
                <div class="details-section">
                    <h2 style="font-size: 1.125rem; font-weight: 600; color: var(--primary-color); margin-bottom: 0.5rem;">Availability</h2>
                    <p style="color: var(--text-light);">${product.availability ? 'Currently available for purchase' : 'Currently out of stock'}</p>
                </div>
            </div>
        </div>
    `;

    // Add responsive styles for mobile
    const style = document.createElement('style');
    style.textContent = `
        @media (max-width: 768px) {
            .details-grid {
                grid-template-columns: 1fr !important;
                gap: 2rem !important;
            }
            .details-title {
                font-size: 1.75rem !important;
            }
            .details-price {
                font-size: 1.5rem !important;
            }
        }
    `;
    document.head.appendChild(style);
}

document.addEventListener('DOMContentLoaded', loadProductDetails);