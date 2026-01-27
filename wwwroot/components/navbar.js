class CustomNavbar extends HTMLElement {
    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
      <style>
        nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          backdrop-filter: blur(10px);
          background-color: rgba(15, 23, 42, 0.8);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .nav-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 1rem 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .logo {
          font-size: 1.5rem;
          font-weight: bold;
          background: linear-gradient(to right, #6366f1, #10b981);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        
        .nav-links {
          display: flex;
          gap: 2rem;
        }
        
        .nav-links a {
          color: #f8fafc;
          text-decoration: none;
          font-weight: 500;
          transition: all 0.3s ease;
          position: relative;
        }
        
        .nav-links a:hover {
          color: #6366f1;
        }
        
        .nav-links a.active {
          color: #6366f1;
        }
        
        .nav-links a.active::after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 0;
          width: 100%;
          height: 2px;
          background: linear-gradient(to right, #6366f1, #10b981);
        }
        
        .mobile-menu-btn {
          display: none;
          background: none;
          border: none;
          color: #f8fafc;
          cursor: pointer;
        }
        
        @media (max-width: 768px) {
          .nav-links {
            position: fixed;
            top: 70px;
            left: 0;
            right: 0;
            background-color: rgba(15, 23, 42, 0.95);
            flex-direction: column;
            align-items: center;
            padding: 2rem 0;
            gap: 1.5rem;
            clip-path: circle(0px at 90% -10%);
            transition: clip-path 0.5s ease-in-out;
          }
          
          .nav-links.open {
            clip-path: circle(1000px at 90% -10%);
          }
          
          .mobile-menu-btn {
            display: block;
          }
        }
      </style>
      
      <nav>
        <div class="nav-container">
<a href="#home" class="logo" style="display: flex; align-items: center; gap: 0.5rem;">
  <img src="logo.png" alt="Logo" style="height: 32px; width: 32px; object-fit: contain;">
  Imen Jouini
</a>
          <button class="mobile-menu-btn">
            <i data-feather="menu"></i>
          </button>
          
          <div class="nav-links">
            <a href="#about">About</a>
            <a href="#projects">Projects</a>
            <a href="#experience">Experience</a>
            <a href="#technologies">Technologies</a>
            <a href="#education">Education</a>
            <a href="#honors">Honors</a>
          </div>
        </div>
      </nav>
    `;

        // Mobile menu toggle
        const mobileMenuBtn = this.shadowRoot.querySelector('.mobile-menu-btn');
        const navLinks = this.shadowRoot.querySelector('.nav-links');

        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('open');
            const icon = mobileMenuBtn.querySelector('i');
            if (navLinks.classList.contains('open')) {
                icon.setAttribute('data-feather', 'x');
            } else {
                icon.setAttribute('data-feather', 'menu');
            }
            feather.replace();
        });
    }
}

customElements.define('custom-navbar', CustomNavbar);