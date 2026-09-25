/* AI Companion - app.js
   - ข้อมูลตัวละครทั้งหมดเก็บใน array นี้ เพิ่ม/ลบง่าย
   - แชตเป็นเดโม: คำตอบจำลองจาก templates
   - localStorage keys: ai_companion_history, ai_companion_chats
   - TODO: CONNECT REAL AI API HERE -> ดูฟังก์ชัน sendMessage()
*/

const CHARACTERS = [
  {
    id: 'mika', name: 'มิกะ', age: 24, personality: 'คนขี้เล่น', relation: 'เพื่อนคุย',
    quote: 'ว่างคุยเป็นเพื่อนไหม? เราเล่นมุกได้ทั้งวันเลยนะ',
    tags: ['ขี้เล่น','อารมณ์ดี','มุกเสี่ยว','เกม'],
    bio: 'สาวโปรแกรมเมอร์สายเกม ชอบทำมีม ชวนคุยเรื่องเกมอินดี้และอนิเมะได้ไม่เบื่อ เธอเชื่อว่าการหัวเราะคือดีบักชีวิตที่ดีที่สุด',
    greeting: 'เฮ้! มิคะเองงง วันนี้อยากเมาท์เรื่องอะไรดี? มีมใหม่เพิ่งทำเสร็จเลยนะ 😆',
    img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&h=700&fit=crop'
  },
  {
    id: 'arin', name: 'อาริน', age: 26, personality: 'คนรับฟัง', relation: 'คนรับฟัง',
    quote: 'เหนื่อยใช่ไหม มานั่งพักตรงนี้ก่อน เล่าให้ฟังได้นะ',
    tags: ['รับฟัง','ใจเย็น','ฮีลใจ','ชา'],
    bio: 'บาริสต้าสาย slow life ฟังเก่ง ไม่ตัดสิน ชอบชวนทำ breathing exercise และชงชาเสมือนให้ฟัง',
    greeting: 'สวัสดีค่ะ อารินนะ วันนี้เป็นยังไงบ้าง เหนื่อยมากไหม มาแชร์กันได้นะคะ 🍵',
    img: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&h=700&fit=crop'
  },
  {
    id: 'jay', name: 'เจ', age: 27, personality: 'ที่ปรึกษา', relation: 'ที่ปรึกษา',
    quote: 'ไอเดียดีแล้ว ขาดแค่แผน ลองแตกเป็นขั้นเล็กๆด้วยกันไหม',
    tags: ['ที่ปรึกษา','โฟกัส','งาน','โปรดักทีฟ'],
    bio: 'อดีตสตาร์ทอัพ PM ชอบช่วยจัดระบบความคิด ใช้เฟรมเวิร์กง่ายๆ ไม่สอนสั่ง แต่ถามคำถามดีๆ',
    greeting: 'หวัดดี เจเอง มีอะไรค้างในหัวอยู่ใช่ไหม ลองเล่ามา เรามาจัดลำดับด้วยกัน',
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=700&fit=crop'
  },
  {
    id: 'luna', name: 'ลูน่า', age: 22, personality: 'คนขี้เล่น', relation: 'roleplay',
    quote: 'คืนนี้ดาวเต็มฟ้า มาเขียนเรื่องผจญภัยในอวกาศด้วยกันไหม?',
    tags: ['โรลเพลย์','แฟนตาซี','เขียนเรื่อง','ดวงดาว'],
    bio: 'นักเขียนนิยายแฟนตาซี ชวนโรลเพลย์สร้างโลก เวทมนตร์ ยานอวกาศ ได้หมด แต่ยังคงขอบเขตปลอดภัยและสร้างสรรค์',
    greeting: 'ยินดีต้อนรับสู่อาณาจักรลูน่า! วันนี้อยากเป็นนักสำรวจดาว หรือจอมเวทย์ฝึกหัดดี? ✨',
    img: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&h=700&fit=crop'
  },
  {
    id: 'nont', name: 'นนท์', age: 25, personality: 'เพื่อนคุย', relation: 'เพื่อนคุย',
    quote: 'เพลงใหม่เพิ่งดรอป ฟังด้วยกันไหม',
    tags: ['ดนตรี','กีตาร์','อินดี้','ชิล'],
    bio: 'มือกีตาร์ร้านกาแฟ ชอบแชร์เพลย์ลิสต์ แต่งเนื้อเพลงสั้นๆ ให้กำลังใจ',
    greeting: 'โย่ว นนท์เอง เพิ่งแกะเพลงใหม่เสร็จ อยากฟังเวอร์ชั่นเดโมไหม?',
    img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&h=700&fit=crop'
  },
  {
    id: 'sai', name: 'ทราย', age: 28, personality: 'คนรับฟัง', relation: 'ที่ปรึกษา',
    quote: 'ความรู้สึกทุกอย่างมีที่มา เราค่อยๆ แกะมันด้วยกันนะ',
    tags: ['รับฟัง','ใจเย็น','จิตวิทยา','บันทึก'],
    bio: 'สาย journaling และการสื่อสารเชิงบวก ชวนเขียนบันทึกความรู้สึกแบบไม่ตัดสิน',
    greeting: 'สวัสดีค่ะ ทรายนะคะ วันนี้อยากลองเขียน 3 บรรทัดขอบคุณตัวเองด้วยกันไหม?',
    img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&h=700&fit=crop'
  },
  {
    id: 'ken', name: 'เคน', age: 29, personality: 'ที่ปรึกษา', relation: 'เพื่อนคุย',
    quote: 'วิ่ง 20 นาที สมองโล่งกว่ากาแฟ 2 แก้ว ลองไหม',
    tags: ['ฟิตเนส','วิ่ง','วินัย','สุขภาพ'],
    bio: 'โค้ชวิ่งสมัครเล่น ชอบชวนตั้งเป้าเล็กๆ ทำได้จริง ไม่กดดัน',
    greeting: 'เคนเอง! วันนี้ขยับตัวไปรึยัง? ถ้ายัง เรามาวอร์มเบาๆ 2 นาทีด้วยกันไหม?',
    img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&h=700&fit=crop'
  },
  {
    id: 'plao', name: 'เปล่า', age: 23, personality: 'คนขี้เล่น', relation: 'เพื่อนคุย',
    quote: 'เรื่องเครียดพักก่อน มาเล่นเกม 20 คำถามกัน!',
    tags: ['ขี้เล่น','เกมทาย','กวนๆ','มีม'],
    bio: 'เจ้าแม่เกมทายใจ ชอบชวนเล่นอะไรเบาสมองให้ยิ้มได้',
    greeting: 'เปล่ามาแล้ว! พร้อมโดนเราทายใจยัง? ถามอะไรมาก็ได้นะ เปล่าตอบได้หมด (แบบกวนๆ)',
    img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&h=700&fit=crop'
  },
  {
    id: 'mark', name: 'มาร์ค', age: 26, personality: 'ที่ปรึกษา', relation: 'roleplay',
    quote: 'สมมติคุณเป็น CEO ในปี 2030 คุณจะตัดสินใจยังไง?',
    tags: ['โรลเพลย์','ธุรกิจ','ไอเดีย','ซ้อมพรีเซนต์'],
    bio: 'สายโรลเพลย์เชิงธุรกิจและการพรีเซนต์ ช่วยซ้อมบทสนทนา สัมภาษณ์งาน แบบปลอดภัย',
    greeting: 'สวัสดีครับ มาร์คครับ วันนี้อยากซ้อมบทไหนดี? สัมภาษณ์งาน พรีเซนต์ หรือเจรจา?',
    img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&h=700&fit=crop'
  },
  {
    id: 'yui', name: 'ยุ้ย', age: 21, personality: 'เพื่อนคุย', relation: 'เพื่อนคุย',
    quote: 'อนิเมะเรื่องใหม่ดีมาก! ดูด้วยกันแล้วเมาท์กันไหม',
    tags: ['อนิเมะ','มังงะ','รีวิว','ขี้เล่น'],
    bio: 'โอตาคุสายรีวิว ชวนคุยอนิเมะ มังงะ แบบไม่มีสปอยล์แรง',
    greeting: 'ยุ้ยเอง! เมื่อคืนดูตอนจบแล้วกรี๊ดมาก อยากเมาท์ด้วยคนไหม?',
    img: 'https://images.unsplash.com/photo-1526510747491-58f928ec870f?w=600&h=700&fit=crop'
  },
  {
    id: 'poom', name: 'ภูมิ', age: 30, personality: 'คนรับฟัง', relation: 'คนรับฟัง',
    quote: 'ไม่ต้องรีบตอบตัวเองก็ได้ แค่ได้ระบายก็เก่งแล้ว',
    tags: ['รับฟัง','ธรรมชาติ','เดินทาง','ใจเย็น'],
    bio: 'ช่างภาพสายธรรมชาติ ชอบชวนมองฟ้า ฟังเสียงฝน คุยช้าๆ ฮีลๆ',
    greeting: 'สวัสดีครับ ภูมิครับ วันนี้ฟ้าที่คุณเป็นไงบ้าง? ของผมครึ้มๆ แต่สงบดี',
    img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&h=700&fit=crop'
  },
  {
    id: 'irin', name: 'ไอริน', age: 24, personality: 'เพื่อนคุย', relation: 'ที่ปรึกษา',
    quote: 'ภาษาอังกฤษวันละประโยค เริ่มจากเรื่องที่ชอบกันไหม',
    tags: ['ภาษา','ฝึกพูด','เรียน','เพื่อนคุย'],
    bio: 'ติวเตอร์ภาษาสายเป็นกันเอง ชวนฝึกพูดวันละนิด ไม่เน้นแกรมมาร์หนัก',
    greeting: 'Hi! ไอรินเอง วันนี้อยากฝึกประโยคไหนดี? เอาแบบใช้ได้จริงเลยนะ!',
    img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&h=700&fit=crop'
  }
];

const PERSONALITIES = ['เพื่อนคุย','คนรับฟัง','คนขี้เล่น','ที่ปรึกษา','roleplay'];
const RELATIONS = ['เพื่อนคุย','คนรับฟัง','คนขี้เล่น','ที่ปรึกษา','roleplay'];

// Templates ตอบกลับแบบเดโม
const DEMO_REPLIES = {
  general: [
    'เข้าใจเลย เรื่องแบบนี้มันทำให้คิดเยอะเนอะ อยากเล่าเพิ่มอีกนิดไหม?',
    'ขอบคุณที่แชร์นะ เราฟังอยู่นะ 🫶',
    'ถ้าลองมองอีกมุม คุณคิดว่าอะไรคือสิ่งเล็กๆ ที่ทำแล้วรู้สึกดีขึ้นได้วันนี้?',
    'โห เก่งมากที่ผ่านตรงนั้นมาได้ เล่าต่อได้เลยนะ',
  ],
  playful: [
    '555 มุกนี้ให้ 8/10 หัก 2 เพราะเล่นเร็วไป! ตาคุณบ้าง 😆',
    'ท้าเล่นเกม 20 คำถามไหม เราเริ่มก่อน: คุณกำลังคิดถึงของกินใช่ไหม?',
    'ถ้าความขี้เล่นมีหน่วยเป็นวัตต์ ตอนนี้คุณสว่างทั้งห้องแล้วนะ',
  ],
  listener: [
    'อืม… ฟังแล้วรู้สึกว่ามันหนักจริงๆนะ ไม่ต้องรีบหาคำตอบก็ได้',
    'เราอยู่ตรงนี้เป็นเพื่อนฟังนะ หายใจเข้าลึกๆด้วยกันสัก 3 ครั้งไหม?',
    'ขอบคุณที่ไว้ใจเล่าให้ฟังนะคะ',
  ],
  advisor: [
    'ลองแตกเป็น 3 ขั้นเล็กๆไหม: 1) สิ่งที่ทำได้ใน 5 นาที 2) ในวันนี้ 3) ในสัปดาห์นี้',
    'ไอเดียดีแล้ว! ถ้าจะทดสอบเร็วๆ คุณจะลองกับใครก่อนดี?',
    'สรุปสั้นๆให้: ปัญหาคือ A, เป้าคือ B, ก้าวแรกที่ทำได้เลยคือ C ว่ายังไง?',
  ],
  roleplay: [
    'รับบทแล้ว! [คุณยืนอยู่หน้าประตูคริสตัล เสียงลมพัดเบาๆ] คุณจะเปิดประตูหรือเคาะก่อนดี?',
    'โอเค สมมติผมเป็นลูกค้าที่เรื่องเยอะ คุณจะเริ่มบทสนทนาว่าไงดี? ลองเลย!',
  ]
};

let activeFilters = { personality: new Set(), relation: new Set(), q: '' };
let matchPref = { who: '', personality: new Set(), topic: '' };
let currentChatId = null;
let chatHistory = JSON.parse(localStorage.getItem('ai_companion_history')||'{}'); // {id: [{role, text, time}]}
let chatMeta = JSON.parse(localStorage.getItem('ai_companion_chats')||'{}'); // {id: lastTime}

function el(tag, cls, html){ const d=document.createElement(tag); if(cls) d.className=cls; if(html!==undefined) d.innerHTML=html; return d; }

function renderCard(c, showScore){
  const div = el('div','card reveal');
  const score = showScore ? `<span class="score">${showScore}% เข้ากัน</span>` : '';
  div.innerHTML = `
    <img class="card-img" src="${c.img}" alt="${c.name}" loading="lazy">
    <div class="card-body">
      <div class="card-top"><span class="card-name">${c.name}</span><span class="age">${c.age} • ${c.personality}</span>${score}</div>
      <div class="quote">"${c.quote}"</div>
      <div class="tags">
        ${c.tags.map(t=>`<span class="tag ${c.personality===t||c.relation===t?'personality':''}">${t}</span>`).join('')}
        <span class="tag relation">${c.relation}</span>
      </div>
    </div>`;
  div.addEventListener('click', ()=> openProfile(c.id));
  setTimeout(()=> div.classList.add('in'), 50);
  return div;
}

function getFiltered(){
  const q = activeFilters.q.toLowerCase().trim();
  return CHARACTERS.filter(c=>{
    if(activeFilters.personality.size && !activeFilters.personality.has(c.personality)) return false;
    if(activeFilters.relation.size && !activeFilters.relation.has(c.relation)) return false;
    if(q){
      const hay = `${c.name} ${c.quote} ${c.bio} ${c.tags.join(' ')} ${c.personality} ${c.relation}`.toLowerCase();
      if(!hay.includes(q)) return false;
    }
    return true;
  });
}

function renderAll(){
  // home
  const home = document.getElementById('home-cards');
  home.innerHTML='';
  CHARACTERS.slice(0,6).forEach(c=> home.appendChild(renderCard(c)));
  // explore
  const exp = document.getElementById('explore-cards');
  exp.innerHTML='';
  const filtered = getFiltered();
  filtered.forEach(c=> exp.appendChild(renderCard(c)));
  if(filtered.length===0) exp.innerHTML='<div class="empty">ไม่พบตัวละครที่ตรงกับตัวกรอง ลองล้างตัวกรองดูนะ</div>';
  updateCount();
  ioObserve();
}

function buildChips(containerId, values, setRef){
  const cont = document.getElementById(containerId);
  cont.innerHTML='';
  values.forEach(v=>{
    const b = el('button','chip'+(setRef.has(v)?' active':''), v);
    b.onclick=()=>{
      if(setRef.has(v)) setRef.delete(v); else setRef.add(v);
      if(containerId.includes('personality')) {activeFilters.personality=setRef; if(containerId.startsWith('match')) matchPref.personality=setRef}
      if(containerId.includes('relation')) activeFilters.relation=setRef;
      buildChips(containerId, values, setRef);
      if(!containerId.startsWith('match')) renderAll();
    };
    cont.appendChild(b);
  });
}

function scoreCharacter(c, pref){
  let s=0;
  if(pref.who && c.relation===pref.who) s+=40;
  if(pref.who && c.personality===pref.who) s+=30;
  if(pref.personality.size){
    for(let p of pref.personality){ if(c.personality===p) s+=25; if(c.tags.includes(p)) s+=15; }
  }
  if(pref.topic){
    const t=pref.topic.toLowerCase();
    const hay=`${c.tags.join(' ')} ${c.bio} ${c.quote}`.toLowerCase();
    // simple keyword overlap
    t.split(/[\s,]+/).forEach(w=>{ if(w.length>1 && hay.includes(w)) s+=10; });
  }
  if(s>100) s=95+Math.random()*5|0;
  return Math.min(99, s|| (10+Math.random()*20|0));
}

function doMatch(){
  const who = document.getElementById('match-who').value;
  const topic = document.getElementById('match-topic').value;
  matchPref.who=who; matchPref.topic=topic;
  const scored = CHARACTERS.map(c=> ({c, sc: scoreCharacter(c, matchPref)})).sort((a,b)=>b.sc-a.sc);
  const cont = document.getElementById('match-cards');
  const empty = document.getElementById('match-empty');
  cont.innerHTML='';
  empty.style.display='none';
  scored.forEach(({c,sc})=> cont.appendChild(renderCard(c, sc)));
  ioObserve();
}

// PROFILE
function openProfile(id){
  const c = CHARACTERS.find(x=>x.id===id);
  if(!c) return;
  document.getElementById('pm-img').src=c.img;
  document.getElementById('pm-name').textContent=c.name;
  document.getElementById('pm-age').textContent=`${c.age} ปี • ${c.personality}`;
  document.getElementById('pm-quote').textContent=`"${c.quote}"`;
  document.getElementById('pm-tags').innerHTML=c.tags.map(t=>`<span class="tag">${t}</span>`).join('')+` <span class="tag relation">${c.relation}</span>`;
  document.getElementById('pm-personality').textContent=c.personality;
  document.getElementById('pm-relation').textContent=c.relation;
  document.getElementById('pm-greeting').textContent=c.greeting;
  document.getElementById('pm-bio').textContent=c.bio;
  document.getElementById('pm-chat-name').textContent=c.name;
  document.getElementById('pm-chat').onclick=()=>{ closeProfile(); openChat(c.id); };
  document.getElementById('profile-modal').classList.remove('hidden');
}
function closeProfile(){ document.getElementById('profile-modal').classList.add('hidden'); }

// CHAT
function openChat(id){
  const c = CHARACTERS.find(x=>x.id===id);
  if(!c) return;
  currentChatId=id;
  document.getElementById('chat-avatar').src=c.img;
  document.getElementById('chat-name').textContent=c.name;
  document.getElementById('chat-overlay').classList.remove('hidden');
  const box = document.getElementById('chat-messages');
  box.innerHTML='';
  if(!chatHistory[id]){
    chatHistory[id]=[{role:'bot', text:c.greeting, time: Date.now()}];
    chatMeta[id]=Date.now();
    persist();
  }
  chatHistory[id].forEach(m=> appendBubble(m.role, m.text, m.time, false));
  box.scrollTop=box.scrollHeight;
}

function closeChat(){ document.getElementById('chat-overlay').classList.add('hidden'); currentChatId=null; renderChatList(); }

function appendBubble(role, text, time, save=true){
  const box = document.getElementById('chat-messages');
  const wrap = el('div', `bubble ${role}`);
  wrap.innerHTML = `${escapeHtml(text)}<div class="bubble-time">${new Date(time).toLocaleTimeString('th-TH',{hour:'2-digit',minute:'2-digit'})}</div>`;
  box.appendChild(wrap);
  if(save && currentChatId){
    chatHistory[currentChatId].push({role, text, time});
    chatMeta[currentChatId]=time;
    persist();
  }
  box.scrollTop=box.scrollHeight;
}

function getDemoReply(character, userText){
  const t = userText.toLowerCase();
  if(/(เครียด|เหนื่อย|เศร้า|เหงา|ท้อ)/.test(t)) return rand(DEMO_REPLIES.listener);
  if(/(เล่น|เกม|ตลก|มุก|ขำ)/.test(t)) return rand(DEMO_REPLIES.playful);
  if(/(ทำไง|ช่วย|แผน|งาน|โปรเจค)/.test(t)) return rand(DEMO_REPLIES.advisor);
  if(/(โรล|สมมติ|บทบาท|เป็น)/.test(t)) return rand(DEMO_REPLIES.roleplay);
  const map = { 'คนขี้เล่น': 'playful', 'คนรับฟัง':'listener', 'ที่ปรึกษา':'advisor', 'roleplay':'roleplay' };
  const key = map[character.personality] || map[character.relation] || 'general';
  return rand(DEMO_REPLIES[key]||DEMO_REPLIES.general);
}

function sendMessage(){
  const input = document.getElementById('chat-input');
  const txt = input.value.trim();
  if(!txt || !currentChatId) return;
  const now=Date.now();
  appendBubble('user', txt, now);
  input.value='';
  const c = CHARACTERS.find(x=>x.id===currentChatId);

  // =========================
  // TODO: CONNECT REAL AI API HERE
  // เมื่อมี backend บน VPS ให้เปลี่ยนบล็อกนี้เป็นการ fetch
  // ตัวอย่าง:
  // const res = await fetch('https://your-vps.com/api/chat', {
  //   method:'POST',
  //   headers:{'Content-Type':'application/json'},
  //   body: JSON.stringify({ characterId: currentChatId, message: txt, history: chatHistory[currentChatId] })
  // });
  // const data = await res.json();
  // appendBubble('bot', data.reply, Date.now());
  // return;
  // =========================

  // เดโมตอบกลับจำลอง
  setTimeout(()=>{
    const reply = getDemoReply(c, txt);
    appendBubble('bot', reply, Date.now());
  }, 500+Math.random()*600);
}

function persist(){
  localStorage.setItem('ai_companion_history', JSON.stringify(chatHistory));
  localStorage.setItem('ai_companion_chats', JSON.stringify(chatMeta));
}

function renderChatList(){
  const list = document.getElementById('chat-list');
  const empty = document.getElementById('chat-empty');
  list.innerHTML='';
  const ids = Object.keys(chatMeta).sort((a,b)=> chatMeta[b]-chatMeta[a]);
  if(ids.length===0){ empty.style.display='block'; return; }
  empty.style.display='none';
  ids.forEach(id=>{
    const c = CHARACTERS.find(x=>x.id===id);
    if(!c) return;
    const last = chatHistory[id]?.[chatHistory[id].length-1]?.text||'';
    const item = el('div','chat-item');
    item.innerHTML=`<img src="${c.img}"><div><div style="font-weight:700">${c.name} <span class="badge-ai small">AI</span></div><div class="last">${escapeHtml(last)}</div></div>`;
    item.onclick=()=> openChat(id);
    list.appendChild(item);
  });
  updateCount();
}

function updateCount(){
  const cnt = Object.keys(chatMeta).length;
  document.getElementById('chat-count').textContent=cnt;
  document.getElementById('chat-count').style.display = cnt? 'inline-block':'none';
}

function rand(arr){ return arr[Math.floor(Math.random()*arr.length)]; }
function escapeHtml(s){ return s.replace(/[&<>\"']/g, m=> ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m])); }

function goTo(page){
  document.querySelectorAll('.nav-link').forEach(a=> a.classList.toggle('active', a.dataset.page===page));
  document.querySelectorAll('.page').forEach(p=> p.classList.toggle('active', p.id===`page-${page}`));
  window.location.hash=page;
  window.scrollTo({top:0, behavior:'smooth'});
  if(page==='chats') renderChatList();
}

function ioObserve(){
  const obs = new IntersectionObserver(es=> es.forEach(e=> { if(e.isIntersecting) e.target.classList.add('in'); }), {threshold:.15});
  document.querySelectorAll('.reveal:not(.in)').forEach(c=> obs.observe(c));
}

// EVENTS
window.addEventListener('DOMContentLoaded', ()=>{
  buildChips('personality-filters', PERSONALITIES, activeFilters.personality);
  buildChips('relation-filters', RELATIONS, activeFilters.relation);
  buildChips('match-personality', PERSONALITIES, matchPref.personality);

  document.getElementById('search-input').addEventListener('input', e=>{ activeFilters.q=e.target.value; renderAll(); });
  document.getElementById('clear-filters').onclick=()=>{ activeFilters={personality:new Set(), relation:new Set(), q:''}; document.getElementById('search-input').value=''; buildChips('personality-filters', PERSONALITIES, activeFilters.personality); buildChips('relation-filters', RELATIONS, activeFilters.relation); renderAll(); };
  document.getElementById('match-btn').onclick=doMatch;
  document.getElementById('match-who').onchange=e=> matchPref.who=e.target.value;
  document.getElementById('match-topic').oninput=e=> matchPref.topic=e.target.value;

  document.getElementById('modal-close').onclick=closeProfile;
  document.querySelector('.modal-backdrop').onclick=closeProfile;

  document.getElementById('chat-back').onclick=closeChat;
  document.getElementById('chat-send').onclick=sendMessage;
  document.getElementById('chat-input').addEventListener('keydown', e=> { if(e.key==='Enter') sendMessage(); });

  document.getElementById('clear-history').onclick=()=>{ if(confirm('ล้างประวัติแชตทั้งหมด?')){ chatHistory={}; chatMeta={}; persist(); renderChatList(); } };

  document.querySelectorAll('.nav-link, .mobile-menu a').forEach(a=> a.addEventListener('click', e=>{ e.preventDefault(); const p=a.dataset.page; goTo(p); document.getElementById('mobile-menu').style.display='none'; }));
  document.getElementById('hamburger').onclick=()=>{ const m=document.getElementById('mobile-menu'); m.style.display = m.style.display==='flex'?'none':'flex'; };

  const hash = (location.hash.replace('#','')||'home');
  goTo(['home','explore','match','chats'].includes(hash)?hash:'home');
  renderAll();
  renderChatList();
});
