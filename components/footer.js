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
        .social-links svg {
          width: 20px;
          height: 20px;
          fill: currentColor;
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
            <h3>Imen Jouini</h3>
            <p>Building the future, one line of code at a time.</p>
            <div class="social-links">
              <!-- GitHub -->
              <a href="https://github.com/ImenJ16" target="_blank" aria-label="GitHub">
                <svg viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.02c-3.34.73-4.04-1.61-4.04-1.61-.55-1.41-1.35-1.78-1.35-1.78-1.1-.76.08-.75.08-.75 1.21.08 1.85 1.24 1.85 1.24 1.08 1.85 2.83 1.32 3.52 1.01.11-.78.42-1.32.76-1.62-2.66-.3-5.46-1.33-5.46-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.17 0 0 1-.32 3.3 1.23a11.44 11.44 0 0 1 6 0c2.3-1.55 3.3-1.23 3.3-1.23.66 1.65.24 2.87.12 3.17.77.84 1.24 1.91 1.24 3.22 0 4.61-2.8 5.62-5.47 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.21.69.82.57C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"/>
                </svg>
              </a>
              <!-- Facebook -->
              <a href="https://www.facebook.com/ymen.juiny.3" target="_blank" aria-label="Facebook">
                <svg viewBox="0 0 24 24">
                  <path d="M22.675 0H1.325C.593 0 0 .593 0 1.326v21.348C0 23.407.593 24 1.325 24h11.495v-9.294H9.691v-3.622h3.129V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.464.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.716-1.795 1.764v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.324-.593 1.324-1.326V1.326C24 .593 23.407 0 22.675 0z"/>
                </svg>
              </a>
              <!-- LinkedIn -->
              <a href="https://www.linkedin.com/in/imen-jouini-1908b4234/" target="_blank" aria-label="LinkedIn">
                <svg viewBox="0 0 448 512">
                  <path d="M100.28 448H7.4V148.9h92.88zm-46.44-340.6C24.12 107.4 0 83.34 0 53.56 0 23.78 24.12 0 53.84 0c29.66 0 53.84 23.78 53.84 53.56 0 29.78-24.18 53.84-53.84 53.84zM447.9 448h-92.68V302.4c0-34.7-.7-79.3-48.35-79.3-48.35 0-55.7 37.8-55.7 76.8V448H158.9V148.9h89.04v40.8h1.3c12.4-23.4 42.64-48.3 87.72-48.3 93.84 0 111.2 61.8 111.2 142.3V448z"/>
                </svg>
              </a>
           <!-- WhatsApp -->
<a href="https://wa.me/21697534723" target="_blank" aria-label="WhatsApp">
  <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M20.52 3.48A11.88 11.88 0 0012 0C5.373 0 0 5.373 0 12c0 2.113.552 4.077 1.512 5.798L0 24l6.343-1.65A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12 0-3.198-1.248-6.208-3.48-8.52zM12 21.818c-1.89 0-3.696-.515-5.222-1.482l-.374-.227-3.78.984.989-3.678-.243-.386A9.826 9.826 0 012.182 12C2.182 6.4 6.398 2.182 12 2.182S21.818 6.4 21.818 12 17.602 21.818 12 21.818zm5.454-7.636c-.3-.15-1.77-.872-2.045-.97-.274-.1-.474-.15-.674.15-.2.3-.774.97-.949 1.167-.174.2-.35.225-.65.075-.3-.15-1.263-.465-2.404-1.48-.888-.792-1.486-1.767-1.66-2.067-.174-.3-.018-.462.132-.612.136-.135.3-.35.45-.525.15-.175.2-.3.3-.5.1-.2.05-.375-.025-.525-.075-.15-.674-1.625-.925-2.225-.243-.575-.492-.5-.674-.51-.174-.01-.375-.012-.575-.012s-.525.075-.8.375c-.274.3-1.05 1.025-1.05 2.5s1.075 2.9 1.225 3.1c.15.2 2.1 3.2 5.1 4.488.712.3 1.265.478 1.7.612.713.22 1.36.19 1.87.115.572-.085 1.77-.724 2.018-1.425.25-.7.25-1.3.174-1.425-.075-.125-.274-.2-.575-.35z"/>
  </svg>
</a>

              <!-- Mail -->
              <a href="mailto:jouini.ymen@gmail.com" target="_blank" aria-label="Email">
                <svg viewBox="0 0 24 24">
                  <path d="M12 13.065L0 6V18h24V6l-12 7.065zm0-2.13L24 4H0l12 6.935z"/>
                </svg>
              </a>
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
              <a href="https://www.facebook.com/innovbiomed">Biomed Innov</a>
              <a href="https://www.facebook.com/StellifyCorporation">Stellify</a>
              <a href="https://www.youtube.com/watch?v=L1KB_SxjKso">Bal des projets</a>
            </div>
          </div>
          
          <div class="footer-section">
            <h3>Contact</h3>
            <div class="footer-links">
              <a href="mailto:jouini.ymen@gmail.com">jouini.ymen@gmail.com</a>
              <a href="mailto:jouini.imen@esprit.tn">jouini.imen@esprit.tn</a>
              <a href="tel:+216 97 534 723">+216 97 534 723</a>
            </div>
          </div>
        </div>
        
        <div class="copyright">
          &copy; ${new Date().getFullYear()} Imen Jouini. All rights reserved.
        </div>
      </footer>
    `;
    }
}

customElements.define('custom-footer', CustomFooter);
