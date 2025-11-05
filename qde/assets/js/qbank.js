/**
 * @file qbank.js
 * @description 質問定義とテンプレ読み込み（fetch + file:// フォールバック）。
 */
(function(){
  const SAMPLE_QBANK = {
    chapters:[
      {
        id:'executive', title:'エグゼクティブサマリ',
        questions:[
          {id:'one_liner', type:'textarea', label:'一言で言うと？', placeholder:'例：働く世代の相談をLINEで受け付け、満足度を高めます', mapsTo:'executive.value.one_liner'},
          {id:'kgi', type:'textarea', label:'KGI（最終目標）', placeholder:'例：CSAT80%以上、再来率30% など', mapsTo:'executive.value.kgi'},
          {id:'kpi', type:'chips', label:'KPI（主要指標）', placeholder:'例：相談件数, 応答時間, CSAT', mapsTo:'executive.value.kpi'}
        ]
      },
      {
        id:'solution', title:'解決策の概要',
        questions:[
          {id:'who', type:'chips', label:'誰の課題？', placeholder:'働く世代, 子育て世帯 など', mapsTo:'solution.value.who'},
          {id:'what', type:'textarea', label:'何を提供する？', mapsTo:'solution.value.what'},
          {id:'how', type:'textarea', label:'どう実現する？', mapsTo:'solution.value.how'},
          {id:'milestone_beta', type:'milestone', label:'β公開の目安', mapsTo:'solution.value.milestone_beta'}
        ]
      },
      {
        id:'business', title:'事業・収支',
        questions:[
          {id:'price', type:'number', label:'価格（円）', mapsTo:'business.value.price'},
          {id:'arpu', type:'number', label:'ARPU（月次/円）', mapsTo:'business.value.arpu'},
          {id:'revenue', type:'number', label:'月次売上（円）', mapsTo:'business.value.revenue'}
        ]
      }
    ]
  };

  const SAMPLE_MD = `# 事業計画書\n\n## エグゼクティブサマリ\n- 一言で：{executive.value.one_liner}\n- KGI：{executive.value.kgi}\n- KPI：{executive.value.kpi}\n\n## 解決策の概要\n- 対象：{solution.value.who}\n- 何を：{solution.value.what}\n- どうやって：{solution.value.how}\n- β公開：{solution.value.milestone_beta}\n\n## 事業・収支\n- 価格：{business.value.price}\n- ARPU：{business.value.arpu}\n- 月次売上：{business.value.revenue}\n`;

  async function loadAll(){
    const prefix = (window.QDE_PATH_PREFIX)
      || (location.pathname.includes('/qde/') ? 'assets/data/' : 'qde/assets/data/');
    const qb = await fetchJson(prefix + 'qbank.json', SAMPLE_QBANK);
    const md = await fetchText(prefix + 'plan-templates.md', SAMPLE_MD);
    window.QState.setQBank(qb);
    window.QState.setTemplate(md);
  }

  async function fetchJson(path, fallback){
    try{ const r = await fetch(path,{cache:'no-store'}); if(!r.ok) throw new Error('fetch'); return await r.json(); }catch{ return fallback; }
  }
  async function fetchText(path, fallback){
    try{ const r = await fetch(path,{cache:'no-store'}); if(!r.ok) throw new Error('fetch'); return await r.text(); }catch{ return fallback; }
  }

  window.QBank = { loadAll };
})();
