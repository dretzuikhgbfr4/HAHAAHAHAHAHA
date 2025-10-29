
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

// Update carousel dots for portfolio items
document.addEventListener('DOMContentLoaded', () => {
    // Update portfolio carousel dots to match 5 items
    const portfolioDots = document.querySelectorAll('.carousel-dots .dot');
    if (portfolioDots.length > 5) {
        // Remove extra dots if they exist
        for (let i = 5; i < portfolioDots.length; i++) {
            portfolioDots[i].remove();
        }
    }
});


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

// Hero title animation with smooth fade and slide
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        heroTitle.style.opacity = '0';
        heroTitle.style.transform = 'translateY(30px) scale(0.9)';
        heroTitle.style.transition = 'all 1.5s cubic-bezier(0.4, 0, 0.2, 1)';
        
        setTimeout(() => {
            heroTitle.style.opacity = '1';
            heroTitle.style.transform = 'translateY(0) scale(1)';
        }, 800);
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

// Particle background effect
function createParticles() {
    const particleContainer = document.createElement('div');
    particleContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        overflow: hidden;
    `;
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(99, 102, 241, 0.3);
            border-radius: 50%;
            animation: floatParticle ${Math.random() * 10 + 10}s linear infinite;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 10}s;
        `;
        particleContainer.appendChild(particle);
    }
    
    document.body.appendChild(particleContainer);
}

// Add particle animation CSS
const particleStyle = document.createElement('style');
particleStyle.textContent = `
    @keyframes floatParticle {
        0% {
            transform: translateY(100vh) translateX(0);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) translateX(${Math.random() * 200 - 100}px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(particleStyle);

// Initialize particles
document.addEventListener('DOMContentLoaded', createParticles);

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