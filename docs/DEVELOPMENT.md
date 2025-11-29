# LocalSuccess - 開発ガイド

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

## 📝 開発ガイド

### コードスタイル

- ESLintを使用したリントチェック
- Prettierによる自動フォーマット（推奨）

### 主要な依存関係

- `@tanstack/react-query`: サーバー状態管理
- `react-router-dom`: ルーティング
- `@radix-ui/*`: アクセシブルなUIコンポーネント
- `tailwindcss`: スタイリング

### ファイルサイズの制約

- 1ファイル300行以内を推奨
- 300行を超える場合は適切に分割

## 🚢 デプロイ

### Vercel

```bash
# Vercel CLIでデプロイ
vercel
```

### その他のホスティングサービス

ビルド後、`dist/` ディレクトリの内容を静的ホスティングサービスにデプロイしてください。

