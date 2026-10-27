import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
  HostListener,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import * as THREE from 'three';

@Component({
  selector: 'app-rings-3d',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="rings-section">
      <div class="rings-card">
        <div class="rings-badge">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
            <circle cx="9" cy="12" r="6" />
            <circle cx="15" cy="12" r="6" />
          </svg>
          Símbolo de Amor Eterno
        </div>

        <h3 class="rings-title">Nuestras Alianzas</h3>
        <p class="rings-desc">
          Arrastra para girarlas y descubrir cada detalle.
        </p>

        <!-- 3D Canvas Container -->
        <div class="canvas-wrapper" (mousedown)="onPointerDown($event)" (touchstart)="onTouchStart($event)">
          <canvas #canvasContainer class="webgl-canvas"></canvas>

          <!-- Floating Guidance Overlay -->
          <div class="canvas-hint" [class.hidden]="isInteracting()">
            <span class="hint-icon">⟵ ➔</span>
            <span>Arrastra para girar 360°</span>
          </div>

          <!-- Quick Actions -->
          <div class="canvas-controls">
            <button class="btn-tool" (click)="toggleAutoRotate()" [title]="autoRotate() ? 'Pausar giro' : 'Girar automático'">
              {{ autoRotate() ? '⏸ Pausar' : '▶ Girar' }}
            </button>
            <button class="btn-tool" (click)="resetOrientation()" title="Restablecer posición original">
              ↺ Centrar
            </button>
          </div>
        </div>

        <div class="rings-footer-quote">
          <div class="quote-symbol">❦</div>
          <p class="quote-text">
            "El amor no se deleita en la maldad sino que se regocija con la verdad. Todo lo disculpa, todo lo cree, todo lo espera, todo lo soporta. El amor nunca deja de ser."
          </p>
          <span class="quote-author">1 Corintios 13:6-8</span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .rings-section {
      padding: 40px 0;
      display: flex;
      justify-content: center;
      position: relative;
    }

    .rings-card {
      background: linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(250,246,240,0.9) 100%);
      border: 1px solid rgba(196, 164, 124, 0.35);
      border-radius: var(--radius-lg);
      padding: 44px 32px 36px;
      max-width: 820px;
      width: 100%;
      margin: 0 16px;
      box-shadow: var(--shadow-lg), 0 0 50px rgba(196, 164, 124, 0.08);
      text-align: center;
      position: relative;
      overflow: hidden;
    }

    .rings-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: var(--grad-gold);
    }

    .rings-badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: var(--c-pistache-subtle);
      color: var(--c-pistache-dark);
      border: 1px solid var(--c-pistache-light);
      padding: 6px 18px;
      border-radius: var(--radius-full);
      font-size: 0.8rem;
      font-weight: 600;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      margin-bottom: 16px;
    }

    .rings-title {
      font-size: clamp(2.5rem, 5vw, 3.6rem);
      color: var(--c-cafe-deep);
      margin-bottom: 14px;
      font-weight: 400;
      letter-spacing: -0.03em;
    }

    .rings-desc {
      font-size: 0.98rem;
      color: var(--text-muted);
      max-width: 580px;
      margin: 0 auto 24px;
      line-height: 1.6;
    }

    .instruction-highlight {
      color: var(--c-cafe-dark);
      font-weight: 600;
    }

    .canvas-wrapper {
      position: relative;
      width: 100%;
      height: 380px;
      border-radius: var(--radius-md);
      background: radial-gradient(circle at 50% 50%, rgba(255, 253, 248, 0.95) 0%, rgba(243, 236, 225, 0.75) 100%);
      border: 1px solid rgba(232, 218, 203, 0.6);
      cursor: grab;
      user-select: none;
      overflow: hidden;
      box-shadow: inset 0 2px 14px rgba(90, 70, 50, 0.04);
      margin-bottom: 30px;
    }

    .canvas-wrapper:active {
      cursor: grabbing;
    }

    .webgl-canvas {
      width: 100%;
      height: 100%;
      display: block;
    }

    .canvas-hint {
      position: absolute;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(255, 255, 255, 0.9);
      backdrop-filter: blur(8px);
      padding: 7px 18px;
      border-radius: var(--radius-full);
      font-size: 0.82rem;
      color: var(--c-cafe-dark);
      border: 1px solid var(--c-cafe-light);
      display: flex;
      align-items: center;
      gap: 8px;
      pointer-events: none;
      box-shadow: var(--shadow-sm);
      transition: opacity 0.3s ease;
    }

    .canvas-hint.hidden {
      opacity: 0;
    }

    .hint-icon {
      font-weight: bold;
      color: var(--c-cafe-medium);
    }

    .canvas-controls {
      position: absolute;
      top: 14px;
      right: 14px;
      display: flex;
      gap: 8px;
      z-index: 2;
    }

    .btn-tool {
      background: rgba(255, 255, 255, 0.85);
      backdrop-filter: blur(8px);
      border: 1px solid var(--c-cafe-light);
      border-radius: var(--radius-full);
      padding: 6px 14px;
      font-size: 0.75rem;
      color: var(--c-cafe-dark);
      cursor: pointer;
      font-weight: 500;
      transition: all 0.2s ease;
    }

    .btn-tool:hover {
      background: #FFFFFF;
      border-color: var(--c-cafe-medium);
      color: var(--c-cafe-deep);
      box-shadow: var(--shadow-sm);
    }

    .rings-footer-quote {
      border-top: 1px dashed var(--c-cafe-light);
      padding-top: 24px;
      max-width: 600px;
      margin: 0 auto;
    }

    .quote-symbol {
      color: var(--c-cafe-medium);
      font-size: 1.4rem;
      line-height: 1;
      margin-bottom: 8px;
    }

    .quote-text {
      font-family: var(--font-serif);
      font-size: 1.12rem;
      font-style: italic;
      color: var(--c-cafe-deep);
      margin-bottom: 6px;
    }

    .quote-author {
      font-size: 0.82rem;
      color: var(--c-pistache-dark);
      font-weight: 600;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }

    @media (max-width: 640px) {
      .canvas-wrapper {
        height: 300px;
      }
      .rings-card {
        padding: 30px 18px 24px;
      }
      .rings-title {
        font-size: 2.35rem;
      }
    }
  `]
})
export class Rings3dComponent implements OnInit, OnDestroy {
  @ViewChild('canvasContainer', { static: true })
  canvasRef!: ElementRef<HTMLCanvasElement>;

  protected readonly autoRotate = signal(true);
  protected readonly isInteracting = signal(false);

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private ringsGroup!: THREE.Group;
  private ring1!: THREE.Mesh;
  private ring2!: THREE.Mesh;
  private particles!: THREE.Points;
  private animationFrameId: number | null = null;

  // Rotation & Drag state
  private isDragging = false;
  private previousMouseX = 0;
  private manualRotationY = 0;
  private scrollRotationY = 0;
  private targetManualRotationY = 0;
  private targetScrollRotationY = 0;

  ngOnInit(): void {
    this.initThree();
    this.initRings();
    this.initLights();
    this.initParticles();
    this.animate();
  }

  ngOnDestroy(): void {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
    }
    if (this.renderer) {
      this.renderer.dispose();
    }
  }

  @HostListener('window:resize')
  onWindowResize(): void {
    if (!this.canvasRef || !this.renderer || !this.camera) return;
    const canvas = this.canvasRef.nativeElement;
    const width = canvas.parentElement?.clientWidth || canvas.clientWidth;
    const height = canvas.parentElement?.clientHeight || canvas.clientHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    // Rotate rings as user scrolls vertically
    const scrollY = window.scrollY || window.pageYOffset;
    // Rotate rings on their axis proportionally to scroll
    this.targetScrollRotationY = scrollY * 0.0032;
  }

  private initThree(): void {
    const canvas = this.canvasRef.nativeElement;
    const width = canvas.parentElement?.clientWidth || 700;
    const height = canvas.parentElement?.clientHeight || 380;

    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    this.camera.position.set(0, 0.4, 5.8);

    this.renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.25;
  }

  private initRings(): void {
    this.ringsGroup = new THREE.Group();

const studio = document.createElement('canvas'); studio.width=1024;studio.height=512;
    const ctx=studio.getContext('2d');
    if(ctx){
      ctx.fillStyle='#333b46';ctx.fillRect(0,0,1024,512);
      const wash=ctx.createLinearGradient(0,0,0,512);wash.addColorStop(0,'#acb7c5');wash.addColorStop(.45,'#323943');wash.addColorStop(1,'#778291');ctx.fillStyle=wash;ctx.fillRect(0,0,1024,512);
      ctx.fillStyle='#ffffff';ctx.fillRect(80,65,120,360);ctx.fillRect(575,115,210,235);
      ctx.fillStyle='#dce7f5';ctx.fillRect(920,30,35,440);
      const reflection=new THREE.Texture(studio);reflection.mapping=THREE.EquirectangularReflectionMapping;reflection.colorSpace=THREE.SRGBColorSpace;reflection.needsUpdate=true;this.scene.environment=reflection;
    }

const shapeBand = (geometry: THREE.TorusGeometry, radius: number, depth: number, halfWidth: number) => {
      const pos=geometry.attributes['position'];
      for(let n=0;n<pos.count;n++){
        const x=pos.getX(n),y=pos.getY(n),z=pos.getZ(n),a=Math.atan2(y,x),b=Math.atan2(z,Math.hypot(x,y)-radius);
        const c=Math.cos(b),s=Math.sin(b),r=radius+depth*Math.sign(c)*Math.pow(Math.abs(c),.48);
        pos.setXYZ(n,r*Math.cos(a),r*Math.sin(a),halfWidth*Math.sign(s)*Math.pow(Math.abs(s),.48));
      }
      pos.needsUpdate=true;geometry.computeVertexNormals();
    };
    // Polished silver with a rounded comfort-fit profile
    const goldMaterial = new THREE.MeshStandardMaterial({
      color: 0xDCE2EA,
      metalness: 1,
      roughness: 0.14,
      envMapIntensity: 1.5,
    });

    // Platinum / White Gold Material for subtle contrast or inner shine
    const whiteGoldMaterial = new THREE.MeshStandardMaterial({
      color: 0xE8EDF3,
      metalness: 1,
      roughness: 0.11,
    });

    // Ring 1: Alan's classic comfort band (slightly wider, sleek bevel)
    const ring1Geometry = new THREE.TorusGeometry(1.2, 0.18, 36, 120);
    shapeBand(ring1Geometry, 1.2, .105, .22);
    this.ring1 = new THREE.Mesh(ring1Geometry, goldMaterial);
    this.ring1.position.set(-0.65, 0, 0);
    this.ring1.rotation.set(0.35, 0.5, 0.2);

    // Ring 2: Dany's band (intertwined at romantic angle with diamond solitaire)
    const ring2Geometry = new THREE.TorusGeometry(1.15, 0.15, 36, 120);
    shapeBand(ring2Geometry, 1.15, .085, .14);
    this.ring2 = new THREE.Mesh(ring2Geometry, whiteGoldMaterial);
    this.ring2.position.set(0.65, 0, 0);
    this.ring2.rotation.set(-0.35, -0.6, -0.2);

    // Dany's diamond crown
    const gemGeometry = new THREE.OctahedronGeometry(0.24, 0);
    const gemMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xFFFFFF,
      metalness: 0.05,
      roughness: 0.05,
      transmission: 0.95,
      thickness: 0.5,
      ior: 2.4,
      specularIntensity: 1.8,
    });
    const gem = new THREE.Mesh(gemGeometry, gemMaterial);
    gem.position.set(0, 1.22, 0);
    gem.rotation.set(0.2, 0.4, 0);
    this.ring2.add(gem);

    // Add small diamond claw prongs
    for (let i = 0; i < 4; i++) {
      const prongGeo = new THREE.CylinderGeometry(0.025, 0.025, 0.16, 8);
      const prong = new THREE.Mesh(prongGeo, goldMaterial);
      const angle = (i * Math.PI) / 2 + Math.PI / 4;
      prong.position.set(Math.cos(angle) * 0.12, 1.15, Math.sin(angle) * 0.12);
      this.ring2.add(prong);
    }

    this.ringsGroup.add(this.ring1);
    this.ringsGroup.add(this.ring2);

    // Default angle for elegant view
    this.ringsGroup.rotation.x = 0.2;
    this.ringsGroup.rotation.z = -0.05;

    this.scene.add(this.ringsGroup);
  }

  private initLights(): void {
    // Ambient light with soft champagne warmth
    const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.65);
    this.scene.add(ambientLight);

    // Key directional light (soft sunbeam)
    const keyLight = new THREE.DirectionalLight(0xFFFFFF, 1.5);
    keyLight.position.set(4, 6, 5);
    this.scene.add(keyLight);

    // Warm golden fill light
    const fillLight = new THREE.DirectionalLight(0xDDE8FF, 1.1);
    fillLight.position.set(-5, -2, 3);
    this.scene.add(fillLight);

    // Crisp rim light for sparkling edge reflections
    const rimLight = new THREE.PointLight(0xFFFFFF, 3.2, 15);
    rimLight.position.set(0, 3, -4);
    this.scene.add(rimLight);
  }

  private initParticles(): void {
    // Shimmering micro-gold dust around the rings
    const count = 75;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 6;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 4;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color: 0xDCE2EA,
      size: 0.04,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });

    this.particles = new THREE.Points(geometry, material);
    this.scene.add(this.particles);
  }

  private animate = (): void => {
    this.animationFrameId = requestAnimationFrame(this.animate);

    // Smooth lerp manual drag rotation and scroll rotation
    this.manualRotationY += (this.targetManualRotationY - this.manualRotationY) * 0.08;
    this.scrollRotationY += (this.targetScrollRotationY - this.scrollRotationY) * 0.08;

    // Optional gentle idle auto-rotation when user is not dragging
    let autoY = 0;
    if (this.autoRotate() && !this.isDragging) {
      this.targetManualRotationY += 0.003;
    }

    // Apply combined rotation to rings group
    if (this.ringsGroup) {
      // Rotation horizontally (360 left/right) + scroll rotation on axis
      this.ringsGroup.rotation.y = this.manualRotationY + this.scrollRotationY;

      // Gentle floating breathing animation
      const time = performance.now() * 0.0012;
      this.ringsGroup.position.y = Math.sin(time) * 0.08;
      this.ring1.rotation.z = 0.2 + Math.sin(time * 0.8) * 0.03;
      this.ring2.rotation.z = -0.2 - Math.sin(time * 0.8) * 0.03;
    }

    if (this.particles) {
      this.particles.rotation.y += 0.0008;
    }

    this.renderer.render(this.scene, this.camera);
  };

  // Mouse & Touch Drag Event Handlers
  onPointerDown(event: MouseEvent): void {
    this.isDragging = true;
    this.isInteracting.set(true);
    this.previousMouseX = event.clientX;

    const onPointerMove = (moveEvent: MouseEvent) => {
      if (!this.isDragging) return;
      const deltaX = moveEvent.clientX - this.previousMouseX;
      this.previousMouseX = moveEvent.clientX;
      // Rotate 360 left-to-right
      this.targetManualRotationY += deltaX * 0.012;
    };

    const onPointerUp = () => {
      this.isDragging = false;
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('mouseup', onPointerUp);
    };

    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);
  }

  onTouchStart(event: TouchEvent): void {
    if (event.touches.length !== 1) return;
    this.isDragging = true;
    this.isInteracting.set(true);
    this.previousMouseX = event.touches[0].clientX;

    const onTouchMove = (moveEvent: TouchEvent) => {
      if (!this.isDragging || moveEvent.touches.length !== 1) return;
      const clientX = moveEvent.touches[0].clientX;
      const deltaX = clientX - this.previousMouseX;
      this.previousMouseX = clientX;
      this.targetManualRotationY += deltaX * 0.014;
    };

    const onTouchEnd = () => {
      this.isDragging = false;
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };

    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);
  }

  toggleAutoRotate(): void {
    this.autoRotate.update((v) => !v);
  }

  resetOrientation(): void {
    this.targetManualRotationY = 0;
    this.manualRotationY = 0;
    if (this.ringsGroup) {
      this.ringsGroup.rotation.y = this.scrollRotationY;
    }
  }
}
