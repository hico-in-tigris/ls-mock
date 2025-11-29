# LocalSuccess - アーキテクチャ

## 🏗 アーキテクチャ概要

- **React + Vite**（モダンなフロントエンド構成）
- **shadcn/ui**（アクセシブルなUIコンポーネント）
- **MockDB**（localStorageベースのデータ永続化）
- **People/Project/Hypothesis** の三軸でデータ設計
- **モバイル最適化**（協力隊の現場利用前提）

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
│   ├── thought/       # 思考記録・仮説関連
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

