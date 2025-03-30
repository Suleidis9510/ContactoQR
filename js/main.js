// Main JavaScript file

// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', () => {
    // Initialize mobile menu toggle
    initMobileMenu();
    
    // Initialize skill bars animation
    initSkillBars();

    // Initialize back to top button
    initBackToTop();

    // Smooth scrolling for navigation links
    initSmoothScroll();
});

// Initialize mobile menu toggle functionality
function initMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navList = document.querySelector('.nav-list');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', () => {
            mobileMenuToggle.classList.toggle('active');
            navList.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a nav link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuToggle.classList.remove('active');
            navList.classList.remove('active');
        });
    });
}

// Initialize back to top button
function initBackToTop() {
    const backToTopButton = document.querySelector('.back-to-top');
    
    if (backToTopButton) {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });
        
        // Scroll to top when clicked
        backToTopButton.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Initialize skill bars with animation
function initSkillBars() {
    // Animate skill bars when they come into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillLevels = entry.target.querySelectorAll('.skill-level');
                skillLevels.forEach(skill => {
                    const level = skill.getAttribute('data-level');
                    skill.style.width = `${level}%`;
                });
                // Once animated, no need to observe anymore
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    // Observe all containers with skill bars
    const competenciesGrid = document.querySelector('.competencies-grid');
    if (competenciesGrid) {
        observer.observe(competenciesGrid);
    }
}

// Smooth scrolling for navigation
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's not an anchor link
            if (href === '#') return;
            
            e.preventDefault();
            
            const targetId = href;
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Smooth scroll to element
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Offset for header
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Mobile menu toggle - Improved version
document.addEventListener('DOMContentLoaded', function() {
  const navbarToggler = document.querySelector('.navbar-toggler');
  const navbarCollapse = document.querySelector('.navbar-collapse');
  
  if (navbarToggler && navbarCollapse) {
    // Toggle menu on button click
    navbarToggler.addEventListener('click', function() {
      navbarCollapse.classList.toggle('show');
      navbarToggler.classList.toggle('active');
      
      // Prevent scrolling when menu is open
      if (navbarCollapse.classList.contains('show')) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    });
    
    // Close mobile menu when clicking on a nav item
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    navLinks.forEach(function(navLink) {
      navLink.addEventListener('click', function() {
        navbarCollapse.classList.remove('show');
        navbarToggler.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
      if (navbarCollapse.classList.contains('show') && 
          !navbarCollapse.contains(event.target) && 
          !navbarToggler.contains(event.target)) {
        navbarCollapse.classList.remove('show');
        navbarToggler.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }
});

// Back to top button functionality
window.addEventListener('scroll', function() {
  const backToTopButton = document.querySelector('.back-to-top');
  if (window.scrollY > 300) {
    backToTopButton.classList.add('show');
  } else {
    backToTopButton.classList.remove('show');
  }
});
