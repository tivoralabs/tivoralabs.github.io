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

    // script.js (ADD THIS SECTION)

    // --- Modal Logic for Privacy & Terms ---
// --- Modal Logic for Privacy, Terms, and NEW Email Form ---
const privacyModal = document.getElementById('privacy-modal');
const termsModal = document.getElementById('terms-modal');
const emailFormModal = document.getElementById('email-form-modal'); // <-- NEW MODAL REFERENCE
const privacyLink = document.getElementById('privacy-link');
const termsLink = document.getElementById('terms-link');
const emailUsLink = document.getElementById('email-us-link'); // <-- NEW BUTTON REFERENCE
    
const allModals = [privacyModal, emailFormModal];

    // Function to open a modal
    const openModal = (modal) => {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    // Function to close a modal
// Function to close a modal
const closeModal = (modal) => {
modal.style.display = 'none';
document.body.style.overflow = ''; // Re-enable background scrolling
        
        // NEW: Clear the form if the email modal is closed
        if (modal && modal.id === 'email-form-modal') {
            const form = document.getElementById('contact-form-internal');
            if (form) form.reset();
        }
}

    // Click handlers for links
    if (privacyLink) {
        privacyLink.addEventListener('click', (e) => {
            e.preventDefault(); // Stop the default scroll-to-top behavior
            openModal(privacyModal);
        });
    }

    /* if (termsLink) {
    termsLink.addEventListener('click', (e) => {
        e.preventDefault(); 
        openModal(document.getElementById('terms-modal'));
    });
}
*/

    // Click handlers for close button (span class="close-btn")
    allModals.forEach(modal => {
        if (modal) {
            const closeBtn = modal.querySelector('.close-btn');
            if (closeBtn) {
                closeBtn.addEventListener('click', () => closeModal(modal));
            }
        }
    });

   /*
if (termsLink) {
    termsLink.addEventListener('click', (e) => {
        e.preventDefault(); 
        openModal(termsModal);
    });
}
*/

    // NEW: Click handler for 'Email Us Today' to open the form modal
    if (emailUsLink) {
        emailUsLink.addEventListener('click', (e) => {
            e.preventDefault(); 
            openModal(emailFormModal);
        });
    }

// Click handlers for close button (span class="close-btn")
// ... rest of the code continues

    // Close the modal if the user clicks anywhere outside of the modal-content
    window.addEventListener('click', (event) => {
        allModals.forEach(modal => {
            if (event.target === modal) {
                closeModal(modal);
            }
        });
    });

    // Close modal on ESC key press
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            allModals.forEach(modal => {
                if (modal && modal.style.display === 'block') {
                    closeModal(modal);
                }
            });
        }
    });
    // --- End Modal Logic ---
    
// ... rest of the script.js continues from here ...

// --- End Modal Logic ---

    // --- NEW Mailto Form Submission Handler ---
    const contactForm = document.getElementById('contact-form-internal');

    if (contactForm && emailFormModal) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const fromEmail = document.getElementById('modal-from-email').value;
            const subject = document.getElementById('modal-subject').value;
            const message = document.getElementById('modal-message').value;
            const toEmail = 'ping@tivoralabs.com'; // Your company email

            // Construct the mailto link using URL encoding for spaces and special characters
            let mailtoLink = `mailto:${toEmail}`;
            mailtoLink += `?subject=${encodeURIComponent(subject)}`;
            
            // Prepend the user's 'From' email to the message body for context
            const bodyContent = `From: ${fromEmail}\n\n${message}`;
            mailtoLink += `&body=${encodeURIComponent(bodyContent)}`;

            // Open the user's default email client
            window.location.href = mailtoLink;

            // Close the modal (the form will be reset by the closeModal function)
            closeModal(emailFormModal);
        });
    }
    // --- End Mailto Form Submission Handler ---
    
// ... rest of the script.js continues from here ...

// Mobile nav toggle
// ...

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



