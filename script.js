
const navbar = document.querySelector('.navbar');
const themeToggle = document.querySelector('.theme-toggle');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const loadingScreen = document.getElementById('loadingScreen');


const portfolioItems = document.querySelectorAll('.portfolio-item');
const carouselDots = document.querySelectorAll('.carousel-dots .dot');
const carouselPrev = document.querySelector('.carousel-btn.prev');
const carouselNext = document.querySelector('.carousel-btn.next');


const testimonials = document.querySelectorAll('.testimonial');
const testimonialDots = document.querySelectorAll('.testimonial-dots .dot');
const testimonialPrev = document.querySelector('.testimonial-btn.prev');
const testimonialNext = document.querySelector('.testimonial-btn.next');


const contactForm = document.getElementById('contactForm');


let currentPortfolioIndex = 0;
let currentTestimonialIndex = 0;


let currentTheme = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', currentTheme);
updateThemeIcon();


window.addEventListener('load', () => {
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 2000);
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        navbar.style.backdropFilter = 'blur(20px)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.8)';
        navbar.style.backdropFilter = 'blur(20px)';
    }
});

// Theme toggle functionality
themeToggle.addEventListener('click', () => {
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem('theme', currentTheme);
    updateThemeIcon();
});

function updateThemeIcon() {
    const icon = themeToggle.querySelector('i');
    if (currentTheme === 'dark') {
        icon.className = 'fas fa-moon';
    } else {
        icon.className = 'fas fa-sun';
    }
}

// Mobile menu toggle
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Portfolio Carousel Functions
function showPortfolioItem(index) {
    portfolioItems.forEach((item, i) => {
        item.classList.toggle('active', i === index);
    });
    
    carouselDots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
    
    currentPortfolioIndex = index;
}

function nextPortfolioItem() {
    const nextIndex = (currentPortfolioIndex + 1) % portfolioItems.length;
    showPortfolioItem(nextIndex);
}

function prevPortfolioItem() {
    const prevIndex = (currentPortfolioIndex - 1 + portfolioItems.length) % portfolioItems.length;
    showPortfolioItem(prevIndex);
}

// Testimonials Carousel Functions
function showTestimonial(index) {
    testimonials.forEach((testimonial, i) => {
        testimonial.classList.toggle('active', i === index);
    });
    
    testimonialDots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
    
    currentTestimonialIndex = index;
}

function nextTestimonial() {
    const nextIndex = (currentTestimonialIndex + 1) % testimonials.length;
    showTestimonial(nextIndex);
}

function prevTestimonial() {
    const prevIndex = (currentTestimonialIndex - 1 + testimonials.length) % testimonials.length;
    showTestimonial(prevIndex);
}

// Carousel Event Listeners
if (carouselNext) {
    carouselNext.addEventListener('click', nextPortfolioItem);
}

if (carouselPrev) {
    carouselPrev.addEventListener('click', prevPortfolioItem);
}

if (testimonialNext) {
    testimonialNext.addEventListener('click', nextTestimonial);
}

if (testimonialPrev) {
    testimonialPrev.addEventListener('click', prevTestimonial);
}

// Dot navigation for portfolio
carouselDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        showPortfolioItem(index);
    });
});

// Dot navigation for testimonials
testimonialDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        showTestimonial(index);
    });
});

// Auto-advance carousels
setInterval(nextPortfolioItem, 5000);
setInterval(nextTestimonial, 6000);

// Update carousel dots for reduced portfolio items
document.addEventListener('DOMContentLoaded', () => {
    // Update portfolio carousel dots to match 2 items
    const portfolioDots = document.querySelectorAll('.carousel-dots .dot');
    if (portfolioDots.length > 2) {
        // Remove extra dots if they exist
        for (let i = 2; i < portfolioDots.length; i++) {
            portfolioDots[i].remove();
        }
    }
});

// Enhanced Security Features
(function() {
    'use strict';
    
    // Disable developer tools and inspect
    function disableDevTools() {
        // Disable F12
        document.addEventListener('keydown', function(e) {
            if (e.key === 'F12') {
                e.preventDefault();
                return false;
            }
            
            // Disable Ctrl+Shift+I (Developer Tools)
            if (e.ctrlKey && e.shiftKey && e.key === 'I') {
                e.preventDefault();
                return false;
            }
            
            // Disable Ctrl+Shift+J (Console)
            if (e.ctrlKey && e.shiftKey && e.key === 'J') {
                e.preventDefault();
                return false;
            }
            
            // Disable Ctrl+U (View Source)
            if (e.ctrlKey && e.key === 'u') {
                e.preventDefault();
                return false;
            }
            
            // Disable Ctrl+Shift+C (Inspect Element)
            if (e.ctrlKey && e.shiftKey && e.key === 'C') {
                e.preventDefault();
                return false;
            }
            
            // Disable Ctrl+Shift+K (Web Console)
            if (e.ctrlKey && e.shiftKey && e.key === 'K') {
                e.preventDefault();
                return false;
            }
            
            // Disable Ctrl+Shift+E (Network)
            if (e.ctrlKey && e.shiftKey && e.key === 'E') {
                e.preventDefault();
                return false;
            }
        });
        
        // Disable right-click context menu
        document.addEventListener('contextmenu', function(e) {
            e.preventDefault();
            return false;
        });
        
        // Disable text selection
        document.addEventListener('selectstart', function(e) {
            e.preventDefault();
            return false;
        });
        
        // Disable drag and drop
        document.addEventListener('dragstart', function(e) {
            e.preventDefault();
            return false;
        });
        
        // Disable copy
        document.addEventListener('copy', function(e) {
            e.preventDefault();
            return false;
        });
        
        // Disable cut
        document.addEventListener('cut', function(e) {
            e.preventDefault();
            return false;
        });
        
        // Disable paste
        document.addEventListener('paste', function(e) {
            e.preventDefault();
            return false;
        });
    }
    
    // Advanced dev tools detection
    function detectDevTools() {
        let devtools = {
            open: false,
            orientation: null
        };
        
        const threshold = 160;
        
        setInterval(() => {
            const widthThreshold = window.outerWidth - window.innerWidth > threshold;
            const heightThreshold = window.outerHeight - window.innerHeight > threshold;
            
            if (widthThreshold || heightThreshold) {
                if (!devtools.open) {
                    devtools.open = true;
                    devtools.orientation = widthThreshold ? 'vertical' : 'horizontal';
                    showSecurityAlert();
                }
            } else {
                devtools.open = false;
                devtools.orientation = null;
            }
        }, 500);
        
        // Additional detection methods using debugger
        setInterval(() => {
            const start = performance.now();
            debugger;
            const end = performance.now();
            
            if (end - start > 100) {
                if (!devtools.open) {
                    devtools.open = true;
                    showSecurityAlert();
                }
            }
        }, 1000);
    }
    
    // Show security alert
    function showSecurityAlert() {
        document.body.innerHTML = `
            <div style="
                display: flex; 
                justify-content: center; 
                align-items: center; 
                height: 100vh; 
                font-family: Arial, sans-serif; 
                background: #000; 
                color: #fff; 
                text-align: center;
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                z-index: 999999;
            ">
                <div>
                    <h1 style="color: #ff4444; margin-bottom: 20px;">🚨 Security Alert 🚨</h1>
                    <p style="font-size: 18px; margin-bottom: 15px;">Developer tools detected!</p>
                    <p style="font-size: 16px; margin-bottom: 20px;">Removing dev tools and refreshing page...</p>
                    <p style="font-size: 14px; color: #ccc;">Please close developer tools to continue.</p>
                    <div style="margin-top: 30px;">
                        <div style="width: 50px; height: 50px; border: 3px solid #333; border-top: 3px solid #ff4444; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto;"></div>
                    </div>
                </div>
            </div>
        `;
        
        setTimeout(() => {
            window.location.reload();
        }, 3000);
    }
    
    // Initialize security
    disableDevTools();
    detectDevTools();
    
    // Additional protection
    Object.defineProperty(document, 'hidden', {
        get: function() {
            return false;
        }
    });
    
    // Disable console methods
    if (window.console) {
        console.log = function() {};
        console.warn = function() {};
        console.error = function() {};
        console.info = function() {};
        console.debug = function() {};
    }
})();

// Contact Form Handling
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Simulate form submission
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Create email content
        const emailSubject = `New Contact from ${data.name} - ${data.subject}`;
        const emailBody = `
Name: ${data.name}
Email: ${data.email}
Project Type: ${data.subject}
Message: ${data.message}
        `;
        
        // Create mailto link
        const mailtoLink = `mailto:sqpxcycontact@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
        
        // Open email client
        window.open(mailtoLink);
        
        // Show success message
        showNotification('Email client opened! Please send the email to complete your message.', 'success');
        
        // Reset form
        contactForm.reset();
        
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    });
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--bg-glass);
        border: 1px solid var(--border-color);
        border-radius: var(--border-radius);
        padding: 1rem 1.5rem;
        backdrop-filter: blur(20px);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;
    
    notification.querySelector('.notification-content').style.cssText = `
        display: flex;
        align-items: center;
        gap: 0.75rem;
        color: var(--text-primary);
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.service-card, .exp-item, .contact-card');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Skill bars animation
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0%';
        
        setTimeout(() => {
            bar.style.width = width;
        }, 500);
    });
}

// Trigger skill bars animation when about section is visible
const aboutSection = document.querySelector('.about');
const aboutObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkillBars();
            aboutObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

if (aboutSection) {
    aboutObserver.observe(aboutSection);
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const floatingCard = document.querySelector('.floating-card');
    
    if (hero && floatingCard) {
        const rate = scrolled * -0.5;
        floatingCard.style.transform = `translateY(${rate}px)`;
    }
});

// Hero title animation (fade in effect instead of typing)
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        heroTitle.style.opacity = '0';
        heroTitle.style.transform = 'translateY(20px)';
        heroTitle.style.transition = 'opacity 1s ease, transform 1s ease';
        
        setTimeout(() => {
            heroTitle.style.opacity = '1';
            heroTitle.style.transform = 'translateY(0)';
        }, 1000);
    }
});

// Keyboard navigation for carousels
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        prevPortfolioItem();
        prevTestimonial();
    } else if (e.key === 'ArrowRight') {
        nextPortfolioItem();
        nextTestimonial();
    }
});

// Touch/swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe left
            nextPortfolioItem();
            nextTestimonial();
        } else {
            // Swipe right
            prevPortfolioItem();
            prevTestimonial();
        }
    }
}

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(() => {
    // Scroll-based animations and effects
}, 16)); // ~60fps

// Initialize tooltips for better UX
function initTooltips() {
    const elementsWithTooltips = document.querySelectorAll('[data-tooltip]');
    
    elementsWithTooltips.forEach(element => {
        element.addEventListener('mouseenter', (e) => {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = e.target.getAttribute('data-tooltip');
            tooltip.style.cssText = `
                position: absolute;
                background: var(--bg-glass);
                border: 1px solid var(--border-color);
                border-radius: var(--border-radius);
                padding: 0.5rem 0.75rem;
                font-size: 0.875rem;
                color: var(--text-primary);
                backdrop-filter: blur(20px);
                z-index: 1000;
                pointer-events: none;
                white-space: nowrap;
            `;
            
            document.body.appendChild(tooltip);
            
            const rect = e.target.getBoundingClientRect();
            tooltip.style.left = rect.left + rect.width / 2 - tooltip.offsetWidth / 2 + 'px';
            tooltip.style.top = rect.top - tooltip.offsetHeight - 8 + 'px';
            
            element.addEventListener('mouseleave', () => {
                if (tooltip.parentNode) {
                    tooltip.parentNode.removeChild(tooltip);
                }
            }, { once: true });
        });
    });
}

// Initialize tooltips when DOM is loaded
document.addEventListener('DOMContentLoaded', initTooltips);

// Export functions for potential external use
window.portfolioCarousel = {
    next: nextPortfolioItem,
    prev: prevPortfolioItem,
    show: showPortfolioItem
};

window.testimonialsCarousel = {
    next: nextTestimonial,
    prev: prevTestimonial,
    show: showTestimonial
};

window.themeManager = {
    toggle: () => {
        currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', currentTheme);
        localStorage.setItem('theme', currentTheme);
        updateThemeIcon();
    },
    getCurrent: () => currentTheme
}; 