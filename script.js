'use strict';

/**
 * PaddleClubWeb - Core Website Logic
 * Handles navigation, interactive elements, and form processing.
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Mobile Menu Toggle ---
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinksContainer = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links a');

    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            navLinksContainer.classList.toggle('active');
            // Basic animation toggle for burger button
            mobileBtn.classList.toggle('open');
        });
    }

    // Close mobile menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navLinksContainer.classList.remove('active');
            mobileBtn.classList.remove('open');
        });
    });


    // --- 2. Sticky Header & Scroll Effects ---
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.padding = '10px 0';
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        } else {
            header.style.padding = '0';
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        }
    });


    // --- 3. Smooth Scrolling for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });


    // --- 4. Membership Form Validation & Submission ---
    const contactForm = document.getElementById('membership-form');
    const formFeedback = document.getElementById('form-feedback');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Simple validation state
            let isValid = true;
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');

            // Basic Regex for email validation
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (name.length < 2) {
                showFeedback('Please enter your full name.', 'error');
                isValid = false;
            } else if (!emailPattern.test(email)) {
                showFeedback('Please enter a valid email address.', 'error');
                isValid = false;
            }

            if (isValid) {
                // Simulate API call / Form submission
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                
                submitBtn.disabled = true;
                submitBtn.textContent = 'Processing...';

                setTimeout(() => {
                    showFeedback('Thank you! Your application has been sent. We will contact you shortly.', 'success');
                    contactForm.reset();
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalText;
                }, 1500);
            }
        });
    }

    /**
     * Helper to show UI feedback messages
     * @param {string} message 
     * @param {string} type - 'success' or 'error'
     */
    function showFeedback(message, type) {
        formFeedback.textContent = message;
        formFeedback.className = `form-feedback ${type}`;
        formFeedback.classList.remove('hidden');

        // Scroll feedback into view if on mobile
        if (window.innerWidth < 768) {
            formFeedback.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

        // Auto-hide success messages after 5 seconds
        if (type === 'success') {
            setTimeout(() => {
                formFeedback.classList.add('hidden');
            }, 5000);
        }
    }


    // --- 5. Simple Intersection Observer for Fade-in Animations ---
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply to sections for a professional feel
    document.querySelectorAll('.facility-card, .pricing-card, .section-header').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });

    // Custom CSS for the observer effect injected via JS to keep CSS file clean
    const style = document.createElement('style');
    style.innerHTML = `
        .fade-in-visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

});