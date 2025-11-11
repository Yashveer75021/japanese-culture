// Japanese Culture Website - Main JavaScript
// Implements sakura animations, scroll effects, and interactive features

class JapaneseCultureSite {
    constructor() {
        this.sakuraParticles = [];
        this.isInitialized = false;
        this.currentSeason = 'spring';
        this.haikuWords = {
            spring: ['sakura', 'blossom', 'renewal', 'gentle', 'breeze', 'petals', 'cherry', 'trees'],
            summer: ['fireflies', 'festival', 'warmth', 'cicadas', 'lanterns', 'evening', 'garden'],
            autumn: ['maple', 'leaves', 'harvest', 'crimson', 'gold', 'reflection', 'tranquil'],
            winter: ['snow', 'silence', 'meditation', 'peaceful', 'white', 'stillness', 'zen']
        };
        this.init();
    }

    init() {
        if (this.isInitialized) return;
        
        this.setupSakuraCanvas();
        this.setupScrollAnimations();
        this.setupNavigationEffects();
        this.setupInteractiveElements();
        this.setupSeasonalSwitcher();
        this.setupHaikuGenerator();
        
        this.isInitialized = true;
        console.log('Japanese Culture Site initialized');
    }

    // Sakura Particle System using p5.js concepts
    setupSakuraCanvas() {
        const canvas = document.getElementById('sakura-canvas');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Create initial sakura particles
        for (let i = 0; i < 50; i++) {
            this.sakuraParticles.push(this.createSakuraParticle(canvas.width, canvas.height));
        }

        this.animateSakura(ctx, canvas.width, canvas.height);
    }

    createSakuraParticle(maxWidth, maxHeight) {
        return {
            x: Math.random() * maxWidth,
            y: Math.random() * maxHeight,
            size: Math.random() * 4 + 2,
            speedX: Math.random() * 0.5 - 0.25,
            speedY: Math.random() * 0.5 + 0.2,
            rotation: Math.random() * 360,
            rotationSpeed: Math.random() * 2 - 1,
            opacity: Math.random() * 0.7 + 0.3,
            color: this.getSakuraColor()
        };
    }

    getSakuraColor() {
        const colors = ['#FFB7C5', '#F8F4F8', '#FFE4E1', '#FFFFFF'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    animateSakura(ctx, width, height) {
        ctx.clearRect(0, 0, width, height);

        this.sakuraParticles.forEach((particle, index) => {
            // Update particle position
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            particle.rotation += particle.rotationSpeed;

            // Reset particle if it goes off screen
            if (particle.y > height) {
                particle.y = -10;
                particle.x = Math.random() * width;
            }
            if (particle.x > width) particle.x = 0;
            if (particle.x < 0) particle.x = width;

            // Draw particle
            ctx.save();
            ctx.globalAlpha = particle.opacity;
            ctx.translate(particle.x, particle.y);
            ctx.rotate(particle.rotation * Math.PI / 180);
            
            ctx.fillStyle = particle.color;
            ctx.beginPath();
            ctx.arc(0, 0, particle.size, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.restore();
        });

        requestAnimationFrame(() => this.animateSakura(ctx, width, height));
    }

    // Scroll-triggered animations
    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // Observe all animatable elements
        document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right').forEach(el => {
            observer.observe(el);
        });

        // Parallax effect for hero section
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero-background');
            if (hero) {
                hero.style.transform = `translateY(${scrolled * 0.3}px)`;
            }
        });
    }

    // Navigation hover effects
    setupNavigationEffects() {
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            link.addEventListener('mouseenter', (e) => {
                e.target.style.color = '#FFB7C5';
                e.target.style.transform = 'translateY(-2px)';
            });
            
            link.addEventListener('mouseleave', (e) => {
                e.target.style.color = '#2C2C2C';
                e.target.style.transform = 'translateY(0)';
            });
        });
    }

    // Interactive elements
    setupInteractiveElements() {
        // Cultural cards hover effects
        const cards = document.querySelectorAll('.culture-card');
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-8px) scale(1.02)';
                card.style.boxShadow = '0 20px 40px rgba(255, 183, 197, 0.2)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
                card.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
            });
        });

        // Image gallery lightbox
        const galleryImages = document.querySelectorAll('.gallery-image');
        galleryImages.forEach(img => {
            img.addEventListener('click', () => {
                this.openLightbox(img.src, img.alt);
            });
        });
    }

    // Seasonal theme switcher
    setupSeasonalSwitcher() {
        const switcher = document.getElementById('season-switcher');
        if (!switcher) return;

        switcher.addEventListener('change', (e) => {
            this.currentSeason = e.target.value;
            this.updateSeasonalTheme(this.currentSeason);
        });
    }

    updateSeasonalTheme(season) {
        const root = document.documentElement;
        const themes = {
            spring: { primary: '#FFB7C5', secondary: '#F8F4F8', accent: '#FFE4E1' },
            summer: { primary: '#87CEEB', secondary: '#F0F8FF', accent: '#E0F6FF' },
            autumn: { primary: '#CD853F', secondary: '#FFF8DC', accent: '#F5DEB3' },
            winter: { primary: '#E0E0E0', secondary: '#F8F8FF', accent: '#D3D3D3' }
        };

        const theme = themes[season];
        root.style.setProperty('--primary-color', theme.primary);
        root.style.setProperty('--secondary-color', theme.secondary);
        root.style.setProperty('--accent-color', theme.accent);
    }

    // Haiku generator
    setupHaikuGenerator() {
        const generateBtn = document.getElementById('generate-haiku');
        const haikuDisplay = document.getElementById('haiku-display');
        
        if (!generateBtn || !haikuDisplay) return;

        generateBtn.addEventListener('click', () => {
            const haiku = this.generateHaiku();
            haikuDisplay.innerHTML = haiku;
            haikuDisplay.classList.add('fade-in');
        });
    }

    generateHaiku() {
        const words = this.haikuWords[this.currentSeason];
        
        // Generate 5-7-5 syllable structure
        const line1 = this.getRandomWords(words, 2).join(' ');
        const line2 = this.getRandomWords(words, 3).join(' ');
        const line3 = this.getRandomWords(words, 2).join(' ');

        return `${line1}<br>${line2}<br>${line3}`;
    }

    getRandomWords(wordArray, count) {
        const shuffled = [...wordArray].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }

    // Lightbox functionality
    openLightbox(imageSrc, imageAlt) {
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox-overlay';
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <img src="${imageSrc}" alt="${imageAlt}" class="lightbox-image">
                <button class="lightbox-close">&times;</button>
            </div>
        `;

        document.body.appendChild(lightbox);
        
        // Close lightbox
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox || e.target.classList.contains('lightbox-close')) {
                document.body.removeChild(lightbox);
            }
        });
    }

    // Timeline interaction for history page
    setupTimeline() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        
        timelineItems.forEach(item => {
            item.addEventListener('click', () => {
                // Remove active class from all items
                timelineItems.forEach(i => i.classList.remove('active'));
                // Add active class to clicked item
                item.classList.add('active');
                
                // Update timeline content
                const period = item.dataset.period;
                this.updateTimelineContent(period);
            });
        });
    }

    updateTimelineContent(period) {
        const contentArea = document.getElementById('timeline-content');
        if (!contentArea) return;

        const periodData = {
            jomon: { title: 'Jomon Period', content: 'Ancient Japan\'s earliest civilization...' },
            yamato: { title: 'Yamato Period', content: 'The emergence of Japanese imperial rule...' },
            heian: { title: 'Heian Period', content: 'Golden age of Japanese culture and arts...' },
            edo: { title: 'Edo Period', content: 'Isolation and cultural flourishing...' },
            modern: { title: 'Modern Era', content: 'Meiji restoration to present day...' }
        };

        const data = periodData[period];
        contentArea.innerHTML = `
            <h3>${data.title}</h3>
            <p>${data.content}</p>
        `;
    }

    // Utility function to handle window resize
    handleResize() {
        const canvas = document.getElementById('sakura-canvas');
        if (canvas) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
    }
}

// Initialize the site when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const site = new JapaneseCultureSite();
    
    // Handle window resize
    window.addEventListener('resize', () => site.handleResize());
    
    // Smooth scrolling for anchor links
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
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = JapaneseCultureSite;
}