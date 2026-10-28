'use strict';
(() => {
  const $=id=>document.getElementById(id), video=$('tour-video'), pane=$('tour-pane'), frame=$('tour-frame');
  const chapters=[
    {title:'Whole site',time:1}, {title:'Central avenue',time:24},
    {title:'Sunset landmark',time:31.5}, {title:'Site & surrounding roads',time:36},
    {title:'Sports court',time:58.5}, {title:'Night surroundings',time:69},
    {title:'Overhead at night',time:79}
  ];
  const aerialRanges=[[.5,4.8],[24,25.8],[30.5,32.5],[33,37.5],[56.2,59.3],[65.5,76.8],[77.5,83.3]];
  const clamp=(v,a,b)=>Math.min(b,Math.max(a,v));
  const clock=s=>`${Math.floor(Math.max(0,s)/60)}:${String(Math.floor(Math.max(0,s)%60)).padStart(2,'0')}`;
  let duration=0, desired=.5, pendingSeek=null, mode='plan', playing=false, zoom=1, pan={x:0,y:0};
  let pointerStart=null,pinch=null,pointers=new Map(),seekIndicator=0;
  function ranges(){const end=Math.max(0,duration-.05);return $('tour-aerial').checked?aerialRanges.map(([a,b])=>[a,Math.min(b,end)]).filter(([a,b])=>b>a):[[0,end]]}
  function total(){return ranges().reduce((n,[a,b])=>n+b-a,0)}
  function toVirtual(time){let sum=0;for(const[a,b]of ranges()){if(time<a)return sum;if(time<=b)return sum+time-a;sum+=b-a}return sum}
  function fromVirtual(pos){const list=ranges();if(!list.length)return 0;let left=clamp(pos,0,total());for(const[a,b]of list){if(left<b-a)return a+left;left-=b-a}return list.at(-1)[1]}
  function allowedTime(time){for(const[a,b]of ranges()){if(time<a)return a;if(time<=b)return time}return ranges().at(-1)?.[1]||0}
  function update(time=desired){
    const length=total(),progress=length?clamp(toVirtual(time)/length,0,1):0;
    $('tour-timeline').value=Math.round(progress*1000);$('tour-timeline').style.setProperty('--tour-progress',`${progress*100}%`);
    $('tour-timeline').setAttribute('aria-valuetext',`${clock(toVirtual(time))} of ${clock(length)}`);
    $('tour-time').textContent=`${clock(toVirtual(time))} / ${clock(length)}`;
    let idx=0;chapters.forEach((c,i)=>{if(time>=c.time-.6)idx=i});
    const interior=!$('tour-aerial').checked&&!aerialRanges.some(([a,b])=>time>=a&&time<=b);
    $('tour-title').textContent=interior?'Interiors & amenities':chapters[idx].title;$('tour-counter').textContent=interior?'FULL FILM':`${String(idx+1).padStart(2,'0')} / 07`;
    document.querySelectorAll('.tour-chapter').forEach((b,i)=>{const selected=!interior&&i===idx;b.classList.toggle('active',selected);b.setAttribute('aria-pressed',String(selected))});
    $('tour-play').textContent=playing?'Pause tour':'Play tour';$('tour-play').setAttribute('aria-label',playing?'Pause video':'Play video');
    $('tour-status').textContent=playing?'Playing the recorded tour':$('tour-aerial').checked?'Scroll through the site and surroundings':'Scroll through the complete film';
  }
  function loading(on,text='Loading this view…'){$('tour-loading').textContent=text;$('tour-loading').hidden=!on}
  function flushSeek(){
    if(!duration||pendingSeek===null||video.seeking)return;
    const time=pendingSeek;pendingSeek=null;
    if(Math.abs(video.currentTime-time)<.025){update();return}
    try{video.currentTime=time;clearTimeout(seekIndicator);seekIndicator=setTimeout(()=>{if(video.seeking&&mode==='tour')loading(true)},500)}catch{pendingSeek=time}
  }
  function pause(){playing=false;video.pause();update()}
  function seek(time,stop=true){if(!duration)return;if(stop)pause();desired=clamp(time,0,duration-.05);pendingSeek=desired;update();flushSeek()}
  function scrollBy(seconds){if(!duration)return;seek(fromVirtual(toVirtual(desired)+seconds))}
  function setMode(next,focus=false){
    mode=next;document.body.dataset.mode=next;pane.hidden=next!=='tour';
    ['plan','tour'].forEach(m=>{$(`mode-${m}`).setAttribute('aria-selected',String(next===m));$(`mode-${m}`).tabIndex=next===m?0:-1});
    $('viewport').inert=next==='tour';$('viewport').setAttribute('aria-hidden',String(next==='tour'));
    $('sidebar-kicker').textContent=next==='tour'?'THE SITE, IN MOTION':'DISCOVER THE DETAILS';
    $('sidebar-heading').innerHTML=next==='tour'?'A closer look.<br>A wider view.':'Explore<br>your masterplan.';
    $('sidebar-description').textContent=next==='tour'?'Real footage. Explore at your own pace.':'Choose a place. Take a closer look.';
    if(next==='plan')pause();else{if(video.readyState<2)loading(true,'Preparing your tour…');else loading(false);flushSeek()}
    if(focus)$(next==='tour'?'tour-pane':'viewport').focus({preventScroll:true});
  }
  ['plan','tour'].forEach(m=>$(`mode-${m}`).addEventListener('click',()=>setMode(m)));
  document.querySelector('.mode-tabs').addEventListener('keydown',e=>{if(['ArrowLeft','ArrowRight','Home','End'].includes(e.key)){e.preventDefault();setMode(e.key==='Home'?'plan':e.key==='End'?'tour':mode==='plan'?'tour':'plan');$(`mode-${mode}`).focus()}});
  $('tour-invitation').addEventListener('click',()=>setMode('tour',true));
  chapters.forEach((chapter,index)=>{const b=document.createElement('button');b.className='tour-chapter';b.dataset.time=chapter.time;b.setAttribute('aria-pressed','false');b.innerHTML=`<img class="chapter-thumb" src="chapter-${String(index+1).padStart(2,'0')}.jpg" alt="" loading="lazy"><span class="chapter-copy"><strong>${chapter.title}</strong><small>${clock(chapter.time)} · Recorded view</small></span><span class="chapter-index">${String(index+1).padStart(2,'0')}</span>`;b.addEventListener('click',()=>{setMode('tour');seek(allowedTime(chapter.time));resetZoom();$('tour-announcement').textContent=`${chapter.title}, ${clock(chapter.time)} in the film.`});$('tour-places').append(b)});
  function metadata(){duration=video.duration;if(!Number.isFinite(duration)||duration<=0){duration=0;return}desired=allowedTime(desired);pendingSeek=desired;flushSeek();update()}
  video.addEventListener('loadedmetadata',metadata);if(video.readyState>=1)metadata();
  video.addEventListener('loadeddata',()=>{loading(false);flushSeek()});
  video.addEventListener('canplay',()=>{loading(false);flushSeek()});
  video.addEventListener('seeked',()=>{clearTimeout(seekIndicator);loading(false);if(pendingSeek!==null)flushSeek();else update()});
  video.addEventListener('error',()=>{pause();loading(true,'This video could not load. Refresh the page to try again.');$('tour-announcement').textContent='Video unavailable. You can still explore the masterplan.'});
  video.addEventListener('waiting',()=>{if(playing)loading(true)});
  video.addEventListener('playing',()=>loading(false));
  video.addEventListener('timeupdate',()=>{
    if(!playing||video.seeking)return;
    desired=video.currentTime;
    if($('tour-aerial').checked){const list=ranges(),i=list.findIndex(([a,b])=>desired>=a-.02&&desired<b-.02);
      if(i===-1){const next=list.find(([a])=>a>desired);if(next){seek(next[0],false);return}else{pause();desired=list.at(-1)[1];update();return}}
    }
    update();
  });
  video.addEventListener('ended',()=>{playing=false;desired=ranges().at(-1)?.[1]||0;update()});
  async function play(){
    if(!duration||video.error)return;
    if(playing){pause();return}
    if(toVirtual(desired)>=total()-.2)seek(fromVirtual(0));
    playing=true;update();
    try{await video.play();if(mode!=='tour'||!playing)video.pause()}catch{playing=false;update();$('tour-announcement').textContent='Playback could not start. Use the timeline or try Play again.'}
  }
  $('tour-play').addEventListener('click',play);
  $('tour-timeline').addEventListener('input',e=>seek(fromVirtual(Number(e.target.value)/1000*total())));
  $('tour-aerial').addEventListener('change',()=>{seek(allowedTime(desired));$('tour-announcement').textContent=$('tour-aerial').checked?'Showing aerial views only.':'Showing the complete film, including interiors.'});
  pane.addEventListener('wheel',e=>{if(e.target.closest('input,button,label'))return;e.preventDefault();const d=(e.deltaY||e.deltaX)*(e.deltaMode===1?16:e.deltaMode===2?600:1);scrollBy(clamp(d,-250,250)*.012)},{passive:false});
  function resetTour(){pause();resetZoom();seek(fromVirtual(0));$('tour-announcement').textContent='Tour returned to the beginning.'}
  $('tour-reset').addEventListener('click',resetTour);
  ['reset','brand-home'].forEach(id=>$(id).addEventListener('click',()=>{if(mode==='tour')resetTour()}));
  pane.addEventListener('keydown',e=>{if(e.target.closest('button,input'))return;
    if(e.key===' '){e.preventDefault();play()}else if(['ArrowRight','ArrowDown'].includes(e.key)){e.preventDefault();scrollBy(1)}else if(['ArrowLeft','ArrowUp'].includes(e.key)){e.preventDefault();scrollBy(-1)}else if(e.key==='Home'){e.preventDefault();resetTour()}else if(e.key==='End'){e.preventDefault();seek(fromVirtual(total()))}else if(e.key==='+'||e.key==='='){e.preventDefault();setZoom(zoom+.2)}else if(e.key==='-'){e.preventDefault();setZoom(zoom-.2)}else if(e.key==='Escape'){resetZoom()}
  });
  function drawZoom(){
    const r=frame.getBoundingClientRect(),fit=Math.min(r.width/(video.videoWidth||1600),r.height/(video.videoHeight||900));
    const overX=Math.max(0,(video.videoWidth||1600)*fit*zoom-r.width)/2,overY=Math.max(0,(video.videoHeight||900)*fit*zoom-r.height)/2;
    pan.x=clamp(pan.x,-overX,overX);pan.y=clamp(pan.y,-overY,overY);
    video.style.transform=`translate(${pan.x}px,${pan.y}px) scale(${zoom})`;
    $('tour-zoom-value').textContent=`${zoom.toFixed(1)}×`;$('tour-zoom-in').disabled=zoom>=2;$('tour-zoom-out').disabled=zoom<=1;
    frame.style.cursor=zoom>1?'grab':'ew-resize';
  }
  function setZoom(next){zoom=clamp(next,1,2);drawZoom()}
  function resetZoom(){zoom=1;pan={x:0,y:0};drawZoom()}
  $('tour-zoom-in').addEventListener('click',()=>setZoom(zoom+.2));$('tour-zoom-out').addEventListener('click',()=>setZoom(zoom-.2));$('tour-zoom-reset').addEventListener('click',resetZoom);
  const pos=e=>({x:e.clientX,y:e.clientY});
  function beginPinch(){const[a,b]=[...pointers.values()];pinch={distance:Math.hypot(a.x-b.x,a.y-b.y),zoom,pan:{...pan},cx:(a.x+b.x)/2,cy:(a.y+b.y)/2};pointerStart=null}
  frame.addEventListener('pointerdown',e=>{if(e.button!==0)return;pause();frame.setPointerCapture(e.pointerId);pointers.set(e.pointerId,pos(e));if(pointers.size===1)pointerStart={...pos(e),pan:{...pan},position:toVirtual(desired),zoom};else beginPinch()});
  frame.addEventListener('pointermove',e=>{
    if(!pointers.has(e.pointerId))return;pointers.set(e.pointerId,pos(e));
    if(pointers.size>=2&&pinch){const[a,b]=[...pointers.values()];zoom=clamp(pinch.zoom*Math.hypot(a.x-b.x,a.y-b.y)/Math.max(pinch.distance,1),1,2);pan={x:pinch.pan.x+(a.x+b.x)/2-pinch.cx,y:pinch.pan.y+(a.y+b.y)/2-pinch.cy};drawZoom();return}
    if(!pointerStart)return;const dx=e.clientX-pointerStart.x,dy=e.clientY-pointerStart.y;
    if(zoom>1){pan={x:pointerStart.pan.x+dx,y:pointerStart.pan.y+dy};drawZoom()}else{const delta=Math.abs(dx)>Math.abs(dy)?-dx:-dy;seek(fromVirtual(pointerStart.position+delta*.025))}
  });
  function release(e){pointers.delete(e.pointerId);if(frame.hasPointerCapture(e.pointerId))frame.releasePointerCapture(e.pointerId);pinch=null;if(pointers.size===1){const p=[...pointers.values()][0];pointerStart={...p,pan:{...pan},position:toVirtual(desired),zoom}}else pointerStart=null}
  frame.addEventListener('pointerup',release);frame.addEventListener('pointercancel',release);frame.addEventListener('lostpointercapture',e=>{if(pointers.has(e.pointerId))release(e)});
  new ResizeObserver(drawZoom).observe(frame);
  document.addEventListener('visibilitychange',()=>{if(document.hidden)pause()});
  if(matchMedia('(pointer:coarse)').matches)$('tour-keyboard-help').textContent='Swipe to explore · Pinch to zoom';
  update();drawZoom();
})();
