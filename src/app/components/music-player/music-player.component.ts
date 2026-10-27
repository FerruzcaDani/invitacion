import { Component, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-music-player',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="music-floating-widget" [class.playing]="isPlaying()">
      <button 
        class="music-btn" 
        (click)="toggleMusic()" 
        [title]="isPlaying() ? 'Pausar melodía nupcial' : 'Reproducir melodía de boda'"
      >
        <!-- Soundwave animation bars -->
        <div class="soundwaves" *ngIf="isPlaying()">
          <span class="bar bar-1"></span>
          <span class="bar bar-2"></span>
          <span class="bar bar-3"></span>
          <span class="bar bar-4"></span>
        </div>

        <svg *ngIf="!isPlaying()" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M9 18V5l12-2v13" />
          <circle cx="6" cy="18" r="3" />
          <circle cx="18" cy="16" r="3" />
        </svg>

        <span class="music-label">
          {{ isPlaying() ? 'Música Nupcial' : 'Melodía Romántica' }}
        </span>
      </button>
    </div>
  `,
  styles: [`
    .music-floating-widget {
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 999;
    }

    .music-btn {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      background: rgba(255, 255, 255, 0.95);
      border: 1.5px solid var(--c-cafe-light);
      padding: 10px 18px;
      border-radius: var(--radius-full);
      box-shadow: var(--shadow-md), 0 4px 20px rgba(196, 164, 124, 0.25);
      backdrop-filter: blur(10px);
      cursor: pointer;
      color: var(--c-cafe-deep);
      font-family: var(--font-sans);
      font-size: 0.82rem;
      font-weight: 600;
      letter-spacing: 0.04em;
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .music-btn:hover {
      transform: translateY(-3px) scale(1.03);
      border-color: var(--c-cafe);
      background: #FFFFFF;
      box-shadow: var(--shadow-lg), 0 8px 24px rgba(196, 164, 124, 0.35);
    }

    .music-floating-widget.playing .music-btn {
      background: linear-gradient(135deg, #FFFFFF 0%, var(--c-pistache-subtle) 100%);
      border-color: var(--c-pistache);
      color: var(--c-pistache-dark);
    }

    .soundwaves {
      display: flex;
      align-items: flex-end;
      gap: 3px;
      height: 16px;
    }

    .bar {
      width: 3px;
      background: var(--c-pistache-dark);
      border-radius: 2px;
      animation: soundWave 1.2s ease-in-out infinite alternate;
    }

    .bar-1 { height: 40%; animation-delay: 0.1s; }
    .bar-2 { height: 90%; animation-delay: 0.3s; }
    .bar-3 { height: 60%; animation-delay: 0.2s; }
    .bar-4 { height: 100%; animation-delay: 0.4s; }

    @keyframes soundWave {
      0% { height: 20%; }
      100% { height: 100%; }
    }

    @media (max-width: 640px) {
      .music-floating-widget {
        bottom: 16px;
        right: 16px;
      }
      .music-btn {
        padding: 8px 14px;
        font-size: 0.75rem;
      }
    }
  `]
})
export class MusicPlayerComponent implements OnDestroy {
  protected readonly isPlaying = signal(false);

  private audioCtx: AudioContext | null = null;
  private intervalId: any = null;
  private currentNoteIndex = 0;

  // Romantic acoustic harp/piano chord sequence (Pachelbel Canon / Wedding motif)
  // Frequencies in Hz: D4, F#4, A4, D5, A3, C#4, E4, A4, B3, D4, F#4, B4, F#3, A3, C#4, F#4...
  private melodyFrequencies = [
    293.66, 369.99, 440.00, 587.33,
    220.00, 277.18, 329.63, 440.00,
    246.94, 293.66, 369.99, 493.88,
    185.00, 220.00, 277.18, 369.99,
    196.00, 246.94, 293.66, 392.00,
    146.83, 220.00, 293.66, 440.00,
  ];

  ngOnDestroy(): void {
    this.stopAudio();
  }

  toggleMusic(): void {
    if (this.isPlaying()) {
      this.stopAudio();
    } else {
      this.startAudio();
    }
  }

  private startAudio(): void {
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!this.audioCtx) {
        this.audioCtx = new AudioContextClass();
      }
      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }

      this.isPlaying.set(true);
      this.currentNoteIndex = 0;

      // Play soft acoustic notes every 420ms
      this.playRomanticNote();
      this.intervalId = setInterval(() => {
        this.playRomanticNote();
      }, 440);
    } catch (e) {
      console.warn('Audio Context not allowed yet', e);
    }
  }

  private playRomanticNote(): void {
    if (!this.audioCtx || !this.isPlaying()) return;

    const freq = this.melodyFrequencies[this.currentNoteIndex % this.melodyFrequencies.length];
    this.currentNoteIndex++;

    const osc = this.audioCtx.createOscillator();
    const gainNode = this.audioCtx.createGain();

    // Use gentle triangle waveform for warm acoustic music box / harp feel
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);

    // Warm envelope
    const now = this.audioCtx.currentTime;
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(0.08, now + 0.05); // Attack
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 1.2); // Gentle decay

    osc.connect(gainNode);
    gainNode.connect(this.audioCtx.destination);

    osc.start(now);
    osc.stop(now + 1.25);
  }

  private stopAudio(): void {
    this.isPlaying.set(false);
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
}
