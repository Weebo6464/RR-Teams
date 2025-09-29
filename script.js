// Team Members Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling for any internal links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
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

    // Add loading animation observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all member cards for animation
    const memberCards = document.querySelectorAll('.member-card');
    memberCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Add click handlers for social links (placeholder functionality)
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#') {
                e.preventDefault();
                // You can add actual social media links here
                console.log(`Opening ${this.textContent} profile...`);
            }
        });
    });

    // Add click handlers for friend code links
    const fcLinks = document.querySelectorAll('.fc-link');
    fcLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#') {
                e.preventDefault();
                // Copy friend code to clipboard functionality
                const fcText = this.textContent.replace('FC: ', '');
                if (navigator.clipboard) {
                    navigator.clipboard.writeText(fcText).then(() => {
                        // Show temporary feedback
                        const originalText = this.textContent;
                        this.textContent = 'Copied!';
                        this.style.background = 'rgba(34, 197, 94, 0.2)';
                        this.style.color = '#22c55e';
                        this.style.borderColor = 'rgba(34, 197, 94, 0.3)';
                        
                        setTimeout(() => {
                            this.textContent = originalText;
                            this.style.background = '';
                            this.style.color = '';
                            this.style.borderColor = '';
                        }, 2000);
                    });
                }
            }
        });
    });

    // Add hover effects for enhanced interactivity
    memberCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Console welcome message
    console.log('🎮 Retro Rewind Team Page loaded successfully!');
    console.log('💡 Tip: Click on Friend Codes to copy them to clipboard');
});

// Utility function to update member information
function updateMemberInfo(memberName, newInfo) {
    const memberCards = document.querySelectorAll('.member-card');
    memberCards.forEach(card => {
        const nameElement = card.querySelector('.member-name');
        if (nameElement && nameElement.textContent.includes(memberName)) {
            // Update member information
            if (newInfo.role) {
                card.querySelector('.member-role').textContent = newInfo.role;
            }
            if (newInfo.friendCode) {
                card.querySelector('.fc-link').textContent = `FC: ${newInfo.friendCode}`;
            }
            if (newInfo.avatar) {
                card.querySelector('.member-avatar img').src = newInfo.avatar;
            }
        }
    });
}

// Function to add new team member dynamically
function addTeamMember(sectionTitle, memberData) {
    const sections = document.querySelectorAll('.team-section');
    let targetSection = null;
    
    sections.forEach(section => {
        const title = section.querySelector('.section-title');
        if (title && title.textContent === sectionTitle) {
            targetSection = section;
        }
    });
    
    if (targetSection && memberData) {
        const grid = targetSection.querySelector('.team-grid');
        const memberCard = createMemberCard(memberData);
        grid.appendChild(memberCard);
    }
}

// Helper function to create member card HTML
function createMemberCard(data) {
    const card = document.createElement('div');
    card.className = 'member-card';
    
    const socialLinksHTML = data.socials ? data.socials.map(social => 
        `<a href="${social.url || '#'}" class="social-link ${social.type}">${social.name}</a>`
    ).join('') : '';
    
    card.innerHTML = `
        <div class="member-avatar">
            <img src="${data.avatar || 'https://via.placeholder.com/80x80/1f2937/ffffff?text=' + data.name.charAt(0)}" alt="${data.name}">
        </div>
        <div class="member-info">
            <h3 class="member-name">${data.name}</h3>
            <p class="member-role">${data.role}</p>
            <div class="member-links">
                <a href="#" class="fc-link">FC: ${data.friendCode || '[Friend Code]'}</a>
                <div class="social-links">
                    ${socialLinksHTML}
                </div>
            </div>
        </div>
    `;
    
    return card;
}