/**
 * @file outline.js
 * @description 左ペイン：Outline（D&D風並び替え、選択、キーボード操作）
 */
(function(){
  const q = (sel,root=document)=>root.querySelector(sel);
  const qa = (sel,root=document)=>Array.from(root.querySelectorAll(sel));

  /**
   * Outline の描画
   * @param {HTMLElement} container
   * @param {import('../state').AppState} app
   */
  function renderOutline(container, app){
    container.innerHTML = '';
    (app.sections||[]).forEach(sec=>{
      const card = document.createElement('div');
      card.className = 'outline-card mb-2';
      card.draggable = true;
      card.tabIndex = 0;
      card.dataset.sectionId = sec.id;
      card.setAttribute('data-outline-card','');
      card.innerHTML = `
        <div class="font-semibold">${escape(sec.title)}</div>
        <div class="muted text-sm">${escape(sec.summary||'')}</div>
        <div class="outline-meta mt-2">
          <span class="badge-status ${statusClass(sec.status)}">${sec.status}</span>
          <span class="muted text-sm">未解決 ${sec.unresolved||0}</span>
        </div>
        <div class="progress mt-2"><span style="width:${sec.progress||0}%"></span></div>
      `;
      // click select
      card.addEventListener('click',()=> {
        State.selectSection(sec.id);
        State.pushUrlState({view:'outline'});
        window.App?.rerender();
      });
      // keyboard
      card.addEventListener('keydown',(e)=>{
        if (e.key==='Enter') { State.selectSection(sec.id); State.pushUrlState({view:'outline'}); window.App?.rerender(); }
        if (e.key==='ArrowDown') { focusSibling(card,'next'); }
        if (e.key==='ArrowUp') { focusSibling(card,'prev'); }
      });
      // DnD
      card.addEventListener('dragstart', ()=> card.classList.add('dragging'));
      card.addEventListener('dragend', ()=> card.classList.remove('dragging'));
      container.appendChild(card);
    });

    // container drag handlers
    container.addEventListener('dragover', (e)=>{
      e.preventDefault();
      const dragging = q('.outline-card.dragging', container);
      if (!dragging) return;
      const after = getDragAfterElement(container, e.clientY);
      if (after==null) container.appendChild(dragging); else container.insertBefore(dragging, after);
    });
    container.addEventListener('drop', ()=>{
      const ids = qa('[data-outline-card]', container).map(el=>el.dataset.sectionId);
      State.reorderSections(ids);
      window.App?.rerenderHeader();
    });
  }

  function getDragAfterElement(container, y){
    const els = qa('.outline-card:not(.dragging)', container);
    let nearest = null; let offset = Number.NEGATIVE_INFINITY;
    els.forEach(el=>{
      const box = el.getBoundingClientRect();
      const cur = y - box.top - box.height/2;
      if (cur < 0 && cur > offset) { offset = cur; nearest = el; }
    });
    return nearest;
  }

  function focusSibling(card, dir){
    const sib = dir==='next'? card.nextElementSibling : card.previousElementSibling;
    if (sib) sib.focus();
  }

  function statusClass(s){
    switch (s){
      case 'draft': return 'badge-draft';
      case 'reviewed': return 'badge-reviewed';
      case 'locked': return 'badge-locked';
      default: return 'badge-empty';
    }
  }
  function escape(t){ return String(t||'').replace(/[&<>"]/g, s=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[s])); }

  window.Outline = { renderOutline };
})();
