import { Component } from '@angular/core';

@Component({
  selector: 'app-rings-3d',
  standalone: true,
  template: `
    <div class="rings-section"><div class="rings-card">
      <span class="rings-badge">Símbolo de amor eterno</span>
      <h2>Nuestras Alianzas</h2>
      <div class="rings-art" role="img" aria-label="Dos alianzas plateadas entrelazadas">
        <span class="ring ring-left"></span><span class="ring ring-right"></span>
      </div>
      <p class="rings-caption">Dos vidas, una promesa.</p>
      <p class="rings-quote">“El amor todo lo disculpa, todo lo cree, todo lo espera, todo lo soporta.”</p>
      <span class="rings-reference">1 Corintios 13:7</span>
    </div></div>
  `,
  styles: [`
    .rings-section{padding:40px 16px;display:flex;justify-content:center}
    .rings-card{width:min(100%,820px);padding:45px 25px 40px;text-align:center;border:1px solid #d9d2c5;border-radius:28px;background:linear-gradient(180deg,#fffdf9,#f4f0e9);box-shadow:0 24px 55px #51493b18}
    .rings-badge{font:600 11px var(--font-sans);text-transform:uppercase;letter-spacing:.16em;color:#65735a}
    h2{font:400 clamp(2.5rem,5vw,3.6rem) var(--font-serif);color:#473d34;margin:18px 0 8px}
    .rings-art{position:relative;height:210px;width:290px;max-width:100%;margin:15px auto 0}
    .ring{position:absolute;top:46px;width:155px;height:112px;border:18px solid #cbd0d3;border-radius:50%;box-shadow:inset 4px 5px 7px #727b8170,inset -5px -5px 8px #fff,4px 7px 12px #64635d55,0 0 0 2px #eef1f2}
    .ring-left{left:15px;background:linear-gradient(140deg,#f8fafb,#d4dade 55%,#fff)}
    .ring-right{right:15px;transform:rotate(28deg);background:linear-gradient(45deg,#f8fafb,#cbd1d5 55%,#fff)}
    .rings-caption{font:italic 1.2rem var(--font-serif);color:#625949;margin:0 0 28px}
    .rings-quote{max-width:590px;margin:0 auto 8px;color:#695f53;line-height:1.7}
    .rings-reference{font:600 11px var(--font-sans);letter-spacing:.12em;text-transform:uppercase;color:#718064}
  `]
})
export class Rings3dComponent {}
