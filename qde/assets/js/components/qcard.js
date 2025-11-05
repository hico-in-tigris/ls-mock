/**
 * @file qcard.js
 * @description 中央：質問カード。入力は state に即時反映、600ms で保存。
 */
(function(){
  const q = (sel,root=document)=>root.querySelector(sel);
  const rerenderSide = debounce(()=>{ try{ Preview.render(); Checklist.render(); }catch(e){} }, 150);

  function render(){
    const container = q('[data-editor-cards]');
    const qb = QState.getQBank(); const st = QState.getState(); if(!qb) return;
    const order = st.order || qb.chapters.map(c=>c.id);
    const chapters = order.map(id=> qb.chapters.find(c=>c.id===id)).filter(Boolean);
    q('[data-editor-title]').textContent = 'Editor';

    container.innerHTML = chapters.map((ch,idx)=> renderSection(ch, idx)).join('');

    // wire: accordion toggles
    container.querySelectorAll('[data-acc-toggle]').forEach(btn=>{
      btn.addEventListener('click', ()=>{
        const chId = btn.dataset.chapter;
        const cur = QState.getCollapsed(chId);
        const next = !cur;
        QState.setCollapsed(chId, next);
        // update DOM only for this section
        const body = container.querySelector(`[data-acc-body="${CSS.escape(chId)}"]`);
        const icon = btn.querySelector('[data-acc-icon]');
        if (body){ body.classList.toggle('hidden', next); }
        if (icon){ icon.textContent = next ? '＋' : '－'; }
      });
    });

    // wire: card inputs and actions
    container.querySelectorAll('[data-qid]').forEach(card=>{
      const id = card.dataset.qid; const meta = findQ(qb,id);
      const input = card.querySelector('[data-input]');
      attachInput(meta, input);
      // skip
      card.querySelector('[data-skip]')?.addEventListener('click', ()=>{ QState.skip(id); window.App?.renderAll(); });
      card.querySelector('[data-unskip]')?.addEventListener('click', ()=>{ QState.unskip(id); window.App?.renderAll(); });
      // one-liner
      card.querySelector('[data-one-liner]')?.addEventListener('click', ()=>{
        const v = getValue(meta); QState.updateAnswer(id, (String(v||'').replace(/\n+/g,' ').slice(0,120)) ); window.App?.renderAll();
      });
    });

    if (st.selectedQuestionId){ setTimeout(()=> window.App?.scrollToQuestion(st.selectedQuestionId), 0); }
  }

  function findQ(qb,id){ for(const c of qb.chapters){ const f=(c.questions||[]).find(q=>q.id===id); if (f) return f; } return null; }

  function renderSection(ch, idx){
    const st = QState.getState();
    const stats = QState.chapterStats(ch);
    // 既定: 最初の章のみ開く
    let collapsed = QState.getCollapsed(ch.id);
    if (collapsed == null){ collapsed = idx>0; QState.setCollapsed(ch.id, collapsed); }
    const body = (ch.questions||[]).map(renderCard).join('');
    return `<div class="accordion-section" data-section="${ch.id}">
      <div class="acc-header" data-acc-toggle data-chapter="${ch.id}">
        <div>
          <span class="acc-title">${escape(ch.title)}</span>
          <span class="acc-meta">${stats.done}/${stats.total} 回答済 ・ 未回答 ${stats.missing}</span>
        </div>
        <div data-acc-icon>${collapsed? '＋':'－'}</div>
      </div>
      <div class="acc-body ${collapsed? 'hidden':''}" data-acc-body="${ch.id}">${body}</div>
    </div>`;
  }

  function renderCard(q){
    const v = QState.getState().answers[q.id];
    const skipped = !!QState.getState().skipped[q.id];
    return `<div class="card p-2 mb-2" data-qid="${q.id}" id="q-${q.id}">
      <div class="font-semibold">${escape(q.label)}</div>
      <div class="muted text-sm">${escape(q.placeholder||'')}</div>
      ${q.example? `<div class="muted text-sm" style="margin-top:4px">例）${escape(q.example)}</div>` : ''}
      <div class="mt-2">${renderInput(q, v)}</div>
      ${q.type==='textarea'? `<div class="mt-1 text-sm" data-decorations="${q.id}"></div>`:''}
      <div class="mt-2">
        <button class="btn" data-one-liner>1文に整える</button>
        ${skipped? '<button class="btn" data-unskip>スキップ解除</button>' : '<button class="btn ghost" data-skip>スキップ</button>'}
      </div>
    </div>`;
  }

  function renderInput(meta, v){
    switch(meta.type){
      case 'textarea': return `<textarea class="input" rows="4" data-input data-type="textarea">${escape(v||'')}</textarea>`;
      case 'radio': return `<div data-input data-type="radio">${(meta.options||[]).map(o=>`<label style='margin-right:8px'><input type='radio' name='${meta.id}' value='${escapeAttr(o)}' ${v===o?'checked':''}/> ${escape(o)}</label>`).join('')}</div>`;
      case 'multiselect': return `<div class="list" data-input data-type="multiselect">${(meta.options||[]).map(o=>`<label><input type='checkbox' value='${escapeAttr(o)}' ${(Array.isArray(v)&&v.includes(o))?'checked':''}/> ${escape(o)}</label>`).join('')}</div>`;
      case 'chips': return `<div data-input data-type="chips"><div class="chips">${(Array.isArray(v)?v:[]).map(x=>`<span class='chip'>${escape(x)}</span>`).join('')}</div><input class="input" placeholder="${escapeAttr(meta.placeholder||'カンマ区切りで追加')}" value="" /></div>`;
      case 'number': return `<input class="input" type="number" data-input data-type="number" value="${v??''}" />`;
      case 'milestone': return `<input class="input" type="date" data-input data-type="date" value="${v??''}" />`;
      default: return `<input class="input" data-input value="${escapeAttr(v||'')}" />`;
    }
  }

  function attachInput(meta, root){
    const id = meta.id; const type = root?.dataset.type;
    if (!root) return;
    if (type==='textarea' || type==='number' || type==='date'){
      root.addEventListener('input', ()=> { QState.updateAnswer(id, root.value); if (type==='textarea') updateDecorations(meta, root.value); rerenderSide(); });
    } else if (type==='radio'){
      root.querySelectorAll('input[type="radio"]').forEach(r=> r.addEventListener('change', ()=> { QState.updateAnswer(id, root.querySelector('input:checked')?.value || ''); rerenderSide(); }));
    } else if (type==='multiselect'){
      root.querySelectorAll('input[type="checkbox"]').forEach(cb=> cb.addEventListener('change', ()=>{
        const sel = Array.from(root.querySelectorAll('input[type="checkbox"]:checked')).map(x=>x.value);
        QState.updateAnswer(id, sel); rerenderSide();
      }));
    } else if (type==='chips'){
      const input = root.querySelector('input');
      input.addEventListener('keydown', (e)=>{
        if (e.key===',' || e.key==='Enter'){
          e.preventDefault();
          const cur = Array.isArray(QState.getState().answers[id])? QState.getState().answers[id] : [];
          const token = input.value.replace(/,/, '').trim();
          if (token){ QState.updateAnswer(id, [...cur, token]); input.value=''; rerenderSide(); }
        }
      });
    }
    // 初期装飾
    if (type==='textarea'){ updateDecorations(meta, QState.getState().answers[id]||''); }
  }

  function updateDecorations(meta, value){
    const dec = document.querySelector(`[data-decorations="${CSS.escape(meta.id)}"]`);
    if (!dec) return;
    const mentions = (value.match(/@[\w\u3000-\u9fff]+/g)||[]).map(x=> x.trim());
    const tags = (value.match(/#[\w\u3000-\u9fff]+/g)||[]).map(x=> x.trim());
    const chips = [...new Set([...mentions, ...tags])].slice(0,10);
    dec.innerHTML = chips.length? `<div class='chips'>${chips.map(c=>`<span class='chip'>${escape(c)}</span>`).join('')}</div>` : '';
  }

  function debounce(fn,ms){ let t; return (...a)=>{ clearTimeout(t); t=setTimeout(()=>fn(...a),ms); }; }

  function getValue(meta){ return QState.getState().answers[meta.id]; }
  function escape(t){ return String(t||'').replace(/[&<>\"]/g, s=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[s])); }
  function escapeAttr(t){ return String(t||'').replace(/\"/g,'&quot;'); }

  window.QCard = { render };
})();
