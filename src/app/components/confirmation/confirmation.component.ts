import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-confirmation',
  standalone: true,
  template: `
    <section id="confirmacion" class="section-wrapper confirmation-section">
      <div class="section-container">
        <div class="section-header">
          <span class="section-subtitle">Nos encantará verte</span>
          <h2 class="section-title">Confirma tu asistencia</h2>
          <p class="section-desc">Confirma con un toque si nos acompañarás.</p>
        </div>
        <div class="confirmation-card">
          <button class="confirmation-submit" type="button" (click)="submit()" [disabled]="busy() || confirmed()">
            {{ confirmed() ? 'Asistencia confirmada ✓' : busy() ? 'Confirmando…' : 'Confirmar asistencia ↗' }}
          </button>
          <p class="confirmation-message" role="status" aria-live="polite">{{ message() }}</p>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .confirmation-section{background:#e9ece2}
    .confirmation-card{max-width:550px;margin:auto;padding:36px;background:#fbfaf5;border:1px solid #d2d9c9;border-radius:28px;box-shadow:0 20px 45px #343e2a17;text-align:center}
    .confirmation-submit{min-height:52px;padding:0 28px;border:0;border-radius:999px;background:linear-gradient(135deg,#718064,#4f5f45);color:white;font:600 13px var(--font-sans);cursor:pointer;box-shadow:0 12px 25px #43513838;transition:transform .2s,box-shadow .2s}
    .confirmation-submit:hover:not(:disabled){transform:translateY(-3px);box-shadow:0 17px 30px #43513844}
    .confirmation-submit:disabled{opacity:.7;cursor:default}
    .confirmation-submit:focus-visible{outline:2px solid #637451;outline-offset:3px}
    .confirmation-message{min-height:22px;margin:14px 0 0;font:13px/1.5 var(--font-sans);color:#4c6144}
  `]
})
export class ConfirmationComponent {
  readonly busy = signal(false);
  readonly confirmed = signal(typeof localStorage !== 'undefined' && localStorage.getItem('ad-confirmed') === '1');
  readonly message = signal('');

  async submit(): Promise<void> {
    if (this.busy() || this.confirmed()) return;
    this.busy.set(true);
    this.message.set('');
    try {
      const response = await fetch('/api/confirm', { method: 'POST' });
      if (!response.ok) throw new Error('No se pudo guardar la confirmación.');
      localStorage.setItem('ad-confirmed', '1');
      this.confirmed.set(true);
      this.message.set('¡Gracias por confirmar! Nos vemos pronto.');
    } catch {
      this.message.set('No pudimos guardar tu respuesta. Inténtalo de nuevo en un momento.');
    } finally {
      this.busy.set(false);
    }
  }
}
