/**
 * @file outline.js
 * @description 左：章の一覧、回答率、未回答数、クリックで最初の未回答へ。
 */
(function(){
  const q = (sel,root=document)=>root.querySelector(sel);

  function render(){
    const list = q('[data-outline-list]');
    const qb = QState.getQBank(); if (!qb) return;
    const order = QState.getState().order;
    const chapters = order.map(id=> qb.chapters.find(c=>c.id===id)).filter(Boolean);
    list.innerHTML = chapters.map(ch=>{
      const st = QState.chapterStats(ch);
      return `<div class="card p-2 mb-2" data-chapter="${ch.id}">
        <div class="font-semibold">${escape(ch.title)}</div>
        <div class="muted text-sm">${st.done}/${st.total} 回答済 ・ 未回答 ${st.missing}</div>
      </div>`;
    }).join('');
    list.querySelectorAll('[data-chapter]').forEach(el=>{
      el.addEventListener('click', ()=>{
        const id = el.dataset.chapter; const ch = qb.chapters.find(c=>c.id===id);
        const target = QState.firstUnanswered(ch);
        // アコーディオンを開き、該当の問いへ
        QState.setCollapsed(id, false);
        QState.select(id, target?.id||null);
        window.App?.renderAll();
        setTimeout(()=> window.App?.scrollToQuestion(target?.id),0);
      });
    });
  }

  function escape(t){ return String(t||'').replace(/[&<>\"]/g, s=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[s])); }

  window.OutlineQ = { render };
})();
