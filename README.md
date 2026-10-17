# Poultry Farm Website

A responsive website for showcasing and managing a poultry business. Built with HTML, CSS, and JavaScript.

## Features

- **Homepage**: Introduces the poultry business and showcases featured chickens
- **Chicken Categories**: Organizes chickens by age (4 months, 5 months, 6+ months)
- **Product Listings**: Displays all chickens with image, age, price, description, and availability
- **Product Details**: Detailed information about each chicken including breed, age, and characteristics
- **Admin Dashboard**: Add, edit, categorize, and manage chicken listings, prices, and inventory
- **Responsive Design**: Works on mobile phones, tablets, and desktop computers

## File Structure

`
poultry/
+-- css/
¦   +-- style.css
+-- js/
¦   +-- app.js
¦   +-- home.js
¦   +-- categories.js
¦   +-- products.js
¦   +-- product-details.js
¦   +-- admin.js
+-- pages/
¦   +-- categories.html
¦   +-- products.html
¦   +-- product-details.html
¦   +-- admin.html
+-- images.jpg (and variants)
+-- index.html
+-- README.md
`

## Usage

1. Open index.html in a web browser to view the website
2. Navigate through different pages using the navigation menu
3. Access the Admin Dashboard to add, edit, or delete chicken listings
4. Data is stored in browser localStorage, so changes persist between sessions

## Technologies Used

- HTML5
- CSS3 (Flexbox & Grid)
- Vanilla JavaScript (ES6)
- LocalStorage for data persistence

