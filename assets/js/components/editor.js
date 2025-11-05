/**
 * @file editor.js
 * @description 中央ペイン：Tabs/Accordion/インライン編集/autoSave/スナップショット
 */
(function(){
  const q = (sel,root=document)=>root.querySelector(sel);
  const qa = (sel,root=document)=>Array.from(root.querySelectorAll(sel));

  function renderEditor(app){
    const title = q('[data-editor-title]');
    const panels = q('[data-tab-panels]');
    const tabs = q('[data-editor-tabs]');
    const sec = State.getSection(app.selectedSectionId||'');
    title.textContent = sec? `Editor: ${sec.title}` : 'Editor';

    // tabs switching
    tabs.addEventListener('click', (e)=>{
      const btn = e.target.closest('[data-tab]');
      if (!btn) return;
      qa('.tab', tabs).forEach(t=>t.classList.remove('active'));
      btn.classList.add('active');
      const name = btn.dataset.tab;
      qa('.tab-panel', panels).forEach(p=>p.classList.add('hidden'));
      q(`[data-panel="${name}"]`, panels)?.classList.remove('hidden');
      // view sync
      State.pushUrlState({view:'plan'});
    }, { once:true });

  // render panel contents
    renderOverview(q('[data-panel="overview"]'));
    renderDetail(q('[data-panel="detail"]'));
    renderArtifact(q('[data-panel="artifact"]'));

    // snapshot
    q('[data-snapshot]').onclick = ()=>{
      if (!sec) return;
      const id = State.createSnapshot(sec.id);
      window.App?.rerenderContext();
      toast(`スナップショットを作成: ${id}`);
    };

    // initial tab from URL (?view=plan)
    const view = new URLSearchParams(location.search).get('view');
    if (view === 'plan') {
      const detailBtn = q('[data-tab="detail"]', tabs);
      if (detailBtn) {
        qa('.tab', tabs).forEach(t=>t.classList.remove('active'));
        detailBtn.classList.add('active');
        qa('.tab-panel', panels).forEach(p=>p.classList.add('hidden'));
        q('[data-panel="detail"]', panels)?.classList.remove('hidden');
      }
    }
  }

  function renderOverview(panel){
    const app = State.getState();
    const sec = State.getSection(app.selectedSectionId||'');
    const ex = getExamples(sec?.id);
    panel.innerHTML = `
      <div class="stack">
        <label class="text-sm muted">概要</label>
        <textarea class="input" data-field="summary" rows="4" placeholder="セクションの概要">${escape(getDraftField(sec,'summary'))}</textarea>
        ${!getDraftField(sec,'summary') && ex.overview ? hintBlock(ex.overview) : ''}
        <div class="accordion mt-2">
          <div class="accordion-item">
            <div class="accordion-header" data-acc>
              <div class="font-semibold">補助情報</div>
              <div>▼</div>
            </div>
            <div class="accordion-body hidden" data-acc-body>
              <label class="text-sm muted">補足メモ</label>
              <textarea class="input" data-field="memo" rows="3" placeholder="補足メモ">${escape(getDraftField(sec,'memo'))}</textarea>
              ${!getDraftField(sec,'memo') && ex.memo ? hintBlock(ex.memo) : ''}
            </div>
          </div>
        </div>
      </div>
    `;
    bindInputs(panel, sec);
    bindAccordion(panel);
  }

  function renderDetail(panel){
    const app = State.getState();
    const sec = State.getSection(app.selectedSectionId||'');
    const ex = getExamples(sec?.id);
    panel.innerHTML = `
      <div class="stack">
        <label class="text-sm muted">詳細</label>
        <textarea class="input" data-field="detail" rows="8" placeholder="詳細">${escape(getDraftField(sec,'detail'))}</textarea>
        ${!getDraftField(sec,'detail') && ex.detail ? hintBlock(ex.detail) : ''}
        <label class="text-sm muted">ステータス</label>
        <select class="input" data-field="status">
          ${['empty','draft','reviewed','locked'].map(s=>`<option value="${s}" ${sel(s,getDraftField(sec,'status')||sec?.status)}>${s}</option>`).join('')}
        </select>
      </div>
    `;
    bindInputs(panel, sec);
  }

  function renderArtifact(panel){
    const app = State.getState();
    const sec = State.getSection(app.selectedSectionId||'');
    const ex = getExamples(sec?.id);
    panel.innerHTML = `
      <div class="stack">
        <label class="text-sm muted">成果物リンク</label>
        <input class="input" data-field="artifactUrl" placeholder="https://..." value="${escape(getDraftField(sec,'artifactUrl'))}" />
        ${!getDraftField(sec,'artifactUrl') && ex.artifactUrl ? hintBlock(ex.artifactUrl) : ''}
      </div>
    `;
    bindInputs(panel, sec);
  }

  function bindAccordion(root){
    const hdr = q('[data-acc]', root);
    const body = q('[data-acc-body]', root);
    if (!hdr || !body) return;
    hdr.addEventListener('click',()=> body.classList.toggle('hidden'));
  }

  function bindInputs(root, sec){
    if (!sec) return;
    const debouncedSave = debounce(()=> State.persist(), 800);
    qa('[data-field]', root).forEach(el=>{
      const key = el.dataset.field;
      if (el.tagName==='TEXTAREA' || el.tagName==='INPUT'){
        el.addEventListener('input', ()=>{
          State.updateDraft(sec.id, key, el.value);
          window.App?.rerenderContext();
        });
        el.addEventListener('blur', debouncedSave);
      } else if (el.tagName==='SELECT'){
        el.addEventListener('change', ()=>{
          State.updateDraft(sec.id, key, el.value);
          window.App?.rerenderHeader();
          window.App?.rerenderContext();
          debouncedSave();
        });
      }
    });
    // mentions (#/@)
    qa('textarea,input', root).forEach(el=>{
      el.addEventListener('keyup', (e)=> handleMentions(e, el));
    });
  }

  function handleMentions(e, el){
    const v = el.value;
    const last = v.slice(Math.max(0, v.length-20));
    if (/@[^\s]*$/.test(last)) {
      window.App?.openCmdk([ {label:'@山田 太郎', insert:'@山田 太郎'}, {label:'@佐藤 花子', insert:'@佐藤 花子'}, {label:'@関係者A', insert:'@関係者A'} ], (ins)=>{
        el.value = v.replace(/@[^\s]*$/, ins+' ');
        State.updateDraft(State.getState().selectedSectionId, el.dataset.field, el.value);
      });
    } else if (/#([^\s]*)$/.test(last)){
      window.App?.openCmdk([ {label:'#企画', insert:'#企画'}, {label:'#関係者', insert:'#関係者'}, {label:'#仮説', insert:'#仮説'} ], (ins)=>{
        el.value = v.replace(/#([^\s]*)$/, ins+' ');
        State.updateDraft(State.getState().selectedSectionId, el.dataset.field, el.value);
      });
    }
  }

  function getDraftField(sec, key){
    const app = State.getState();
    return (app.draftVersion?.[sec?.id||'']||{})[key] || '';
  }
  /** 例のヒントHTML */
  function hintBlock(text){
    return `<div class="muted text-sm" style="margin-top:6px">例）${escape(text)}</div>`;
  }
  /** セクションIDごとの具体例 */
  function getExamples(sectionId){
    const common = {
      overview: 'このセクションの狙いや要点を1-2行で。例：住民の相談窓口を刷新し、相談体験の満足度80%以上を目指す。',
      detail: '背景・課題・方針・期待効果を簡潔に。例：現状は受付時間が限定的で、若年層の利用が少ない。LINE受付と土日枠で利便性を向上。',
      artifactUrl: '例：https://docs.example.com/pj-001/企画書',
      memo: 'メモ：参考リンク、関係者メモ、未検討事項など'
    };
    const map = {
      goal: {
        overview: '相談者の満足度スコア（CSAT）を80%以上にし、待ち時間中央値を10分未満にする。',
        detail: 'KGI/KPI、期日、測定方法。例：KPI=月間相談件数50件、CSAT80%、再来率30%。測定は月次アンケートと受付ログ。',
        artifactUrl: '例：https://docs.example.com/pj-001/目標定義',
        memo: 'SMART観点：Specific/Measurable/Achievable/Relevant/Time-bound'
      },
      stakeholders: {
        overview: '住民、町役場（企画/窓口）、観光協会、外部デザイナー、開発事業者など。',
        detail: '- 住民：利用者。ニーズ=オンライン/土日対応\n- 役場：運用担当。ニーズ=負荷平準化、記録一元化\n- 観光協会：周知協力\n- 開発事業者：実装/保守',
        artifactUrl: '例：https://docs.example.com/pj-001/関係者マップ',
        memo: 'RACIの役割整理：Responsible/Accountable/Consulted/Informed'
      },
      hypothesis: {
        overview: '営業時間拡大とオンライン受付を導入すれば、若年層の利用が増える。',
        detail: 'H1：LINE受付で初回相談が月+20件\nH2：土日枠で満足度+10pt\n検証=4週間A/B運用、指標=件数/CSAT/待ち時間',
        artifactUrl: '例：https://docs.example.com/pj-001/仮説検証計画',
        memo: 'リスク：運用負荷増、個人情報管理。対策：予約枠制限、ガイドライン徹底'
      },
      plan: {
        overview: '3ヶ月でβ公開。1ヶ月目=設計、2ヶ月目=実装、3ヶ月目=試行運用。',
        detail: 'WBS：要件定義→UI設計→開発→データ移行→研修→β運用→改善。マイルストーン：M1要件合意、M2β公開',
        artifactUrl: '例：https://docs.example.com/pj-001/実行計画',
        memo: '依存関係：役場内部の承認、広報日程、開発リソース確保'
      },
      kpi: {
        overview: 'CSAT80%/月間相談件数50件/再来率30%/平均応答24h以内',
        detail: 'ダッシュボード指標：件数、応答時間、満足度、再来。集計頻度：週次/月次',
        artifactUrl: '例：https://datastudio.example.com/pj-001',
        memo: 'KPIは2-3個に絞り、改善の打ち手とセットで管理'
      }
    };
    return {...common, ...(map[sectionId]||{})};
  }
  function sel(v,cur){ return v===cur? 'selected' : ''; }
  function escape(t){ return String(t||'').replace(/[&<>"]/g, s=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[s])); }
  function debounce(fn,ms){ let t; return (...a)=>{ clearTimeout(t); t=setTimeout(()=>fn(...a),ms); }; }
  function toast(msg){
    const el = document.createElement('div');
    el.textContent = msg;
    el.style.position='fixed'; el.style.right='12px'; el.style.top='12px';
    el.style.background='#fff'; el.style.border='1px solid var(--border)'; el.style.borderRadius='8px';
    el.style.padding='8px 12px'; el.style.boxShadow='0 2px 10px rgba(0,0,0,.1)'; el.style.zIndex='70';
    document.body.appendChild(el);
    setTimeout(()=> el.remove(), 1800);
  }

  /** エクスポート */
  window.Editor = { renderEditor };
})();
