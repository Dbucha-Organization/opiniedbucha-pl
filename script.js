document.addEventListener('DOMContentLoaded', () => {

    // --------------------------------------------------------------------------
    // Mobile Menu Toggle
    // --------------------------------------------------------------------------
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('open');
            // Toggle icon between bars and times (X)
            const icon = mobileMenuBtn.querySelector('i');
            if (navMenu.classList.contains('open')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
                document.body.style.overflow = 'hidden'; // Prevent scrolling
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
                document.body.style.overflow = '';
            }
        });

        // Close menu when clicking a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu.classList.contains('open')) {
                    navMenu.classList.remove('open');
                    const icon = mobileMenuBtn.querySelector('i');
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                    document.body.style.overflow = '';
                }
            });
        });
    }

    // --------------------------------------------------------------------------
    // Scroll Animations (Intersection Observer)
    // --------------------------------------------------------------------------
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active-reveal');

                // Special handling for rating bars
                if (entry.target.classList.contains('overall-rating-card')) {
                    animateProgressBars();
                }

                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.scroll-reveal');
    revealElements.forEach(el => observer.observe(el));

    // --------------------------------------------------------------------------
    // Rating Bars Animation
    // --------------------------------------------------------------------------
    function animateProgressBars() {
        // Animate breakdown bars (5-star breakdown)
        const breakdownBars = document.querySelectorAll('.breakdown-fill');
        breakdownBars.forEach(bar => {
            const targetWidth = bar.style.width;
            bar.style.width = '0';
            void bar.offsetWidth; // Force reflow
            bar.style.width = targetWidth;
        });

        // Animate category rating bars (if any still exist)
        const bars = document.querySelectorAll('.bar-fill');
        bars.forEach(bar => {
            const targetWidth = bar.style.width;
            bar.style.width = '0';
            void bar.offsetWidth; // Force reflow
            bar.style.width = targetWidth;
        });
    }

    // --------------------------------------------------------------------------
    // Filter Interaction
    // --------------------------------------------------------------------------
    const filterChips = document.querySelectorAll('.filter-chip');

    filterChips.forEach(chip => {
        chip.addEventListener('click', function () {
            // Remove active from all
            filterChips.forEach(c => c.classList.remove('active'));
            // Add to clicked
            this.classList.add('active');
        });
    });


    // --------------------------------------------------------------------------
    // Sticky Header Shadow
    // --------------------------------------------------------------------------
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 10) {
            header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.05)';
        } else {
            header.style.boxShadow = 'none';
        }
    });

});
