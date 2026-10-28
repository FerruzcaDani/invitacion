import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-blessing',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="bendicion" class="section-wrapper blessing-section">
      <div class="section-container">
        
        <!-- Header -->
        <div class="section-header">
          <span class="section-subtitle">Bajo la Gracia Divina</span>
          <h2 class="section-title">Nuestra Unión ante Dios</h2>
          <p class="section-desc">
            "Lo que Dios ha unido con amor y fe, ningún hombre lo separe."
          </p>
        </div>

        <div class="blessing-grid">
          
          <!-- Column 1: Spiritual Symbolism & Parents Blessing -->
          <div class="blessing-text-card wedding-card">
            <div class="religious-cross-icon">
              <!-- Elegant Cross & Ray Vector -->
              <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
                <path d="M12 2v20" />
                <path d="M7 8h10" />
                <circle cx="12" cy="8" r="4" stroke-dasharray="1 2" />
              </svg>
            </div>

            <h3 class="card-heading">Con la Bendición de Dios</h3>
            <p class="card-message">
              Agradecemos al Creador por cruzar nuestros caminos y permitirnos descubrir el amor verdadero. Hoy decidimos consagrarnos en matrimonio y edificar un hogar lleno de paz, respeto y devoción.
            </p>

            <div class="parents-block ad-padrinos">
              <span class="ad-eyebrow">Nos acompañan en esta promesa</span>
              <h4 class="subheading-parents">Padrinos de velación</h4>
              <p class="ad-padrinos-names">Saúl Montaño Camacho <span>&amp;</span> Norma Guadalupe Olvera Bocanegra</p>
            </div>

            <!-- El Lazo Matrimonial Callout -->
            <div class="lazo-container">
              <div class="lazo-icon-wrap">
                <!-- Infinity Lasso SVG with Cross -->
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                  <path d="M18.178 8c5.096 0 5.096 8 0 8-5.095 0-7.083-8-12.178-8-5.096 0-5.096 8 0 8 5.095 0 7.083-8 12.178-8z" />
                  <path d="M12 11v4" />
                  <path d="M10 12.5h4" />
                </svg>
              </div>
              <div class="lazo-info">
                <h5 class="lazo-title">El Lazo de Amor Infinito</h5>
                <p class="lazo-text">
                  El lazo matrimonial que nos envolverá en el altar simboliza la unión invisible y eterna que Dios teje entre nosotros; dos vidas entrelazadas en un solo corazón.
                </p>
              </div>
            </div>
          </div></div>

      </div>
    </section>
  `,
  styles: [`
    .blessing-section {
      background: linear-gradient(180deg, rgba(250,246,240,0.4) 0%, rgba(255,255,255,0.85) 50%, rgba(250,246,240,0.5) 100%);
      position: relative;
    }

    .blessing-grid {
      display: grid;
      grid-template-columns: 1.1fr 0.9fr;
      gap: 40px;
      align-items: center;
    }

    .blessing-text-card {
      padding: 44px 36px;
      text-align: center;
    }

    .religious-cross-icon {
      color: var(--c-cafe);
      margin-bottom: 16px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 64px;
      height: 64px;
      background: var(--c-pistache-subtle);
      border-radius: 50%;
      border: 1px solid var(--c-pistache-light);
    }

    .card-heading {
      font-size: 2.1rem;
      color: var(--c-cafe-deep);
      margin-bottom: 14px;
    }

    .card-message {
      font-size: 1.02rem;
      color: var(--text-muted);
      line-height: 1.7;
      margin-bottom: 28px;
    }

    .parents-block {
      background: var(--c-cream);
      border: 1px solid var(--c-cafe-light);
      border-radius: var(--radius-md);
      padding: 20px 24px;
      margin-bottom: 26px;
    }

    .subheading-parents {
      font-family: var(--font-serif);
      font-size: 1.25rem;
      color: var(--c-cafe-medium);
      text-transform: uppercase;
      letter-spacing: 0.1em;
      margin-bottom: 14px;
    }

    .parents-columns {
      display: flex;
      align-items: center;
      justify-content: space-around;
      gap: 16px;
    }

    .parent-group {
      flex: 1;
    }

    .parent-role {
      display: block;
      font-size: 0.75rem;
      font-weight: 600;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: var(--c-pistache-dark);
      margin-bottom: 4px;
    }

    .parent-names {
      font-family: var(--font-serif);
      font-size: 1.15rem;
      font-weight: 600;
      color: var(--c-cafe-deep);
    }

    .parent-divider {
      width: 1px;
      height: 40px;
      background: var(--c-cafe-light);
    }

    /* Lazo Matrimonial Banner */
    .lazo-container {
      display: flex;
      align-items: flex-start;
      gap: 16px;
      text-align: left;
      background: rgba(141, 168, 126, 0.08);
      border: 1px solid var(--c-pistache-light);
      border-radius: var(--radius-md);
      padding: 18px 20px;
    }

    .lazo-icon-wrap {
      color: var(--c-pistache-dark);
      flex-shrink: 0;
      margin-top: 2px;
    }

    .lazo-title {
      font-family: var(--font-serif);
      font-size: 1.15rem;
      color: var(--c-cafe-deep);
      margin-bottom: 4px;
    }

    .lazo-text {
      font-size: 0.88rem;
      color: var(--text-muted);
      line-height: 1.5;
    }

    /* Photo column */
    .photo-composition {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .photo-frame-decor {
      position: relative;
      border-radius: 28px;
      overflow: hidden;
      border: 8px solid #FFFFFF;
      box-shadow: var(--shadow-lg);
      max-width: 420px;
      width: 100%;
    }

    .ceremony-img {
      width: 100%;
      height: 480px;
      object-fit: cover;
      display: block;
      transition: transform 0.6s ease;
    }

    .ceremony-img:hover {
      transform: scale(1.03);
    }

    .photo-badge-moment {
      position: absolute;
      bottom: 16px;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(255, 255, 255, 0.95);
      border: 1px solid var(--c-cafe-light);
      padding: 6px 18px;
      border-radius: var(--radius-full);
      font-size: 0.76rem;
      font-weight: 600;
      color: var(--c-cafe-dark);
      letter-spacing: 0.08em;
      white-space: nowrap;
      box-shadow: var(--shadow-sm);
    }

    .blessing-verse-tag {
      margin-top: -24px;
      z-index: 2;
      background: #FFFFFF;
      border: 1px solid var(--c-cafe-light);
      border-radius: var(--radius-md);
      padding: 16px 22px;
      max-width: 380px;
      text-align: center;
      box-shadow: var(--shadow-md);
    }

    .tag-quote {
      display: block;
      font-family: var(--font-serif);
      font-style: italic;
      font-size: 0.95rem;
      color: var(--c-cafe-deep);
      line-height: 1.45;
      margin-bottom: 6px;
    }

    .tag-reference {
      font-size: 0.78rem;
      color: var(--c-pistache-dark);
      font-weight: 600;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }

    @media (max-width: 900px) {
      .blessing-grid {
        grid-template-columns: 1fr;
      }
      .ceremony-img {
        height: 380px;
      }
    }
  `]
})
export class BlessingComponent {}
