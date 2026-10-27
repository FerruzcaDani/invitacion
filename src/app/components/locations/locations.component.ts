import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface LocationCard {
  title: string;
  placeName: string;
  time: string;
  address: string;
  icon: string;
  badge: string;
  mapsUrl: string;
  wazeUrl: string;
}

@Component({
  selector: 'app-locations',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="ubicaciones" class="section-wrapper locations-section">
      <div class="section-container">

        <div class="section-header">
          <span class="section-subtitle">¿Dónde & Cuándo?</span>
          <h2 class="section-title">Ubicaciones</h2>
          <p class="section-desc">
            Les compartimos los lugares donde celebraremos este gran acontecimiento.
          </p>
        </div>

        <div class="locations-grid">
          <div *ngFor="let loc of locations" class="location-card wedding-card">
            
            <div class="loc-badge-wrap">
              <span class="loc-badge">{{ loc.badge }}</span>
            </div>

            <div class="loc-icon-bubble">
              <span class="loc-icon">{{ loc.icon }}</span>
            </div>

            <h3 class="loc-title">{{ loc.title }}</h3>
            <h4 class="loc-placename">{{ loc.placeName }}</h4>

            <div class="loc-time-tag">
              <span class="clock-icon">🕒</span>
              <span>{{ loc.time }}</span>
            </div>

            <p class="loc-address">
              {{ loc.address }}
            </p>

            <div class="loc-btn-group">
              <a [href]="loc.mapsUrl" target="_blank" rel="noopener noreferrer" class="btn-location btn-maps">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                Google Maps
              </a>
            </div>

          </div>
        </div>

      </div>
    </section>
  `,
  styles: [`
    .locations-section {
      background-color: var(--c-hueso);
    }

    .locations-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 36px;
      max-width: 960px;
      margin: 0 auto;
    }

    .location-card {
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 42px 32px 36px;
    }

    .loc-badge-wrap {
      margin-bottom: 18px;
    }

    .loc-badge {
      background: var(--c-pistache-subtle);
      color: var(--c-pistache-dark);
      border: 1px solid var(--c-pistache-light);
      padding: 5px 16px;
      border-radius: var(--radius-full);
      font-size: 0.76rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }

    .loc-icon-bubble {
      width: 72px;
      height: 72px;
      border-radius: 50%;
      background: var(--c-cream);
      border: 2px solid var(--c-cafe-light);
      box-shadow: 0 6px 18px rgba(196, 164, 124, 0.15);
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 20px;
    }

    .loc-icon {
      font-size: 2rem;
    }

    .loc-title {
      font-size: 2.1rem;
      color: var(--c-cafe-deep);
      margin-bottom: 4px;
    }

    .loc-placename {
      font-family: var(--font-sans);
      font-size: 1.05rem;
      font-weight: 600;
      color: var(--c-cafe-medium);
      margin-bottom: 12px;
    }

    .loc-time-tag {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: #FFFFFF;
      border: 1px solid var(--c-cafe-light);
      padding: 4px 14px;
      border-radius: var(--radius-full);
      font-size: 0.82rem;
      font-weight: 600;
      color: var(--c-cafe-dark);
      margin-bottom: 16px;
    }

    .loc-address {
      font-size: 0.94rem;
      color: var(--text-muted);
      line-height: 1.55;
      margin-bottom: 28px;
      max-width: 320px;
      min-height: 48px;
    }

    .loc-btn-group {
      display: flex;
      gap: 12px;
      width: 100%;
      max-width: 340px;
    }

    .btn-location {
      flex: 1;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 12px 16px;
      border-radius: var(--radius-full);
      font-size: 0.82rem;
      font-weight: 600;
      text-decoration: none;
      transition: all 0.3s ease;
    }

    .btn-maps {
      background: var(--grad-gold);
      color: #FFFFFF;
      box-shadow: 0 4px 14px rgba(196, 164, 124, 0.3);
    }

    .btn-maps:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(196, 164, 124, 0.4);
    }

    .btn-waze {
      background: #FFFFFF;
      color: var(--c-cafe-dark);
      border: 1px solid var(--c-cafe-light);
    }

    .btn-waze:hover {
      background: var(--c-pistache-subtle);
      border-color: var(--c-pistache);
      color: var(--c-pistache-dark);
      transform: translateY(-2px);
    }

    @media (max-width: 768px) {
      .locations-grid {
        grid-template-columns: 1fr;
      }
      .loc-btn-group {
        flex-direction: column;
      }
    }
  `]
})
export class LocationsComponent {
  locations: LocationCard[] = [
  {
    "title": "Misa",
    "placeName": "Templo Santa María de Guadalupe",
    "time": "1:00 PM",
    "address": "La Magdalena",
    "icon": "⛪",
    "badge": "Ceremonia religiosa",
    "mapsUrl": "https://maps.app.goo.gl/heEoERYFzHa3ndyH7",
    "wazeUrl": ""
  },
  {
    "title": "Recepción",
    "placeName": "Jardín de eventos Mauri",
    "time": "2:30 PM",
    "address": "Tequisquiapan, Querétaro",
    "icon": "🥂",
    "badge": "Nuestra celebración",
    "mapsUrl": "https://maps.app.goo.gl/pztYCyPw3CQk98e88",
    "wazeUrl": ""
  }
];
}
