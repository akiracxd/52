document.addEventListener('DOMContentLoaded', function() {

    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav');
    
    burger.addEventListener('click', function() {
        this.classList.toggle('active');
        nav.classList.toggle('active');
    });

    const navLinks = document.querySelectorAll('.nav__link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            burger.classList.remove('active');
            nav.classList.remove('active');
        });
    });

    const modalButtons = document.querySelectorAll('[data-modal]');
    const modalOverlay = document.querySelector('.modal-overlay');
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.modal__close');

    modalButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modalId = this.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            
            modalOverlay.style.display = 'block';
            modal.style.display = 'block';
            
            setTimeout(() => {
                modalOverlay.style.opacity = '1';
                modal.style.opacity = '1';
                modal.style.transform = 'translate(-50%, -50%) scale(1)';
            }, 10);
            
            document.body.style.overflow = 'hidden';
        });
    });

    function closeModal() {
        modals.forEach(modal => {
            modal.style.opacity = '0';
            modal.style.transform = 'translate(-50%, -50%) scale(0.9)';
            
            setTimeout(() => {
                modal.style.display = 'none';
            }, 300);
        });
        
        modalOverlay.style.opacity = '0';
        
        setTimeout(() => {
            modalOverlay.style.display = 'none';
            document.body.style.overflow = '';
        }, 300);
    }

    closeButtons.forEach(button => {
        button.addEventListener('click', closeModal);
    });

    modalOverlay.addEventListener('click', closeModal);

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });

    const modalTabs = document.querySelectorAll('.modal__tab');
    modalTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            const tabContent = document.getElementById(tabId);
            const tabsContainer = this.closest('.modal__tabs');
            
            tabsContainer.querySelectorAll('.modal__tab').forEach(t => {
                t.classList.remove('active');
            });
            
            this.classList.add('active');
            
            this.closest('.modal__content').querySelectorAll('.modal__tab-content').forEach(content => {
                content.classList.remove('active');
            });
            
            tabContent.classList.add('active');
        });
    });

    const flightsTabs = document.querySelectorAll('.flights__tab');
    flightsTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            const tabContent = document.getElementById(tabId);
            const tabsContainer = this.closest('.flights__tabs');
            
            tabsContainer.querySelectorAll('.flights__tab').forEach(t => {
                t.classList.remove('active');
            });
            
            this.classList.add('active');
            
            document.querySelectorAll('.flights__table').forEach(content => {
                content.classList.remove('active');
            });
            
            tabContent.classList.add('active');
        });
    });

    const faqQuestions = document.querySelectorAll('.faq-item__question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const icon = this.querySelector('i');
            
            this.classList.toggle('active');
            answer.classList.toggle('active');
            
            if (this.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
            } else {
                answer.style.maxHeight = '0';
            }
        });
    });

    const announcements = document.querySelectorAll('.announcement');
    let currentAnnouncement = 0;
    
    function showNextAnnouncement() {
        announcements[currentAnnouncement].classList.remove('active');
        currentAnnouncement = (currentAnnouncement + 1) % announcements.length;
        announcements[currentAnnouncement].classList.add('active');
    }
    
    if (announcements.length > 0) {
        announcements[0].classList.add('active');
        setInterval(showNextAnnouncement, 5000);
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    const header = document.querySelector('.header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            header.classList.remove('scroll-up');
            return;
        }
        
        if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
            header.classList.remove('scroll-up');
            header.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
            header.classList.remove('scroll-down');
            header.classList.add('scroll-up');
        }
        
        lastScroll = currentScroll;
    });

    const animateOnScroll = function() {
        const animatedElements = document.querySelectorAll('.feature-card, .info-card, .service-card, .department-card');
        
        animatedElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    document.querySelectorAll('.feature-card, .info-card, .service-card, .department-card').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    window.addEventListener('scroll', animateOnScroll);
    window.addEventListener('load', animateOnScroll);

    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            alert('Форма отправлена! Мы свяжемся с вами в ближайшее время.');
            this.reset();
        });
    });
});