import { Component, HostListener, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav class="wedding-nav" [class.scrolled]="isScrolled()">
      <div class="nav-content">
        <!-- Logo / Monogram -->
        <a href="#inicio" class="nav-brand" aria-label="Ir al inicio">
          <span class="brand-monogram">A & D</span>
          <span class="brand-names">Alan & Dany</span>
        </a>

        <!-- Desktop Menu Links -->
        <div class="nav-links desktop-only">
          <a href="#inicio" class="nav-link">Inicio</a>
          <a href="#bendicion" class="nav-link">Bendición</a>
          <a href="#alianzas" class="nav-link">Alianzas 3D</a>
          <a href="#itinerario" class="nav-link">Cómo llegar</a>
          <a href="#confirmacion" class="nav-link">Confirmar</a>
        </div>

        <!-- Mobile Hamburger Toggle -->
        <button class="menu-toggle mobile-only" (click)="toggleMobileMenu()" aria-label="Abrir menú">
          <svg *ngIf="!menuOpen()" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
          <svg *ngIf="menuOpen()" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      <!-- Mobile Dropdown -->
      <div class="mobile-menu" *ngIf="menuOpen()">
        <a href="#inicio" (click)="closeMobileMenu()" class="mobile-link">Inicio</a>
        <a href="#bendicion" (click)="closeMobileMenu()" class="mobile-link">Bendición</a>
        <a href="#alianzas" (click)="closeMobileMenu()" class="mobile-link">Alianzas 3D</a>
        <a href="#itinerario" (click)="closeMobileMenu()" class="mobile-link">Cómo llegar</a>
        <a href="#confirmacion" (click)="closeMobileMenu()" class="mobile-link">Confirmar</a>
      </div>
    </nav>
  `,
  styles: [`
    .wedding-nav {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000;
      padding: 16px 0;
      transition: all 0.3s ease;
    }

    .wedding-nav.scrolled {
      background: rgba(255, 255, 255, 0.92);
      backdrop-filter: blur(12px);
      box-shadow: 0 4px 20px rgba(90, 70, 50, 0.08);
      padding: 10px 0;
      border-bottom: 1px solid rgba(232, 218, 203, 0.6);
    }

    .nav-content {
      max-width: 1180px;
      margin: 0 auto;
      padding: 0 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .nav-brand {
      display: flex;
      align-items: center;
      gap: 10px;
      text-decoration: none;
    }

    .brand-monogram {
      font-family: var(--font-serif);
      font-size: 1.1rem;
      font-weight: 700;
      color: var(--c-cafe-dark);
      background: var(--c-cream);
      border: 1px solid var(--c-cafe-light);
      padding: 4px 10px;
      border-radius: var(--radius-full);
      letter-spacing: 0.08em;
    }

    .brand-names {
      font-family: var(--font-serif);
      font-size: 1.35rem;
      color: var(--c-cafe-deep);
      font-weight: 600;
      letter-spacing: 0.06em;
    }

    .nav-links {
      display: flex;
      align-items: center;
      gap: 22px;
    }

    .nav-link {
      font-family: var(--font-sans);
      font-size: 0.84rem;
      font-weight: 500;
      letter-spacing: 0.06em;
      color: var(--text-main);
      text-decoration: none;
      text-transform: uppercase;
      position: relative;
      transition: color 0.25s ease;
    }

    .nav-link::after {
      content: '';
      position: absolute;
      bottom: -4px;
      left: 0;
      width: 0%;
      height: 1.5px;
      background: var(--c-cafe);
      transition: width 0.25s ease;
    }

    .nav-link:hover {
      color: var(--c-cafe-medium);
    }

    .nav-link:hover::after {
      width: 100%;
    }

    .nav-link-highlight {
      background: var(--c-pistache-subtle);
      border: 1px solid var(--c-pistache-light);
      padding: 6px 16px;
      border-radius: var(--radius-full);
      color: var(--c-pistache-dark) !important;
      font-weight: 600;
    }

    .nav-link-highlight:hover {
      background: var(--c-pistache);
      color: #FFFFFF !important;
    }

    .nav-link-highlight::after {
      display: none;
    }

    .menu-toggle {
      background: none;
      border: none;
      color: var(--c-cafe-deep);
      cursor: pointer;
      padding: 6px;
    }

    .mobile-menu {
      background: rgba(255, 255, 255, 0.98);
      backdrop-filter: blur(14px);
      border-bottom: 1px solid var(--c-cafe-light);
      padding: 20px 24px 28px;
      display: flex;
      flex-direction: column;
      gap: 14px;
      animation: slideDown 0.3s ease;
    }

    @keyframes slideDown {
      from { opacity: 0; transform: translateY(-10px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .mobile-link {
      font-family: var(--font-serif);
      font-size: 1.25rem;
      color: var(--c-cafe-deep);
      text-decoration: none;
      padding: 6px 0;
      border-bottom: 1px dashed rgba(232, 218, 203, 0.5);
    }

    .mobile-link-highlight {
      background: var(--grad-gold);
      color: #FFFFFF !important;
      text-align: center;
      padding: 10px;
      border-radius: var(--radius-full);
      font-size: 1rem;
      margin-top: 8px;
    }

    .desktop-only {
      display: flex;
    }

    .mobile-only {
      display: none;
    }

    @media (max-width: 920px) {
      .desktop-only {
        display: none;
      }
      .mobile-only {
        display: block;
      }
    }
  `]
})
export class NavbarComponent {
  protected readonly isScrolled = signal(false);
  protected readonly menuOpen = signal(false);

  @HostListener('window:scroll')
  onWindowScroll(): void {
    const scrollY = window.scrollY || window.pageYOffset;
    this.isScrolled.set(scrollY > 50);
  }

  toggleMobileMenu(): void {
    this.menuOpen.update((v) => !v);
  }

  closeMobileMenu(): void {
    this.menuOpen.set(false);
  }
}
