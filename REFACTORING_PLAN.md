# Plan Editor リファクタリング計画書

## 📋 現状分析 (197行)

### コード品質評価
- ✅ **良い点**
  - すでに単一責任に分離済み（81.8%削減達成後）
  - IIFEでスコープ分離
  - 外部モジュールとの境界明確
  
- ⚠️ **改善余地**
  - マジックナンバー/文字列が散在
  - 短縮形の変数名（btn, el, val, e）
  - generateAIDraft()が長い（130行）
  - コメントが「何を」に偏重

## 🎯 リファクタリング方針

### 絶対条件（契約不変）
- ✅ DOM構造・クラス名・ID不変
- ✅ 公開関数シグネチャ不変
- ✅ イベント処理・UI挙動不変
- ✅ データ構造・localStorage不変
- ✅ パフォーマンス劣化なし

### 適用原則（優先順）
1. **命名の明確化** - 短縮形→明示的名前
2. **定数化** - マジックナンバー/文字列→定数
3. **コメント改善** - 「なぜ」にフォーカス
4. **関数分割** - generateAIDraft()を責務ごとに分離

## 📝 実装計画

### Stage 1: 定数定義と命名改善
```javascript
// Before
const btn = document.getElementById('generate-btn');
btn.disabled = true;
setTimeout(() => { /* ... */ }, 2000);

// After
const TIMING = { AI_GENERATION_DELAY_MS: 2000 };
const DOM_IDS = { GENERATE_BUTTON: 'generate-btn' };

const generateButton = document.getElementById(DOM_IDS.GENERATE_BUTTON);
generateButton.disabled = true;
setTimeout(() => { /* ... */ }, TIMING.AI_GENERATION_DELAY_MS);
```

### Stage 2: 関数分割（generateAIDraft）
```javascript
// 現在: 130行の巨大関数
window.generateAIDraft = function() {
  // 入力収集
  // デフォルト処理
  // 財務計算
  // UI更新
  // AI生成シミュレーション
}

// 改善後: 責務ごとに分離
function collectUserInputs() { /* ... */ }
function applyDefaultValues(inputs) { /* ... */ }
function updateGenerateButtonState(isGenerating) { /* ... */ }
function performAIGeneration(inputs) { /* ... */ }

window.generateAIDraft = function() {
  const inputs = collectUserInputs();
  const validatedInputs = applyDefaultValues(inputs);
  updateGenerateButtonState(true);
  performAIGeneration(validatedInputs);
}
```

### Stage 3: JSDoc追加
```javascript
/**
 * Generate AI-assisted business plan draft
 * 
 * Why: Automates initial plan creation from user inputs
 * Contract: Updates global `currentDraft` and triggers re-render
 * Side effects: DOM manipulation, setTimeout callback
 * 
 * @public
 * @returns {void}
 */
window.generateAIDraft = function() { /* ... */ }
```

## 🔍 変更影響範囲

### 影響なし（契約維持）
- ✅ index.html (スクリプトタグ順序)
- ✅ plan-editor-light.js (window API呼び出し)
- ✅ plan-editor-workspace.js (状態アクセス)
- ✅ UI/UX（見た目・挙動）
- ✅ データ構造

### 変更箇所
- ⚠️ plan-editor.js内部のみ（private関数追加）

## ✅ 検証手順

### 自動テスト
1. Lintエラーなし確認
2. 型チェック（JSDocベース）

### 手動テスト
1. **モード選択** → 両モード正常動作
2. **AI生成** → 下書き生成・表示確認
3. **編集保存** → プレビュー更新確認
4. **ワークスペース遷移** → 状態保持確認
5. **新規作成** → 状態リセット確認
6. **PDFエクスポート** → 通知表示確認

### 回帰確認
- currentDraft getter/setter動作
- projectName同期
- window.setCurrentMode動作
- 外部モジュールからのアクセス

## 📦 今後の改善候補

### 契約不変で可能な改善
1. TypeScript化（.d.tsファイル追加）
2. ユニットテスト追加
3. エラーハンドリング強化
4. Storybookコンポーネント化

### 契約変更が必要な改善
1. 状態管理をRedux/Zustand化
2. React/Vue等へのフレームワーク移行
3. WebComponents化

---

## 変更履歴
- 2025-11-05: 初版作成（現状197行分析）
- 2025-11-05: **決定: 現状維持** - 理由: 既に高品質、他タスク優先

## 決定事項

### リファクタリング実施判断: ❌ 見送り

**理由:**
1. コードは既に高品質（81.8%削減後の最適化済み状態）
2. 改善余地は小さく、リスク > メリット
3. より優先度の高いタスク（新機能、テスト、ドキュメント）が存在
4. 現在のコードで問題は発生していない

**今後の方針:**
- 大きな機能追加時に部分的にリファクタリング検討
- TypeScript化やテスト追加を優先
- パフォーマンス問題発生時に再評価

**承認:** 2025-11-05
