import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface LocationCard {
  title: string;
  placeName: string;
  time: string;
  address: string;
  icon: string;
  badge: string;
  description: string;
  mapsUrl: string;
}

@Component({
  selector: 'app-locations',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="itinerario" class="section-wrapper locations-section">
      <div class="section-container">
        <div class="section-header">
          <span class="section-subtitle">El día, paso a paso</span>
          <h2 class="section-title">Cómo llegar</h2>
          <p class="section-desc">
            Horarios, lugares y rutas para acompañarnos en cada momento.
          </p>
        </div>

        <div class="locations-grid">
          <article *ngFor="let loc of locations; let i = index" class="location-card wedding-card">
            <div class="loc-topline">
              <span class="loc-number">0{{ i + 1 }}</span>
              <span class="loc-badge">{{ loc.badge }}</span>
            </div>

            <div class="loc-heading-row">
              <span class="loc-icon" aria-hidden="true">{{ loc.icon }}</span>
              <div>
                <p class="loc-time">{{ loc.time }}</p>
                <h3 class="loc-title">{{ loc.title }}</h3>
              </div>
            </div>

            <p class="loc-description">{{ loc.description }}</p>

            <div class="loc-place">
              <h4 class="loc-placename">{{ loc.placeName }}</h4>
              <p class="loc-address">{{ loc.address }}</p>
            </div>

            <a
              [href]="loc.mapsUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="btn-location btn-maps"
              [attr.aria-label]="'Abrir ' + loc.placeName + ' en Google Maps'"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              Abrir en Google Maps
              <span class="btn-arrow" aria-hidden="true">↗</span>
            </a>
          </article>
        </div>

        <p class="locations-note">
          Agradecemos su puntualidad para disfrutar juntos de cada instante.
        </p>
      </div>
    </section>
  `,
  styles: [`
    .locations-section {
      background: linear-gradient(180deg, var(--c-cream), var(--c-hueso));
    }

    .locations-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 28px;
      max-width: 980px;
      margin: 0 auto;
    }

    .location-card {
      display: flex;
      flex-direction: column;
      align-items: stretch;
      padding: 34px;
      text-align: left;
      overflow: hidden;
    }

    .loc-topline {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      padding-bottom: 18px;
      border-bottom: 1px solid rgba(87, 99, 77, 0.18);
    }

    .loc-number {
      font: italic 1.55rem var(--font-serif);
      color: #899577;
    }

    .loc-badge {
      color: var(--c-pistache-dark);
      font-size: 0.68rem;
      font-weight: 700;
      letter-spacing: 0.13em;
      text-transform: uppercase;
    }

    .loc-heading-row {
      display: flex;
      align-items: center;
      gap: 18px;
      padding: 28px 0 18px;
    }

    .loc-icon {
      width: 54px;
      height: 54px;
      flex: 0 0 54px;
      display: grid;
      place-items: center;
      border-radius: 50%;
      background: #eef1e8;
      border: 1px solid #d5dccb;
      font-size: 1.45rem;
      box-shadow: 0 10px 24px rgba(68, 77, 57, 0.1);
    }

    .loc-time {
      margin: 0 0 2px;
      color: #6f7a61;
      font-size: 0.72rem;
      font-weight: 700;
      letter-spacing: 0.15em;
      text-transform: uppercase;
    }

    .loc-title {
      margin: 0;
      color: var(--c-cafe-deep);
      font-size: clamp(1.9rem, 3vw, 2.45rem);
      font-weight: 400;
      line-height: 1;
    }

    .loc-description {
      min-height: 54px;
      margin-bottom: 22px;
      color: var(--text-muted);
      font: italic 1.02rem/1.6 var(--font-serif);
    }

    .loc-place {
      padding: 18px 0;
      border-top: 1px solid rgba(87, 99, 77, 0.13);
    }

    .loc-placename {
      margin-bottom: 4px;
      color: var(--c-cafe-deep);
      font: 600 0.95rem/1.45 var(--font-sans);
    }

    .loc-address {
      margin: 0;
      color: var(--text-muted);
      font-size: 0.86rem;
    }

    .btn-location {
      width: fit-content;
      min-height: 50px;
      margin-top: auto;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      padding: 13px 22px;
      border: 1px solid rgba(255, 255, 255, 0.55);
      border-radius: 999px;
      color: #fff;
      background: linear-gradient(135deg, #718064, #4f5f45);
      box-shadow: 0 12px 26px rgba(67, 81, 56, 0.22), inset 0 1px rgba(255, 255, 255, 0.24);
      font-size: 0.78rem;
      font-weight: 600;
      letter-spacing: 0.035em;
      text-decoration: none;
      transition: transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease;
    }

    .btn-location:hover,
    .btn-location:focus-visible {
      transform: translateY(-3px);
      background: linear-gradient(135deg, #7f8e72, #586a4e);
      box-shadow: 0 17px 34px rgba(67, 81, 56, 0.28), inset 0 1px rgba(255, 255, 255, 0.3);
    }

    .btn-arrow {
      font-size: 1rem;
      transition: transform 0.25s ease;
    }

    .btn-location:hover .btn-arrow {
      transform: translate(2px, -2px);
    }

    .locations-note {
      max-width: 650px;
      margin: 42px auto 0;
      text-align: center;
      color: #666d5c;
      font: italic 1.05rem var(--font-serif);
    }

    @media (max-width: 760px) {
      .locations-grid {
        grid-template-columns: 1fr;
        max-width: 520px;
      }

      .location-card {
        padding: 28px 24px;
      }

      .loc-description {
        min-height: 0;
      }

      .btn-location {
        width: 100%;
      }
    }
  `]
})
export class LocationsComponent {
  locations: LocationCard[] = [
    {
      time: '1:00 PM',
      title: 'Misa',
      placeName: 'Templo Santa María de Guadalupe',
      address: 'La Magdalena',
      icon: '⛪',
      badge: 'Ceremonia religiosa',
      description: 'Acompáñanos a celebrar nuestra unión ante Dios.',
      mapsUrl: 'https://maps.app.goo.gl/heEoERYFzHa3ndyH7',
    },
    {
      time: '2:30 PM',
      title: 'Recepción',
      placeName: 'Jardín de eventos Mauri',
      address: 'Tequisquiapan, Querétaro',
      icon: '🥂',
      badge: 'Nuestra celebración',
      description: 'Después de la ceremonia, celebraremos juntos este nuevo comienzo.',
      mapsUrl: 'https://maps.app.goo.gl/pztYCyPw3CQk98e88',
    },
  ];
}
