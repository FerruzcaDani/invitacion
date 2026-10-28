import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-confirmation',
  standalone: true,
  imports: [FormsModule],
  template: `
    <section id="confirmacion" class="section-wrapper confirmation-section">
      <div class="section-container">
        <div class="section-header">
          <span class="section-subtitle">Nos encantará verte</span>
          <h2 class="section-title">Confirma tu asistencia</h2>
          <p class="section-desc">Una respuesta por familia nos ayuda a preparar todo con cariño.</p>
        </div>
        <form class="confirmation-card" (ngSubmit)="submit()" #form="ngForm" novalidate>
          <label for="familyName">Nombre de tu familia o persona responsable</label>
          <input id="familyName" name="familyName" type="text" required maxlength="80" autocomplete="name" [(ngModel)]="familyName" />
          <label for="guestCount">¿Cuántas personas asistirán en total?</label>
          <input id="guestCount" name="guestCount" type="number" required min="1" max="20" inputmode="numeric" [(ngModel)]="guestCount" />
          <input class="confirmation-honey" name="website" tabindex="-1" autocomplete="off" aria-hidden="true" [(ngModel)]="website" />
          <button class="confirmation-submit" type="submit" [disabled]="busy() || !form.valid">
            {{ busy() ? 'Enviando…' : 'Confirmar asistencia ↗' }}
          </button>
          <p class="confirmation-message" role="status" aria-live="polite">{{ message() }}</p>
        </form>
      </div>
    </section>
  `,
  styles: [`
    .confirmation-section{background:#e9ece2}
    .confirmation-card{max-width:550px;margin:auto;padding:36px;background:#fbfaf5;border:1px solid #d2d9c9;border-radius:28px;box-shadow:0 20px 45px #343e2a17;display:grid;gap:13px}
    label{font:600 11px/1.5 var(--font-sans);letter-spacing:.05em;color:#46513f}
    input:not(.confirmation-honey){width:100%;min-height:48px;margin-bottom:9px;border:1px solid #c9d1c0;border-radius:14px;background:#fff;padding:12px 15px;font:15px var(--font-sans);color:#343e32}
    input:focus-visible,button:focus-visible{outline:2px solid #637451;outline-offset:3px}
    .confirmation-honey{position:absolute;left:-9999px;width:1px;height:1px;opacity:0}
    .confirmation-submit{min-height:50px;border:0;border-radius:999px;background:linear-gradient(135deg,#718064,#4f5f45);color:white;font:600 12px var(--font-sans);cursor:pointer;box-shadow:0 12px 25px #43513838;transition:transform .2s,box-shadow .2s}
    .confirmation-submit:hover:not(:disabled){transform:translateY(-3px);box-shadow:0 17px 30px #43513844}
    .confirmation-submit:disabled{opacity:.55;cursor:not-allowed}
    .confirmation-message{min-height:22px;font:13px/1.5 var(--font-sans);color:#4c6144;text-align:center}
    @media(max-width:640px){.confirmation-card{padding:26px 22px}}
  `]
})
export class ConfirmationComponent {
  familyName = '';
  guestCount: number | null = null;
  website = '';
  readonly busy = signal(false);
  readonly message = signal('');

  async submit(): Promise<void> {
    const name = this.familyName.trim();
    const count = Number(this.guestCount);
    if (!name || name.length > 80 || !Number.isInteger(count) || count < 1 || count > 20 || this.busy()) return;
    this.busy.set(true);
    this.message.set('');
    try {
      const response = await fetch('/api/confirm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, count, website: this.website }),
      });
      if (!response.ok) throw new Error('No se pudo guardar la confirmación.');
      this.message.set('Gracias. Recibimos la confirmación de tu familia.');
      this.familyName = '';
      this.guestCount = null;
    } catch {
      this.message.set('No pudimos guardar tu respuesta. Inténtalo de nuevo en un momento.');
    } finally {
      this.busy.set(false);
    }
  }
}
