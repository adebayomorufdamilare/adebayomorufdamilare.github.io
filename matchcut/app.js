import { TOOLS, MATRIX, PRIORITY_OVERRIDE, PROMPTS } from './data.js';

// ===== STATE =====
let selectedUseCase = null;
let selectedPriority = null;
let activeRegion = 'all';
let activeCategory = 'all';
let compareSet = new Set(JSON.parse(localStorage.getItem('matchcut_compare') || '[]'));
let shortlist = new Set(JSON.parse(localStorage.getItem('matchcut_shortlist') || '[]'));

const REGIONS = ['all','USA','China','UK','Global','Open-source'];
const CATEGORIES = ['all','cinematic','avatar','fast','ugc','multilingual','longform','budget','editing','aggregator'];

// ===== NAV / VIEW SWITCHING =====
document.querySelectorAll('.nav-link[data-view]').forEach(btn => {
  btn.addEventListener('click', () => setView(btn.dataset.view));
});

function setView(view){
  document.querySelectorAll('.view').forEach(v => v.classList.add('hidden'));
  document.getElementById(`view-${view}`).classList.remove('hidden');
  document.querySelectorAll('.nav-link[data-view]').forEach(b => b.classList.toggle('active', b.dataset.view === view));
  if(view === 'directory') renderDirectory();
  if(view === 'shortlist') renderShortlist();
  window.scrollTo({top:0, behavior:'smooth'});
}

// ===== MATCHER =====
document.querySelectorAll('#useCaseGrid .opt').forEach(el => {
  el.addEventListener('click', () => {
    document.querySelectorAll('#useCaseGrid .opt').forEach(o => o.classList.remove('selected'));
    el.classList.add('selected');
    selectedUseCase = el.dataset.value;
    maybeShowResult();
  });
});
document.querySelectorAll('#priorityGrid .opt').forEach(el => {
  el.addEventListener('click', () => {
    document.querySelectorAll('#priorityGrid .opt').forEach(o => o.classList.remove('selected'));
    el.classList.add('selected');
    selectedPriority = el.dataset.value;
    maybeShowResult();
  });
});

function maybeShowResult(){
  if(!selectedUseCase || !selectedPriority) return;
  let primaryKey = MATRIX[selectedUseCase].primary;
  let altKey = MATRIX[selectedUseCase].alt;
  if(selectedPriority !== 'quality' && PRIORITY_OVERRIDE[selectedPriority]?.[selectedUseCase]){
    const override = PRIORITY_OVERRIDE[selectedPriority][selectedUseCase];
    if(override !== primaryKey){ altKey = primaryKey; primaryKey = override; }
  }
  const primary = TOOLS[primaryKey];
  const alt = TOOLS[altKey];

  document.getElementById('toolName').textContent = primary.name;
  document.getElementById('toolOrigin').textContent = `${primary.flag} ${primary.origin}`;
  document.getElementById('toolFacts').innerHTML = `<span>${primary.price} ${primary.priceDetail}</span>` + primary.categories.map(c => `<span>${c}</span>`).join('');
  document.getElementById('toolWhy').textContent = primary.why;
  document.getElementById('altName').textContent = `${alt.flag} ${alt.name}`;
  document.getElementById('altWhy').textContent = alt.why;
  document.getElementById('promptText').value = PROMPTS[selectedUseCase](primary.name);

  const result = document.getElementById('result');
  result.classList.add('show');
  result.scrollIntoView({behavior:'smooth', block:'start'});
}

document.getElementById('copyBtn').addEventListener('click', () => {
  const ta = document.getElementById('promptText');
  ta.select();
  document.execCommand('copy');
  const btn = document.getElementById('copyBtn');
  const original = btn.textContent;
  btn.textContent = 'Copied!';
  setTimeout(() => btn.textContent = original, 1500);
});

document.getElementById('resetBtn').addEventListener('click', () => {
  selectedUseCase = null; selectedPriority = null;
  document.querySelectorAll('.opt').forEach(o => o.classList.remove('selected'));
  document.getElementById('result').classList.remove('show');
});

// ===== DIRECTORY =====
function buildFilters(){
  const regionEl = document.getElementById('regionFilters');
  regionEl.innerHTML = REGIONS.map(r => `<div class="filter-chip ${r==='all'?'active':''}" data-region="${r}">${r === 'all' ? 'All Regions' : r}</div>`).join('');
  regionEl.querySelectorAll('.filter-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      regionEl.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      activeRegion = chip.dataset.region;
      renderDirectory();
    });
  });

  const catEl = document.getElementById('categoryFilters');
  catEl.innerHTML = CATEGORIES.map(c => `<div class="filter-chip ${c==='all'?'active':''}" data-cat="${c}">${c === 'all' ? 'All Categories' : c}</div>`).join('');
  catEl.querySelectorAll('.filter-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      catEl.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      activeCategory = chip.dataset.cat;
      renderDirectory();
    });
  });
}
buildFilters();

document.getElementById('searchBox').addEventListener('input', renderDirectory);

function toolCardHTML(key, t){
  const isShortlisted = shortlist.has(key);
  const isCompared = compareSet.has(key);
  return `
    <div class="tool-card" data-key="${key}">
      <div class="tool-card-head">
        <h3>${t.name}</h3>
        <div class="tool-card-actions">
          <span class="flag">${t.flag}</span>
          <button class="icon-btn shortlist-btn ${isShortlisted ? 'active' : ''}" data-key="${key}" title="Save to shortlist">${isShortlisted ? '★' : '☆'}</button>
        </div>
      </div>
      <div class="${t.status === 'active' ? 'status-active' : 'status-discontinued'}">${t.status === 'active' ? '● Active' : '● Discontinued'}</div>
      <p class="desc">${t.why}</p>
      <div class="tag-row">${t.categories.map(c => `<span class="tag">${c}</span>`).join('')}</div>
      <div class="price-row">
        <span>${t.price} ${t.priceDetail} · ${t.origin}</span>
        <label style="display:flex;align-items:center;gap:6px;cursor:pointer;">
          <input type="checkbox" class="compare-check" data-key="${key}" ${isCompared ? 'checked' : ''} ${!isCompared && compareSet.size >= 4 ? 'disabled' : ''}>
          Compare
        </label>
      </div>
    </div>
  `;
}

function renderDirectory(){
  const query = (document.getElementById('searchBox').value || '').toLowerCase();
  const grid = document.getElementById('toolGrid');
  const entries = Object.entries(TOOLS).filter(([key, t]) => {
    const matchesRegion = activeRegion === 'all' || t.origin === activeRegion;
    const matchesCategory = activeCategory === 'all' || t.categories.includes(activeCategory);
    const matchesSearch = !query || t.name.toLowerCase().includes(query) || t.why.toLowerCase().includes(query) || t.categories.some(c => c.includes(query));
    return matchesRegion && matchesCategory && matchesSearch;
  });

  document.getElementById('noResults').classList.toggle('hidden', entries.length > 0);
  grid.innerHTML = entries.map(([key, t]) => toolCardHTML(key, t)).join('');
  wireCardEvents(grid);
}

function wireCardEvents(container){
  container.querySelectorAll('.shortlist-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const key = btn.dataset.key;
      if(shortlist.has(key)){ shortlist.delete(key); showToast(`Removed ${TOOLS[key].name} from shortlist`); }
      else { shortlist.add(key); showToast(`Saved ${TOOLS[key].name} to shortlist`); }
      localStorage.setItem('matchcut_shortlist', JSON.stringify([...shortlist]));
      updateShortlistCount();
      btn.classList.toggle('active');
      btn.textContent = shortlist.has(key) ? '★' : '☆';
    });
  });
  container.querySelectorAll('.compare-check').forEach(chk => {
    chk.addEventListener('change', () => {
      const key = chk.dataset.key;
      if(chk.checked){ compareSet.add(key); }
      else { compareSet.delete(key); }
      localStorage.setItem('matchcut_compare', JSON.stringify([...compareSet]));
      updateCompareBar();
      renderDirectory();
    });
  });
}

// ===== SHORTLIST VIEW =====
function renderShortlist(){
  const grid = document.getElementById('shortlistGrid');
  const keys = [...shortlist];
  document.getElementById('shortlistEmpty').classList.toggle('hidden', keys.length > 0);
  grid.innerHTML = keys.map(key => toolCardHTML(key, TOOLS[key])).join('');
  wireCardEvents(grid);
}

function updateShortlistCount(){
  document.getElementById('shortlistCount').textContent = shortlist.size;
}
updateShortlistCount();

// ===== COMPARE BAR & MODAL =====
function updateCompareBar(){
  const bar = document.getElementById('compareBar');
  const chips = document.getElementById('compareChips');
  const count = document.getElementById('compareCount');
  if(compareSet.size === 0){ bar.classList.add('hidden'); return; }
  bar.classList.remove('hidden');
  count.textContent = compareSet.size;
  chips.innerHTML = [...compareSet].map(key => `
    <span class="compare-chip">${TOOLS[key].flag} ${TOOLS[key].name}<button data-key="${key}">✕</button></span>
  `).join('');
  chips.querySelectorAll('button').forEach(b => {
    b.addEventListener('click', () => {
      compareSet.delete(b.dataset.key);
      localStorage.setItem('matchcut_compare', JSON.stringify([...compareSet]));
      updateCompareBar();
      renderDirectory();
    });
  });
}
updateCompareBar();

document.getElementById('compareOpenBtn').addEventListener('click', () => {
  const rows = [
    ['Origin', t => `${t.flag} ${t.origin}`],
    ['Status', t => t.status === 'active' ? 'Active' : 'Discontinued'],
    ['Price', t => `${t.price} ${t.priceDetail}`],
    ['Open Source', t => t.openSource ? 'Yes' : 'No'],
    ['Languages', t => t.languages],
    ['Speed', t => t.speed],
    ['Categories', t => t.categories.join(', ')],
    ['Best For', t => t.why]
  ];
  const keys = [...compareSet];
  const table = `
    <table class="compare-table">
      <thead><tr><th></th>${keys.map(k => `<td class="tool-col">${TOOLS[k].name}</td>`).join('')}</tr></thead>
      <tbody>
        ${rows.map(([label, fn]) => `<tr><th>${label}</th>${keys.map(k => `<td>${fn(TOOLS[k])}</td>`).join('')}</tr>`).join('')}
      </tbody>
    </table>
  `;
  document.getElementById('compareTableWrap').innerHTML = table;
  document.getElementById('compareModal').classList.remove('hidden');
});

document.getElementById('compareClose').addEventListener('click', () => {
  document.getElementById('compareModal').classList.add('hidden');
});
document.getElementById('compareModal').addEventListener('click', (e) => {
  if(e.target.id === 'compareModal') document.getElementById('compareModal').classList.add('hidden');
});

// ===== TOAST =====
let toastTimer;
function showToast(msg){
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.remove('hidden');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.add('hidden'), 2200);
}
