document.addEventListener('DOMContentLoaded', () => {
    // Cart array to store selected items, initialized from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Update cart count display
    const updateCartCount = () => {
        const cartCount = document.createElement('span');
        cartCount.className = 'cart-count';
        cartCount.textContent = cart.length;
        const nav = document.querySelector('.navbar .container');
        const existingCount = nav.querySelector('.cart-count');
        if (existingCount) {
            existingCount.replaceWith(cartCount);
        } else {
            nav.appendChild(cartCount);
        }
    };

    // Add item to cart
    const addToCart = (productName, price) => {
        // Ensure cart is up-to-date before pushing new item
        cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push({ name: productName, price: parseFloat(price.replace('$', '')) });
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        alert(`${productName} has been added to your cart!`);
    };

    // Add event listeners to "Book Now" buttons
    const addToCartButtons = document.querySelectorAll('.book-now');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const packageCard = button.closest('.package-card');
            if (packageCard) {
                const productName = packageCard.querySelector('h3').textContent;
                const priceElement = packageCard.querySelector('p:nth-child(2)');
                const price = priceElement ? priceElement.textContent : '$0';
                addToCart(productName, price);
                setTimeout(() => {
                    window.location.href = 'contact.html';
                }, 500);
            }
        });
    });

    // Initialize cart count on page load
    updateCartCount();

    // Smooth scrolling for navigation links
    document.querySelectorAll('.nav-links a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (!href.startsWith('#')) return;
            e.preventDefault();
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 60,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Mobile menu toggle
    const nav = document.querySelector('.nav-links');
    const menuToggle = document.querySelector('.menu-toggle');
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('show');
            menuToggle.textContent = nav.classList.contains('show') ? '✕' : '☰';
        });
    }

    // Contact form submission
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for your message! We will get back to you soon.');
            form.reset();
        });
    }
});