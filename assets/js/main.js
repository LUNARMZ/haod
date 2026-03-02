/**
 * 皓动传媒官网 JavaScript
 */

// DOM 加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 导航栏滚动效果
    const navbar = document.getElementById('navbar');
    const backToTopBtn = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('py-2', 'shadow-lg');
            navbar.classList.remove('py-3');
            
            backToTopBtn.classList.remove('opacity-0', 'invisible');
            backToTopBtn.classList.add('opacity-100', 'visible');
        } else {
            navbar.classList.add('py-3');
            navbar.classList.remove('py-2', 'shadow-lg');
            
            backToTopBtn.classList.add('opacity-0', 'invisible');
            backToTopBtn.classList.remove('opacity-100', 'visible');
        }
    });
    
    // 移动端菜单
    const menuToggle = document.getElementById('menu-toggle');
    const closeMenu = document.getElementById('close-menu');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuOverlay = document.getElementById('menu-overlay');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    
    menuToggle.addEventListener('click', function() {
        mobileMenu.classList.add('active');
        menuOverlay.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    });
    
    function hideMenu() {
        mobileMenu.classList.remove('active');
        menuOverlay.classList.add('hidden');
        document.body.style.overflow = '';
    }
    
    closeMenu.addEventListener('click', hideMenu);
    menuOverlay.addEventListener('click', hideMenu);
    
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', hideMenu);
    });
    
    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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
                
                // 更新导航高亮
                updateActiveNavLink(targetId);
            }
        });
    });
    
    // 更新导航高亮
    function updateActiveNavLink(targetId) {
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            if (link.getAttribute('href') === targetId) {
                link.classList.add('active', 'text-primary-900');
                link.classList.remove('text-gray-600');
            } else {
                link.classList.remove('active', 'text-primary-900');
                link.classList.add('text-gray-600');
            }
        });
    }
    
    // 监听滚动更新导航高亮
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = '#' + section.getAttribute('id');
            }
        });
        
        if (currentSection) {
            updateActiveNavLink(currentSection);
        }
    });
    
    // Banner 轮播图
    const bannerSlides = document.querySelectorAll('.banner-slide');
    const bannerPrev = document.getElementById('banner-prev');
    const bannerNext = document.getElementById('banner-next');
    const bannerIndicators = document.querySelectorAll('.banner-indicator');
    let currentSlide = 0;
    let slideInterval;
    
    function showSlide(index) {
        if (index >= bannerSlides.length) {
            currentSlide = 0;
        } else if (index < 0) {
            currentSlide = bannerSlides.length - 1;
        } else {
            currentSlide = index;
        }
        
        bannerSlides.forEach((slide, i) => {
            slide.classList.toggle('active', i === currentSlide);
        });
        
        bannerIndicators.forEach((indicator, i) => {
            if (i === currentSlide) {
                indicator.classList.add('active', 'w-8');
                indicator.classList.remove('w-2');
            } else {
                indicator.classList.remove('active', 'w-8');
                indicator.classList.add('w-2');
            }
        });
    }
    
    function nextSlide() {
        showSlide(currentSlide + 1);
    }
    
    function startSlideshow() {
        slideInterval = setInterval(nextSlide, 5000);
    }
    
    bannerPrev.addEventListener('click', function() {
        clearInterval(slideInterval);
        showSlide(currentSlide - 1);
        startSlideshow();
    });
    
    bannerNext.addEventListener('click', function() {
        clearInterval(slideInterval);
        nextSlide();
        startSlideshow();
    });
    
    bannerIndicators.forEach((indicator, index) => {
        indicator.addEventListener('click', function() {
            clearInterval(slideInterval);
            showSlide(index);
            startSlideshow();
        });
    });
    
    // 启动轮播图
    startSlideshow();
    
    // 滚动动画
    const scrollFadeElements = document.querySelectorAll('.scroll-fade');
    
    function checkScroll() {
        scrollFadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                const delay = element.getAttribute('data-delay') || 0;
                setTimeout(() => {
                    element.classList.add('active');
                }, delay);
            }
        });
    }
    
    // 初始检查
    checkScroll();
    
    // 滚动时检查
    window.addEventListener('scroll', checkScroll);
    
    // 返回顶部按钮
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // 表单提交
    const contactForm = document.getElementById('contact-form');
    const successModal = document.getElementById('success-modal');
    const closeSuccess = document.getElementById('close-success');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // 获取表单数据
        const formData = {
            name: document.getElementById('name').value,
            phone: document.getElementById('phone').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value
        };
        
        // 模拟表单提交
        console.log('表单提交数据:', formData);
        
        // 显示成功提示
        successModal.classList.remove('hidden');
        
        // 重置表单
        contactForm.reset();
    });
    
    closeSuccess.addEventListener('click', function() {
        successModal.classList.add('hidden');
    });
    
    // 初始化动画效果
    function initAnimations() {
        const elements = document.querySelectorAll('.scroll-fade');
        elements.forEach(el => {
            const delay = el.getAttribute('data-delay') || 0;
            el.style.transitionDelay = `${delay}ms`;
        });
    }
    
    initAnimations();
});