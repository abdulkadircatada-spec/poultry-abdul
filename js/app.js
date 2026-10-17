// Shared data store for chicken products (in-memory with localStorage persistence)
class PoultryStore {
    constructor() {
        this.products = this.loadProducts();
    }

    loadProducts() {
        const saved = localStorage.getItem('poultryProducts');
        if (saved) {
            return JSON.parse(saved);
        }
        // Default products if nothing in localStorage
        return [
            {
                id: 1,
                name: "Rhode Island Red Rooster",
                breed: "Rhode Island Red",
                age: 6,
                ageCategory: "6-month-old chickens and older",
                price: 45.99,
                description: "Healthy mature rooster, excellent for breeding. Good temperament and strong build.",
                availability: true,
                image: "images (1).jpg"
            },
            {
                id: 2,
                name: "Leghorn Hen",
                breed: "White Leghorn",
                age: 5,
                ageCategory: "5-month-old chickens",
                price: 38.50,
                description: "5-month-old Leghorn hen, ready to lay. Known for high egg production.",
                availability: true,
                image: "images (2).jpg"
            },
            {
                id: 3,
                name: "Cornish Cross",
                breed: "Cornish Cross",
                age: 4,
                ageCategory: "4-month-old chickens",
                price: 32.00,
                description: "Fast-growing, healthy 4-month-old chicken. Great for meat production.",
                availability: true,
                image: "images (3).jpg"
            },
            {
                id: 4,
                name: "Sussex Hen",
                breed: "Sussex",
                age: 6,
                ageCategory: "6-month-old chickens and older",
                price: 42.75,
                description: "Mature Sussex hen, docile and great for backyard flocks. Regular layer.",
                availability: false,
                image: "images (4).jpg"
            },
            {
                id: 5,
                name: "Plymouth Rock Chickens",
                breed: "Plymouth Rock",
                age: 5,
                ageCategory: "5-month-old chickens",
                price: 35.99,
                description: "Beautiful barred Plymouth Rock, 5 months old. Friendly and hardy.",
                availability: true,
                image: "images.jpg"
            }
        ];
    }

    saveProducts() {
        localStorage.setItem('poultryProducts', JSON.stringify(this.products));
    }

    getAllProducts() {
        return this.products;
    }

    getProductById(id) {
        return this.products.find(p => p.id == id);
    }

    getFeaturedProducts(limit = 3) {
        // Return first 3 available products as featured
        return this.products.filter(p => p.availability).slice(0, limit);
    }

    getProductsByAgeCategory(category) {
        return this.products.filter(p => p.ageCategory === category);
    }

    addProduct(product) {
        const newId = this.products.length > 0 ? Math.max(...this.products.map(p => p.id)) + 1 : 1;
        const newProduct = {
            id: newId,
            ...product
        };
        this.products.push(newProduct);
        this.saveProducts();
        return newProduct;
    }

    updateProduct(id, updates) {
        const index = this.products.findIndex(p => p.id == id);
        if (index !== -1) {
            this.products[index] = { ...this.products[index], ...updates };
            this.saveProducts();
            return this.products[index];
        }
        return null;
    }

    deleteProduct(id) {
        const index = this.products.findIndex(p => p.id == id);
        if (index !== -1) {
            this.products.splice(index, 1);
            this.saveProducts();
            return true;
        }
        return false;
    }
}

// Mobile navigation toggle
function initNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }
    
    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    });
}

// Initialize store globally
const store = new PoultryStore();

// Initialize navigation when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNavigation);
} else {
    initNavigation();
}