# Base44 App

Base44 APIと連携するVite + Reactアプリケーションです。地域おこし協力隊や地方創生に関わる方々のためのプロジェクト管理・思考整理ツールです。

## 🚀 機能概要

### 主要機能

- **📊 Dashboard（ダッシュボード）** - プロジェクトの進捗状況、最近の連絡先、今日のアクションを一覧表示
- **👥 People（関係者管理）** - 地域の関係者情報を管理し、連絡履歴やタグで整理
- **✅ Actions（アクション管理）** - タスクをカンバン形式で管理（Todo / In Progress / Done）
- **📋 Projects（プロジェクト管理）** - 5段階のウィザード形式でプロジェクトを設計・管理
  - アイデア整理
  - 企画構成（5W1H）
  - 目標設定（SMART目標・KPI）
  - 関係者分析
  - 提案作成
- **📝 Summary（振り返り）** - プロジェクトやアクションの振り返りを記録
- **💭 ThoughtEntry（思考記録）** - 想いや違和感を入力し、AIが仮説を生成
- **🔬 Hypothesis（仮説管理）** - 生成された仮説を管理・検証
- **⚙️ Settings（設定）** - アプリケーション設定

## 🛠️ 技術スタック

- **フレームワーク**: React 18 + Vite 6
- **ルーティング**: React Router DOM 7
- **状態管理**: TanStack Query (React Query) 5
- **UIライブラリ**: Radix UI + Tailwind CSS
- **フォーム管理**: React Hook Form + Zod
- **データベース**: MockDB (localStorageベースの擬似DB)
- **その他**:
  - Framer Motion（アニメーション）
  - Recharts（グラフ）
  - React Markdown（マークダウン表示）
  - date-fns（日付処理）

## 📦 セットアップ

### 必要な環境

- Node.js 18以上
- npm または yarn

### インストール

```bash
# 依存関係のインストール
npm install
```

### 開発サーバーの起動

```bash
# 開発モードで起動（ホットリロード有効）
npm run dev
```

ブラウザで `http://localhost:5173` を開いてください。

### ビルド

```bash
# 本番用ビルド
npm run build
```

ビルド成果物は `dist/` ディレクトリに出力されます。

### プレビュー

```bash
# ビルド結果をプレビュー
npm run preview
```

## 📁 プロジェクト構造

```
src/
├── api/              # API クライアント
│   ├── apiClient.js     # MockDBクライアント（Base44 SDK互換）
│   ├── entities.js      # エンティティエクスポート
│   ├── integrations.js  # 統合機能エクスポート
│   └── mockDB/          # MockDB実装
│       ├── index.js      # メインエクスポート
│       ├── db.js         # データベース操作クラス
│       ├── entities.js   # エンティティラッパー
│       └── integrations.js # 統合機能モック
├── components/       # React コンポーネント
│   ├── actions/      # アクション関連
│   ├── collaboration/# コラボレーション機能
│   ├── dashboard/    # ダッシュボード関連
│   ├── people/       # 関係者管理関連
│   ├── projects/     # プロジェクト関連
│   ├── summary/      # 振り返り関連
│   ├── synchro/      # 同期機能
│   ├── thought/      # 思考記録・仮説関連
│   └── ui/           # 共通UIコンポーネント（shadcn/ui）
├── hooks/            # カスタムフック
├── lib/              # ユーティリティ関数
├── pages/            # ページコンポーネント
│   ├── Dashboard.jsx
│   ├── People.jsx
│   ├── Actions.jsx
│   ├── Projects.jsx
│   ├── Summary.jsx
│   ├── Settings.jsx
│   ├── ThoughtEntry.jsx
│   ├── HypothesisList.jsx
│   └── HypothesisDetail.jsx
└── utils/            # ヘルパー関数
```

## 🔧 設定

### MockDB（擬似データベース）

このアプリケーションは、Base44 SDKの代わりに**MockDB**というlocalStorageベースの擬似データベースを使用しています。

- **データ保存**: ブラウザのlocalStorageに保存されます
- **データ永続化**: ブラウザを閉じてもデータは保持されます
- **初期データ**: アプリ起動時にサンプルデータが自動的にシードされます

#### データのクリア

開発中にデータをリセットしたい場合は、ブラウザの開発者ツールで以下を実行：

```javascript
// すべてのMockDBデータをクリア
localStorage.clear();
```

または、特定のエンティティのみクリア：

```javascript
// Personデータのみクリア
localStorage.removeItem('mockdb_Person');
```

## 🚢 デプロイ

### Vercel

```bash
# Vercel CLIでデプロイ
vercel
```

### その他のホスティングサービス

ビルド後、`dist/` ディレクトリの内容を静的ホスティングサービスにデプロイしてください。

## 📝 開発ガイド

### コードスタイル

- ESLintを使用したリントチェック
- Prettierによる自動フォーマット（推奨）

### 主要な依存関係

- `@base44/sdk`: Base44 APIとの通信
- `@tanstack/react-query`: サーバー状態管理
- `react-router-dom`: ルーティング
- `@radix-ui/*`: アクセシブルなUIコンポーネント
- `tailwindcss`: スタイリング

## 🤝 サポート

Base44に関するサポートや質問は、以下までお問い合わせください：

- Email: app@base44.com

## 📄 ライセンス

このプロジェクトはBase44によって作成されました。
