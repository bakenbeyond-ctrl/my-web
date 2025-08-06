// Enhanced Menu Interactivity with Image Slider
document.addEventListener('DOMContentLoaded', function() {
    
    // Image Slider Functionality
    const slides = document.querySelectorAll('.slide');
    const navDots = document.querySelectorAll('.nav-dot');
    let currentSlide = 0;
    
    // Auto-advance slider every 4 seconds
    function nextSlide() {
        slides[currentSlide].classList.remove('active');
        navDots[currentSlide].classList.remove('active');
        
        currentSlide = (currentSlide + 1) % slides.length;
        
        slides[currentSlide].classList.add('active');
        navDots[currentSlide].classList.add('active');
    }
    
    // Set up auto-advance timer
    let slideInterval = setInterval(nextSlide, 4000);
    
    // Handle manual navigation via dots
    navDots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            // Clear auto-advance timer and restart it
            clearInterval(slideInterval);
            
            // Remove active class from current slide and dot
            slides[currentSlide].classList.remove('active');
            navDots[currentSlide].classList.remove('active');
            
            // Set new current slide
            currentSlide = index;
            
            // Add active class to new slide and dot
            slides[currentSlide].classList.add('active');
            navDots[currentSlide].classList.add('active');
            
            // Restart auto-advance timer
            slideInterval = setInterval(nextSlide, 4000);
        });
    });
    
    // Pause slider on header hover
    const header = document.querySelector('.header');
    header.addEventListener('mouseenter', function() {
        clearInterval(slideInterval);
    });
    
    header.addEventListener('mouseleave', function() {
        slideInterval = setInterval(nextSlide, 4000);
    });
    
    // Logo handling - show/hide based on if image loads
    const logo = document.getElementById('logo');
    const logoContainer = document.querySelector('.logo-container');
    
    // Check if logo image loads successfully
    logo.addEventListener('load', function() {
        this.style.display = 'block';
    });
    
    logo.addEventListener('error', function() {
        // If logo fails to load, hide the container
        logoContainer.style.display = 'none';
    });

    // Smooth scroll behavior for any internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add hover effects to menu items
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add click animation to price options
    const priceOptions = document.querySelectorAll('.price-option');
    priceOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Add a subtle click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1.05)';
            }, 100);
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
        });
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe menu items for scroll animations
    menuItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
    });

    // Add loading state management
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });

    // Handle image loading errors gracefully
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            // If an image fails to load, add a placeholder background
            this.style.background = 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)';
            this.style.display = 'none';
            this.parentElement.style.background = 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)';
        });
    });

    // Instagram link tracking (optional analytics)
    const instagramLink = document.querySelector('.instagram-link');
    if (instagramLink) {
        instagramLink.addEventListener('click', function() {
            // You can add analytics tracking here if needed
            console.log('Instagram link clicked');
        });
    }
});

// Function to update logo when user provides one
function updateLogo(logoSrc) {
    const logo = document.getElementById('logo');
    const logoContainer = document.querySelector('.logo-container');
    
    if (logoSrc && logoSrc !== 'logo-placeholder.png') {
        logo.src = logoSrc;
        logo.style.display = 'block';
        logoContainer.style.display = 'block';
    }
}

// Responsive font sizing based on viewport
function adjustFontSizes() {
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    const brandName = document.querySelector('.brand-name');
    
    if (vw < 480) {
        brandName.style.fontSize = '2rem';
    } else if (vw < 768) {
        brandName.style.fontSize = '2.5rem';
    } else {
        brandName.style.fontSize = '3.5rem';
    }
}

// Call on load and resize
window.addEventListener('load', adjustFontSizes);
window.addEventListener('resize', adjustFontSizes);