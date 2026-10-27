import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="wedding-footer">
      <div class="footer-container">
        
        <h3 class="footer-title">Alan & Dany</h3>
        <p class="footer-message">
          "El amor no se acaba jamás. Gracias de todo corazón por acompañarnos en este comienzo de una eternidad juntos."
        </p>

        <div class="footer-date-badge">
          <span>19 • DICIEMBRE • 2026</span>
        </div>

        <div class="footer-ornament">
          <svg width="120" height="20" viewBox="0 0 120 20" fill="none">
            <path d="M0 10 H45 M75 10 H120" stroke="var(--c-cafe-light)" stroke-width="1"/>
            <circle cx="60" cy="10" r="4" fill="var(--c-pistache)"/>
            <circle cx="50" cy="10" r="2.5" fill="var(--c-cafe)"/>
            <circle cx="70" cy="10" r="2.5" fill="var(--c-cafe)"/>
          </svg>
        </div>

        <p class="footer-credits">
          Hecho con amor para la Boda de Alan & Dany &bull; 2026
        </p>

      </div>
    </footer>
  `,
  styles: [`
    .wedding-footer {
      background: #FFFFFF;
      border-top: 1px solid var(--c-cafe-light);
      padding: 70px 24px 50px;
      text-align: center;
      position: relative;
    }

    .footer-container {
      max-width: 600px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .footer-title {
      font-family: var(--font-serif);
      font-size: 2.5rem;
      color: var(--c-cafe-deep);
      margin-bottom: 12px;
      letter-spacing: 0.04em;
    }

    .footer-message {
      font-family: var(--font-serif);
      font-size: 1.1rem;
      font-style: italic;
      color: var(--text-muted);
      line-height: 1.6;
      margin-bottom: 24px;
    }

    .footer-date-badge {
      background: var(--c-pistache-subtle);
      border: 1px solid var(--c-pistache-light);
      color: var(--c-pistache-dark);
      padding: 6px 20px;
      border-radius: var(--radius-full);
      font-size: 0.8rem;
      font-weight: 700;
      letter-spacing: 0.14em;
      margin-bottom: 24px;
    }

    .footer-ornament {
      margin-bottom: 20px;
    }

    .footer-credits {
      font-size: 0.8rem;
      color: var(--text-light);
      letter-spacing: 0.04em;
    }
  `]
})
export class FooterComponent {}
