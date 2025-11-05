# LocalSuccess - Public API Reference

## 📡 API概要

LocalSuccessは静的アプリケーションのため、すべてのAPIは**window オブジェクト**上の公開関数です。

### API設計原則
1. **グローバル汚染最小化** - IIFEで必要な関数のみ公開
2. **命名規則の一貫性** - 動詞+名詞（renderPlanEditor, saveDraft等）
3. **副作用の明示** - DOM操作、localStorage更新を関数名で示唆
4. **後方互換性** - 既存の呼び出し元を壊さない

---

## 🎯 Core APIs

### Navigation & Routing

#### `loadRoute(route)`
指定されたルートにページ遷移

```javascript
/**
 * @param {string} route - Route path (e.g., 'dashboard', 'plan', 'people')
 * @returns {void}
 * @sideEffects DOM manipulation, updates currentRoute
 */
window.loadRoute = function(route) { /* ... */ }

// Usage
loadRoute('plan');
loadRoute('dashboard');
```

### Notification System

#### `showNotification(message, type)`
通知メッセージを表示

```javascript
/**
 * @param {string} message - Notification message
 * @param {string} type - 'success' | 'error' | 'info' | 'warning'
 * @returns {void}
 * @sideEffects Creates and removes DOM notification element
 */
function showNotification(message, type) { /* ... */ }

// Usage
showNotification('保存しました', 'success');
showNotification('エラーが発生しました', 'error');
```

---

## 📋 Plan Editor APIs

### Core Functions

#### `window.renderPlanEditor(container)`
企画室のメインUIをレンダリング

```javascript
/**
 * Renders the main plan editor interface
 * 
 * @param {HTMLElement} container - Target container element
 * @returns {void}
 * @sideEffects 
 *   - Updates container.innerHTML
 *   - Attaches event listeners
 *   - May render mode selector or draft editor based on state
 * 
 * @example
 * const container = document.getElementById('main-content');
 * window.renderPlanEditor(container);
 */
window.renderPlanEditor = function(container) { /* ... */ }
```

#### `window.selectPlanningMode(mode)`
計画作成モードを選択

```javascript
/**
 * Select planning mode (simple or workspace)
 * 
 * @param {string} mode - 'simple' | 'workspace'
 * @returns {void}
 * @sideEffects
 *   - Updates currentMode
 *   - Triggers re-render
 *   - May call window.renderWorkspaceSelector()
 * 
 * @example
 * window.selectPlanningMode('simple');    // Light mode
 * window.selectPlanningMode('workspace'); // Detailed workspace mode
 */
window.selectPlanningMode = function(mode) { /* ... */ }
```

#### `window.generateAIDraft()`
AI支援による事業計画下書き生成

```javascript
/**
 * Generate AI-assisted business plan draft from form inputs
 * 
 * @returns {void}
 * @async Simulated with setTimeout (2000ms)
 * @sideEffects
 *   - Reads form input values
 *   - Updates currentDraft (global state)
 *   - Updates projectName (global state)
 *   - Disables generate button during processing
 *   - Triggers re-render after generation
 *   - Shows success notification
 *   - Calls PlanEstimator.estimateFinancials if available
 * 
 * @dependencies
 *   - DOM elements: project-name, business-idea, target-users, etc.
 *   - window.PlanEstimator (optional)
 *   - showNotification
 * 
 * @example
 * <button onclick="generateAIDraft()">AI下書き生成</button>
 */
window.generateAIDraft = function() { /* ... */ }
```

#### `window.saveDraftChanges()`
編集内容を保存

```javascript
/**
 * Save draft changes to currentDraft state
 * 
 * @returns {void}
 * @sideEffects
 *   - Updates currentDraft properties
 *   - Updates preview display
 *   - Shows success notification
 * 
 * @dependencies
 *   - DOM elements: edit-overview, edit-target, edit-revenue, edit-plan
 *   - window.renderPreview (from plan-editor-light.js)
 * 
 * @example
 * <button onclick="saveDraftChanges()">変更を保存</button>
 */
window.saveDraftChanges = function() { /* ... */ }
```

#### `window.startNewPlan()`
新規計画の作成（現在の内容を破棄）

```javascript
/**
 * Start a new plan (with user confirmation)
 * 
 * @returns {void}
 * @sideEffects
 *   - Shows confirmation dialog
 *   - Resets currentDraft to null
 *   - Resets currentMode to null
 *   - Resets projectName to empty string
 *   - Triggers re-render
 * 
 * @example
 * <button onclick="startNewPlan()">新規作成</button>
 */
window.startNewPlan = function() { /* ... */ }
```

#### `window.exportPlanAsPDF()`
計画書をPDF出力（未実装）

```javascript
/**
 * Export plan as PDF (feature placeholder)
 * 
 * @returns {void}
 * @sideEffects Shows info notification
 * 
 * @todo Implement actual PDF generation
 * 
 * @example
 * <button onclick="exportPlanAsPDF()">PDFエクスポート</button>
 */
window.exportPlanAsPDF = function() { /* ... */ }
```

#### `window.openDetailedWorkspace()`
詳細ワークスペースへ遷移

```javascript
/**
 * Transition to detailed workspace mode
 * 
 * @returns {void}
 * @sideEffects
 *   - Updates currentMode to 'workspace'
 *   - Renders workspace selector UI
 * 
 * @dependencies
 *   - window.renderWorkspaceSelector (from plan-editor-workspace.js)
 * 
 * @example
 * <button onclick="openDetailedWorkspace()">詳細ワークスペースへ</button>
 */
window.openDetailedWorkspace = function() { /* ... */ }
```

### State Management APIs

#### `window.currentDraft` (getter/setter)
現在の下書き状態

```javascript
/**
 * Current draft state (shared across modules)
 * 
 * @type {Object|null}
 * @property {string} [title] - Plan title
 * @property {string} overview - Plan overview
 * @property {string} target - Target users
 * @property {string} revenue - Revenue model
 * @property {string} plan - Execution plan
 * @property {string[]} genres - Selected genres
 * @property {Object} [financials] - Financial estimates from PlanEstimator
 * 
 * @example
 * // Read
 * const draft = window.currentDraft;
 * 
 * // Write
 * window.currentDraft = {
 *   title: 'My Plan',
 *   overview: '...',
 *   // ...
 * };
 */
Object.defineProperty(window, 'currentDraft', {
  get: function() { return currentDraft; },
  set: function(val) { currentDraft = val; }
});
```

#### `window.projectName` (getter/setter)
プロジェクト名の一時保持

```javascript
/**
 * Project name (shared across light/workspace modules)
 * 
 * @type {string}
 * 
 * @example
 * // Read
 * const name = window.projectName;
 * 
 * // Write
 * window.projectName = '○○エリア活性化プロジェクト';
 */
Object.defineProperty(window, 'projectName', {
  get: function() { return projectName; },
  set: function(val) { projectName = val; }
});
```

#### `window.setCurrentMode(mode)`
現在のモード設定

```javascript
/**
 * Set current planning mode
 * 
 * @param {string|null} mode - 'simple' | 'workspace' | null
 * @returns {void}
 * 
 * @example
 * window.setCurrentMode('simple');
 * window.setCurrentMode(null); // Reset
 */
window.setCurrentMode = function(mode) { /* ... */ }
```

---

## 🏗️ Plan Editor - Light Mode APIs
**Provided by:** `plan-editor-light.js`

#### `window.renderModeSelector()`
モード選択画面のHTML生成

```javascript
/**
 * @returns {string} HTML string
 */
window.renderModeSelector = function() { /* ... */ }
```

#### `window.renderInitialForm()`
初期入力フォームのHTML生成

```javascript
/**
 * @returns {string} HTML string
 */
window.renderInitialForm = function() { /* ... */ }
```

#### `window.renderDraftEditor()`
下書き編集画面のHTML生成

```javascript
/**
 * @returns {string} HTML string
 */
window.renderDraftEditor = function() { /* ... */ }
```

#### `window.renderPreview()`
プレビュー画面のHTML生成

```javascript
/**
 * @returns {string} HTML string
 */
window.renderPreview = function() { /* ... */ }
```

---

## 🏢 Plan Editor - Workspace APIs
**Provided by:** `plan-editor-workspace.js`

#### `window.renderWorkspaceSelector()`
ワークスペース選択画面のHTML生成

```javascript
/**
 * @returns {string} HTML string
 */
window.renderWorkspaceSelector = function() { /* ... */ }
```

#### `window.backToSimpleEditor()`
シンプル編集へ戻る

```javascript
/**
 * @returns {void}
 * @sideEffects Updates mode, triggers re-render
 */
window.backToSimpleEditor = function() { /* ... */ }
```

#### `window.switchToLightMode()`
ライトモードへ切替

```javascript
/**
 * @returns {void}
 * @sideEffects Updates mode, triggers re-render
 */
window.switchToLightMode = function() { /* ... */ }
```

#### `window.backToModeSelector()`
モード選択画面へ戻る

```javascript
/**
 * @returns {void}
 * @sideEffects Resets state, triggers re-render
 */
window.backToModeSelector = function() { /* ... */ }
```

#### `window.toggleWorkspaceModule(module)`
ワークスペースモジュールの開閉

```javascript
/**
 * @param {string} module - Module name ('ideation', 'planning', etc.)
 * @returns {void}
 * @sideEffects Updates activeWorkspace, triggers re-render
 */
window.toggleWorkspaceModule = function(module) { /* ... */ }
```

#### `window.handleWorkspaceSave(moduleKey)`
ワークスペース内容の保存

```javascript
/**
 * @param {string} [moduleKey] - Module key
 * @returns {void}
 * @sideEffects Shows notification
 */
window.handleWorkspaceSave = function(moduleKey) { /* ... */ }
```

#### `window.updateProjectName(val)`
プロジェクト名の更新

```javascript
/**
 * @param {string} val - New project name
 * @returns {void}
 * @sideEffects Updates projectName and currentDraft.title
 */
window.updateProjectName = function(val) { /* ... */ }
```

#### `window.goToNextWorkspaceModule()`
次のワークスペースへ進む

```javascript
/**
 * @returns {void}
 * @sideEffects Updates activeWorkspace, triggers re-render
 */
window.goToNextWorkspaceModule = function() { /* ... */ }
```

#### `window.aiPolishWorkspace(moduleKey)`
AIによるブラッシュアップ提案

```javascript
/**
 * @param {string} [moduleKey] - Module key
 * @returns {void}
 * @sideEffects Adds suggestion box to DOM
 */
window.aiPolishWorkspace = function(moduleKey) { /* ... */ }
```

---

## 💰 Financial Estimator API
**Provided by:** `plan-estimator.js`

#### `window.PlanEstimator.estimateFinancials(genres, overrides)`
財務見積もりの実行

```javascript
/**
 * Estimate financials based on selected genres
 * 
 * @param {string[]} genres - Genre array ('coworking', 'guesthouse', etc.)
 * @param {Object} [overrides] - Override parameters
 * @param {number} [overrides.rooms] - Number of rooms
 * @param {number} [overrides.occRate] - Occupancy rate (0-1)
 * @param {number} [overrides.eventsPerMonth] - Events per month
 * @param {number} [overrides.participants] - Participants per event
 * @param {number} [overrides.toursPerMonth] - Tours per month
 * @param {number} [overrides.tourSize] - Tour group size
 * 
 * @returns {Object} Financial estimates
 * @returns {Object[]} return.incomes - Income items
 * @returns {Object[]} return.expenses - Expense items
 * @returns {Object} return.totals - Totals (income, expense, profit)
 * @returns {Object} return.meta - Metadata (genres, etc.)
 * 
 * @example
 * const financials = window.PlanEstimator.estimateFinancials(
 *   ['coworking', 'guesthouse'],
 *   { rooms: 3, occRate: 0.6 }
 * );
 * console.log(financials.totals.profit); // 月次粗利
 */
window.PlanEstimator = {
  estimateFinancials: function(genres, overrides) { /* ... */ }
};
```

---

## 📊 Projects APIs

### `window.openProjectModal(projectId)`
プロジェクト詳細モーダルを開く

```javascript
/**
 * @param {number} projectId - Project ID
 * @returns {void}
 * @sideEffects Shows modal, renders project details
 */
window.openProjectModal = function(projectId) { /* ... */ }
```

---

## 👥 People APIs

### `window.openPersonProfile(personId)`
人物プロフィールを開く

```javascript
/**
 * @param {number} personId - Person ID
 * @returns {void}
 * @sideEffects Shows profile, updates lastContact
 */
window.openPersonProfile = function(personId) { /* ... */ }
```

---

## ✅ Actions APIs

### `window.updateActionStatus(actionId, newStatus)`
アクションステータスを更新

```javascript
/**
 * @param {number} actionId - Action ID
 * @param {string} newStatus - 'Todo' | 'Doing' | 'Done'
 * @returns {void}
 * @sideEffects Updates action, saves to localStorage, re-renders
 */
window.updateActionStatus = function(actionId, newStatus) { /* ... */ }
```

---

## 🔒 API使用上の注意

### 1. 副作用の理解
すべてのAPI関数はDOMまたは状態に副作用を持ちます。副作用のない純粋関数はモジュール内部の private 関数です。

### 2. エラーハンドリング
現在のAPIはエラーを throw しません。将来的には適切なエラーハンドリングを追加予定。

### 3. 非同期処理
`generateAIDraft()` のみsetTimeoutで非同期（シミュレーション）。実際のAPI実装時は Promise を返すよう変更予定。

### 4. データバリデーション
入力データのバリデーションは各API内部で実施。不正な値は無視またはデフォルト値で補完。

---

## 🚀 今後の拡張予定

### v3.0 (予定)
- [ ] TypeScript型定義ファイル (.d.ts)
- [ ] Promise ベースの非同期API
- [ ] エラーハンドリングの標準化
- [ ] API Versioning

### Long-term
- [ ] REST API バックエンド統合
- [ ] GraphQL 対応
- [ ] WebSocket リアルタイム更新

---

**最終更新:** 2025年11月5日
**API Version:** 2.3.0
