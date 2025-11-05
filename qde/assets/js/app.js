/**
 * @file app.js
 * @description 初期化、描画オーケストレーション、URL・モバイル・エクスポート。
 */
(function(){
  const q = (sel,root=document)=>root.querySelector(sel);

  async function init(){
    QState.load();
    await QBank.loadAll();
    renderAll();
    bindMobile();
    bindExport();
    bindOutlinePanel();
  }

  function renderAll(){
    OutlineQ.render();
    QCard.render();
    Preview.render();
    Checklist.render();
  }

  function scrollToQuestion(qid){
    if (!qid) return;
    // 開いていないセクションがあれば開く
    const qb = QState.getQBank();
    const ch = qb?.chapters?.find(c=> (c.questions||[]).some(q=> q.id===qid));
    if (ch){ QState.setCollapsed(ch.id, false); QCard.render(); }
    const el = document.getElementById('q-'+qid);
    if(el){ el.scrollIntoView({behavior:'smooth',block:'center'}); el.querySelector('[data-input]')?.focus(); }
  }

  function bindMobile(){
    // Bottom Sheet only（タブ廃止）
    const openBtn = q('[data-open-bottom-sheet]');
    const sheet = q('[data-bottom-sheet]');
    const closeBtn = q('[data-bottom-sheet-close]');
    openBtn?.addEventListener('click', ()=> sheet.classList.remove('hidden'));
    closeBtn?.addEventListener('click', ()=> sheet.classList.add('hidden'));
  }

  function bindExport(){
    q('[data-export-md]')?.addEventListener('click', ()=>{
      const md = QState.getTemplate();
      const tokens = QState.buildTokenMap();
      const out = md.replace(/\{([^}]+)\}/g, (_,k)=> tokens[k]??'');
      const blob = new Blob([out], {type:'text/markdown'});
      const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'plan.md'; a.click(); URL.revokeObjectURL(a.href);
    });
  }

  function bindOutlinePanel(){
    const btn = document.querySelector('[data-toggle-outline]');
    const panel = document.querySelector('[data-outline-panel]');
    const close = document.querySelector('[data-close-outline]');
    btn?.addEventListener('click', ()=>{
      panel?.classList.toggle('hidden');
      if (!panel?.classList.contains('hidden')){ OutlineQ.render(); }
    });
    close?.addEventListener('click', ()=> panel?.classList.add('hidden'));
  }

  window.App = { renderAll, scrollToQuestion };
  window.addEventListener('DOMContentLoaded', init);
})();
