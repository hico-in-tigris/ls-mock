# LocalSuccess - 地域の力を可視化するSaaS

![LocalSuccess Logo](https://placehold.co/400x200/2563eb/ffffff?text=LocalSuccess)

## 概要

LocalSuccessは、地域おこし協力隊など地方で起業を志す若者向けに「ネットワークを財産化→リーンサイクルで回す→小さな行動が続く」を体験できるSaaSの静的モックです。

### 主な目標
- **Time-to-first-entry -60%** (45日 → 18日)
- **Try昇格率 +45%** (25% → 36%)
- **30日内フォロー率 +35%** (40% → 54%)

## 技術構成

- **HTML** - セマンティックな構造とアクセシビリティ対応
- **Tailwind CSS CDN** - shadcn/ui風のデザインシステム
- **Vanilla JavaScript** - SPA風ルーティングとデータ管理
- **localStorage** - データ永続化

## 機能概要

### 📊 Dashboard
- KPIバッジ表示 (Time-to-first-entry, Try昇格率, フォロー率)
- Next Plan一覧
- 今日のアクション
- 期限切れフォロー
- 活動トレンドチャート (プレースホルダー)

### 📋 Projects
- プロジェクト管理 (Plan/Try/Done)
- KPTログ機能
- Try→Plan昇格機能
- AIアウトライン生成 (モック)
- フィルタリング機能

### 👥 People
- 関係者管理
- 最終接触からの経過日数表示
- **提案カード機能** - タグと経過日数から自動提案
- ワンクリックアクション作成
- マスキング機能対応

### ✅ Actions
- カンバン方式のアクション管理
- **Quick Add機能** - `#タグ @人物 !期限` パース対応
- ステータス管理 (Todo/Doing/Done)
- 週次サマリ対象フラグ

### ⭐ Follow
- フォロー率KPI表示
- 経過日数による優先度表示
- 一括リマインド作成
- 前回話題テンプレートコピー

### 🔄 Diff
- Plan v1/v2の差分可視化
- KPIスナップショット比較
- 変更履歴とKPTログ連携

### 📝 Summary
- GMN (Good/More/Next) 入力
- Done → Next昇格機能
- 印刷用CSS対応 (1ページ出力)
- 週次サマリ自動生成

### ⚙️ Settings
- プライバシー保護 (匿名化表示)
- データエクスポート/インポート (JSON)
- データ初期化機能
- システム情報表示

## デモフロー

画面左下のデモガイドに従って以下のフローを体験できます：

1. **People** → 田中さん → 提案カード「次の打診」をクリック
2. **Actions** → 期限設定 → Done変更
3. **Summary** → Done選択 → Next昇格
4. **Projects** → Plan追加確認 → Try→Plan昇格
5. **Diff** → v1/v2差分確認

## 使用方法

### 起動方法
```bash
# ローカルサーバーで起動（推奨）
python -m http.server 8000
# または
npx serve .

# ブラウザで開く
open http://localhost:8000
```

### 主要機能の使い方

#### Quick Add
- 右下のFABまたはサイドバーのボタンをクリック
- テキスト例: `@田中さん に #移住相談 の件で連絡 !2025-11-10`
- `#タグ`, `@人物`, `!期限` が自動認識される

#### 提案カード
- Peopleページで各人物カードの「提案アクション」をクリック
- タグと最終接触日から自動生成される提案が表示
- ワンクリックでアクション作成

#### マスキング機能
- Settings → 匿名化表示をON
- 投資家向けデモ時に個人情報を保護

## レスポンシブ対応

- **モバイル**: 375px〜 (ハンバーガーメニュー、FAB)
- **タブレット**: 768px〜
- **デスクトップ**: 1280px〜

## アクセシビリティ

- セマンティックHTML
- キーボード操作サポート
- フォーカストラップ付きモーダル
- WCAG AA相当のコントラスト比
- スクリーンリーダー対応

## 印刷対応

- Summary画面から印刷用表示
- A4 1ページに最適化
- 不要要素の非表示
- 印刷専用スタイル

## データ構造

### People
```javascript
{
  id: 1,
  name: "田中 健一",
  role: "住民",
  tags: ["#移住相談", "#空き家"],
  lastContact: "2025-10-28",
  // ...
}
```

### Projects
```javascript
{
  id: 1,
  title: "移住促進プログラムv2",
  purpose: "UI/UXを改善し、移住相談から定住までの期間を短縮する",
  status: "Try", // Plan/Try/Done
  kpi: "Time-to-first-entry -60%",
  // ...
}
```

### Actions
```javascript
{
  id: 1,
  content: "田中さんに移住相談の件で電話",
  type: "連絡", // 連絡/調整/準備/記録
  status: "Done", // Todo/Doing/Done
  weeklyTarget: true,
  // ...
}
```

## カスタマイズ

### デザインシステム
- `assets/main.css` - shadcn/ui風のカスタムスタイル
- Tailwind設定でカラーパレット調整可能

### データ初期化
- Settings → データ初期化
- または `localStorage.clear()` + リロード

### 新機能追加
1. `sampleData` に新しいデータ構造を追加
2. 対応する render 関数を作成
3. ルーティングに追加

## ライセンス

このプロジェクトはデモンストレーション目的で作成されており、MITライセンスの下で公開されています。

## 作成者

UIエンジニアによる地域活性化SaaSのプロトタイプ実装

---

**LocalSuccess** - 地域の小さな行動を、大きな変化に。