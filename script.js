// Simple interactive behavior and scroll reveal
document.addEventListener('DOMContentLoaded', () => {
    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();

    const mobileNav = document.getElementById('mobile-nav');
    const menuBtn = document.getElementById('mobile-menu-btn');
    const desktopToggle = document.getElementById('theme-toggle');
    const mobileToggle = document.getElementById('mobile-theme-toggle');
    const headerHeight = 70; 

    // --- Dark Mode Logic ---
    const applyTheme = (isDark) => {
        const body = document.body;
        const toggleButtons = [desktopToggle, mobileToggle];

        if (isDark) {
            body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
        } else {
            body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light');
        }
        
        toggleButtons.forEach(btn => {
            if (btn) {
                btn.querySelector('.light-icon').style.display = isDark ? 'none' : 'inline';
                btn.querySelector('.dark-icon').style.display = isDark ? 'inline' : 'none';
            }
        });
    };

    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark') {
        applyTheme(true);
    } else if (currentTheme === null) {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            applyTheme(true);
        }
    }

    [desktopToggle, mobileToggle].forEach(btn => {
        if (btn) {
            btn.addEventListener('click', () => {
                const isCurrentlyDark = document.body.classList.contains('dark-mode');
                const newDarkMode = !isCurrentlyDark;
                applyTheme(newDarkMode);

                // Update mobile toggle label and icons correctly
                if (btn.id === "mobile-theme-toggle") {
                    const labelSpan = btn.querySelector('span'); // first span holds the text
                    const lightIcon = btn.querySelector('.light-icon');
                    const darkIcon = btn.querySelector('.dark-icon');

                    if (labelSpan && lightIcon && darkIcon) {
                        if (newDarkMode) {
                            labelSpan.textContent = "Light Mode: ";
                            lightIcon.style.display = "inline";   // 💡
                            darkIcon.style.display = "none";     // 🌙
                        } else {
                            labelSpan.textContent = "Dark Mode: ";
                            lightIcon.style.display = "none";    // 💡
                            darkIcon.style.display = "inline";   // 🌙
                        }
                    }
                }
            });
        }
    });

    // --- End Dark Mode Logic ---

    // Mobile nav toggle
    menuBtn.addEventListener('click', () => {
        mobileNav.classList.toggle('open');
        menuBtn.textContent = mobileNav.classList.contains('open') ? '✕' : '☰'; 
    });

    // Smooth scroll for internal links & mobile nav closing
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', (e) => {
            const targetId = a.getAttribute('href');
            const target = document.querySelector(targetId);

            if (target) {
                e.preventDefault();

                if (mobileNav.classList.contains('open')) {
                    mobileNav.classList.remove('open');
                    menuBtn.textContent = '☰';
                }

                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Simple intersection observer for "reveal" animations
    const observer = new IntersectionObserver((entries) => {
        for (const entry of entries) {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        }
    }, {threshold: 0.12});
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // ✅ NEW LINE: Close mobile nav if resizing above 768px
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && mobileNav.classList.contains('open')) {
            mobileNav.classList.remove('open');   // hide the mobile menu
            menuBtn.textContent = '☰';            // reset the hamburger icon
        }
    });
});

// Basic contact handler (placeholder)
function handleContact(e){
    e.preventDefault();
    alert('Thank you! This is a placeholder contact handler. A real website needs a backend endpoint to process this information.');
    e.target.reset();
    return false;
}


