/* ═══════════════════════════════════════════════════
   LUXURY EDITORIAL TYPOGRAPHY PORTFOLIO &mdash; ENGINE
   ═══════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
    initCustomCursor();
    initPreloader();
    initHeroAnimations();
    initNavbarScroll();
    initScrollReveal();
    initStatCounters();
    initContactForm();
    initMarqueeCloning();
    initLiveClock();
    initClockScrollProgress();
    initEasterEggs();
    initMagneticButtons();
    init3DTilt();
});

/* ── Custom Cursor Tracking Engine ── */
function initCustomCursor() {
    const cursor = document.getElementById('customCursor');
    if (!cursor) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let cursorX = window.innerWidth / 2;
    let cursorY = window.innerHeight / 2;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    const render = () => {
        cursorX += (mouseX - cursorX) * 0.15;
        cursorY += (mouseY - cursorY) * 0.15;
        cursor.style.transform = `translate(calc(${cursorX}px - 50%), calc(${cursorY}px - 50%))`;
        requestAnimationFrame(render);
    };
    requestAnimationFrame(render);

    const interactables = document.querySelectorAll('a, button, input, textarea, .project-card, .expertise-card, .footer-clock, .roadmap-card');
    interactables.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hovering');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hovering');
        });
    });
}

/* ── Preloader Dismissal ── */
function initPreloader() {
    const preloader = document.getElementById('preloader');
    if (!preloader) return;

    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('loaded');
            // Trigger hero text animations after preload dismisses
            animateHero();
        }, 800);
    });

    // Fallback if load event takes too long
    setTimeout(() => {
        if (!preloader.classList.contains('loaded')) {
            preloader.classList.add('loaded');
            animateHero();
        }
    }, 2500);
}

/* ── Hero Animate-in Sequences ── */
function animateHero() {
    // 1. Reveal name words
    const nameWords = document.querySelectorAll('.name-word');
    nameWords.forEach(word => {
        const delay = parseInt(word.getAttribute('data-delay')) * 200;
        setTimeout(() => {
            word.classList.add('animated');
        }, delay + 200);
    });

    // 2. Reveal philosophy words one by one
    const philWords = document.querySelectorAll('.phil-word');
    philWords.forEach((word, index) => {
        setTimeout(() => {
            word.classList.add('visible');
        }, index * 80 + 700);
    });
}

function initHeroAnimations() {
    // Layout and target bindings
}

/* ── Scrolling Navigation Behaviors ── */
function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    let lastScrollY = window.scrollY;
    let ticking = false;

    function handleScroll() {
        const currentScrollY = window.scrollY;

        // Scrolled styling (blur background)
        if (currentScrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Show/Hide navbar logic based on direction
        if (currentScrollY > 150) {
            if (currentScrollY > lastScrollY) {
                // Scrolling Down -> Hide
                navbar.classList.add('hidden');
            } else {
                // Scrolling Up -> Show
                navbar.classList.remove('hidden');
            }
        } else {
            navbar.classList.remove('hidden');
        }

        lastScrollY = currentScrollY;
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(handleScroll);
            ticking = true;
        }
    }, { passive: true });

    // Active Section Tracking
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    function updateActiveSection() {
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 250)) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === currentSectionId) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveSection, { passive: true });
}

/* ── Scroll Intersection Observer (Luxury reveal) ── */
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal-up');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = parseInt(entry.target.getAttribute('data-delay')) || 0;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
}

/* ── High-Fidelity Stats Counter ── */
function initStatCounters() {
    const statNums = document.querySelectorAll('.stat-num');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const endVal = parseInt(target.getAttribute('data-target'));
                animateCounter(target, 0, endVal, 2000);
                observer.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    statNums.forEach(num => observer.observe(num));
}

function animateCounter(element, start, end, duration) {
    const startTime = performance.now();

    function step(now) {
        const progress = Math.min((now - startTime) / duration, 1);
        // EaseOut Expo Curve
        const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        element.textContent = Math.floor(eased * (end - start) + start);

        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    }

    window.requestAnimationFrame(step);
}

/* ── Marquee Seamless Clones ── */
function initMarqueeCloning() {
    const track = document.getElementById('marqueeTrack');
    if (!track) return;
    
    // Duplicate marquee items once to enable looping seamlessly
    const clone = track.innerHTML;
    track.innerHTML += clone;
}

/* ── Interactive Contact Form Simulation ── */
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const submitBtn = document.getElementById('submitBtn');
        const originalText = submitBtn.querySelector('.btn-text').innerText;

        // Visual loading state
        submitBtn.querySelector('.btn-text').innerText = 'Sending...';
        submitBtn.style.opacity = '0.5';

        setTimeout(() => {
            form.classList.add('success');

            // Clear state after delay
            setTimeout(() => {
                form.classList.remove('success');
                form.reset();
                submitBtn.querySelector('.btn-text').innerText = originalText;
                submitBtn.style.opacity = '1';
            }, 3000);
        }, 1500);
    });
}

/* ── Live Local Time Clock ── */
function initLiveClock() {
    const clockEl = document.getElementById('liveClock');
    if (!clockEl) return;

    function updateTime() {
        const now = new Date();
        const options = {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        };
        clockEl.textContent = now.toLocaleTimeString('en-US', options);
    }
    
    updateTime();
    setInterval(updateTime, 1000);
}

/* ── Dynamic Full-Page Zig-Zag Path Generator & Scroll Progress ── */
function initClockScrollProgress() {
    const clockEl = document.getElementById('liveClock');
    const clockContainer = document.getElementById('footerClockContainer');
    const svg = document.getElementById('globalScrollSvg');
    const track = document.getElementById('globalScrollTrack');
    const flow = document.getElementById('globalScrollFlow');
    if (!clockEl || !clockContainer || !svg || !track || !flow) return;

    let pathLength = 0;

    // Build/Rebuild the perfectly smooth curvy path dynamically matching the current body height
    function calculatePath() {
        const bodyHeight = Math.max(
            document.body.scrollHeight, document.documentElement.scrollHeight,
            document.body.offsetHeight, document.documentElement.offsetHeight,
            document.documentElement.clientHeight
        );
        
        const pathContainer = document.querySelector('.global-path-container');
        if (pathContainer) {
            pathContainer.style.height = `${bodyHeight}px`;
        }

        svg.setAttribute('height', bodyHeight);
        svg.style.height = `${bodyHeight}px`;

        // Align the path exactly next to the left content padding bounds
        const container = document.querySelector('.container');
        const containerRect = container ? container.getBoundingClientRect() : null;
        
        // Calculate dynamic horizontal coordinate
        const startX = containerRect ? containerRect.left + 40 : 40;

        const segmentHeight = 350; // Height of each curve loop
        const W = 70; // Wave width
        let d = `M ${startX},0`;
        let directionRight = true;
        let currentY = 0;

        const footer = document.querySelector('.footer');
        const footerTop = footer ? footer.offsetTop : bodyHeight - 400;

        // Draw the first C-curve to establish the initial control points
        let nextY = currentY + segmentHeight;
        if (nextY > footerTop) nextY = footerTop;
        
        let ctrlX = directionRight ? startX + W : startX - W;
        d += ` C ${ctrlX},${currentY + segmentHeight * 0.4} ${ctrlX},${nextY - segmentHeight * 0.4} ${startX},${nextY}`;
        
        currentY = nextY;
        directionRight = !directionRight;

        // Traverse down the page body using S-curves for perfect smoothness
        while (currentY < footerTop) {
            nextY = currentY + segmentHeight;
            if (nextY > footerTop) nextY = footerTop;
            
            ctrlX = directionRight ? startX + W : startX - W;
            
            // S-curve uses the reflection of previous control point, guaranteeing G1 continuity
            d += ` S ${ctrlX},${nextY - segmentHeight * 0.4} ${startX},${nextY}`;
            
            directionRight = !directionRight;
            currentY = nextY;
        }

        // Path finishes smoothly at footerTop. No connection into the clock per request.
        track.setAttribute('d', d);
        flow.setAttribute('d', d);

        pathLength = flow.getTotalLength();
        flow.style.strokeDasharray = pathLength;
        flow.style.strokeDashoffset = pathLength;
    }

    calculatePath();

    // Redraw on viewport resize
    window.addEventListener('resize', calculatePath);

    // Map scroll percentage to the global wave stroke offset & the live numbers fill
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;

        if (docHeight <= 0) return;

        let scrollPercent = (scrollTop / docHeight) * 100;
        // Snap to 100 if we're very close to the bottom to ensure path completes
        if (scrollPercent > 99) scrollPercent = 100;
        scrollPercent = Math.min(Math.max(scrollPercent, 0), 100);

        // 1. Animate global gold flow line path
        const drawLength = pathLength * (scrollPercent / 100);
        flow.style.strokeDashoffset = pathLength - drawLength;

        // Animate F1 car model at the leading edge of the flow line
        const f1Car = document.getElementById('f1CarGroup');
        if (f1Car && flow) {
            if (scrollPercent > 0.5) {
                f1Car.style.opacity = '1';
                
                // Get point exactly at the leading edge
                const point = flow.getPointAtLength(drawLength);
                
                // Calculate tangent angle for rotation
                const delta = 2; 
                let p0, p1;
                if (drawLength < pathLength - delta) {
                    p0 = point;
                    p1 = flow.getPointAtLength(drawLength + delta);
                } else {
                    p0 = flow.getPointAtLength(drawLength - delta);
                    p1 = point;
                }
                
                const angle = Math.atan2(p1.y - p0.y, p1.x - p0.x) * (180 / Math.PI);
                
                f1Car.style.transform = `translate(${point.x}px, ${point.y}px) rotate(${angle}deg)`;
            } else {
                f1Car.style.opacity = '0';
            }
        }

        // 2. Animate clock numbers gradient fill at the final 15% scroll
        if (scrollPercent > 85) {
            const fillRatio = (scrollPercent - 85) / 15; // Scale from 0 to 1
            const fillPercent = fillRatio * 100;

            // Fill digits with darker gold, leave unfilled parts slightly transparent dark
            clockEl.style.backgroundImage = `linear-gradient(to top, var(--color-accent-gold-dark) ${fillPercent}%, rgba(26, 26, 26, 0.12) ${fillPercent}%)`;
            clockEl.style.webkitBackgroundClip = 'text';
            clockEl.style.backgroundClip = 'text';
            clockEl.style.webkitTextFillColor = 'transparent';

            // Add dynamic darker golden filter bloom to digits
            clockEl.style.filter = `drop-shadow(0 0 ${fillRatio * 8}px rgba(163, 129, 79, ${fillRatio * 0.45}))`;

            if (scrollPercent === 100) {
                clockContainer.classList.add('glowing');
            } else {
                clockContainer.classList.remove('glowing');
            }
        } else {
            // Reset to defaults
            clockEl.style.backgroundImage = `linear-gradient(to top, var(--color-accent-gold-dark) 0%, rgba(26, 26, 26, 0.12) 0%)`;
            clockEl.style.webkitBackgroundClip = 'text';
            clockEl.style.backgroundClip = 'text';
            clockEl.style.webkitTextFillColor = 'transparent';
            clockEl.style.filter = 'none';
            clockContainer.classList.remove('glowing');
        }
    }, { passive: true });
}

/* ── Hidden Easter Eggs ── */
function initEasterEggs() {
    // Easter Egg 1: Typing "gold" triggers a golden cybercore aesthetic
    let keys = '';
    const secret = 'gold';
    document.addEventListener('keydown', (e) => {
        keys += e.key.toLowerCase();
        if (keys.length > secret.length) {
            keys = keys.slice(1);
        }
        if (keys === secret) {
            triggerGoldEgg();
        }
    });

    function triggerGoldEgg() {
        document.body.style.transition = 'filter 2s cubic-bezier(0.16, 1, 0.3, 1)';
        document.body.style.filter = 'sepia(0.5) hue-rotate(-15deg) saturate(1.5)';
        const cursor = document.getElementById('customCursor');
        if (cursor) {
            cursor.style.width = '120px';
            cursor.style.height = '120px';
            cursor.style.backgroundColor = 'var(--color-accent-gold)';
            cursor.style.mixBlendMode = 'normal';
            cursor.style.boxShadow = '0 0 60px var(--color-accent-gold)';
        }
    }

    // Easter Egg 2: Dino Game
    let dinoKeys = '';
    const dinoSecret = 'dino';
    let isDinoMode = false;

    document.addEventListener('keydown', (e) => {
        dinoKeys += e.key.toLowerCase();
        if (dinoKeys.length > dinoSecret.length) dinoKeys = dinoKeys.slice(1);
        
        if (dinoKeys === dinoSecret) {
            dinoKeys = ''; // reset keys to prevent duplicate fires
            if (isDinoMode) {
                stopDinoEgg();
                isDinoMode = false;
            } else {
                triggerDinoEgg();
                isDinoMode = true;
            }
        }
    });

    function stopDinoEgg() {
        const clockContainer = document.querySelector('.footer-clock');
        const msg = document.getElementById('clockMessage');
        
        if (window.stopDinoGameFunc) window.stopDinoGameFunc();
        
        msg.style.transition = 'opacity 1s ease, transform 1s ease';
        msg.style.opacity = '0';
        
        setTimeout(() => {
            clockContainer.classList.remove('dino-mode');
            msg.innerText = "Time is Precious.";
            msg.style.opacity = '1';
        }, 1000);
    }

    function triggerDinoEgg() {
        // Scroll to bottom
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        
        let scrollTimeout;
        const checkScroll = () => {
            clearTimeout(scrollTimeout);
            // If near bottom
            if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight - 50) {
                window.removeEventListener('scroll', checkScroll);
                executeTransition();
            } else {
                scrollTimeout = setTimeout(() => {
                    window.removeEventListener('scroll', checkScroll);
                    executeTransition();
                }, 1000); // Failsafe
            }
        };
        
        window.addEventListener('scroll', checkScroll);
        checkScroll();
        
        function executeTransition() {
            const clockContainer = document.querySelector('.footer-clock');
            const msg = document.getElementById('clockMessage');
            
            // Fade out message slowly
            msg.style.transition = 'opacity 1s ease, transform 1s ease';
            msg.style.opacity = '0';
            
            setTimeout(() => {
                clockContainer.classList.add('dino-mode');
                msg.innerText = "All work n no play makes Jack a dull boy.";
                msg.style.opacity = '1';
                
                // Wait for the full 1.5s CSS animation + 2s delay = 3.5s total before starting game
                setTimeout(() => {
                    startDinoGame();
                }, 3500);
            }, 1000); // Wait for fade out
        }
    }
}

/* ── Dino Game Engine ── */
function startDinoGame() {
    const canvas = document.getElementById('dinoCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    // Setup high DPI canvas
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = 400 * dpr;
    canvas.height = 150 * dpr;
    ctx.scale(dpr, dpr);

    const goldColor = getComputedStyle(document.documentElement).getPropertyValue('--color-accent-gold-dark').trim() || '#a3814f';

    let dino = { x: 50, y: 100, width: 20, height: 40, dy: 0, gravity: 0.6, jumpPower: -10, isJumping: false };
    let obstacles = [];
    let score = 0;
    let frame = 0;
    let isGameOver = false;
    let gameLoopId;

    function resetGame() {
        dino.y = 100;
        dino.dy = 0;
        dino.isJumping = false;
        obstacles = [];
        score = 0;
        frame = 0;
        isGameOver = false;
        loop();
    }

    function jump() {
        if (!dino.isJumping && !isGameOver) {
            dino.dy = dino.jumpPower;
            dino.isJumping = true;
        } else if (isGameOver) {
            resetGame();
        }
    }

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space' || e.code === 'ArrowUp') {
            e.preventDefault();
            jump();
        }
    });
    canvas.addEventListener('click', jump);

    function loop() {
        if (isGameOver) return;
        
        ctx.clearRect(0, 0, 400, 150);
        
        // Ground line
        ctx.beginPath();
        ctx.moveTo(0, 140);
        ctx.lineTo(400, 140);
        ctx.strokeStyle = goldColor;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Physics
        dino.dy += dino.gravity;
        dino.y += dino.dy;
        if (dino.y > 100) {
            dino.y = 100;
            dino.dy = 0;
            dino.isJumping = false;
        }

        // Draw Dino
        ctx.fillStyle = goldColor;
        ctx.fillRect(dino.x, dino.y, dino.width, dino.height);

        // Obstacles
        if (frame % 80 === 0) {
            obstacles.push({ x: 400, y: 110, width: 15, height: 30 });
        }

        for (let i = 0; i < obstacles.length; i++) {
            let obs = obstacles[i];
            obs.x -= 4 + (score * 0.005); // Speed increases
            
            ctx.fillRect(obs.x, obs.y, obs.width, obs.height);

            // Collision
            if (dino.x < obs.x + obs.width && dino.x + dino.width > obs.x &&
                dino.y < obs.y + obs.height && dino.y + dino.height > obs.y) {
                isGameOver = true;
            }
        }

        // Clean up
        obstacles = obstacles.filter(obs => obs.x + obs.width > 0);

        // Score
        score++;
        ctx.fillStyle = goldColor;
        ctx.font = '16px "Space Mono", monospace';
        ctx.textAlign = 'right';
        ctx.fillText(Math.floor(score / 10).toString().padStart(5, '0'), 380, 30);

        if (isGameOver) {
            ctx.textAlign = 'center';
            ctx.fillText('GAME OVER', 200, 70);
            ctx.font = '10px "Space Mono", monospace';
            ctx.fillText('Press Space to Restart', 200, 90);
        }

        frame++;
        if (!isGameOver) gameLoopId = requestAnimationFrame(loop);
    }
    
    // Ensure we start clean
    cancelAnimationFrame(gameLoopId);
    loop();

    window.stopDinoGameFunc = () => {
        isGameOver = true;
        cancelAnimationFrame(gameLoopId);
    };
}

/* ── Magnetic Buttons Physics ── */
function initMagneticButtons() {
    const magnets = document.querySelectorAll('.nav-links a, .hero-btn, .form-group button, .social-links a');
    
    magnets.forEach(magnet => {
        magnet.addEventListener('mousemove', (e) => {
            const rect = magnet.getBoundingClientRect();
            // Calculate mouse position relative to center of element
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            // Subtly pull element towards mouse
            magnet.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
        });
        
        magnet.addEventListener('mouseleave', () => {
            // Snap back
            magnet.style.transform = `translate(0px, 0px)`;
            magnet.style.transition = 'transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)';
        });
        
        magnet.addEventListener('mouseenter', () => {
            // Remove transition on enter for 1:1 tracking
            magnet.style.transition = 'none';
        });
    });
}

/* ── 3D Glass Card Tilt ── */
function init3DTilt() {
    const tiltElements = document.querySelectorAll('.expertise-card, .roadmap-card, .contact-left');
    
    tiltElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            // Normalized coordinates from -1 to 1
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            
            // Subtle tilt max 10 degrees
            const tiltX = -y * 10;
            const tiltY = x * 10;
            
            el.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        
        el.addEventListener('mouseleave', () => {
            el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
            el.style.transition = 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)';
        });
        
        el.addEventListener('mouseenter', () => {
            el.style.transition = 'transform 0.1s linear';
        });
    });
}
