// ============================================
// SMOOTH SCROLLING & INTERACTIVITY
// ============================================

// Mobile Navigation Toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        
        // Animate hamburger icon
        const spans = navToggle.querySelectorAll('span');
        if (navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
}

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = navToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background on scroll
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.05)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe elements for fade-in animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.practice-card, .review-card, .stat-box, .highlight-item, .contact-item');
    
    animateElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
});

// Form submission handler
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get all checked practice areas
        const practiceAreas = Array.from(contactForm.querySelectorAll('input[name="practice-areas[]"]:checked'))
            .map(checkbox => checkbox.value);
        
        // Validate that at least one practice area is selected
        if (practiceAreas.length === 0) {
            alert('Please select at least one practice area of interest.');
            return;
        }
        
        // Validate consent checkbox
        const consent = contactForm.querySelector('input[name="consent"]');
        if (!consent.checked) {
            alert('Please acknowledge the attorney-client relationship disclaimer.');
            return;
        }
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Create mailto link (since we don't have a backend)
        const practiceAreasText = practiceAreas.join(', ');
        const subject = encodeURIComponent(`Legal Consultation Request: ${practiceAreasText}`);
        
        let body = `CONTACT INFORMATION\n`;
        body += `Name: ${data.name}\n`;
        body += `Email: ${data.email}\n`;
        body += `Phone: ${data.phone || 'Not provided'}\n\n`;
        
        body += `PRACTICE AREA(S) OF INTEREST\n`;
        body += `${practiceAreasText}\n\n`;
        
        if (data.urgency) {
            body += `URGENCY LEVEL\n`;
            body += `${data.urgency}\n\n`;
        }
        
        body += `MESSAGE\n`;
        body += `${data.message}\n\n`;
        
        body += `---\n`;
        body += `This message was sent from the contact form on the Jonathan W. Klein Law Firm website.`;
        
        const encodedBody = encodeURIComponent(body);
        
        // Open email client
        window.location.href = `mailto:jwk283@aol.com?subject=${subject}&body=${encodedBody}`;
        
        // Show success message
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Opening Email Client...';
        submitButton.style.background = '#4a4a4a';
        submitButton.disabled = true;
        
        setTimeout(() => {
            submitButton.textContent = originalText;
            submitButton.style.background = '';
            submitButton.disabled = false;
            // Don't reset form immediately - let user see what was sent
        }, 2000);
    });
    
    // Add validation feedback for practice areas and visual feedback
    const practiceCheckboxes = contactForm.querySelectorAll('input[name="practice-areas[]"]');
    practiceCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            // Add/remove checked class for styling
            const option = checkbox.closest('.practice-area-option');
            if (checkbox.checked) {
                option.classList.add('checked');
            } else {
                option.classList.remove('checked');
            }
            
            const checkedCount = Array.from(practiceCheckboxes).filter(cb => cb.checked).length;
            if (checkedCount > 0) {
                // Remove any error styling
                const practiceSelection = contactForm.querySelector('.practice-areas-selection');
                if (practiceSelection) {
                    practiceSelection.style.border = 'none';
                }
            }
        });
        
        // Initialize checked state on page load
        if (checkbox.checked) {
            checkbox.closest('.practice-area-option').classList.add('checked');
        }
    });
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add active state to navigation links based on scroll position
const sections = document.querySelectorAll('section[id]');

function updateActiveNav() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-menu a[href="#${sectionId}"]`);
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.style.fontWeight = '400');
            if (navLink) {
                navLink.style.fontWeight = '600';
            }
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    updateActiveNav();
});

// ============================================
// REVIEWS CAROUSEL - Fade In/Out
// ============================================

let currentReviewIndex = 0;
let reviewInterval;
const reviewTransitionTime = 5000; // 5 seconds

function initReviewsCarousel() {
    const reviewCards = document.querySelectorAll('.review-card');
    const reviewIndicators = document.querySelectorAll('.review-indicator');
    
    if (reviewCards.length === 0) return;
    
    // Function to show a specific review
    function showReview(index) {
        // Remove active class from all reviews and indicators
        reviewCards.forEach((card, i) => {
            if (i === index) {
                card.classList.add('active');
            } else {
                card.classList.remove('active');
            }
        });
        
        reviewIndicators.forEach((indicator, i) => {
            if (i === index) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
        
        currentReviewIndex = index;
    }
    
    // Function to go to next review
    function nextReview() {
        const nextIndex = (currentReviewIndex + 1) % reviewCards.length;
        showReview(nextIndex);
    }
    
    // Add click handlers to indicators
    reviewIndicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            showReview(index);
            // Reset auto-play timer
            clearInterval(reviewInterval);
            startAutoPlay();
        });
    });
    
    // Start auto-play
    function startAutoPlay() {
        reviewInterval = setInterval(() => {
            nextReview();
        }, reviewTransitionTime);
    }
    
    // Pause on hover
    const reviewsCarousel = document.querySelector('.reviews-carousel');
    if (reviewsCarousel) {
        reviewsCarousel.addEventListener('mouseenter', () => {
            clearInterval(reviewInterval);
        });
        
        reviewsCarousel.addEventListener('mouseleave', () => {
            startAutoPlay();
        });
    }
    
    // Initialize with first review
    showReview(0);
    startAutoPlay();
}

// Initialize carousel when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initReviewsCarousel();
});

