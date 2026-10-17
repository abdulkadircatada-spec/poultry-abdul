// Admin dashboard functionality
let editingProductId = null;

function loadProductsTable() {
    const tbody = document.getElementById('productsTableBody');
    if (!tbody) return;

    const products = store.getAllProducts();
    
    if (products.length === 0) {
        tbody.innerHTML = '<tr><td colspan="8" style="padding: 1.5rem; text-align: center; color: var(--text-light);">No products available. Add your first chicken listing.</td></tr>';
        return;
    }

    tbody.innerHTML = products.map(product => `
        <tr style="border-bottom: 1px solid var(--border-color);">
            <td style="padding: 0.75rem;">
                <img src="../${product.image}" alt="${product.name}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 4px;" onerror="this.src='../images.jpg'">
            </td>
            <td style="padding: 0.75rem; color: var(--text-dark); font-size: 0.875rem;">${product.name}</td>
            <td style="padding: 0.75rem; color: var(--text-light); font-size: 0.875rem;">${product.breed}</td>
            <td style="padding: 0.75rem; color: var(--text-light); font-size: 0.875rem;">${product.age} months</td>
            <td style="padding: 0.75rem; color: var(--text-light); font-size: 0.875rem;">${product.ageCategory}</td>
            <td style="padding: 0.75rem; color: var(--primary-color); font-weight: 600; font-size: 0.875rem;">$${product.price.toFixed(2)}</td>
            <td style="padding: 0.75rem; font-size: 0.875rem;">
                <span style="padding: 0.25rem 0.625rem; border-radius: 4px; background-color: ${product.availability ? '#e8f5e9' : '#ffebee'}; color: ${product.availability ? 'var(--success-color)' : 'var(--danger-color)'}; font-weight: 500;">
                    ${product.availability ? 'Yes' : 'No'}
                </span>
            </td>
            <td style="padding: 0.75rem; text-align: center; font-size: 0.875rem;">
                <button class="btn-edit" onclick="editProduct(${product.id})" style="background-color: var(--accent-color); color: var(--text-dark); border: none; padding: 0.375rem 0.75rem; border-radius: 4px; cursor: pointer; font-weight: 600; margin-right: 0.375rem;" title="Edit">Edit</button>
                <button class="btn-delete" onclick="deleteProduct(${product.id})" style="background-color: var(--danger-color); color: white; border: none; padding: 0.375rem 0.75rem; border-radius: 4px; cursor: pointer; font-weight: 600;" title="Delete">Delete</button>
            </td>
        </tr>
    `).join('');
}

// Edit product
window.editProduct = function(id) {
    const product = store.getProductById(id);
    if (!product) return;

    editingProductId = id;
    
    document.getElementById('formTitle').textContent = 'Edit Chicken Listing';
    document.getElementById('submitBtn').textContent = 'Update Chicken';
    document.getElementById('cancelBtn').style.display = 'inline-block';
    document.getElementById('productId').value = product.id;
    
    document.getElementById('name').value = product.name;
    document.getElementById('breed').value = product.breed;
    document.getElementById('age').value = product.age;
    document.getElementById('ageCategory').value = product.ageCategory;
    document.getElementById('price').value = product.price;
    document.getElementById('image').value = product.image;
    document.getElementById('description').value = product.description;
    document.getElementById('availability').checked = product.availability;
    
    // Scroll to form
    document.querySelector('.form-container').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Delete product
window.deleteProduct = function(id) {
    if (confirm('Are you sure you want to delete this chicken listing?')) {
        store.deleteProduct(id);
        loadProductsTable();
        // If editing this product, reset form
        if (editingProductId == id) {
            resetForm();
        }
        alert('Product deleted successfully!');
    }
}

// Reset form
function resetForm() {
    editingProductId = null;
    document.getElementById('productForm').reset();
    document.getElementById('formTitle').textContent = 'Add New Chicken Listing';
    document.getElementById('submitBtn').textContent = 'Add Chicken';
    document.getElementById('cancelBtn').style.display = 'none';
    document.getElementById('productId').value = '';
}

// Handle form submission
function handleFormSubmit(e) {
    e.preventDefault();
    
    const productData = {
        name: document.getElementById('name').value.trim(),
        breed: document.getElementById('breed').value.trim(),
        age: parseInt(document.getElementById('age').value),
        ageCategory: document.getElementById('ageCategory').value,
        price: parseFloat(document.getElementById('price').value),
        description: document.getElementById('description').value.trim(),
        image: document.getElementById('image').value,
        availability: document.getElementById('availability').checked
    };
    
    // Validate
    if (!productData.name || !productData.breed || isNaN(productData.age) || !productData.ageCategory || 
        isNaN(productData.price) || !productData.description || !productData.image) {
        alert('Please fill in all required fields.');
        return;
    }
    
    if (editingProductId) {
        // Update existing product
        store.updateProduct(editingProductId, productData);
        alert('Product updated successfully!');
    } else {
        // Add new product
        store.addProduct(productData);
        alert('Product added successfully!');
    }
    
    resetForm();
    loadProductsTable();
}

// Initialize admin page
function initAdmin() {
    const productForm = document.getElementById('productForm');
    const cancelBtn = document.getElementById('cancelBtn');
    
    if (productForm) {
        productForm.addEventListener('submit', handleFormSubmit);
    }
    
    if (cancelBtn) {
        cancelBtn.addEventListener('click', resetForm);
    }
    
    loadProductsTable();
}

// Run on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAdmin);
} else {
    initAdmin();
}