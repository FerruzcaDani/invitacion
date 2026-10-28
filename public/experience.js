/* Alan & Dany — progressive, dependency-free invitation experience.
   Shared by the static preview and the Angular source. No external requests. */
(() => {
  if (window.__adExperience) return;
  window.__adExperience = true;
  const link = document.createElement('link');
  link.rel = 'stylesheet'; link.href = 'experience.css?v=refined2'; document.head.append(link);
  const ready = () => {
    const hero = document.querySelector('.hero-section');
    if (!hero || !document.querySelector('.wedding-footer')) return false;
    init(hero); return true;
  };
  if (!ready()) {
    const observer = new MutationObserver(() => { if (ready()) observer.disconnect(); });
    observer.observe(document.body, {childList:true, subtree:true});
    setTimeout(() => observer.disconnect(), 30000);
  }
  function init(hero) {
    const $ = (s, root = document) => root.querySelector(s);
    const $$ = (s, root = document) => [...root.querySelectorAll(s)];
    const create = (tag, cls, html = '') => {
      const e = document.createElement(tag); e.className = cls; e.innerHTML = html; return e;
    };
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    let paused = reduced.matches;
    let resumeRings = false;
    document.body.classList.add('ad-editorial');
    $('.blessing-photo-card')?.remove();
    const removedLinks = 'a[href="#galeria"],a[href="#dress-code"],a[href="#regalos"]';
    const pruneLinks = () => $$(removedLinks).forEach(e=>e.remove());
    pruneLinks();
    $$('app-gallery,app-dress-code,app-gifts,app-rsvp').forEach(e=>e.remove());
    const nav = document.querySelector('app-navbar');
    if(nav)new MutationObserver(pruneLinks).observe(nav,{childList:true,subtree:true});
    const parents=$('.parents-block');
    if(parents)parents.outerHTML="<div class=\"parents-block ad-padrinos\">\n              <span class=\"ad-eyebrow\">Nos acompañan en esta promesa</span>\n              <h4 class=\"subheading-parents\">Padrinos de velación</h4>\n              <p class=\"ad-padrinos-names\">Saúl Montaño Camacho <span>&amp;</span> Norma Guadalupe Olvera Bocanegra</p>\n            </div>";
    const footerDate=$('.footer-date-badge span');
    if(footerDate)footerDate.textContent='19 • DICIEMBRE • 2026';
    $$('.btn-waze').forEach(e=>e.remove());

    const flower = (className) => {
      let petals = '';
      for(let i=0; i<9; i++) petals += `<ellipse cx="100" cy="65" rx="17" ry="35" transform="rotate(${i*40} 100 100)"/>`;
      return `<svg class="${className}" viewBox="0 0 210 320" aria-hidden="true" fill="none" stroke="currentColor" stroke-width=".8"><path d="M100 110 Q80 210 124 315 M102 234 Q25 218 38 169 Q102 178 102 234 M109 267 Q175 241 179 196 Q119 206 109 267"/><g>${petals}<circle cx="100" cy="100" r="14"/><circle cx="100" cy="100" r="10" stroke-dasharray="1 4"/></g></svg>`;
    };
    hero.insertAdjacentHTML('afterbegin', flower('ad-flower ad-flower-left') + flower('ad-flower ad-flower-right'));
    $('.hero-pretitle').textContent = 'Con la bendición de Dios y de nuestras familias';
    $('.hero-invitation').textContent = 'Hay días que queremos guardar para siempre. Este, queremos vivirlo contigo.';
    const small = create('span','ad-eyebrow','NOS CASAMOS · 19 DICIEMBRE 2026');
    $('.wedding-announcement').prepend(small);
    const calendar = create('button','ad-calendar','Guardar la fecha <span aria-hidden="true">↗</span>');
    calendar.type='button'; $('.event-teaser').append(calendar);
    calendar.onclick = () => {
      const content = 'BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//Alan y Dany//Invitacion//ES\r\nBEGIN:VEVENT\r\nUID:alan-dany-20261219@invitacion.local\r\nDTSTAMP:20261027T000000Z\r\nDTSTART;VALUE=DATE:20261219\r\nDTEND;VALUE=DATE:20261220\r\nSUMMARY:Boda de Alan y Dany\r\nDESCRIPTION:Misa a la 1:00 PM en Templo Santa María de Guadalupe - La Magdalena. Recepción a las 2:30 PM en Jardín de eventos Mauri - Tequisquiapan\\, Querétaro.\r\nEND:VEVENT\r\nEND:VCALENDAR';
      download(content,'boda-alan-y-dany.ics','text/calendar');
      announce('Fecha descargada. Abre el archivo para añadirla a tu calendario.');
    };
    const status=create('div','ad-status'); status.setAttribute('role','status'); status.setAttribute('aria-live','polite');document.body.append(status);
    let statusTimer;
    function announce(text) {status.textContent=text;status.classList.add('show');clearTimeout(statusTimer);statusTimer=setTimeout(()=>status.classList.remove('show'),4500);}
    function download(content,name,type) {const url=URL.createObjectURL(new Blob([content],{type}));const a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),5000);}
    const progress=create('div','ad-progress');progress.setAttribute('aria-hidden','true');document.body.append(progress);
    const controls=create('div','ad-controls','<button type="button" class="ad-motion" aria-pressed="false"><span class="ad-control-icon ad-motion-icon" aria-hidden="true">Ⅱ</span><span class="ad-motion-label">Pausar movimiento</span></button><button type="button" class="ad-reopen" aria-label="Volver a la portada de la invitación"><span class="ad-control-icon" aria-hidden="true">⌂</span><span>Inicio</span></button><button type="button" class="ad-top" aria-label="Regresar hasta arriba"><span class="ad-control-icon" aria-hidden="true">↑</span><span>Arriba</span></button>');document.body.append(controls);
    const motion=$('.ad-motion');
    const motionLabel=$('.ad-motion-label',motion);
    const motionIcon=$('.ad-motion-icon',motion);
    function updateMotion() {
      const ringPause = document.querySelector('button[title="Pausar giro"]');
      const ringPlay = document.querySelector('button[title="Girar automático"]');
      if (paused && ringPause) { resumeRings = true; ringPause.click(); }
      else if (!paused && resumeRings && ringPlay) { ringPlay.click(); resumeRings = false; }
      document.body.classList.toggle('ad-still',paused);motionLabel.textContent=paused?'Activar movimiento':'Pausar movimiento';motionIcon.textContent=paused?'▶':'Ⅱ';motion.setAttribute('aria-pressed',String(paused));}
    motion.onclick=()=>{paused=!paused;updateMotion();};reduced.addEventListener('change',e=>{paused=e.matches;updateMotion();});updateMotion();

    // A real dialog provides focus containment, Escape and keyboard access.
    const envelope=create('dialog','ad-envelope',`<div class="ad-envelope-inner">${flower('ad-envelope-flower')}<span class="ad-eyebrow">UNA INVITACIÓN PARA TI</span><p class="ad-envelope-names">Alan <i>&</i> Dany</p><p class="ad-envelope-note">Lo más bonito de este día<br>será compartirlo contigo.</p><div class="ad-envelope-fold"></div><button class="ad-seal" type="button" aria-label="Abrir invitación de Alan y Dany">A<span>&</span>D</button><span class="ad-open-hint">TOCA EL SELLO PARA ABRIR</span><p class="ad-envelope-date">19 · DICIEMBRE · 2026</p></div>`);
    envelope.setAttribute('aria-label','Invitación de Alan y Dany');document.body.append(envelope);
    let envelopeReturn;
    function showEnvelope(){envelopeReturn=document.activeElement;envelope.classList.remove('is-opening');envelope.showModal();document.body.classList.add('ad-locked');}
    function closeEnvelope(){document.body.classList.remove('ad-locked');envelope.close();if(envelopeReturn instanceof HTMLElement)envelopeReturn.focus();}
    $('.ad-seal',envelope).onclick=()=>{envelope.classList.add('is-opening');burst(innerWidth/2,innerHeight*.58,45);setTimeout(closeEnvelope,paused?0:850);};
    envelope.addEventListener('cancel',()=>{document.body.classList.remove('ad-locked');});
    function goTop(smooth=true){
      history.replaceState(null,'',location.pathname+location.search);
      const behavior=smooth&&!paused?'smooth':'auto';
      window.scrollTo({top:0,left:0,behavior});
      if(behavior==='auto')requestAnimationFrame(()=>window.scrollTo(0,0));
    }
    $('.ad-reopen').onclick=()=>{goTop(false);showEnvelope();};
    $('.ad-top').onclick=()=>goTop(true);

    // Ambient petals remain throughout the invitation.
    const ambient=create('canvas','ad-particles');ambient.setAttribute('aria-hidden','true');document.body.append(ambient);
    const ctx=ambient.getContext('2d');let w=0,h=0,dpr=1;
    const pointer={x:-9999,y:-9999};
    const motes=Array.from({length:innerWidth<600?24:42},()=>({x:Math.random(),y:Math.random(),r:1+Math.random()*2.5,v:.12+Math.random()*.22,phase:Math.random()*6.28}));
    const sparks=[];
    function resize(){dpr=Math.min(devicePixelRatio||1,2);w=innerWidth;h=innerHeight;ambient.width=w*dpr;ambient.height=h*dpr;ctx?.setTransform(dpr,0,0,dpr,0,0);}
    window.addEventListener('resize',resize);resize();
    document.addEventListener('pointermove',e=>{pointer.x=e.clientX;pointer.y=e.clientY;},{passive:true});
    function burst(x,y,n=16){if(paused)return;for(let i=0;i<n;i++){const a=Math.random()*Math.PI*2;const v=1+Math.random()*3;sparks.push({x,y,vx:Math.cos(a)*v,vy:Math.sin(a)*v,life:1,r:2+Math.random()*3});}if(sparks.length>160)sparks.splice(0,sparks.length-160);}
    document.addEventListener('click',e=>{if(e.target.closest('button,a')&&!e.target.closest('dialog'))burst(e.clientX,e.clientY,9);},{passive:true});
    let last=0;
    function frame(t){requestAnimationFrame(frame);if(document.hidden||t-last<32)return;const dt=Math.min((t-last)/16.67,3);last=t;
      const p=scrollY/Math.max(1,document.documentElement.scrollHeight-innerHeight);progress.style.transform=`scaleX(${p})`;
      if(ctx){ctx.clearRect(0,0,w,h);if(!paused){motes.forEach(m=>{m.y+=m.v*dt/h;if(m.y>1.03)m.y=-.03;let x=m.x*w+Math.sin(t*.00035+m.phase)*22,y=m.y*h;const pd=Math.hypot(x-pointer.x,y-pointer.y);if(pd<100){x+=(x-pointer.x)*(100-pd)/130;y+=(y-pointer.y)*(100-pd)/130;}ctx.save();ctx.translate(x,y);ctx.rotate(m.phase+t*.00012);ctx.fillStyle=m.r>2?'rgba(117,130,93,.22)':'rgba(164,125,70,.35)';ctx.beginPath();ctx.ellipse(0,0,m.r,m.r*2.1,0,0,Math.PI*2);ctx.fill();ctx.restore();});for(let i=sparks.length-1;i>=0;i--){const s=sparks[i];s.x+=s.vx*dt;s.y+=s.vy*dt;s.vy+=.025*dt;s.life-=.018*dt;if(s.life<=0){sparks.splice(i,1);continue;}ctx.fillStyle=`rgba(154,118,71,${s.life*.7})`;ctx.beginPath();ctx.ellipse(s.x,s.y,s.r,s.r*.45,s.life*4,0,Math.PI*2);ctx.fill();}}}
    }requestAnimationFrame(frame);

    // Reveal once; never hide information again after the guest has reached it.
    const reveal=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('ad-visible');reveal.unobserve(e.target);}}),{threshold:.08});
    $$('.section-header,.blessing-grid,.timeline-item,.location-card,.gallery-card,.rsvp-card,.ad-union-copy').forEach((e,i)=>{e.classList.add('ad-reveal');e.style.setProperty('--ad-delay',`${i%3*75}ms`);reveal.observe(e);});
    const textUpdates=[['#itinerario .section-subtitle','El día, paso a paso'],['#itinerario .section-title','Cómo llegar'],['#itinerario .section-desc','Horarios, lugares y rutas para acompañarnos en cada momento.']];
    textUpdates.forEach(([s,t])=>{if($(s))$(s).textContent=t;});
    $$('.nav-link,.mobile-link').forEach(e=>{if(e.textContent.trim()==='Alianzas 3D')e.textContent='Las alianzas';});
    $$('.timeline-card').forEach((card,i)=>{
      const title=$('.event-title',card),time=$('.time-text',card),desc=$('.event-desc',card),tag=$('.event-tag',card);
      if(!title||!desc)return;const button=create('button','ad-timeline-toggle',`<span class="ad-timeline-number">0${i+1}</span><span><small>${time?.textContent||''}</small><strong>${title.textContent}</strong></span><span class="ad-plus" aria-hidden="true">+</span>`);button.type='button';button.setAttribute('aria-expanded',String(i===0));button.setAttribute('aria-controls',`ad-moment-${i}`);
      const detail=create('div','ad-timeline-detail');detail.id=`ad-moment-${i}`;detail.append(desc);if(tag)detail.append(tag);detail.hidden=i!==0;
      card.replaceChildren(button,detail);button.onclick=()=>{const open=button.getAttribute('aria-expanded')==='true';button.setAttribute('aria-expanded',String(!open));detail.hidden=open;};
    });
    showEnvelope();
  }
})();
