// 导航栏滚动效果
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// 移动端菜单
const menuToggle = document.getElementById('menu-toggle');
const closeMenu = document.getElementById('close-menu');
const mobileMenu = document.getElementById('mobile-menu');
const menuOverlay = document.getElementById('menu-overlay');

menuToggle.addEventListener('click', function() {
    mobileMenu.classList.add('active');
    menuOverlay.classList.remove('hidden');
    setTimeout(() => {
        menuOverlay.classList.add('opacity-100');
    }, 10);
    document.body.style.overflow = 'hidden';
});

function closeMenuFunc() {
    mobileMenu.classList.remove('active');
    menuOverlay.classList.remove('opacity-100');
    setTimeout(() => {
        menuOverlay.classList.add('hidden');
    }, 300);
    document.body.style.overflow = '';
}

closeMenu.addEventListener('click', closeMenuFunc);
menuOverlay.addEventListener('click', closeMenuFunc);

// 移动端导航链接点击关闭菜单
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
mobileNavLinks.forEach(link => {
    link.addEventListener('click', closeMenuFunc);
});

// Banner轮播
const bannerSlides = document.querySelectorAll('.banner-slide');
const bannerIndicators = document.querySelectorAll('.banner-indicator');
const bannerPrev = document.getElementById('banner-prev');
const bannerNext = document.getElementById('banner-next');
let currentSlide = 0;
let slideInterval;

function showSlide(index) {
    bannerSlides.forEach(slide => {
        slide.classList.remove('active');
    });
    bannerIndicators.forEach(indicator => {
        indicator.classList.remove('active');
    });
    bannerSlides[index].classList.add('active');
    bannerIndicators[index].classList.add('active');
    currentSlide = index;
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % bannerSlides.length;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + bannerSlides.length) % bannerSlides.length;
    showSlide(currentSlide);
}

bannerPrev.addEventListener('click', prevSlide);
bannerNext.addEventListener('click', nextSlide);

bannerIndicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
        showSlide(index);
    });
});

function startSlideShow() {
    slideInterval = setInterval(nextSlide, 5000);
}

startSlideShow();

// 滚动动画
const scrollFadeElements = document.querySelectorAll('.scroll-fade');

function checkScroll() {
    scrollFadeElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (elementTop < windowHeight - 100) {
            element.classList.add('active');
        }
    });
}

window.addEventListener('scroll', checkScroll);
window.addEventListener('load', checkScroll);

// 招聘申请模态框
const applyJobBtns = document.querySelectorAll('.apply-job-btn');
const jobModal = document.querySelector('.job-modal');
const closeModal = document.querySelector('.close-modal');

applyJobBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        jobModal.classList.remove('opacity-0', 'invisible');
        jobModal.classList.add('opacity-100', 'visible');
        document.body.style.overflow = 'hidden';
    });
});

function closeJobModal() {
    jobModal.classList.remove('opacity-100', 'visible');
    jobModal.classList.add('opacity-0', 'invisible');
    document.body.style.overflow = '';
}

closeModal.addEventListener('click', closeJobModal);

// 点击模态框外部关闭
jobModal.addEventListener('click', function(e) {
    if (e.target === jobModal) {
        closeJobModal();
    }
});

// 返回顶部按钮
const backToTopBtn = document.querySelector('.back-to-top');

window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
        backToTopBtn.classList.remove('opacity-0', 'invisible');
        backToTopBtn.classList.add('opacity-100', 'visible');
    } else {
        backToTopBtn.classList.remove('opacity-100', 'visible');
        backToTopBtn.classList.add('opacity-0', 'invisible');
    }
});

backToTopBtn.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});
