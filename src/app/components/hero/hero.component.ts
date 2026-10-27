import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="hero-section">
      <!-- Ambient Glow Ornaments -->
      <div class="ambient-glow glow-1"></div>
      <div class="ambient-glow glow-2"></div>

      <div class="hero-content">
        <!-- Monogram Badge -->
        <div class="monogram-wrapper animate-float">
          <div class="monogram-ring">
            <span class="monogram-text">A & D</span>
          </div>
        </div>

        <div class="wedding-announcement">
          <span class="hero-pretitle">Con la bendición de Dios y de nuestras familias</span>
          <h1 class="hero-names">Alan <span class="ampersand">&</span> Dany</h1>
          <p class="hero-invitation">
            "Queremos que formes parte de nuestra gran boda"
          </p>
        </div>

        <!-- Hero Photo Frame with Arch & Botanical Elegance -->
        <div class="hero-photo-container">
          <div class="photo-arch-frame">
            <img
              src="images/alan-dany-portrait.jpg"
              alt="Alan y Dany sonriendo juntos"
              class="hero-couple-img"
              loading="eager"
            />
            <div class="photo-overlay-gradient"></div>
            <div class="photo-caption-badge">
              <span>¡Nuestra Historia Comienza Aquí!</span>
            </div>
          </div>
          <!-- Decorative Floral Leaves SVG -->
          <div class="leaf-ornament leaf-left">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2">
              <path d="M12 2C7 5 4 10 4 16c0 3.5 2.5 6 6 6s6-2.5 6-6c0-6-3-11-8-14z" />
              <path d="M12 2v20" />
            </svg>
          </div>
          <div class="leaf-ornament leaf-right">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2">
              <path d="M12 2C7 5 4 10 4 16c0 3.5 2.5 6 6 6s6-2.5 6-6c0-6-3-11-8-14z" />
              <path d="M12 2v20" />
            </svg>
          </div>
        </div>

        <!-- Date and Location Teaser -->
        <div class="event-teaser">
          <div class="date-badge">
            <span class="date-day">SÁBADO</span>
            <span class="date-number">19</span>
            <span class="date-month">DICIEMBRE 2026</span>
          </div>
        </div>

        <!-- Real-Time Countdown Timer -->
        <div class="countdown-container">
          <div class="countdown-title">Faltan para el gran día:</div>
          <div class="countdown-grid">
            <div class="countdown-box">
              <span class="countdown-num">{{ days() }}</span>
              <span class="countdown-label">Días</span>
            </div>
            <div class="countdown-sep">:</div>
            <div class="countdown-box">
              <span class="countdown-num">{{ hours() }}</span>
              <span class="countdown-label">Horas</span>
            </div>
            <div class="countdown-sep">:</div>
            <div class="countdown-box">
              <span class="countdown-num">{{ minutes() }}</span>
              <span class="countdown-label">Min</span>
            </div>
            <div class="countdown-sep">:</div>
            <div class="countdown-box">
              <span class="countdown-num">{{ seconds() }}</span>
              <span class="countdown-label">Seg</span>
            </div>
          </div>
        </div>

        <!-- Call to Action Buttons -->
        <div class="hero-actions">
          <a href="#itinerario" class="btn-secondary">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            Ver Itinerario
          </a>
        </div>

        <!-- Gentle Scroll Down Indicator -->
        <a href="#bendicion" class="scroll-down-indicator" title="Desliza para explorar">
          <span class="scroll-text">Desliza para conocer más</span>
          <div class="mouse-icon">
            <div class="wheel"></div>
          </div>
        </a>
      </div>
    </header>
  `,
  styles: [`
    .hero-section {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      padding: 60px 20px 70px;
      overflow: hidden;
      background: radial-gradient(ellipse at 50% 20%, rgba(255,255,255,0.95) 0%, rgba(250,246,240,0.85) 60%, rgba(243,236,225,0.7) 100%);
    }

    .ambient-glow {
      position: absolute;
      width: 450px;
      height: 450px;
      border-radius: 50%;
      filter: blur(80px);
      pointer-events: none;
      z-index: 0;
    }

    .glow-1 {
      top: -100px;
      left: 10%;
      background: rgba(201, 217, 195, 0.28);
    }

    .glow-2 {
      bottom: -80px;
      right: 10%;
      background: rgba(196, 164, 124, 0.22);
    }

    .hero-content {
      position: relative;
      z-index: 1;
      max-width: 760px;
      width: 100%;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    /* Monogram */
    .monogram-wrapper {
      margin-bottom: 24px;
    }

    .monogram-ring {
      width: 70px;
      height: 70px;
      border-radius: 50%;
      border: 1.5px solid var(--c-cafe);
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(255, 255, 255, 0.9);
      box-shadow: 0 4px 18px rgba(196, 164, 124, 0.2);
      position: relative;
    }

    .monogram-ring::after {
      content: '';
      position: absolute;
      inset: -4px;
      border: 1px dashed var(--c-pistache);
      border-radius: 50%;
    }

    .monogram-text {
      font-family: var(--font-serif);
      font-size: 1.35rem;
      font-weight: 600;
      color: var(--c-cafe-dark);
      letter-spacing: 0.1em;
    }

    /* Announcement */
    .hero-pretitle {
      font-family: var(--font-serif);
      font-size: 1.15rem;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: var(--c-pistache-dark);
      display: block;
      margin-bottom: 12px;
    }

    .hero-names {
      font-family: var(--font-serif);
      font-size: 4.4rem;
      font-weight: 400;
      color: var(--c-cafe-deep);
      line-height: 1.05;
      letter-spacing: 0.04em;
      margin-bottom: 14px;
    }

    .ampersand {
      font-family: var(--font-script);
      font-size: 4.8rem;
      color: var(--c-cafe);
      font-weight: normal;
      vertical-align: middle;
      display: inline-block;
      margin: 0 8px;
    }

    .hero-invitation {
      font-family: var(--font-serif);
      font-size: 1.45rem;
      font-style: italic;
      color: var(--c-cafe-medium);
      max-width: 520px;
      margin: 0 auto 30px;
      line-height: 1.4;
    }

    /* Photo Frame */
    .hero-photo-container {
      position: relative;
      margin-bottom: 34px;
    }

    .photo-arch-frame {
      width: 270px;
      height: 360px;
      border-top-left-radius: 140px;
      border-top-right-radius: 140px;
      border-bottom-left-radius: 20px;
      border-bottom-right-radius: 20px;
      overflow: hidden;
      border: 6px solid #FFFFFF;
      box-shadow: var(--shadow-lg), 0 0 0 1px var(--c-cafe-light);
      position: relative;
    }

    .hero-couple-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center 20%;
      transition: transform 0.6s ease;
    }

    .hero-couple-img:hover {
      transform: scale(1.04);
    }

    .photo-overlay-gradient {
      position: absolute;
      inset: 0;
      background: linear-gradient(to top, rgba(74, 53, 30, 0.4) 0%, transparent 40%);
      pointer-events: none;
    }

    .photo-caption-badge {
      position: absolute;
      bottom: 14px;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(255, 255, 255, 0.94);
      backdrop-filter: blur(6px);
      padding: 5px 14px;
      border-radius: var(--radius-full);
      font-size: 0.72rem;
      font-weight: 600;
      color: var(--c-cafe-dark);
      letter-spacing: 0.08em;
      text-transform: uppercase;
      white-space: nowrap;
      border: 1px solid var(--c-cafe-light);
    }

    .leaf-ornament {
      position: absolute;
      top: 45%;
      color: var(--c-pistache);
      opacity: 0.8;
      pointer-events: none;
    }

    .leaf-left {
      left: -48px;
      transform: translateY(-50%) rotate(-30deg);
    }

    .leaf-right {
      right: -48px;
      transform: translateY(-50%) rotate(30deg) scaleX(-1);
    }

    /* Event Teaser Date */
    .event-teaser {
      margin-bottom: 28px;
    }

    .date-badge {
      display: inline-flex;
      align-items: center;
      gap: 16px;
      background: #FFFFFF;
      border: 1px solid var(--c-cafe-light);
      padding: 10px 24px;
      border-radius: var(--radius-full);
      box-shadow: var(--shadow-sm);
    }

    .date-day, .date-month {
      font-size: 0.82rem;
      font-weight: 600;
      letter-spacing: 0.14em;
      color: var(--c-cafe-dark);
    }

    .date-number {
      font-family: var(--font-serif);
      font-size: 1.8rem;
      font-weight: 700;
      color: var(--c-cafe);
      line-height: 1;
      padding: 0 4px;
      border-left: 1px solid var(--c-cafe-light);
      border-right: 1px solid var(--c-cafe-light);
    }

    /* Countdown */
    .countdown-container {
      background: rgba(255, 255, 255, 0.85);
      border: 1px solid rgba(196, 164, 124, 0.3);
      backdrop-filter: blur(10px);
      padding: 22px 28px;
      border-radius: var(--radius-lg);
      margin-bottom: 34px;
      width: 100%;
      max-width: 480px;
      box-shadow: var(--shadow-md);
    }

    .countdown-title {
      font-family: var(--font-serif);
      font-size: 1rem;
      color: var(--c-cafe-medium);
      font-style: italic;
      margin-bottom: 12px;
    }

    .countdown-grid {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
    }

    .countdown-box {
      display: flex;
      flex-direction: column;
      align-items: center;
      background: var(--c-cream);
      border: 1px solid var(--c-cafe-light);
      border-radius: var(--radius-md);
      padding: 8px 14px;
      min-width: 64px;
    }

    .countdown-num {
      font-family: var(--font-serif);
      font-size: 1.8rem;
      font-weight: 600;
      color: var(--c-cafe-deep);
      line-height: 1.1;
    }

    .countdown-label {
      font-size: 0.68rem;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: var(--text-light);
      margin-top: 2px;
    }

    .countdown-sep {
      font-size: 1.3rem;
      font-weight: 600;
      color: var(--c-cafe);
      margin-top: -12px;
    }

    /* Actions */
    .hero-actions {
      display: flex;
      flex-wrap: wrap;
      gap: 14px;
      justify-content: center;
      margin-bottom: 40px;
    }

    /* Scroll Indicator */
    .scroll-down-indicator {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      text-decoration: none;
      color: var(--text-light);
      transition: color 0.3s ease;
      cursor: pointer;
    }

    .scroll-down-indicator:hover {
      color: var(--c-cafe);
    }

    .scroll-text {
      font-size: 0.76rem;
      letter-spacing: 0.12em;
      text-transform: uppercase;
    }

    .mouse-icon {
      width: 22px;
      height: 34px;
      border: 1.5px solid var(--c-cafe-medium);
      border-radius: 12px;
      display: flex;
      justify-content: center;
      padding-top: 6px;
    }

    .wheel {
      width: 3px;
      height: 7px;
      background: var(--c-cafe);
      border-radius: 2px;
      animation: mouseWheel 1.8s infinite;
    }

    @keyframes mouseWheel {
      0% { opacity: 1; transform: translateY(0); }
      100% { opacity: 0; transform: translateY(12px); }
    }

    @media (max-width: 640px) {
      .hero-names {
        font-size: 3.2rem;
      }
      .ampersand {
        font-size: 3.4rem;
      }
      .photo-arch-frame {
        width: 230px;
        height: 310px;
      }
      .leaf-ornament {
        display: none;
      }
      .countdown-box {
        min-width: 52px;
        padding: 6px 8px;
      }
      .countdown-num {
        font-size: 1.4rem;
      }
    }
  `]
})
export class HeroComponent implements OnInit, OnDestroy {
  protected readonly days = signal('00');
  protected readonly hours = signal('00');
  protected readonly minutes = signal('00');
  protected readonly seconds = signal('00');

  private timerInterval: any;
  // Target wedding date: December 19, 2026 (Mexico City, UTC-6)
  private targetDate = new Date('2026-12-19T13:00:00-06:00');

  ngOnInit(): void {
    // Shared progressive enhancement also used by the local static preview.
    // Public assets are copied by Angular on every subsequent build.
    if (typeof document !== 'undefined' && !document.querySelector('script[data-ad-experience]')) {
      const script = document.createElement('script');
      script.src = 'experience.js';
      script.dataset['adExperience'] = 'true';
      document.body.appendChild(script);
    }
    this.updateCountdown();
    this.timerInterval = setInterval(() => this.updateCountdown(), 1000);
  }

  ngOnDestroy(): void {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }

  private updateCountdown(): void {
    const now = new Date().getTime();
    const distance = this.targetDate.getTime() - now;

    if (distance <= 0) {
      this.days.set('00');
      this.hours.set('00');
      this.minutes.set('00');
      this.seconds.set('00');
      return;
    }

    const d = Math.floor(distance / (1000 * 60 * 60 * 24));
    const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((distance % (1000 * 60)) / 1000);

    this.days.set(d.toString().padStart(2, '0'));
    this.hours.set(h.toString().padStart(2, '0'));
    this.minutes.set(m.toString().padStart(2, '0'));
    this.seconds.set(s.toString().padStart(2, '0'));
  }
}
