# Contributing to LocalSuccess

LocalSuccessへの貢献に興味を持っていただきありがとうございます！このドキュメントでは、開発環境のセットアップから、コーディング規約、プルリクエストの方法まで説明します。

## 📋 目次

- [開発環境のセットアップ](#開発環境のセットアップ)
- [開発ワークフロー](#開発ワークフロー)
- [コーディング規約](#コーディング規約)
- [コミットメッセージ](#コミットメッセージ)
- [プルリクエスト](#プルリクエスト)
- [テスト](#テスト)
- [ドキュメント](#ドキュメント)

## 🛠️ 開発環境のセットアップ

### 必須要件

- **Git** - バージョン管理
- **ローカルWebサーバー** - 以下のいずれか
  - Python 3.x
  - Node.js (npx serve)
  - VS Code Live Server拡張機能

### セットアップ手順

1. **リポジトリのクローン**
```bash
git clone https://github.com/hico-in-tigris/ls-mock.git
cd ls-mock
```

2. **ローカルサーバーの起動**

```bash
# Python を使用
python -m http.server 8000

# または npx serve を使用
npx serve .

# または VS Code Live Server を使用
# index.html を右クリック → "Open with Live Server"
```

3. **ブラウザで開く**
```
http://localhost:8000
```

### 推奨ツール

- **エディタ:** VS Code, WebStorm
- **ブラウザ:** Chrome (DevTools), Firefox (Developer Edition)
- **拡張機能 (VS Code):**
  - Live Server
  - Tailwind CSS IntelliSense
  - ESLint
  - Prettier

## 🔄 開発ワークフロー

### 1. ブランチ戦略

```bash
# 新機能開発
git checkout -b feature/new-feature-name

# バグ修正
git checkout -b fix/bug-description

# ドキュメント更新
git checkout -b docs/what-you-updated
```

### 2. 開発サイクル

```bash
# 1. 最新のmainブランチを取得
git checkout main
git pull origin main

# 2. フィーチャーブランチを作成
git checkout -b feature/my-feature

# 3. 開発・コミット
git add .
git commit -m "feat: add new feature"

# 4. プッシュ
git push origin feature/my-feature

# 5. Pull Request作成
# GitHub上でPRを作成
```

### 3. コード変更前のチェックリスト

- [ ] 既存のドキュメント（README, ARCHITECTURE, API）を読んだ
- [ ] 関連するissueを確認した
- [ ] 似た実装が既に存在しないか確認した
- [ ] 変更の影響範囲を理解している

## 📝 コーディング規約

### JavaScript スタイル

#### 命名規則

```javascript
// ✅ Good: 明確で説明的
function renderPlanEditor(container) { /* ... */ }
const MAIN_CONTENT_ID = 'main-content';
let hasUnsavedChanges = false;

// ❌ Bad: 短縮形・曖昧
function render(c) { /* ... */ }
const ID = 'mc';
let flag = false;
```

#### 関数は短く、単一責務

```javascript
// ✅ Good: 一つの責務
function getFormFieldValue(fieldId) {
  return document.getElementById(fieldId)?.value?.trim() || '';
}

function collectUserInputs() {
  return {
    name: getFormFieldValue('project-name'),
    idea: getFormFieldValue('business-idea'),
    // ...
  };
}

// ❌ Bad: 複数の責務
function processForm() {
  const name = document.getElementById('project-name')?.value?.trim() || '';
  const idea = document.getElementById('business-idea')?.value?.trim() || '';
  // ... 100行以上の処理
}
```

#### IIFE（即時実行関数式）の使用

```javascript
// ✅ すべてのモジュールファイルでIIFEを使用
(function(){
  'use strict';
  
  // Private variables
  let internalState = {};
  
  // Public API
  window.publicFunction = function() { /* ... */ };
})();
```

#### Early Return の使用

```javascript
// ✅ Good: ガード節で早期リターン
function processData(data) {
  if (!data) return;
  if (data.length === 0) return;
  
  // Main logic
  // ...
}

// ❌ Bad: ネストが深い
function processData(data) {
  if (data) {
    if (data.length > 0) {
      // Main logic
      // ...
    }
  }
}
```

#### 定数の使用

```javascript
// ✅ Good: マジックナンバー/文字列を定数化
const TIMING = {
  AI_GENERATION_DELAY_MS: 2000,
  NOTIFICATION_DURATION_MS: 3000,
};

const DOM_IDS = {
  MAIN_CONTENT: 'main-content',
  GENERATE_BTN: 'generate-btn',
};

// ❌ Bad: マジックナンバー/文字列
setTimeout(() => { /* ... */ }, 2000);
const element = document.getElementById('main-content');
```

### HTML/CSS スタイル

#### Tailwind CSS の使用

```html
<!-- ✅ Good: Tailwind ユーティリティクラス -->
<div class="max-w-6xl mx-auto p-6 space-y-6">
  <h1 class="text-2xl font-bold">Title</h1>
</div>

<!-- ❌ Bad: インラインスタイル -->
<div style="max-width: 72rem; margin: 0 auto; padding: 1.5rem;">
  <h1 style="font-size: 1.5rem; font-weight: 700;">Title</h1>
</div>
```

#### セマンティックHTML

```html
<!-- ✅ Good -->
<article class="card">
  <header>
    <h2>Title</h2>
  </header>
  <section>
    <p>Content</p>
  </section>
</article>

<!-- ❌ Bad -->
<div class="card">
  <div>
    <div>Title</div>
  </div>
  <div>
    <div>Content</div>
  </div>
</div>
```

### コメント規約

#### JSDoc の使用

```javascript
/**
 * Generate AI-assisted business plan draft
 * 
 * Why: Automates initial plan creation from user inputs
 * Contract: Updates global `currentDraft` and triggers re-render
 * 
 * @param {Object} options - Generation options
 * @param {string} options.idea - Business idea
 * @param {string} options.target - Target users
 * @returns {void}
 * @sideEffects DOM manipulation, state updates, localStorage writes
 * 
 * @example
 * generateAIDraft({ idea: '...', target: '...' });
 */
function generateAIDraft(options) { /* ... */ }
```

#### インラインコメント

```javascript
// ✅ Good: "なぜ"を説明
// Use setTimeout to avoid blocking UI during generation
setTimeout(() => { /* ... */ }, TIMING.AI_GENERATION_DELAY_MS);

// ❌ Bad: "何を"を説明（コードで明らか）
// Set timeout to 2000
setTimeout(() => { /* ... */ }, 2000);
```

#### TODO コメント

```javascript
// TODO(2025-11-05, yourname): Implement actual PDF generation
window.exportPlanAsPDF = function() {
  showNotification('PDF出力機能は実装予定です', 'info');
};
```

## 💬 コミットメッセージ

### Conventional Commits形式

```
<type>(<scope>): <subject>

<body>

<footer>
```

#### Type
- `feat`: 新機能
- `fix`: バグ修正
- `docs`: ドキュメントのみの変更
- `style`: コードの意味に影響しない変更（空白、フォーマット等）
- `refactor`: バグ修正や機能追加を伴わないコード変更
- `perf`: パフォーマンス改善
- `test`: テストの追加・修正
- `chore`: ビルドプロセスやツールの変更

#### 例

```bash
# 新機能
git commit -m "feat(plan-editor): add PDF export functionality"

# バグ修正
git commit -m "fix(dashboard): resolve action count display issue"

# リファクタリング
git commit -m "refactor(plan-editor): extract form input collection logic"

# ドキュメント
git commit -m "docs: update API reference with new endpoints"

# 詳細説明付き
git commit -m "feat(plan-editor): add financial simulator

Add target monthly income simulator that calculates
required sales and user numbers based on business model.

Closes #123"
```

## 🔍 プルリクエスト

### PR作成前のチェックリスト

- [ ] コードが規約に準拠している
- [ ] 手動テストを実施した
- [ ] ドキュメントを更新した（必要な場合）
- [ ] コミットメッセージが適切
- [ ] コンフリクトが解消されている

### PRタイトル

コミットメッセージと同じConventional Commits形式

```
feat(plan-editor): add PDF export functionality
fix(dashboard): resolve action count display issue
```

### PR説明テンプレート

```markdown
## 概要
この変更の目的と背景を説明

## 変更内容
- 変更点1
- 変更点2
- 変更点3

## 影響範囲
- 影響を受けるモジュール
- 破壊的変更の有無

## テスト
- [ ] ローカルで動作確認
- [ ] 既存機能への影響確認
- [ ] レスポンシブ対応確認

## スクリーンショット
（UIの変更がある場合）

## 関連Issue
Closes #123
```

### レビュープロセス

1. **セルフレビュー** - PRを作成する前に自分でレビュー
2. **コードレビュー** - レビュワーからのフィードバック
3. **修正** - フィードバックに基づいて修正
4. **承認** - レビュー承認後にマージ

## 🧪 テスト

### 手動テスト

各機能変更時に以下を確認：

```bash
# 1. ページ遷移
- Dashboard → Projects → People → Actions → Summary

# 2. 主要機能
- Plan Editor: AI生成、編集、保存
- Projects: 作成、編集、削除
- People: プロフィール表示、アクション作成
- Actions: ステータス変更、詳細表示
- Summary: リフレクション、Next昇格

# 3. レスポンシブ
- Mobile (375px)
- Tablet (768px)
- Desktop (1280px)

# 4. ブラウザ
- Chrome (最新)
- Firefox (最新)
- Safari (最新)
```

### 将来: 自動テスト（実装予定）

```javascript
// Unit Tests (Jest)
describe('renderPlanEditor', () => {
  it('should render mode selector when no mode', () => {
    // Test implementation
  });
});

// E2E Tests (Playwright)
test('plan generation flow', async ({ page }) => {
  // Test implementation
});
```

## 📚 ドキュメント

### 更新が必要な場合

以下のような変更時はドキュメントも更新してください：

- **新しいPublic API追加** → `API.md` を更新
- **アーキテクチャ変更** → `ARCHITECTURE.md` を更新
- **新機能追加** → `README.md` を更新
- **バージョンアップ** → `CHANGELOG.md` を更新

### ドキュメント作成のベストプラクティス

1. **明確で簡潔に** - 専門用語を避け、具体例を示す
2. **コード例を含める** - 実際の使用方法を示す
3. **最新に保つ** - コード変更と同時に更新
4. **視覚的要素** - 図やスクリーンショットを活用

## ❓ 質問・サポート

### 質問がある場合

1. **既存のドキュメントを確認**
   - README.md
   - ARCHITECTURE.md
   - API.md
   
2. **Issueを検索**
   - 既存のissueに同じ質問がないか確認

3. **新しいIssueを作成**
   - 質問内容を明確に記載
   - 関連するコードやスクリーンショットを添付

### バグ報告

```markdown
## バグの説明
何が起きたか

## 再現手順
1. '...'へ移動
2. '...'をクリック
3. '...'まで scroll
4. エラーを確認

## 期待される動作
何が起きるべきだったか

## スクリーンショット
（可能な場合）

## 環境
- OS: [e.g. macOS 14.0]
- Browser: [e.g. Chrome 120]
- Version: [e.g. v2.3.0]
```

## 🙏 行動規範

- **尊重** - すべての貢献者を尊重する
- **建設的** - フィードバックは具体的で建設的に
- **協力的** - チームの成功を優先
- **包括的** - あらゆる背景の人を歓迎

## 📄 ライセンス

このプロジェクトへの貢献は、プロジェクトと同じMITライセンスの下で公開されます。

---

**ありがとうございます！** 🎉

あなたの貢献がLocalSuccessをより良いものにします。
