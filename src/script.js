$(document).ready(function() {
    
    // Header scroll effect
    $(window).scroll(function() {
        const header = $('#header');
        if ($(this).scrollTop() > 50) {
            header.addClass('scrolled');
        } else {
            header.removeClass('scrolled');
        }
    });

    // Mobile menu toggle
    $('.mobile-menu-toggle').click(function() {
        $('.nav-list').slideToggle();
    });

    // Smooth scroll for navigation links
    $('.nav-link').click(function(e) {
        if (this.hash !== "") {
            e.preventDefault();
            const hash = this.hash;
            $('html, body').animate({
                scrollTop: $(hash).offset().top - 80
            }, 800);
        }
    });

    // Animated counters
    function animateCounters() {
        $('.stat-number').each(function() {
            const $this = $(this);
            const countTo = $this.data('count');
            const duration = 2000;
            
            $({ countNum: 0 }).animate({
                countNum: countTo
            }, {
                duration: duration,
                easing: 'swing',
                step: function() {
                    $this.text(Math.floor(this.countNum));
                },
                complete: function() {
                    $this.text(this.countNum);
                }
            });
        });
    }

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Trigger counter animation when stats section is visible
                if ($(entry.target).hasClass('stats-section')) {
                    animateCounters();
                }
            }
        });
    }, observerOptions);

    // Observe elements for animation
    $('.fade-in, .stats-section, .mission-card, .news-card, .member-card').each(function() {
        observer.observe(this);
    });

    // Initialize fade-in elements
    $('.fade-in').addClass('fade-in');

    // Filter functionality for actualités page
    $('.filter-btn').click(function() {
        const filter = $(this).data('filter');
        
        // Update active button
        $('.filter-btn').removeClass('active');
        $(this).addClass('active');
        
        // Filter cards
        if (filter === 'all') {
            $('.news-card').fadeIn();
        } else {
            $('.news-card').hide();
            $(`.news-card[data-category="${filter}"]`).fadeIn();
        }
    });

    // Tab functionality for actions page
    $('.tab-btn').click(function() {
        const tab = $(this).data('tab');
        
        // Update active button
        $('.tab-btn').removeClass('active');
        $(this).addClass('active');
        
        // Show/hide tab content
        $('.tab-content').removeClass('active');
        $(`#${tab}`).addClass('active');
    });

    // Filter functionality for membres page
    $('.members-filter .filter-btn').click(function() {
        const filter = $(this).data('filter');
        
        // Update active button
        $('.members-filter .filter-btn').removeClass('active');
        $(this).addClass('active');
        
        // Filter members
        if (filter === 'all') {
            $('.active-member-card').fadeIn();
        } else {
            $('.active-member-card').hide();
            $(`.active-member-card[data-category*="${filter}"]`).fadeIn();
        }
    });

    // Newsletter form submission
    $('.newsletter-form').submit(function(e) {
        e.preventDefault();
        const email = $(this).find('input[type="email"]').val();
        
        // Simulate form submission
        $(this).find('button').text('Merci !').prop('disabled', true);
        
        setTimeout(() => {
            $(this).find('button').text('S\'abonner').prop('disabled', false);
            $(this).find('input').val('');
        }, 2000);
        
        // Show success message
        alert('Merci pour votre inscription à notre newsletter !');
    });

    // Parallax effect for hero background
    $(window).scroll(function() {
        const scrolled = $(this).scrollTop();
        const heroBackground = $('.hero-background');
        
        if (heroBackground.length) {
            heroBackground.css('transform', `translateY(${scrolled * 0.5}px)`);
        }
    });

    // Dynamic header background on scroll
    $(window).scroll(function() {
        const scrolled = $(this).scrollTop();
        const header = $('.header');
        
        if (scrolled > 100) {
            header.css('background', 'rgba(255, 255, 255, 0.98)');
        } else {
            header.css('background', 'rgba(255, 255, 255, 0.95)');
        }
    });

    // Smooth reveal animations for cards
    function revealOnScroll() {
        $('.mission-card, .news-card, .member-card, .action-item, .humanitarian-item').each(function() {
            const elementTop = $(this).offset().top;
            const elementBottom = elementTop + $(this).outerHeight();
            const viewportTop = $(window).scrollTop();
            const viewportBottom = viewportTop + $(window).height();
            
            if (elementBottom > viewportTop && elementTop < viewportBottom) {
                $(this).addClass('visible');
            }
        });
    }

    $(window).scroll(revealOnScroll);
    revealOnScroll(); // Initial check

    // Add loading animation for images
    $('img').on('load', function() {
        $(this).addClass('loaded');
    });

    // Pagination functionality
    $('.pagination-btn').click(function() {
        if (!$(this).hasClass('prev') && !$(this).hasClass('next')) {
            $('.pagination-btn').removeClass('active');
            $(this).addClass('active');
        }
    });

    // Hover effects for interactive elements
    $('.btn, .nav-link, .member-card, .news-card, .action-item, .humanitarian-item').hover(
        function() {
            $(this).addClass('hover');
        },
        function() {
            $(this).removeClass('hover');
        }
    );

    // Auto-resize textareas if present
    $('textarea').on('input', function() {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight) + 'px';
    });

    // Form validation enhancement
    $('input[type="email"]').on('blur', function() {
        const email = $(this).val();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (email && !emailRegex.test(email)) {
            $(this).addClass('invalid');
        } else {
            $(this).removeClass('invalid');
        }
    });

    // Loading states for buttons
    $('.btn').click(function() {
        if (!$(this).hasClass('no-loading')) {
            const originalText = $(this).text();
            $(this).text('Chargement...').prop('disabled', true);
            
            setTimeout(() => {
                $(this).text(originalText).prop('disabled', false);
            }, 1000);
        }
    });

    // Accessibility improvements
    $('.nav-link, .btn, .read-more').attr('tabindex', '0');
    
    // Keyboard navigation
    $(document).keydown(function(e) {
        if (e.key === 'Tab') {
            $('body').addClass('keyboard-navigation');
        }
    });
    
    $(document).mousedown(function() {
        $('body').removeClass('keyboard-navigation');
    });

    // Performance optimization: Debounce scroll events
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Debounced scroll handler
    const debouncedScrollHandler = debounce(function() {
        revealOnScroll();
        // Other scroll-based animations can be added here
    }, 10);

    $(window).scroll(debouncedScrollHandler);

    // Initialize tooltips if needed
    $('[data-tooltip]').hover(
        function() {
            const tooltip = $(this).data('tooltip');
            $('<div class="tooltip">' + tooltip + '</div>').appendTo('body');
        },
        function() {
            $('.tooltip').remove();
        }
    );

    // Custom cursor effect (optional)
    if ($(window).width() > 768) {
        const cursor = $('<div class="custom-cursor"></div>');
        $('body').append(cursor);
        
        $(document).mousemove(function(e) {
            cursor.css({
                left: e.clientX,
                top: e.clientY
            });
        });
        
        $('a, .btn, .nav-link').hover(
            function() {
                cursor.addClass('hover');
            },
            function() {
                cursor.removeClass('hover');
            }
        );
    }

    // Initialize page-specific functionality
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    switch(currentPage) {
        case 'index.html':
            // Homepage specific functionality
            console.log('Homepage loaded');
            break;
        case 'actualites.html':
            // News page specific functionality
            console.log('News page loaded');
            break;
        case 'presentation.html':
            // About page specific functionality
            console.log('About page loaded');
            break;
        case 'actions.html':
            // Actions page specific functionality
            console.log('Actions page loaded');
            break;
        case 'membres.html':
            // Members page specific functionality
            console.log('Members page loaded');
            break;
    }

    // Error handling for missing images
    $('img').on('error', function() {
        $(this).attr('src', 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmMGYwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OTk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIG5vbiBkaXNwb25pYmxlPC90ZXh0Pjwvc3ZnPg==');
    });

    // Console welcome message
    console.log('%cMouvement Le Cercle - Website', 'color: #003366; font-size: 16px; font-weight: bold;');
    console.log('%cDeveloped with ❤️ for the communauty', 'color: #0072CE; font-size: 12px;');
    console.log('%cVersion 1.0 - 2025', 'color: #E3B03F; font-size: 10px;');
});