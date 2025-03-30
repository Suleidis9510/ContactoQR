document.addEventListener('DOMContentLoaded', function() {
    // Variables para el menú móvil
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navList = document.querySelector('.nav-list');
    
    // Manejo del menú móvil
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            navList.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
    }
    
    // Cerrar el menú al hacer clic en un enlace
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navList.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });
    
    // Animación de barras de habilidades
    function animateSkillBars() {
        const skillLevels = document.querySelectorAll('.skill-level');
        
        skillLevels.forEach(skill => {
            const width = skill.getAttribute('data-level') + '%';
            
            // Inicialmente establecemos el ancho a 0
            skill.style.width = '0';
            
            // Temporizador para dar efecto de animación
            setTimeout(() => {
                skill.style.width = width;
            }, 300);
        });
    }
    
    // Función para detectar cuando un elemento es visible en la ventana
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    // Observer para animaciones al hacer scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('competencies-grid')) {
                    animateSkillBars();
                }
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    // Elementos a observar para animaciones
    const elementsToAnimate = document.querySelectorAll('.experience-item, .competency-card, .quality-pillar, .competencies-grid');
    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });
    
    // Iniciar animación de skills si ya están visibles al cargar
    if (document.querySelector('.competencies-grid') && 
        isInViewport(document.querySelector('.competencies-grid'))) {
        animateSkillBars();
    }
    
    // Navegación activa en scroll
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
});
