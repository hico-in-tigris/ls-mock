/**
 * @file preview.js
 * @description 右：テンプレ markdown にトークン差し込み。未解決トークン行は非表示。更新章は1秒フラッシュ。
 */
(function(){
  const q = (sel,root=document)=>root.querySelector(sel);

  function render(){
    const box = q('[data-preview-body]'); if (!box) return;
    const md = QState.getTemplate();
    const tokens = QState.buildTokenMap();
    const html = renderTemplate(md, tokens);
    const tmp = document.createElement('div'); tmp.innerHTML = html;
    // フラッシュ処理：簡易に全体へ
    tmp.classList.add('flash'); setTimeout(()=> tmp.classList.remove('flash'), 1000);
    box.innerHTML = ''; box.appendChild(tmp);
  }

  function renderTemplate(md, tokens){
    // トークン置換 {a.b.c}
    const unresolvedRe = /\{([^}]+)\}/g;
    let result = md.split('\n').map(line=>{
      let out = line;
      let hasUnresolved = false;
      out = out.replace(unresolvedRe, (_,key)=>{
        const v = tokens[key]; if (v==null || String(v).trim()===''){ hasUnresolved = true; return ''; }
        return escapeHtml(String(v));
      });
      return hasUnresolved && out.replace(/\s+/g,'')==='' ? '' : out;
    }).filter(Boolean).join('\n');
    // markdown 超簡易→DOM：見出し/箇条書きのみ
    result = result.replace(/^###?\s+(.*)$/gm, '<h3>$1</h3>');
    result = result.replace(/^\-\s+(.*)$/gm, '<li>$1</li>');
    result = result.replace(/(<li>.*?<\/li>)/gs, '<ul>$1</ul>');
    result = result.replace(/\n\n/g, '<br/>');
    return result;
  }

  function escapeHtml(t){ return String(t||'').replace(/[&<>\"]/g, s=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[s])); }

  window.Preview = { render };
})();
