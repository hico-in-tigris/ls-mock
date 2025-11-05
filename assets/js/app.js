/**
 * @file app.js
 * @description アプリ起動、レンダリング調整、ヘッダー更新、ルーティング同期、CmdK。
 */
(function(){
  const q = (sel,root=document)=>root.querySelector(sel);

  async function init(){
    await State.loadInitial();
    State.applyUrlState();
    rerender();
    bindCmdk();
  }

  function rerender(){
    const app = State.getState();
    // header badges
    const {unresolved, review} = State.rollupCounts();
    q('[data-badge-unresolved]').textContent = `未解決: ${unresolved}`;
    q('[data-badge-review]').textContent = `レビュー待ち: ${review}`;

    // outline
    Outline.renderOutline(q('[data-outline-list]'), app);

    // editor
    Editor.renderEditor(app);

    // context
    Context.renderContext();
  }

  function rerenderHeader(){
    const {unresolved, review} = State.rollupCounts();
    q('[data-badge-unresolved]').textContent = `未解決: ${unresolved}`;
    q('[data-badge-review]').textContent = `レビュー待ち: ${review}`;
  }

  function rerenderContext(){ Context.renderContext(); }

  // editor scroll target
  window.EditorScroll = (key)=>{
    const el = document.querySelector(`[data-field="${CSS.escape(key)}"]`);
    if (el) { el.scrollIntoView({behavior:'smooth', block:'center'}); el.focus(); }
  };

  // simple CmdK
  function bindCmdk(){
    let onPick = null;
    const shell = q('[data-cmdk]');
    const input = q('[data-cmdk-input]');
    const list = q('[data-cmdk-list]');

    function open(items, cb){
      onPick = cb; shell.classList.remove('hidden'); input.value=''; input.focus();
      render(items);
    }
    function close(){ shell.classList.add('hidden'); onPick=null; }
    function render(items){
      list.innerHTML = items.map(it=>`<div class="cmdk-item" data-item="${it.insert}">${it.label}</div>`).join('');
      list.querySelectorAll('[data-item]').forEach(el=> el.addEventListener('click',()=>{ onPick?.(el.dataset.item); close(); }));
    }

    document.addEventListener('keydown', (e)=>{
      if ((e.ctrlKey||e.metaKey) && e.key.toLowerCase()==='k'){
        e.preventDefault();
        const defaults = [
          {label:'/目的', insert:'目的'},
          {label:'/関係者', insert:'関係者'},
          {label:'/KPI', insert:'KPI'},
          {label:'/5W1H を挿入', insert:'__FW__5W1H'},
          {label:'/SMART を挿入', insert:'__FW__SMART'},
          {label:'/ロジックモデル を挿入', insert:'__FW__ロジックモデル'}
        ];
        open(defaults, (ins)=>{
          // active textarea に挿入（簡易）
          const el = document.activeElement;
          if (ins && ins.startsWith('__FW__')){
            const name = ins.replace('__FW__','');
            window.Frameworks?.insertTemplateByName(name);
          } else if (el && (el.tagName==='TEXTAREA' || el.tagName==='INPUT')){
            const start = el.selectionStart, end = el.selectionEnd;
            const v = el.value; el.value = v.slice(0,start) + ins + v.slice(end);
            el.dispatchEvent(new Event('input', {bubbles:true}));
          }
        });
      } else if (e.key==='Escape'){ close(); }
    });

    window.App = { rerender, rerenderHeader, rerenderContext, openCmdk:open };
  }

  window.addEventListener('DOMContentLoaded', init);
})();
