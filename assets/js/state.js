/**
 * @file state.js
 * @description アプリケーション状態管理、ストレージ、URL同期。
 */
(function(){
  /** @typedef {{id:string,title:string,summary?:string,status:'empty'|'draft'|'reviewed'|'locked',unresolved:number,progress:number}} Section */

  /**
   * @typedef {Object} AppState
   * @property {string} id
   * @property {string} title
   * @property {string} status
   * @property {Section[]} sections
   * @property {Object} draftVersion
   * @property {Object} publishedVersion
   * @property {Array<{id:string, at:string, diff:string[]}>} snapshots
   * @property {string|null} selectedSectionId
   */

  const STORAGE_KEY = 'threepane-app-state-v1';

  /** @type {AppState|null} */
  let appState = null;

  /** fetch sample on first run */
  async function loadInitial() {
    const cached = localStorage.getItem(STORAGE_KEY);
    if (cached) {
      try { appState = JSON.parse(cached); return appState; } catch {}
    }
    // fetchがfile://環境で失敗する場合に備えてフォールバックを用意
    const SAMPLE = {
      id: 'pj-001',
      title: 'きもべつ関わり方相談窓口 リニューアル',
      status: '構想中',
      sections: [
        {id:'goal', title:'目的', summary:'', status:'draft', unresolved:2, progress:40},
        {id:'stakeholders', title:'関係者', summary:'', status:'empty', unresolved:3, progress:10},
        {id:'hypothesis', title:'仮説', summary:'', status:'draft', unresolved:1, progress:50},
        {id:'plan', title:'実行計画', summary:'', status:'empty', unresolved:4, progress:0},
        {id:'kpi', title:'KPI', summary:'', status:'empty', unresolved:2, progress:0}
      ],
      draftVersion: {},
      publishedVersion: {},
      snapshots: []
    };
    try {
      const res = await fetch('assets/data/sample-project.json', {cache:'no-store'});
      if (!res.ok) throw new Error('fetch failed');
      const data = await res.json();
      appState = {
        ...data,
        selectedSectionId: data.sections?.[0]?.id || null
      };
    } catch(e) {
      // フォールバック（ローカルファイル直開きでも動く）
      appState = {
        ...SAMPLE,
        selectedSectionId: SAMPLE.sections?.[0]?.id || null
      };
    }
    persist();
    return appState;
  }

  function persist(){
    if (!appState) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(appState));
  }

  /** URL sync: view & section */
  function applyUrlState(){
    const p = new URLSearchParams(location.search);
    const section = p.get('section');
    const view = p.get('view');
    if (section && appState?.sections?.some(s=>s.id===section)) {
      appState.selectedSectionId = section;
    }
    if (view) {
      // editorタブ選択に使う: app.js側で解釈
      document.documentElement.dataset.view = view;
    }
  }

  function pushUrlState(partial){
    const p = new URLSearchParams(location.search);
    Object.entries(partial).forEach(([k,v])=>{
      if (v==null) p.delete(k); else p.set(k, String(v));
    });
    history.replaceState(null,'','?'+p.toString());
  }

  /**
   * 未解決数のロールアップとレビュー待ち数を計算
   * @returns {{unresolved:number, review:number}}
   */
  function rollupCounts(){
    const unresolved = (appState?.sections||[]).reduce((s,sec)=> s + (sec.unresolved||0), 0);
    const review = (appState?.sections||[]).filter(sec=>sec.status==='draft').length;
    return {unresolved, review};
  }

  /** @returns {AppState} */
  function getState(){ return appState; }

  /**
   * @param {string} id
   * @returns {Section|undefined}
   */
  function getSection(id){ return appState?.sections?.find(s=>s.id===id); }

  /**
   * セクションを選択しURLに反映
   * @param {string} id
   */
  function selectSection(id){
    if (!appState) return;
    appState.selectedSectionId = id;
    pushUrlState({section:id});
    persist();
  }

  /** 並び替えを保存 */
  function reorderSections(ids){
    if (!appState) return;
    const byId = new Map(appState.sections.map(s=>[s.id,s]));
    appState.sections = ids.map(id=>byId.get(id)).filter(Boolean);
    persist();
  }

  /**
   * ドラフト更新。フィールド単位
   * @param {string} sectionId
   * @param {string} fieldKey
   * @param {any} value
   */
  function updateDraft(sectionId, fieldKey, value){
    if (!appState) return;
    appState.draftVersion = appState.draftVersion || {};
    const sec = appState.draftVersion[sectionId] || {};
    sec[fieldKey] = value;
    appState.draftVersion[sectionId] = sec;
    // ロールアップ: 未入力→Checklistに任せ、ここではstatusをdraftに寄せる
    const s = getSection(sectionId);
    if (s) s.status = 'draft';
    persist();
  }

  /**
   * スナップショットを作成
   * @param {string} sectionId
   * @returns {string} snapshotId
   */
  function createSnapshot(sectionId){
    if (!appState) return '';
    const now = new Date().toISOString();
    const current = appState.draftVersion?.[sectionId]||{};
    const published = appState.publishedVersion?.[sectionId]||{};
    const diff = Object.keys(current).filter(k=>current[k]!==published[k]);
    const id = 'ss-'+Date.now();
    appState.snapshots = appState.snapshots || [];
    appState.snapshots.unshift({id, at: now, diff});
    persist();
    return id;
  }

  /** スナップショットから復元 */
  function restoreSnapshot(snapshot){
    if (!appState) return;
    // 簡易: 全draftVersionを空にしてから、差分キーを空配列として記録（ダミー）
    // 実装簡略化のため、ここでは最新ドラフトをクリア
    appState.draftVersion = {};
    persist();
  }

  /** 公開反映（draft→published） */
  function publish(){
    if (!appState) return [];
    const changedSections = Object.keys(appState.draftVersion||{});
    appState.publishedVersion = {...appState.publishedVersion, ...appState.draftVersion};
    appState.draftVersion = {};
    persist();
    return changedSections;
  }

  // expose
  window.State = {
    loadInitial, persist, applyUrlState, pushUrlState,
    getState, getSection, selectSection, reorderSections,
    updateDraft, createSnapshot, restoreSnapshot, publish,
    rollupCounts
  };
})();
