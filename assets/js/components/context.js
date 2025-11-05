/**
 * @file context.js
 * @description 右ペイン：Checklist/次アクション/履歴（復元）
 */
(function(){
  const q = (sel,root=document)=>root.querySelector(sel);

  function renderContext(){
    renderChecklist();
    renderSuggestions();
    renderFrameworks();
    renderSnapshots();
  }

  function renderChecklist(){
    const list = q('[data-checklist]');
    const app = State.getState();
    const sec = State.getSection(app.selectedSectionId||'');
    const draft = app.draftVersion?.[sec?.id||'']||{};
    const required = requiredFieldsFor(sec?.id);
    const missing = required.filter(k=>!draft[k] || String(draft[k]).trim()==='');
    list.innerHTML = '';
    if (!missing.length){
      const li = document.createElement('li'); li.textContent = '未入力項目はありません'; li.className='muted'; list.appendChild(li); return;
    }
    missing.forEach(key=>{
      const li = document.createElement('li');
      li.innerHTML = `<button class="btn" data-goto-field="${key}">未入力: ${key}</button>`;
      li.querySelector('button').addEventListener('click',()=> window.EditorScroll?.(key));
      list.appendChild(li);
    });
  }

  function renderFrameworks(){
    const box = q('[data-frameworks]');
    if (!box || !window.Frameworks) return;
    window.Frameworks.render(box);
  }

  function renderSuggestions(){
    const box = q('[data-suggestions]');
    const app = State.getState();
    const sec = State.getSection(app.selectedSectionId||'');
    const draft = app.draftVersion?.[sec?.id||'']||{};
    const need = Object.keys(draft).filter(k=>!draft[k]);
    const candidates = ['ステークホルダー候補を3名追加','KPIを1つ定義','次のマイルストーンを設定'];
    box.innerHTML = candidates.slice(0,3).map((c,i)=> `<div class="card p-2">${i+1}. ${c}</div>`).join('');
  }

  function renderSnapshots(){
    const box = q('[data-snapshots]');
    const app = State.getState();
    box.innerHTML = (app.snapshots||[]).map(ss=> `
      <div class="card p-2">
        <div class="text-sm">${ss.at}</div>
        <div class="muted text-sm">変更: ${ss.diff.join(', ')||'—'}</div>
        <div class="mt-2"><button class="btn" data-restore="${ss.id}">復元</button></div>
      </div>
    `).join('');
    box.querySelectorAll('[data-restore]').forEach(btn=>{
      btn.addEventListener('click', ()=>{ State.restoreSnapshot({id:btn.dataset.restore}); window.App?.rerender(); });
    });
  }

  function requiredFieldsFor(sectionId){
    // 簡易必須マップ（セクションに応じて）
    const common = ['summary'];
    switch(sectionId){
      case 'goal': return [...common,'detail'];
      case 'stakeholders': return [...common,'detail'];
      case 'hypothesis': return [...common,'detail'];
      case 'plan': return [...common,'detail'];
      case 'kpi': return [...common,'detail'];
      default: return common;
    }
  }

  window.Context = { renderContext };
})();
