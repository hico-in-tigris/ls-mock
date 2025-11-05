# LocalSuccess - システムアーキテクチャ

## 📐 アーキテクチャ概要

LocalSuccessは**モジュラーモノリス**アーキテクチャを採用した静的SaaSアプリケーションです。

```
┌─────────────────────────────────────────────────┐
│                   index.html                     │
│         (Single Page Application Shell)         │
└─────────────────────────────────────────────────┘
                        │
        ┌───────────────┼───────────────┐
        │               │               │
        ▼               ▼               ▼
┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│   Core       │ │   Features   │ │   UI         │
│   System     │ │   Modules    │ │   Layer      │
└──────────────┘ └──────────────┘ └──────────────┘
```

## 🏗️ レイヤー構成

### Layer 1: Core System（基盤層）
**責務:** ルーティング、状態管理、共通ユーティリティ

```
assets/scripts/
├── main.js (274行)           # アプリケーション起動、ルーティング
├── core.js                    # サンプルデータ、共通関数
└── ui-components.js           # 共通UIコンポーネント
```

**主要機能:**
- ハッシュベースSPAルーティング
- localStorageによる状態永続化
- グローバルイベントハンドリング
- 通知システム（showNotification）

### Layer 2: Feature Modules（機能層）
**責務:** 各機能ドメインのビジネスロジック

```
assets/scripts/
├── dashboard.js               # ダッシュボード
├── projects/                  # プロジェクト管理
│   ├── projects.js
│   ├── projects-core.js
│   ├── projects-wizard.js
│   ├── projects-modals.js
│   ├── projects-ideation.js
│   ├── projects-planning.js
│   ├── projects-goal.js
│   ├── projects-stakeholder.js
│   ├── projects-proposal.js
│   ├── projects-budget.js
│   └── projects-utils.js
├── plan-editor/               # 企画室（AI支援計画作成）
│   ├── plan-editor.js (197行) # コアオーケストレーション
│   ├── plan-editor-light.js (289行)
│   ├── plan-editor-workspace.js (557行)
│   ├── plan-editor-planning.js
│   ├── plan-editor-goal.js
│   ├── plan-editor-proposal.js
│   ├── plan-editor-stakeholder.js (438行)
│   ├── plan-editor-budget.js
│   ├── plan-editor-simulators.js
│   └── plan-estimator.js
├── people.js                  # 人物管理
├── actions.js                 # アクション管理
├── summary/                   # サマリー・リフレクション
│   ├── summary.js
│   ├── reflection-data.js
│   ├── reflection-utils.js
│   ├── reflection-renderers.js
│   └── reflection-actions.js
└── settings/                  # 設定
    ├── settings.js
    ├── profile-enhanced.js
    ├── region.js
    ├── region-inference.js
    └── issues.js
```

### Layer 3: UI Layer（表示層）
**責務:** HTML/CSS、Tailwind統合

```
assets/
├── main.css                   # カスタムスタイル、shadcn/ui風デザイン
└── (Tailwind CSS CDN)         # ユーティリティファーストCSS
```

## 🔄 データフロー

### 1. ページ遷移フロー
```
User Action (Click #/plan)
    ↓
main.js: handleRouteChange()
    ↓
loadRoute('plan')
    ↓
window.renderPlanEditor(container)
    ↓
DOM Update
```

### 2. 状態管理フロー
```
User Input
    ↓
Event Handler (onclick="function()")
    ↓
Update State (currentDraft, localStorage)
    ↓
Re-render UI
```

### 3. モジュール間通信
```javascript
// パターン1: window API（公開関数）
window.renderPlanEditor = function() { /* ... */ }

// パターン2: getter/setter（状態共有）
Object.defineProperty(window, 'currentDraft', {
  get: function() { return currentDraft; },
  set: function(val) { currentDraft = val; }
});

// パターン3: イベントベース
document.dispatchEvent(new CustomEvent('dataUpdated'));
```

## 🎨 設計パターン

### 1. IIFE（即時実行関数式）
**目的:** スコープ汚染を防ぐ

```javascript
(function(){
  'use strict';
  
  let privateState = {};
  
  window.publicAPI = function() { /* ... */ };
})();
```

### 2. Module Pattern
**目的:** カプセル化と公開API管理

```javascript
// plan-editor.js
(function(){
  // Private
  let currentDraft = null;
  
  // Public (window API)
  window.renderPlanEditor = function(container) { /* ... */ };
  window.generateAIDraft = function() { /* ... */ };
})();
```

### 3. Observer Pattern
**目的:** 疎結合なイベント駆動

```javascript
// Notification System
function showNotification(message, type) {
  // Display notification
}

// Usage
showNotification('保存しました', 'success');
```

### 4. Template Pattern
**目的:** HTML生成の一貫性

```javascript
function renderCard(title, content) {
  return `
    <div class="card">
      <h2>${title}</h2>
      <div>${content}</div>
    </div>
  `;
}
```

## 📊 モジュール依存関係

### Plan Editor モジュール構成
```
plan-editor.js (197行) ← コアオーケストレーション
    ├─→ plan-editor-light.js (289行)
    │       └─→ UI: モード選択、初期フォーム、編集画面
    ├─→ plan-editor-workspace.js (557行)
    │       ├─→ UI: ワークスペース選択、管理
    │       └─→ 6つのワークスペースモジュールを統合
    └─→ plan-estimator.js
            └─→ ロジック: 財務見積もりエンジン

Dependencies:
- showNotification (core.js)
- sampleData (core.js)
```

### 依存関係の原則
1. **単方向依存** - 下位レイヤーは上位に依存しない
2. **境界の明確化** - window APIで公開範囲を制限
3. **循環参照の回避** - IIFE + window APIで解決

## 🔐 状態管理

### State Categories
```javascript
// 1. Application State (main.js)
let currentRoute = null;
let currentUser = null;

// 2. Feature State (各モジュール内)
let currentDraft = null;      // plan-editor.js
let stakeholders = [];        // plan-editor-stakeholder.js

// 3. Persistent State (localStorage)
localStorage.setItem('ls-people', JSON.stringify(people));
```

### State Sharing Strategy
```javascript
// Cross-Module State (Getter/Setter)
Object.defineProperty(window, 'currentDraft', {
  get: function() { return currentDraft; },
  set: function(val) { currentDraft = val; }
});

// One-Way State Flow
window.setCurrentMode = function(mode) {
  currentMode = mode;
};
```

## 🚀 パフォーマンス戦略

### 1. Lazy Loading
- ルート変更時のみ必要なモジュール読み込み
- 初期ロードを最小化

### 2. DOM操作の最適化
```javascript
// ❌ Bad: Multiple DOM operations
for (let item of items) {
  container.innerHTML += renderItem(item);
}

// ✅ Good: Batch operations
container.innerHTML = items.map(renderItem).join('');
```

### 3. Event Delegation
```javascript
// ✅ 親要素で一括処理
container.addEventListener('click', (e) => {
  if (e.target.matches('.btn')) {
    handleClick(e.target);
  }
});
```

## 📏 コーディング規約

### Naming Conventions
```javascript
// Functions: camelCase
function renderPlanEditor() {}

// Constants: UPPER_SNAKE_CASE
const API_ENDPOINT = 'https://api.example.com';

// Private: leading underscore (optional)
function _internalHelper() {}

// Boolean: is/has/can prefix
let hasDraft = true;
let isVisible = false;
```

### File Organization
```
assets/scripts/
├── [feature].js              # メイン機能
├── [feature]-[sub].js        # サブ機能
└── [feature]-utils.js        # ユーティリティ
```

### Comment Style
```javascript
// Why: Explains the reasoning
// Avoid: Explains what code does (should be self-evident)

// ✅ Good
// Use setTimeout to avoid blocking UI during generation
setTimeout(() => { /* ... */ }, 2000);

// ❌ Bad
// Set timeout to 2000ms
setTimeout(() => { /* ... */ }, 2000);
```

## 🧪 テスト戦略（今後の実装）

### Manual Testing Checklist
- [ ] 各ルートへの遷移
- [ ] データ入力・保存
- [ ] localStorage永続化
- [ ] エラーハンドリング
- [ ] レスポンシブ対応

### Future: Automated Testing
```javascript
// Unit Tests (Jest)
describe('renderPlanEditor', () => {
  it('should render mode selector when no mode', () => {
    // ...
  });
});

// E2E Tests (Playwright)
test('plan generation flow', async ({ page }) => {
  // ...
});
```

## 🔄 リファクタリング履歴

### Phase 1: main.js削減（2025年11月）
- Before: 3636行
- After: 274行
- **削減率: 92.5%**

### Phase 2: plan-editor.js削減（2025年11月5日）
- Before: 1083行
- After: 197行
- **削減率: 81.8%**

### 合計削減
- Total Before: 4719行
- Total After: 471行
- **総削減率: 90.0%**

## 📚 参考資料

### External Dependencies
- [Tailwind CSS](https://tailwindcss.com/) - ユーティリティファーストCSS
- [shadcn/ui](https://ui.shadcn.com/) - デザインシステムの参考

### Design Principles
- [The Twelve-Factor App](https://12factor.net/)
- [Clean Code](https://www.amazon.co.jp/dp/4048930591) - Robert C. Martin
- [Refactoring](https://www.amazon.co.jp/dp/4274224546) - Martin Fowler

---

**最終更新:** 2025年11月5日
**メンテナー:** UIエンジニアチーム
