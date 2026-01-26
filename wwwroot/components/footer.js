class CustomFooter extends HTMLElement {
    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
      <style>
        footer {
          background-color: rgba(15, 23, 42, 0.9);
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          padding: 3rem 0;
        }
        
        .footer-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 2rem;
        }
        
        .footer-section h3 {
          color: #6366f1;
          margin-bottom: 1.5rem;
          font-size: 1.2rem;
        }
        
        .footer-links {
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
        }
        
        .footer-links a {
          color: #f8fafc;
          text-decoration: none;
          transition: color 0.3s ease;
        }
        
        .footer-links a:hover {
          color: #6366f1;
        }
        
        .social-links {
          display: flex;
          gap: 1rem;
          margin-top: 1rem;
        }
        
        .social-links a {
          color: #f8fafc;
          background-color: rgba(255, 255, 255, 0.1);
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }
        
        .social-links a:hover {
          background-color: #6366f1;
          transform: translateY(-3px);
        }
        
        .copyright {
          text-align: center;
          margin-top: 3rem;
          padding-top: 2rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.9rem;
        }
      </style>
      
      <footer>
        <div class="footer-container">
          <div class="footer-section">
            <h3>Quantum Coder</h3>
            <p>Building the future, one line of code at a time.</p>
            <div class="social-links">
              <a href="#"><i data-feather="github"></i></a>
              <a href="#"><i data-feather="twitter"></i></a>
              <a href="#"><i data-feather="linkedin"></i></a>
              <a href="#"><i data-feather="mail"></i></a>
            </div>
          </div>
          
          <div class="footer-section">
            <h3>Quick Links</h3>
            <div class="footer-links">
              <a href="#about">About</a>
              <a href="#projects">Projects</a>
              <a href="#experience">Experience</a>
              <a href="#technologies">Technologies</a>
            </div>
          </div>
          
          <div class="footer-section">
            <h3>Resources</h3>
            <div class="footer-links">
              <a href="#">Blog</a>
              <a href="#">Tutorials</a>
              <a href="#">Open Source</a>
              <a href="#">Research</a>
            </div>
          </div>
          
          <div class="footer-section">
            <h3>Contact</h3>
            <div class="footer-links">
              <a href="mailto:hello@quantumcoder.dev">hello@quantumcoder.dev</a>
              <a href="tel:+1234567890">+1 (234) 567-890</a>
            </div>
          </div>
        </div>
        
        <div class="copyright">
          &copy; ${new Date().getFullYear()} Quantum Coder. All rights reserved.
        </div>
      </footer>
    `;
    }
}

customElements.define('custom-footer', CustomFooter);