/**
 * StaffShell - SaaS Landing Page
 * Main JavaScript File
 */

(function($) {
    'use strict';

    // ============================================
    // STICKY HEADER
    // ============================================
    function initStickyHeader() {
        const header = document.querySelector('.site-header');
        if (!header) return;

        const scrollThreshold = 50;

        function handleScroll() {
            if (window.scrollY > scrollThreshold) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
    }

    // ============================================
    // SMOOTH SCROLL
    // ============================================
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#' || href === '#!') return;

                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    
                    const offcanvas = document.querySelector('.offcanvas.show');
                    if (offcanvas) {
                        const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvas);
                        if (bsOffcanvas) bsOffcanvas.hide();
                    }

                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // ============================================
    // PRICING TOGGLE
    // ============================================
    function initPricingToggle() {
        const toggle = document.querySelector('.pricing-toggle-switch');
        const monthlyLabel = document.querySelector('.pricing-toggle-label[data-period="monthly"]');
        const yearlyLabel = document.querySelector('.pricing-toggle-label[data-period="yearly"]');
        const monthlyPrices = document.querySelectorAll('.price-monthly');
        const yearlyPrices = document.querySelectorAll('.price-yearly');

        if (!toggle) return;

        function updatePricing(isYearly) {
            if (isYearly) {
                toggle.classList.add('active');
                monthlyLabel && monthlyLabel.classList.remove('active');
                yearlyLabel && yearlyLabel.classList.add('active');
                monthlyPrices.forEach(el => el.style.display = 'none');
                yearlyPrices.forEach(el => el.style.display = 'block');
            } else {
                toggle.classList.remove('active');
                monthlyLabel && monthlyLabel.classList.add('active');
                yearlyLabel && yearlyLabel.classList.remove('active');
                monthlyPrices.forEach(el => el.style.display = 'block');
                yearlyPrices.forEach(el => el.style.display = 'none');
            }
        }

        toggle.addEventListener('click', function() {
            const isYearly = !this.classList.contains('active');
            updatePricing(isYearly);
        });

        updatePricing(false);
    }

    // ============================================
    // TESTIMONIAL SLIDER
    // ============================================
    function initTestimonialSlider() {
        const slider = document.querySelector('.testimonial-slider');
        if (!slider) return;

        const track = slider.querySelector('.testimonial-track');
        const cards = slider.querySelectorAll('.testimonial-card');
        const prevBtn = slider.querySelector('.testimonial-prev');
        const nextBtn = slider.querySelector('.testimonial-next');
        const dotsContainer = slider.querySelector('.testimonial-dots');

        if (!track || cards.length === 0) return;

        let currentIndex = 0;
        let slidesPerView = getSlidesPerView();
        let totalSlides = Math.ceil(cards.length / slidesPerView);

        function getSlidesPerView() {
            if (window.innerWidth >= 1200) return 3;
            if (window.innerWidth >= 768) return 2;
            return 1;
        }

        function updateSlider() {
            const slideWidth = 100 / slidesPerView;
            track.style.transform = 'translateX(-' + (currentIndex * slideWidth) + '%)';
            updateDots();
        }

        function createDots() {
            if (!dotsContainer) return;
            dotsContainer.innerHTML = '';
            for (let i = 0; i < totalSlides; i++) {
                const dot = document.createElement('span');
                dot.classList.add('testimonial-dot');
                if (i === 0) dot.classList.add('active');
                dot.addEventListener('click', function() { goToSlide(i); });
                dotsContainer.appendChild(dot);
            }
        }

        function updateDots() {
            if (!dotsContainer) return;
            const dots = dotsContainer.querySelectorAll('.testimonial-dot');
            dots.forEach(function(dot, index) {
                dot.classList.toggle('active', index === currentIndex);
            });
        }

        function goToSlide(index) {
            currentIndex = Math.max(0, Math.min(index, totalSlides - 1));
            updateSlider();
        }

        function nextSlide() {
            currentIndex = (currentIndex + 1) % totalSlides;
            updateSlider();
        }

        function prevSlide() {
            currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
            updateSlider();
        }

        if (prevBtn) prevBtn.addEventListener('click', prevSlide);
        if (nextBtn) nextBtn.addEventListener('click', nextSlide);

        let resizeTimer;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function() {
                slidesPerView = getSlidesPerView();
                totalSlides = Math.ceil(cards.length / slidesPerView);
                currentIndex = Math.min(currentIndex, totalSlides - 1);
                createDots();
                updateSlider();
            }, 250);
        });

        let autoplayInterval;
        function startAutoplay() {
            autoplayInterval = setInterval(nextSlide, 5000);
        }
        function stopAutoplay() {
            clearInterval(autoplayInterval);
        }

        slider.addEventListener('mouseenter', stopAutoplay);
        slider.addEventListener('mouseleave', startAutoplay);

        let touchStartX = 0;
        let touchEndX = 0;

        track.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
            stopAutoplay();
        }, { passive: true });

        track.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;
            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) nextSlide();
                else prevSlide();
            }
            startAutoplay();
        }, { passive: true });

        createDots();
        updateSlider();
        startAutoplay();
    }

    // ============================================
    // SCROLL ANIMATIONS
    // ============================================
    function initScrollAnimations() {
        const animatedElements = document.querySelectorAll('.animate-on-scroll');
        
        if (animatedElements.length === 0) return;

        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -10% 0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        animatedElements.forEach(function(el) { observer.observe(el); });
    }

    // ============================================
    // COUNTER ANIMATION
    // ============================================
    function initCounters() {
        const counters = document.querySelectorAll('.counter');
        
        if (counters.length === 0) return;

        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        counters.forEach(function(counter) { observer.observe(counter); });
    }

    function animateCounter(element) {
        const target = parseInt(element.dataset.target) || parseInt(element.textContent);
        const duration = parseInt(element.dataset.duration) || 2000;
        const suffix = element.dataset.suffix || '';
        const prefix = element.dataset.prefix || '';
        
        let startTime = null;
        const startValue = 0;

        function easeOutQuart(t) {
            return 1 - Math.pow(1 - t, 4);
        }

        function updateCounter(currentTime) {
            if (!startTime) startTime = currentTime;
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const currentValue = Math.floor(startValue + (target - startValue) * easeOutQuart(progress));
            element.textContent = prefix + currentValue.toLocaleString() + suffix;

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            }
        }

        requestAnimationFrame(updateCounter);
    }

    // ============================================
    // FORM VALIDATION
    // ============================================
    function initFormValidation() {
        const contactForm = document.querySelector('#contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                if (validateForm(this)) {
                    showFormMessage(this, 'success', 'Thank you! Your message has been sent successfully.');
                    this.reset();
                }
            });
        }

        const newsletterForms = document.querySelectorAll('.newsletter-form');
        newsletterForms.forEach(function(form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                const emailInput = this.querySelector('input[type="email"]');
                if (emailInput && isValidEmail(emailInput.value)) {
                    showFormMessage(this, 'success', 'Thank you for subscribing!');
                    this.reset();
                } else {
                    showFormMessage(this, 'error', 'Please enter a valid email address.');
                }
            });
        });
    }

    function validateForm(form) {
        let isValid = true;
        const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
        
        inputs.forEach(function(input) {
            removeError(input);
            
            if (!input.value.trim()) {
                showError(input, 'This field is required');
                isValid = false;
            } else if (input.type === 'email' && !isValidEmail(input.value)) {
                showError(input, 'Please enter a valid email address');
                isValid = false;
            }
        });

        return isValid;
    }

    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function showError(input, message) {
        input.classList.add('is-invalid');
        const errorDiv = document.createElement('div');
        errorDiv.className = 'invalid-feedback';
        errorDiv.textContent = message;
        input.parentNode.appendChild(errorDiv);
    }

    function removeError(input) {
        input.classList.remove('is-invalid');
        const errorDiv = input.parentNode.querySelector('.invalid-feedback');
        if (errorDiv) errorDiv.remove();
    }

    function showFormMessage(form, type, message) {
        const existingMsg = form.querySelector('.form-message');
        if (existingMsg) existingMsg.remove();

        const msgDiv = document.createElement('div');
        msgDiv.className = 'form-message alert alert-' + (type === 'success' ? 'success' : 'danger') + ' mt-3';
        msgDiv.innerHTML = '<div class="d-flex align-items-center gap-2"><i class="bi bi-' + (type === 'success' ? 'check-circle' : 'exclamation-circle') + '"></i><span>' + message + '</span></div>';
        form.appendChild(msgDiv);

        setTimeout(function() {
            msgDiv.style.opacity = '0';
            setTimeout(function() { msgDiv.remove(); }, 300);
        }, 5000);
    }

    // ============================================
    // BACK TO TOP
    // ============================================
    function initBackToTop() {
        const backToTop = document.querySelector('.back-to-top');
        if (!backToTop) return;

        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        }, { passive: true });

        backToTop.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ============================================
    // EVENT COUNTDOWN
    // ============================================
    function initCountdown() {
        const countdown = document.querySelector('.event-countdown');
        if (!countdown) return;

        const eventDate = new Date();
        eventDate.setDate(eventDate.getDate() + 90);

        function updateCountdown() {
            const now = new Date();
            const diff = eventDate - now;

            if (diff <= 0) {
                countdown.innerHTML = '<span class="countdown-message">Event has started!</span>';
                return;
            }

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            const daysEl = countdown.querySelector('[data-countdown="days"]');
            const hoursEl = countdown.querySelector('[data-countdown="hours"]');
            const minutesEl = countdown.querySelector('[data-countdown="minutes"]');
            const secondsEl = countdown.querySelector('[data-countdown="seconds"]');

            if (daysEl) daysEl.textContent = days.toString().padStart(2, '0');
            if (hoursEl) hoursEl.textContent = hours.toString().padStart(2, '0');
            if (minutesEl) minutesEl.textContent = minutes.toString().padStart(2, '0');
            if (secondsEl) secondsEl.textContent = seconds.toString().padStart(2, '0');
        }

        updateCountdown();
        setInterval(updateCountdown, 1000);
    }

    // ============================================
    // DROPDOWN HOVER (Desktop)
    // ============================================
    function initDropdownHover() {
        if (window.innerWidth < 992) return;

        const dropdowns = document.querySelectorAll('.navbar .dropdown');
        
        dropdowns.forEach(function(dropdown) {
            let timeout;
            
            dropdown.addEventListener('mouseenter', function() {
                clearTimeout(timeout);
                this.querySelector('.dropdown-menu').classList.add('show');
                this.querySelector('.dropdown-toggle').setAttribute('aria-expanded', 'true');
            });
            
            dropdown.addEventListener('mouseleave', function() {
                const element = this;
                timeout = setTimeout(function() {
                    element.querySelector('.dropdown-menu').classList.remove('show');
                    element.querySelector('.dropdown-toggle').setAttribute('aria-expanded', 'false');
                }, 200);
            });
        });
    }

    // ============================================
    // INITIALIZE
    // ============================================
    $(document).ready(function() {
        initStickyHeader();
        initSmoothScroll();
        initPricingToggle();
        initTestimonialSlider();
        initScrollAnimations();
        initCounters();
        initFormValidation();
        initBackToTop();
        initCountdown();
        initDropdownHover();
    });

})(jQuery);