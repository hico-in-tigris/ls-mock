/**
 * @file drawer.js
 * @description 右からのスライドドロワー。短時間タスク用。
 */
(function(){
  const q = (sel,root=document)=>root.querySelector(sel);

  function setupDrawer(){
    const drawer = q('[data-drawer]');
    const backdrop = q('[data-drawer-backdrop]');
    const body = q('[data-drawer-body]');
    q('[data-open-drawer]').addEventListener('click', ()=> openDrawer('add-stakeholder'));
    q('[data-drawer-close]').addEventListener('click', closeDrawer);
    backdrop.addEventListener('click', closeDrawer);
    document.addEventListener('keydown', (e)=>{ if (e.key==='Escape') closeDrawer(); });

    function openDrawer(mode){
      drawer.dataset.open = 'true';
      backdrop.classList.remove('hidden');
      body.innerHTML = renderContent(mode);
      body.querySelector('[data-drawer-save]')?.addEventListener('click', ()=>{
        const name = body.querySelector('[data-input-name]')?.value?.trim();
        if (name){
          // 簡易: stakeholders セクションのdraftに追記
          const secId = 'stakeholders';
          const cur = (State.getState().draftVersion?.[secId]||{}).detail || '';
          State.updateDraft(secId, 'detail', cur + `\n- ${name}`);
          State.persist();
          window.App?.rerender();
        }
        closeDrawer();
      });
    }
    function closeDrawer(){
      drawer.dataset.open = 'false';
      backdrop.classList.add('hidden');
    }

    window.Drawer = { openDrawer, closeDrawer };
  }

  function renderContent(mode){
    if (mode==='add-stakeholder'){
      return `
        <div class="stack">
          <label class="text-sm muted">関係者の追加</label>
          <input class="input" data-input-name placeholder="氏名/組織名" />
          <button class="btn" data-drawer-save>保存</button>
        </div>
      `;
    }
    return '<div>メニュー</div>';
  }

  window.addEventListener('DOMContentLoaded', setupDrawer);
})();
