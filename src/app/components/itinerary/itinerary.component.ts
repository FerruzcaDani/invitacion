import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface TimelineEvent {
  time: string;
  title: string;
  description: string;
  icon: string;
  badge: string;
}

@Component({
  selector: 'app-itinerary',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="itinerario" class="section-wrapper itinerary-section">
      <div class="section-container">
        
        <div class="section-header">
          <span class="section-subtitle">Momentos Inolvidables</span>
          <h2 class="section-title">Itinerario del Gran Día</h2>
          <p class="section-desc">
            Hemos preparado cada detalle con amor para compartir este día a su lado.
          </p>
        </div>

        <div class="timeline-container">
          <!-- Central Connecting Line -->
          <div class="timeline-spine"></div>

          <div class="timeline-items">
            <div 
              *ngFor="let item of events; let i = index" 
              class="timeline-item"
              [class.timeline-right]="i % 2 !== 0"
              [class.timeline-left]="i % 2 === 0"
            >
              <!-- Timeline Marker / Node -->
              <div class="timeline-node">
                <span class="node-icon" [innerHTML]="item.icon"></span>
              </div>

              <!-- Content Card -->
              <div class="timeline-card">
                <div class="card-time-badge">
                  <span class="time-clock">⏱</span>
                  <span class="time-text">{{ item.time }}</span>
                </div>
                <h3 class="event-title">{{ item.title }}</h3>
                <p class="event-desc">{{ item.description }}</p>
                <span class="event-tag">{{ item.badge }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Note to guests -->
        <div class="itinerary-footer-note">
          <div class="note-icon">✨</div>
          <p class="note-text">
            Agradecemos su puntualidad para disfrutar juntos de cada instante sagrado y festivo.
          </p>
        </div>

      </div>
    </section>
  `,
  styles: [`
    .itinerary-section {
      background-color: var(--c-cream);
      position: relative;
    }

    .timeline-container {
      position: relative;
      max-width: 860px;
      margin: 0 auto;
      padding: 20px 0;
    }

    .timeline-spine {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 50%;
      width: 2px;
      background: linear-gradient(180deg, 
        transparent 0%, 
        var(--c-cafe-light) 10%, 
        var(--c-cafe) 50%, 
        var(--c-cafe-light) 90%, 
        transparent 100%
      );
      transform: translateX(-50%);
    }

    .timeline-items {
      display: flex;
      flex-direction: column;
      gap: 48px;
    }

    .timeline-item {
      display: flex;
      position: relative;
      width: 50%;
    }

    .timeline-left {
      align-self: flex-start;
      justify-content: flex-end;
      padding-right: 48px;
      text-align: right;
    }

    .timeline-right {
      align-self: flex-end;
      justify-content: flex-start;
      padding-left: 48px;
      text-align: left;
    }

    /* Marker */
    .timeline-node {
      position: absolute;
      top: 24px;
      width: 46px;
      height: 46px;
      border-radius: 50%;
      background: #FFFFFF;
      border: 2px solid var(--c-cafe);
      box-shadow: 0 0 0 6px rgba(196, 164, 124, 0.18), var(--shadow-sm);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 2;
      color: var(--c-cafe-dark);
      transition: transform 0.3s ease, background-color 0.3s ease;
    }

    .timeline-left .timeline-node {
      right: -23px;
    }

    .timeline-right .timeline-node {
      left: -23px;
    }

    .timeline-item:hover .timeline-node {
      transform: scale(1.15);
      background: var(--c-pistache-subtle);
      border-color: var(--c-pistache-dark);
    }

    .node-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.2rem;
    }

    /* Card */
    .timeline-card {
      background: rgba(255, 255, 255, 0.95);
      border: 1px solid rgba(232, 218, 203, 0.75);
      border-radius: var(--radius-md);
      padding: 24px 28px;
      box-shadow: var(--shadow-md);
      max-width: 360px;
      width: 100%;
      position: relative;
      transition: all 0.3s ease;
    }

    .timeline-card:hover {
      transform: translateY(-3px);
      box-shadow: var(--shadow-lg);
      border-color: var(--c-cafe);
    }

    .card-time-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: var(--c-pistache-subtle);
      color: var(--c-pistache-dark);
      border: 1px solid var(--c-pistache-light);
      padding: 4px 14px;
      border-radius: var(--radius-full);
      font-size: 0.78rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      margin-bottom: 10px;
    }

    .event-title {
      font-size: 1.5rem;
      color: var(--c-cafe-deep);
      margin-bottom: 8px;
    }

    .event-desc {
      font-size: 0.92rem;
      color: var(--text-muted);
      line-height: 1.5;
      margin-bottom: 12px;
    }

    .event-tag {
      font-size: 0.72rem;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: var(--c-cafe-medium);
      font-weight: 600;
    }

    /* Footer Note */
    .itinerary-footer-note {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
      margin-top: 50px;
      background: #FFFFFF;
      border: 1px dashed var(--c-cafe-light);
      border-radius: var(--radius-full);
      padding: 12px 30px;
      max-width: 580px;
      margin-left: auto;
      margin-right: auto;
    }

    .note-icon {
      font-size: 1.2rem;
    }

    .note-text {
      font-family: var(--font-serif);
      font-style: italic;
      font-size: 1.05rem;
      color: var(--c-cafe-deep);
    }

    @media (max-width: 768px) {
      .timeline-spine {
        left: 24px;
      }
      .timeline-item {
        width: 100%;
        padding-left: 64px;
        padding-right: 0;
        text-align: left;
      }
      .timeline-left, .timeline-right {
        align-self: flex-start;
        justify-content: flex-start;
      }
      .timeline-left .timeline-node,
      .timeline-right .timeline-node {
        left: 2px;
        right: auto;
      }
      .timeline-card {
        max-width: 100%;
      }
    }
  `]
})
export class ItineraryComponent {
  events: TimelineEvent[] = [
  {
    "time": "1:00 PM",
    "title": "Misa",
    "description": "Acompáñanos a celebrar nuestra unión en el Templo Santa María de Guadalupe, en La Magdalena.",
    "icon": "⛪",
    "badge": "Templo Santa María de Guadalupe"
  },
  {
    "time": "2:30 PM",
    "title": "Recepción",
    "description": "Después de la ceremonia, nos reuniremos para celebrar en Jardín de eventos Mauri, Tequisquiapan, Querétaro.",
    "icon": "🥂",
    "badge": "Jardín de eventos Mauri"
  }
];
}
