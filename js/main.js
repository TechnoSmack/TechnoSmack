/**
 * Emerald Blaze Website - Main JavaScript
 * Minimal JavaScript for enhanced user experience
 */

(function() {
    'use strict';

    // DOM Content Loaded Event
    document.addEventListener('DOMContentLoaded', function() {
        initializeNavigation();
        initializeFormValidation();
        initializeScrollEffects();
        initializePerformanceOptimizations();
        initializeMobileNavigation();
    });

    /**
     * Navigation Enhancement
     * Adds smooth scrolling and active state management
     */
    function initializeNavigation() {
        const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
        const sections = document.querySelectorAll('section[id]');

        // Enhanced smooth scrolling for navigation links
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    const headerHeight = document.querySelector('header').offsetHeight;
                    const targetPosition = targetSection.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Active navigation state management
        function updateActiveNavigation() {
            const scrollPosition = window.scrollY + 100;
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    // Remove active class from all nav links
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                    });
                    
                    // Add active class to current section's nav link
                    const activeLink = document.querySelector(`.nav-menu a[href="#${sectionId}"]`);
                    if (activeLink) {
                        activeLink.classList.add('active');
                    }
                }
            });
        }

        // Throttled scroll event for performance
        let scrollTimeout;
        window.addEventListener('scroll', function() {
            if (scrollTimeout) {
                clearTimeout(scrollTimeout);
            }
            scrollTimeout = setTimeout(updateActiveNavigation, 10);
        });
    }

    /**
     * Form Validation and Enhancement
     * Adds real-time validation and user feedback
     */
    function initializeFormValidation() {
        const contactForm = document.querySelector('.message-form');
        
        if (!contactForm) return;

        const nameInput = contactForm.querySelector('#name');
        const emailInput = contactForm.querySelector('#email');
        const messageInput = contactForm.querySelector('#message');
        const submitButton = contactForm.querySelector('.submit-button');

        // Real-time validation
        function validateField(field, validationFn, errorMessage) {
            const value = field.value.trim();
            const isValid = validationFn(value);
            const helpElement = field.parentNode.querySelector('.form-help');
            
            if (value && !isValid) {
                field.style.borderColor = 'var(--color-warning)';
                if (helpElement) {
                    helpElement.textContent = errorMessage;
                    helpElement.style.color = 'var(--color-warning)';
                }
                return false;
            } else {
                field.style.borderColor = value ? 'var(--color-accent-green)' : '';
                if (helpElement) {
                    helpElement.style.color = 'var(--color-text-gray)';
                    // Reset to original help text
                    if (field.id === 'name') {
                        helpElement.textContent = 'Please enter your full name';
                    } else if (field.id === 'email') {
                        helpElement.textContent = "We'll use this to respond to your message";
                    } else if (field.id === 'message') {
                        helpElement.textContent = 'Tell us how we can help you';
                    }
                }
                return true;
            }
        }

        // Validation functions
        const isValidName = (name) => name.length >= 2 && /^[a-zA-Z\s]+$/.test(name);
        const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        const isValidMessage = (message) => message.length >= 10;

        // Add event listeners for real-time validation
        nameInput.addEventListener('blur', () => {
            validateField(nameInput, isValidName, 'Please enter a valid name (letters only, at least 2 characters)');
        });

        emailInput.addEventListener('blur', () => {
            validateField(emailInput, isValidEmail, 'Please enter a valid email address');
        });

        messageInput.addEventListener('blur', () => {
            validateField(messageInput, isValidMessage, 'Message must be at least 10 characters long');
        });

        // Form submission handling
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Validate all fields
            const isNameValid = validateField(nameInput, isValidName, 'Please enter a valid name');
            const isEmailValid = validateField(emailInput, isValidEmail, 'Please enter a valid email address');
            const isMessageValid = validateField(messageInput, isValidMessage, 'Message must be at least 10 characters long');

            if (isNameValid && isEmailValid && isMessageValid) {
                // Send form data to server using fetch
                fetch('/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: `name=${encodeURIComponent(nameInput.value)}&email=${encodeURIComponent(emailInput.value)}&message=${encodeURIComponent(messageInput.value)}`
                })
                .then(response => {
                    if (response.ok) {
                        submitButton.textContent = 'Message Sent!';
                        submitButton.style.background = 'var(--color-accent-green)';
                        submitButton.disabled = true;
                        contactForm.reset();
                        setTimeout(() => {
                            submitButton.textContent = 'Send Message';
                            submitButton.style.background = '';
                            submitButton.disabled = false;
                        }, 3000);
                    } else {
                        submitButton.textContent = 'Error!';
                        submitButton.style.background = 'red';
                        setTimeout(() => {
                            submitButton.textContent = 'Send Message';
                            submitButton.style.background = '';
                        }, 3000);
                    }
                })
                .catch(() => {
                    submitButton.textContent = 'Error!';
                    submitButton.style.background = 'red';
                    setTimeout(() => {
                        submitButton.textContent = 'Send Message';
                        submitButton.style.background = '';
                    }, 3000);
                });
            }
        });
    }

    /**
     * Scroll Effects
     * Adds subtle animations and effects on scroll
     */
    function initializeScrollEffects() {
        // Header background opacity on scroll
        const header = document.querySelector('header');
        
        function updateHeaderOpacity() {
            const scrolled = window.scrollY;
            const opacity = Math.min(scrolled / 100, 1);
            header.style.backgroundColor = `rgba(26, 26, 26, ${0.95 + (opacity * 0.05)})`;
        }

        let scrollEffectTimeout;
        window.addEventListener('scroll', function() {
            if (scrollEffectTimeout) {
                clearTimeout(scrollEffectTimeout);
            }
            scrollEffectTimeout = setTimeout(updateHeaderOpacity, 10);
        });
    }

    /**
     * Performance Optimizations
     * Implements various performance enhancements
     */
    function initializePerformanceOptimizations() {
        // Lazy loading for images (if any are added later)
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                            observer.unobserve(img);
                        }
                    }
                });
            });

            // Observe any images with data-src attribute
            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }

        // Preload critical resources
        const criticalLinks = [
            'css/styles.css'
        ];

        criticalLinks.forEach(href => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'style';
            link.href = href;
            document.head.appendChild(link);
        });
    }

    /**
     * Mobile Navigation Enhancement
     * Toggles navigation menu on mobile devices
     */
    function initializeMobileNavigation() {
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('.nav-menu');
        if (navToggle && navMenu) {
            navToggle.addEventListener('click', function() {
                navMenu.classList.toggle('active');
            });
        }
    }

})();