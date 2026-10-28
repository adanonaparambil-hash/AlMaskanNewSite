'use strict';
(() => {
  const places = [
    {id:'courtyard', title:'Courtyard block', subtitle:'The larger courtyard', x:.30, y:.27, bounds:[.075,.115,.465,.365], polygon:'88,130 302,72 529,106 529,145 453,200 252,256 101,185', description:'Explore the large block and the landscaped courtyard at its heart.'},
    {id:'gardens', title:'Pool & gardens', subtitle:'A closer look at the landscape', x:.35, y:.43, bounds:[.25,.36,.18,.16], polygon:'262,237 378,206 418,233 347,272 289,291 258,274', description:'Move closer to the pool, walking paths, and surrounding greenery.'},
    {id:'central', title:'Central block', subtitle:'Along the central avenue', x:.563, y:.345, bounds:[.475,.22,.185,.245], polygon:'485,178 600,130 639,142 637,205 537,254 485,235', description:'Inspect the central building and its connection to the surrounding paths.'},
    {id:'court', title:'Sports court', subtitle:'The outdoor playing area', x:.628, y:.44, bounds:[.535,.35,.19,.18], polygon:'542,250 635,211 711,237 635,286 596,277', description:'Focus on the outdoor court and the buildings around it.'},
    {id:'right', title:'Right-side block', subtitle:'At the edge of the site', x:.775, y:.46, bounds:[.66,.325,.225,.285], polygon:'671,253 773,188 867,213 831,286 771,331 677,297', description:'Explore the stepped roofs and landscaped edges on the right side of the image.'},
    {id:'landmark', title:'Front landmark', subtitle:'The foreground building', x:.61, y:.62, bounds:[.525,.505,.165,.205], polygon:'539,327 613,290 636,296 648,291 657,317 675,329 669,368 635,393 591,387 549,361', description:'Take a closer look at the distinctive building near the front of the site.'}
  ];
  const $ = id => document.getElementById(id);
  const viewport = $('viewport'), scene = $('scene'), img = $('masterplan');
  const W = 2752, H = 1536, MAX_ZOOM = 6;
  let width = 1, height = 1, fit = 1, current = {x:0,y:0,s:1}, active = null, raf = 0, ready = false;
  let cameraTarget=null;
  const maximumScale=()=>Math.max(fit,Math.min(fit*MAX_ZOOM,1.75/(window.devicePixelRatio||1)));
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let drag = null, pointers = new Map(), pinch = null;
  const clamp = (v,min,max) => Math.min(max,Math.max(min,v));
  const getPlace = id => places.find(p=>p.id===id);
  places.forEach((p,i) => {
    const num = String(i+1).padStart(2,'0');
    const button = document.createElement('button');
    button.className='place'; button.dataset.place=p.id; button.setAttribute('aria-pressed','false');
    button.innerHTML=`<span class="place-num">${num}</span><span class="place-text"><span class="place-title">${p.title}</span><span class="place-subtitle">${p.subtitle}</span></span><svg aria-hidden="true"><use href="#i-arrow"/></svg>`;
    button.addEventListener('click',()=>focusPlace(p)); $('places').append(button);
    const marker = document.createElement('button');
    marker.className='marker'; marker.style.left=`${p.x*100}%`; marker.style.top=`${p.y*100}%`; marker.dataset.place=p.id;
    marker.setAttribute('aria-label',`Focus on ${p.title}`); marker.setAttribute('aria-pressed','false');
    marker.innerHTML=`<span class="dot">${num}</span><span class="label">${p.title}</span>`;
    marker.addEventListener('click',e=>{e.stopPropagation();if(e.pointerType!=='touch')focusPlace(p)});
    marker.addEventListener('pointerenter',()=>document.querySelector(`[data-outline="${p.id}"]`).classList.add('hovered'));
    marker.addEventListener('pointerleave',()=>document.querySelector(`[data-outline="${p.id}"]`).classList.remove('hovered'));
    $('markers').append(marker);
    const polygon = document.createElementNS('http://www.w3.org/2000/svg','polygon');
    polygon.setAttribute('points',p.polygon);polygon.dataset.outline=p.id; $('outlines').append(polygon);
  });
  function constrain(view) {
    const s=clamp(view.s,fit,maximumScale()), sw=W*s, sh=H*s;
    return {s,x:sw<=width?(width-sw)/2:clamp(view.x,width-sw,0),y:sh<=height?(height-sh)/2:clamp(view.y,height-sh,0)};
  }
  function draw() {
    scene.style.transform=`translate(${current.x}px,${current.y}px) scale(${current.s})`;
    scene.style.setProperty('--inverse-scale',1/current.s);
    const zoom=current.s/fit;
    $('zoom-label').textContent=`${zoom.toFixed(1)}×`;
    $('zoom-out').disabled=zoom<=1.001; $('zoom-in').disabled=current.s>=maximumScale()-.001;
    $('image-detail-note').textContent=current.s*(window.devicePixelRatio||1)>1.05?'· enlarged view':'· fixed aerial perspective';
    const left=clamp(-current.x/(W*current.s),0,1), top=clamp(-current.y/(H*current.s),0,1);
    const right=clamp((width-current.x)/(W*current.s),0,1), bottom=clamp((height-current.y)/(H*current.s),0,1);
    Object.assign($('minimap-frame').style,{left:`${left*100}%`,top:`${top*100}%`,width:`${(right-left)*100}%`,height:`${(bottom-top)*100}%`});
  }
  function move(view,animate=true,duration=650) {
    cancelAnimationFrame(raf); const target=constrain(view);cameraTarget=target;
    if(!animate||reducedMotion.matches){current=target;cameraTarget=null;draw();return}
    const start={...current}, began=performance.now();
    const tick=time=>{const t=clamp((time-began)/duration,0,1), ease=1-Math.pow(1-t,4); current={x:start.x+(target.x-start.x)*ease,y:start.y+(target.y-start.y)*ease,s:start.s+(target.s-start.s)*ease};draw();if(t<1)raf=requestAnimationFrame(tick);else cameraTarget=null};
    raf=requestAnimationFrame(tick);
  }
  function select(p) {
    active=p?p.id:null;
    document.querySelectorAll('[data-place]').forEach(b=>{const selected=b.dataset.place===active;b.classList.toggle('active',selected);b.classList.toggle('selected',selected);b.setAttribute('aria-pressed',String(selected))});
    document.querySelectorAll('[data-outline]').forEach(b=>b.classList.toggle('selected',b.dataset.outline===active));
    $('focus-name').textContent=p?p.title:'Full masterplan'; $('focus-card').hidden=!p;
    if(p){$('focus-number').textContent=`PLACE ${String(places.indexOf(p)+1).padStart(2,'0')} / 06`;$('focus-title').textContent=p.title;$('focus-description').textContent=p.description}
  }
  function focusPlace(p,animate=true) {
    if(!ready)return; select(p);
    const [bx,by,bw,bh]=p.bounds;
    const s=clamp(Math.min(width*.75/(bw*W),height*.68/(bh*H)),fit,maximumScale());
    move({x:width/2-(bx+bw/2)*W*s,y:height*.45-(by+bh/2)*H*s,s},animate);
    $('announcement').textContent=`Focused on ${p.title}. Drag to explore nearby, or reset to the full overview.`;
  }
  function reset(animate=true){if(!ready)return;select(null);move({x:(width-W*fit)/2,y:(height-H*fit)/2,s:fit},animate);$('announcement').textContent='Full masterplan overview.'}
  function zoomAt(factor,x=width/2,y=height/2,animate=true){
    if(!ready)return;const base=animate&&cameraTarget?cameraTarget:current,s=clamp(base.s*factor,fit,maximumScale()), ratio=s/base.s;
    move({x:x-(x-base.x)*ratio,y:y-(y-base.y)*ratio,s},animate,240);
    if(s<=fit*1.001)select(null);
  }
  function resize(){
    const rect=viewport.getBoundingClientRect(),oldFit=fit,oldWidth=width,oldHeight=height;
    width=rect.width;height=rect.height;if(!width||!height)return;
    fit=Math.min(width/W,height/H);
    if(!ready)return;
    if(current.s/oldFit>1.02){const wx=(oldWidth/2-current.x)/current.s,wy=(oldHeight/2-current.y)/current.s,s=fit*current.s/oldFit;move({x:width/2-wx*s,y:height/2-wy*s,s},false)}
    else reset(false);
  }
  function initialize(){if(ready||!img.naturalWidth)return;ready=true;resize();reset(false);$('loading').hidden=true}
  img.addEventListener('load',initialize);img.addEventListener('error',()=>{$('loading').textContent='The masterplan could not load. Please refresh to try again.'});if(img.complete)initialize();
  new ResizeObserver(resize).observe(viewport);
  const relative=e=>{const r=viewport.getBoundingClientRect();return{x:e.clientX-r.left,y:e.clientY-r.top}};
  function startPinch(){const [a,b]=[...pointers.values()];pinch={distance:Math.hypot(a.x-b.x,a.y-b.y),center:{x:(a.x+b.x)/2,y:(a.y+b.y)/2},view:{...current}}}
  viewport.addEventListener('pointerdown',e=>{
    if(!ready||e.button!==0||(e.target.closest('button')&&e.pointerType!=='touch'))return;
    cancelAnimationFrame(raf);cameraTarget=null;viewport.focus({preventScroll:true});
    const pos=relative(e);pointers.set(e.pointerId,pos);viewport.setPointerCapture(e.pointerId);
    if(pointers.size===1)drag={start:pos,view:{...current},moved:false,outline:e.target.closest('[data-place]')?.dataset.place||e.target.dataset.outline};
    if(pointers.size>=2){drag.moved=true;startPinch()}
  });
  viewport.addEventListener('pointermove',e=>{
    if(!pointers.has(e.pointerId))return;const pos=relative(e);pointers.set(e.pointerId,pos);
    if(pointers.size>=2&&pinch){const [a,b]=[...pointers.values()],center={x:(a.x+b.x)/2,y:(a.y+b.y)/2},s=clamp(pinch.view.s*Math.hypot(a.x-b.x,a.y-b.y)/Math.max(pinch.distance,1),fit,maximumScale()),ratio=s/pinch.view.s;
      move({x:center.x-(pinch.center.x-pinch.view.x)*ratio,y:center.y-(pinch.center.y-pinch.view.y)*ratio,s},false);return}
    if(drag){const dx=pos.x-drag.start.x,dy=pos.y-drag.start.y;if(Math.hypot(dx,dy)>6)drag.moved=true;if(drag.moved){viewport.classList.add('dragging');move({x:drag.view.x+dx,y:drag.view.y+dy,s:drag.view.s},false)}}
  });
  function endPointer(e,cancelled=false){
    if(!pointers.has(e.pointerId))return;const pos=pointers.get(e.pointerId);pointers.delete(e.pointerId);
    if(viewport.hasPointerCapture(e.pointerId))viewport.releasePointerCapture(e.pointerId);
    if(pointers.size===1){pinch=null;drag={start:[...pointers.values()][0],view:{...current},moved:true};return}
    if(pointers.size===0){if(drag&&!drag.moved&&!cancelled){if(drag.outline)focusPlace(getPlace(drag.outline));else {select(null);const s=clamp(Math.max(current.s*1.35,fit*2.4),fit,fit*MAX_ZOOM),wx=(pos.x-current.x)/current.s,wy=(pos.y-current.y)/current.s;move({x:width/2-wx*s,y:height/2-wy*s,s});$('focus-name').textContent='Custom view'}}drag=null;pinch=null;viewport.classList.remove('dragging')}
  }
  viewport.addEventListener('pointerup',e=>endPointer(e));viewport.addEventListener('pointercancel',e=>endPointer(e,true));
  viewport.addEventListener('lostpointercapture',e=>{if(pointers.has(e.pointerId))endPointer(e,true)});
  viewport.addEventListener('wheel',e=>{e.preventDefault();const pos=relative(e);const delta=e.deltaY*(e.deltaMode===1?16:e.deltaMode===2?height:1);zoomAt(Math.exp(-clamp(delta,-180,180)*.002),pos.x,pos.y,true)},{passive:false});
  viewport.addEventListener('keydown',e=>{
    if(e.target!==viewport)return;
    const pans={ArrowLeft:[70,0],ArrowRight:[-70,0],ArrowUp:[0,70],ArrowDown:[0,-70]};
    if(pans[e.key]){e.preventDefault();const[dx,dy]=pans[e.key];move({...current,x:current.x+dx,y:current.y+dy},false)}
    else if(e.key==='+'||e.key==='='){e.preventDefault();zoomAt(1.35)}else if(e.key==='-'){e.preventDefault();zoomAt(1/1.35)}else if(e.key==='Home'){e.preventDefault();reset()}
  });
  document.addEventListener('keydown',e=>{if(e.key==='Escape')reset()});
  ['reset','fit','back-overview'].forEach(id=>$(id).addEventListener('click',()=>reset()));
  $('brand-home').addEventListener('click',e=>{e.preventDefault();reset()});
  $('zoom-in').addEventListener('click',()=>zoomAt(1.4));$('zoom-out').addEventListener('click',()=>zoomAt(1/1.4));
  $('toggle-markers').addEventListener('click',()=>{const on=$('toggle-markers').getAttribute('aria-pressed')!=='true';$('toggle-markers').setAttribute('aria-pressed',String(on));$('toggle-markers').querySelector('span').textContent=on?'Places on':'Places off';scene.classList.toggle('markers-hidden',!on)});
  $('minimap').addEventListener('click',e=>{if(e.detail===0){viewport.focus();return}const r=$('minimap').getBoundingClientRect(),nx=(e.clientX-r.left)/r.width,ny=(e.clientY-r.top)/r.height;select(null);const s=Math.max(current.s,fit*2);move({x:width/2-clamp(nx,0,1)*W*s,y:height/2-clamp(ny,0,1)*H*s,s});$('focus-name').textContent='Custom view'});
  if(matchMedia('(pointer: coarse)').matches)$('viewer-help').querySelector('span').innerHTML='<b>Drag</b> to move <i>·</i> <b>Pinch</b> to zoom <i>·</i> <b>Tap</b> a place';
})();
