/**
 * Emerald Blaze by TechnoSmack
 * Main JavaScript File
 */

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Toggle hamburger menu animation
            const bars = menuToggle.querySelectorAll('.bar');
            bars[0].classList.toggle('rotate-45');
            bars[1].classList.toggle('opacity-0');
            bars[2].classList.toggle('rotate-negative-45');
        });
    }
    
    // Handle dropdown menus on mobile
    const dropdowns = document.querySelectorAll('.dropdown');
    
    if (window.innerWidth <= 768) {
        dropdowns.forEach(dropdown => {
            const link = dropdown.querySelector('a');
            
            link.addEventListener('click', function(e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    dropdown.classList.toggle('active');
                }
            });
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (navMenu && navMenu.classList.contains('active') && 
            !e.target.closest('.main-nav') && 
            !e.target.closest('.menu-toggle')) {
            navMenu.classList.remove('active');
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            // Skip if it's a dropdown toggle on mobile
            if (window.innerWidth <= 768 && this.parentNode.classList.contains('dropdown')) {
                return;
            }
            
            const targetId = this.getAttribute('href');
            
            // Only process if it's not just "#"
            if (targetId !== "#") {
                e.preventDefault();
                
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // Close mobile menu if open
                    if (navMenu && navMenu.classList.contains('active')) {
                        navMenu.classList.remove('active');
                    }
                    
                    // Calculate header height dynamically
                    const headerHeight = document.querySelector('.site-header').offsetHeight;
                    
                    // Scroll to the target element
                    window.scrollTo({
                        top: targetElement.offsetTop - headerHeight - 20, // Adjust for header height with some padding
                        behavior: 'smooth'
                    });
                    
                    // Update URL without page reload
                    history.pushState(null, null, targetId);
                }
            }
        });
    });
    
    // Add animation class to elements when they come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.product-card, .about-content > div, .contact-content > div');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('fade-in');
            }
        });
    };
    
    // Animate section titles when they come into view
    const animateSectionTitles = function() {
        const sectionTitles = document.querySelectorAll('.section-title');
        
        sectionTitles.forEach(title => {
            const titlePosition = title.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (titlePosition < windowHeight - 50) {
                title.classList.add('visible');
            }
        });
    };
    
    // Run animations on initial load and scroll
    window.addEventListener('scroll', function() {
        animateOnScroll();
        animateSectionTitles();
    });
    
    // Run animations immediately
    animateOnScroll();
    animateSectionTitles();
    
    // Form validation and submission handling
    const contactForm = document.querySelector('.contact-form form');
    const newsletterForm = document.querySelector('.newsletter-form');
    
    // Helper function to validate email
    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            const nameInput = this.querySelector('#name');
            const emailInput = this.querySelector('#email');
            const messageInput = this.querySelector('#message');
            let isValid = true;
            
            // Reset previous error states
            [nameInput, emailInput, messageInput].forEach(input => {
                input.classList.remove('error');
                const errorMsg = input.parentNode.querySelector('.error-message');
                if (errorMsg) errorMsg.remove();
            });
            
            // Validate name
            if (!nameInput.value.trim()) {
                addErrorMessage(nameInput, 'Please enter your name');
                isValid = false;
            }
            
            // Validate email
            if (!emailInput.value.trim() || !isValidEmail(emailInput.value)) {
                addErrorMessage(emailInput, 'Please enter a valid email address');
                isValid = false;
            }
            
            // Validate message
            if (!messageInput.value.trim()) {
                addErrorMessage(messageInput, 'Please enter your message');
                isValid = false;
            }
            
            // If valid, show success message
            if (isValid) {
                // In a real implementation, this would send the form data to a server
                alert('Thank you for your message! This is a demo site, so no message was actually sent.');
                this.reset();
            }
        });
    }
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            let isValid = true;
            
            // Reset previous error states
            emailInput.classList.remove('error');
            const errorMsg = emailInput.parentNode.querySelector('.error-message');
            if (errorMsg) errorMsg.remove();
            
            // Validate email
            if (!emailInput.value.trim() || !isValidEmail(emailInput.value)) {
                // For newsletter, just add a subtle error style
                emailInput.classList.add('error');
                isValid = false;
            }
            
            // If valid, show success message
            if (isValid) {
                // In a real implementation, this would subscribe the user to a newsletter
                alert('Thank you for subscribing! This is a demo site, so no subscription was actually processed.');
                this.reset();
            }
        });
    }
    
    // Helper function to add error message
    function addErrorMessage(input, message) {
        input.classList.add('error');
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        errorDiv.style.color = '#ff3860';
        errorDiv.style.fontSize = '0.85rem';
        errorDiv.style.marginTop = '5px';
        input.parentNode.appendChild(errorDiv);
    }
    
    // Add lazy loading to images for better performance
    if ('loading' in HTMLImageElement.prototype) {
        // Browser supports native lazy loading
        const images = document.querySelectorAll('img:not([loading])');
        images.forEach(img => {
            img.setAttribute('loading', 'lazy');
        });
    }
    
    // Add accessibility improvements
    const improveAccessibility = function() {
        // Ensure all interactive elements have appropriate roles
        document.querySelectorAll('a').forEach(link => {
            if (!link.getAttribute('aria-label') && !link.textContent.trim()) {
                const img = link.querySelector('img');
                if (img && img.getAttribute('alt')) {
                    link.setAttribute('aria-label', img.getAttribute('alt'));
                }
            }
        });
        
        // Ensure form elements have labels
        document.querySelectorAll('input, textarea').forEach(input => {
            if (!input.getAttribute('aria-label') && !input.getAttribute('id')) {
                input.setAttribute('aria-label', input.getAttribute('placeholder') || input.getAttribute('name'));
            }
        });
    };
    
    improveAccessibility();
});

// Add CSS classes for menu toggle animation
document.head.insertAdjacentHTML('beforeend', `
<style>
    .rotate-45 {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .opacity-0 {
        opacity: 0;
    }
    
    .rotate-negative-45 {
        transform: rotate(-45deg) translate(5px, -5px);
    }
    
    .fade-in {
        animation: fadeIn 0.8s ease forwards;
    }
    
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    /* Form validation styles */
    input.error, textarea.error {
        border-color: #ff3860 !important;
        background-color: rgba(255, 56, 96, 0.05);
    }
    
    /* Improve focus styles for accessibility */
    input:focus, textarea:focus, button:focus, a:focus {
        outline: 2px solid rgba(80, 200, 120, 0.5);
        outline-offset: 2px;
    }
</style>
`);