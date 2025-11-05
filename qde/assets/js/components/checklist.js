/**
 * @file checklist.js
 * @description 右下：不足チェックと次の一手。クリックで該当問いへフォーカス。
 */
(function(){
  const q = (sel,root=document)=>root.querySelector(sel);

  const DEP_RULES = [
    // 価格→ARPU→売上 の簡易依存
    {need:'business.arpu', requires:['business.price']},
    {need:'business.revenue', requires:['business.arpu','business.price']}
  ];

  function render(){
    const list = q('[data-checklist]'); const next = q('[data-next-questions]');
    const qb = QState.getQBank(); const st = QState.getState(); if (!qb) return;
    const missing = [];
    qb.chapters.forEach(ch=> ch.questions.forEach(qq=>{ if (!answered(qq) && !st.skipped[qq.id]) missing.push({ch,qq}); }));
    list.innerHTML = missing.length? missing.map(m=> `<li><button class='btn' data-jump='${m.ch.id}:${m.qq.id}'>未回答: ${escape(m.ch.title)} - ${escape(m.qq.label)}</button></li>`).join('') : '<li class="muted">未回答はありません</li>';
    list.querySelectorAll('[data-jump]').forEach(b=> b.addEventListener('click',()=> jumpTo(b.dataset.jump)));

    const suggestions = suggestNext(qb);
    next.innerHTML = suggestions.map(s=> `<div class='card p-2'><div class='font-semibold'>${escape(s.title)}</div><div class='muted text-sm'>${escape(s.reason)}</div><div class='mt-2'><button class='btn' data-jump='${s.jump}'>ここから答える</button></div></div>`).join('');
    next.querySelectorAll('[data-jump]').forEach(b=> b.addEventListener('click',()=> jumpTo(b.dataset.jump)));

    // bottom sheet for mobile
    const bsList = q('[data-bs-checklist]'); const bsNext = q('[data-bs-next-questions]');
    if (bsList){ bsList.innerHTML = list.innerHTML; bsList.querySelectorAll('[data-jump]').forEach(b=> b.addEventListener('click',()=> jumpTo(b.dataset.jump))); }
    if (bsNext){ bsNext.innerHTML = next.innerHTML; bsNext.querySelectorAll('[data-jump]').forEach(b=> b.addEventListener('click',()=> jumpTo(b.dataset.jump))); }
  }

  function answered(q){ const v = QState.getState().answers[q.id]; return Array.isArray(v)? v.length>0 : (v!=null && String(v).trim()!==''); }

  function suggestNext(qb){
    const tokens = QState.buildTokenMap(); const items = [];
    DEP_RULES.forEach(rule=>{
      const need = rule.need; const ok = !!tokens[`business.value.${need.split('.')[1]}`];
      if (!ok){
        const requires = rule.requires.filter(k=> !!tokens[`business.value.${k.split('.')[1]}`]);
        const missingLabel = need.split('.')[1];
        const ch = qb.chapters.find(c=> c.id==='business'); const q = ch?.questions.find(x=> x.id===missingLabel);
        if (q){ items.push({ title:`${ch.title} - ${q.label}`, reason:`先に ${requires.map(r=>r.split('.')[1]).join(', ')} を埋めるとここが決まります`, jump:`${ch.id}:${q.id}` }); }
      }
    });
    return items;
  }

  function jumpTo(pair){ const [ch,q] = pair.split(':'); QState.setCollapsed(ch,false); QState.select(ch,q); window.App?.renderAll(); setTimeout(()=> window.App?.scrollToQuestion(q),0); }
  function escape(t){ return String(t||'').replace(/[&<>\"]/g, s=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[s])); }

  window.Checklist = { render };
})();
