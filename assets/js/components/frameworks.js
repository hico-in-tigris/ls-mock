/**
 * @file frameworks.js
 * @description 地域おこし協力隊向けの思考フレームワーク集とテンプレ挿入/ガイド。
 */
(function(){
  const q = (sel,root=document)=>root.querySelector(sel);

  /**
   * フレームワーク定義
   * id: 一意識別子
   * name: 表示名
   * desc: 説明
   * applies: 推奨セクションID
   * template: セクションに貼り付けるテンプレ（テキスト）
   * prompts: ガイド質問（クリックで箇条書き挿入）
   */
  const FRAMEWORKS = [
    {
      id:'5w1h', name:'5W1H',
      desc:'Who/What/Why/Where/When/How を埋めて整理します。',
      applies:['goal','hypothesis','plan','kpi','stakeholders'],
      template:
`【5W1H】\nWho（誰に）：\nWhat（何を）：\nWhy（なぜ）：\nWhere（どこで）：\nWhen（いつ）：\nHow（どのように）：\n`,
      prompts:[
        '誰に届けたい？（住民のどの層？）',
        '何を提供する？（具体的な活動・機能）',
        'なぜ今それが必要？（現場で困っていること）',
        'どこでやる？（オンライン/現地/拠点）',
        'いつから・いつまで？（目安でOK）',
        'どう進める？（手順・関係者の動き）'
      ]
    },
    {
      id:'smart', name:'SMART',
      desc:'目標を Specific/Measurable/Achievable/Relevant/Time-bound で絞ります。',
      applies:['goal','kpi'],
      template:
`【SMART】\nSpecific（具体性）：\nMeasurable（計測可能性）：\nAchievable（達成可能性）：\nRelevant（関連性）：\nTime-bound（期限）：\nKPI案：\n`,
      prompts:[
        '何を達成する？（できるだけ具体的に）',
        'どう測る？（数値・ログ・アンケート）',
        '現実的にできる？（人手・予算・期間）',
        '地域の目的と合ってる？（意義）',
        'いつまでに？（期限）',
        'KPI候補（2〜3個）'
      ]
    },
    {
      id:'logic', name:'ロジックモデル',
      desc:'資源→活動→産出→成果（短期/中期/長期）で因果をつなぎます。',
      applies:['plan','goal','hypothesis'],
      template:
`【ロジックモデル】\n資源（Input）：\n活動（Activity）：\n産出（Output）：\n成果（Outcome 短期）：\n成果（Outcome 中期）：\n成果（Outcome 長期）：\nリスクと前提：\n`,
      prompts:[
        '使える資源（人/時間/場所/予算）',
        'やる活動（具体的な作業）',
        '目に見える成果物（産出）',
        '変化（短期）現場で何が良くなる？',
        '変化（中期）定着してどうなる？',
        '変化（長期）地域にどんな良い影響？',
        'リスク/前提（承認・広報・個人情報など）'
      ]
    },
    {
      id:'problem-idea', name:'誰の/どの課題/何で解く',
      desc:'「誰の」「どの課題」を「何で」解くかを1行で握るためのミニカンバス。',
      applies:['goal','hypothesis','plan'],
      template:
`【課題フレーミング】\n誰の（ターゲット）：\nどの課題（現状/痛み）：\n何で解く（打ち手）：\n期待される変化：\n指標：\n`,
      prompts:[
        '誰の困りごと？（具体的な人）',
        'どんな困りごと？（現場の声）',
        '何で解く？（最初の一手）',
        'どう変わる？（住民・役場の変化）',
        'どれで見る？（簡単な指標）'
      ]
    },
    {
      id:'raci', name:'RACI（役割整理）',
      desc:'Responsible/Accountable/Consulted/Informed を整理して混線を防ぎます。',
      applies:['stakeholders','plan'],
      template:
`【RACI】\nResponsible（実行）：\nAccountable（意思決定）：\nConsulted（助言/レビュー）：\nInformed（共有）：\n連絡/承認フロー：\n`,
      prompts:[
        '実行（手を動かす人）',
        '意思決定（責任者）',
        '相談・助言（巻き込む人）',
        '共有（知らせる人）',
        '連絡/承認の流れ（いつ/どこで）'
      ]
    }
  ];

  // 各フレームワークの例文（prompts と同じ順序で並ぶ）
  const EXAMPLES = {
    '5w1h': [
      '平日昼に来庁しづらい働く世代の住民',
      'LINEで相談予約/土日相談枠の提供',
      '「相談したいけど時間が合わない」を解消するため',
      '町内窓口＋オンライン',
      '来月からβ運用（4週間）',
      '既存窓口に予約機能を追加し、週末対応を試行'
    ],
    'smart': [
      'オンライン受付で月間相談件数を増やす',
      '月50件/CSAT80%で測る（受付ログとアンケート）',
      '担当2名で運用可能な範囲',
      '町の相談体験の改善と住民接点の強化',
      '3ヶ月以内にβ公開',
      'KPI: 相談件数50件・CSAT80%'
    ],
    'logic': [
      '担当職員の時間・既存窓口・広報チャネル',
      'オンライン受付の運用/週末枠の試行',
      '受付記録・応答時間ログ・広報の到達',
      '待ち時間短縮',
      '満足度向上/再来率上昇',
      '相談件数の安定増加',
      '個人情報管理/リソース確保が前提'
    ],
    'problem-idea': [
      '働く世代の住民（町内）',
      '窓口時間が合わず相談しづらい',
      'LINE受付＋週末枠',
      '相談件数と満足度の向上',
      '相談件数/CSAT/待ち時間'
    ],
    'raci': [
      '窓口運用チーム（協力隊＋担当）',
      '課長',
      '情報政策/広報',
      '関係部署・観光協会',
      '週次で報告→承認→周知'
    ]
  };

  function getRecommended(sectionId){
    return FRAMEWORKS.filter(f=>!sectionId || (f.applies||[]).includes(sectionId));
  }

  function findById(id){ return FRAMEWORKS.find(f=>f.id===id); }
  function findByNameLike(name){
    const key = (name||'').toLowerCase();
    return FRAMEWORKS.find(f=> f.name.toLowerCase().includes(key) || f.id.includes(key));
  }

  function currentTargetField(){
    // 現在フォーカス中の input/textarea を優先。なければセクションに応じて既定フィールド。
    const active = document.activeElement;
    if (active && (active.tagName==='TEXTAREA' || active.tagName==='INPUT') && active.dataset.field){
      return { el: active, key: active.dataset.field };
    }
    const panels = document.querySelector('[data-tab-panels]');
    const visible = panels?.querySelector('.tab-panel:not(.hidden)');
    const fallback = visible?.querySelector('[data-field="detail"]') || visible?.querySelector('[data-field="summary"]') || visible?.querySelector('[data-field]');
    if (fallback){ return { el:fallback, key:fallback.dataset.field }; }
    return { el:null, key:null };
  }

  function appendToField(text){
    const {el, key} = currentTargetField();
    const app = window.State.getState();
    const sec = window.State.getSection(app.selectedSectionId||'');
    if (!sec || !key) return;
    const cur = (app.draftVersion?.[sec.id]||{})[key] || '';
    const next = (cur ? cur + '\n' : '') + text;
    if (el){ el.value = next; }
    window.State.updateDraft(sec.id, key, next);
    window.App?.rerenderContext();
  }

  function render(container){
    const app = window.State.getState();
    const sec = window.State.getSection(app.selectedSectionId||'');
    const list = getRecommended(sec?.id);
    if (!container) return;
    if (!list.length){ container.innerHTML = '<div class="muted text-sm">このセクション向けの推奨はありません</div>'; return; }
    container.innerHTML = list.map(f=> `
      <div class="card p-2">
        <div class="font-semibold">${escape(f.name)}</div>
        <div class="muted text-sm">${escape(f.desc)}</div>
        <div class="mt-2 flex gap-2">
          <button class="btn" data-fw-insert="${f.id}">挿入</button>
          <button class="btn ghost" data-fw-guide="${f.id}">ガイドを展開</button>
          <button class="btn ghost" data-fw-step="${f.id}">ステップモード</button>
        </div>
        <div class="mt-2 hidden" data-fw-prompts="${f.id}"></div>
        <div class="mt-2 hidden" data-fw-stepper="${f.id}"></div>
      </div>
    `).join('');

    container.querySelectorAll('[data-fw-insert]').forEach(btn=>{
      btn.addEventListener('click', ()=>{
        const fw = findById(btn.dataset.fwInsert);
        if (fw){ appendToField(fw.template); toast(`${fw.name} を挿入しました`); }
      });
    });
    container.querySelectorAll('[data-fw-guide]').forEach(btn=>{
      btn.addEventListener('click', ()=>{
        const id = btn.dataset.fwGuide;
        const box = container.querySelector(`[data-fw-prompts="${CSS.escape(id)}"]`);
        const fw = findById(id);
        if (!box || !fw) return;
        const opened = !box.classList.contains('hidden');
        box.classList.toggle('hidden');
        if (!opened){
          box.innerHTML = (fw.prompts||[]).map(p=>`<button class="chip" data-fw-prompt="${escapeAttr(p)}">${escape(p)}</button>`).join(' ');
          box.querySelectorAll('[data-fw-prompt]').forEach(ch=>{
            ch.addEventListener('click', ()=> appendToField(`- ${ch.textContent}：`));
          });
        }
      });
    });

    // ステップモード起動
    container.querySelectorAll('[data-fw-step]').forEach(btn=>{
      btn.addEventListener('click', ()=>{
        const id = btn.dataset.fwStep;
        const box = container.querySelector(`[data-fw-stepper="${CSS.escape(id)}"]`);
        const fw = findById(id);
        if (!box || !fw) return;
        const opened = !box.classList.contains('hidden');
        box.classList.toggle('hidden');
        if (!opened){
          startStepper(box, fw, 0);
        }
      });
    });
  }

  function insertTemplateByName(name){
    const fw = findByNameLike(name);
    if (fw){ appendToField(fw.template); toast(`${fw.name} を挿入しました`); }
  }

  function startStepper(container, fw, idx){
    container.dataset.stepIdx = String(idx||0);
    renderStep(container, fw);
  }

  function renderStep(container, fw){
    const idx = Number(container.dataset.stepIdx||0);
    const total = (fw.prompts||[]).length;
    const prompt = fw.prompts[idx] || '';
    const example = (EXAMPLES[fw.id]||[])[idx] || '';
    container.innerHTML = `
      <div class="card p-2">
        <div class="text-sm muted">${idx+1}/${total}</div>
        <div class="font-semibold" style="margin:6px 0">${escape(prompt)}</div>
        <div class="flex gap-2">
          <button class="btn" data-step-focus>回答欄へフォーカス</button>
          <button class="btn" data-step-insert>この項目を追加</button>
          <button class="btn ghost" data-step-example>例を入れる</button>
        </div>
        <div class="muted text-sm" style="margin-top:6px">例）${escape(example||'（例はありません）')}</div>
        <div class="flex gap-2" style="margin-top:8px">
          <button class="btn ghost" data-step-prev ${idx===0?'disabled':''}>戻る</button>
          <button class="btn" data-step-next ${idx>=total-1?'disabled':''}>次へ</button>
          <button class="btn" data-step-done ${idx<total-1?'disabled':''}>完了</button>
        </div>
      </div>
    `;
    // ハンドラ
    const focusField = ()=>{
      const {el} = currentTargetField();
      if (el){ el.focus(); el.scrollIntoView({behavior:'smooth', block:'center'}); }
    };
    const ensureLine = (text)=>{
      const label = `- ${text}：`;
      const {el, key} = currentTargetField();
      const app = window.State.getState();
      const sec = window.State.getSection(app.selectedSectionId||'');
      if (!el || !sec || !key) return;
      const cur = (app.draftVersion?.[sec.id]||{})[key] || '';
      if (!cur.split(/\r?\n/).some(line=> line.startsWith(label))){
        const next = (cur?cur+'\n':'') + label;
        el.value = next;
        window.State.updateDraft(sec.id, key, next);
        window.App?.rerenderContext();
      }
      el.focus();
    };
    const insertExample = ()=>{
      const ex = example ? `- ${prompt}：${example}` : `- ${prompt}：`;
      appendToField(ex);
    };

    container.querySelector('[data-step-focus]')?.addEventListener('click', focusField);
    container.querySelector('[data-step-insert]')?.addEventListener('click', ()=>{ ensureLine(prompt); });
    container.querySelector('[data-step-example]')?.addEventListener('click', insertExample);
    container.querySelector('[data-step-prev]')?.addEventListener('click', ()=>{
      if (idx>0){ container.dataset.stepIdx = String(idx-1); renderStep(container, fw); }
    });
    container.querySelector('[data-step-next]')?.addEventListener('click', ()=>{
      if (idx < total-1){ container.dataset.stepIdx = String(idx+1); renderStep(container, fw); setTimeout(focusField, 0); }
    });
    container.querySelector('[data-step-done]')?.addEventListener('click', ()=>{
      container.classList.add('hidden');
    });
  }

  function toast(msg){
    const el = document.createElement('div');
    el.textContent = msg;
    el.style.position='fixed'; el.style.right='12px'; el.style.top='12px';
    el.style.background='#fff'; el.style.border='1px solid var(--border)'; el.style.borderRadius='8px';
    el.style.padding='8px 12px'; el.style.boxShadow='0 2px 10px rgba(0,0,0,.1)'; el.style.zIndex='70';
    document.body.appendChild(el);
    setTimeout(()=> el.remove(), 1400);
  }

  function escape(t){ return String(t||'').replace(/[&<>"]/g, s=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[s])); }
  function escapeAttr(t){ return String(t||'').replace(/"/g,'&quot;'); }

  window.Frameworks = { render, insertTemplateByName };
})();
