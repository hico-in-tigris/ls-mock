/**
 * @file state.js
 * @description Q-Driven Editor: 状態管理（answers/skipped/visited/order）、URL同期、保存/復元。
 */
(function(){
  const STORAGE_KEY = 'qde-state-v1';

  /** @typedef {{id:string,title:string,questions:Array}} Chapter */
  /** @typedef {{answers:Object, skipped:Set<string>, visited:Set<string>, order:string[], selectedChapterId:string|null, selectedQuestionId:string|null, collapsedChapters:Object<string,boolean>}} QState */

  /** @type {QState} */
  let state = {
    answers: {},
    skipped: {}, // as dictionary for JSON
    visited: {},
    order: [],
    selectedChapterId: null,
    selectedQuestionId: null,
    collapsedChapters: {},
  };

  let qbank = null; // loaded by QBank
  let templateMd = '';

  function setQBank(data){ qbank = data; if (!state.order.length) state.order = data.chapters.map(c=>c.id); }
  function setTemplate(md){ templateMd = md; }
  function getQBank(){ return qbank; }
  function getTemplate(){ return templateMd; }

  function load(){
    const cached = localStorage.getItem(STORAGE_KEY);
    if (cached){ try { const obj = JSON.parse(cached); state = {...state, ...obj}; } catch {}
    }
    applyUrl();
    persist();
    return state;
  }

  function persist(){ localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }

  function applyUrl(){
    const p = new URLSearchParams(location.search);
    const ch = p.get('chapter'); const q = p.get('q');
    if (ch) state.selectedChapterId = ch; if (q) state.selectedQuestionId = q;
  }

  function pushUrl(partial){
    const p = new URLSearchParams(location.search);
    Object.entries(partial).forEach(([k,v])=>{ if(v==null) p.delete(k); else p.set(k,String(v)); });
    history.replaceState(null,'','?'+p.toString());
  }

  function select(chapterId, qId){
    state.selectedChapterId = chapterId||state.selectedChapterId;
    state.selectedQuestionId = qId||null;
    pushUrl({chapter: state.selectedChapterId, q: state.selectedQuestionId});
    persist();
  }

  function setCollapsed(chId, collapsed){ state.collapsedChapters[chId] = !!collapsed; persist(); }
  function getCollapsed(chId){ return !!state.collapsedChapters[chId]; }

  function markVisited(id){ state.visited[id]=true; persist(); }
  function skip(id){ state.skipped[id]=true; persist(); }
  function unskip(id){ delete state.skipped[id]; persist(); }

  function updateAnswer(qId, value){ state.answers[qId]=value; state.visited[qId]=true; persistThrottled(); }

  const persistThrottled = debounce(()=> persist(), 600);
  function debounce(fn,ms){ let t; return (...a)=>{ clearTimeout(t); t=setTimeout(()=>fn(...a),ms); }; }

  function answered(q){ const v = state.answers[q.id]; if (q.type==='chips') return Array.isArray(v)&&v.length>0; if (q.type==='multiselect') return Array.isArray(v)&&v.length>0; return v!=null && String(v).trim()!==''; }

  function chapterStats(ch){
    const qs = ch.questions||[]; const total = qs.length; const done = qs.filter(q=> answered(q)).length; const missing = total-done; return {total, done, missing};
  }

  function firstUnanswered(ch){ return (ch.questions||[]).find(q=> !answered(q) && !state.skipped[q.id]) || (ch.questions||[])[0]; }

  function getState(){ return state; }

  // tokens map: { tokenKey -> value }
  function buildTokenMap(){
    const map = {};
    (qbank?.chapters||[]).forEach(ch=>{
      (ch.questions||[]).forEach(q=>{
        if (!q.mapsTo) return; const v = state.answers[q.id]; if (v==null || (Array.isArray(v)&&!v.length)) return;
        map[q.mapsTo] = Array.isArray(v) ? v.join(', ') : String(v);
      });
    });
    return map;
  }

  window.QState = { load, getState, setQBank, getQBank, setTemplate, getTemplate, select, markVisited, skip, unskip, updateAnswer, chapterStats, firstUnanswered, buildTokenMap, setCollapsed, getCollapsed };
})();
