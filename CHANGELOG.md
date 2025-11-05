# Changelog

All notable changes to LocalSuccess will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Planned
- 自動テスト基盤（Jest + Playwright）
- TypeScript移行の検討
- パフォーマンス最適化（大規模データ対応）
- PDF実エクスポート機能
- データバックアップ・エクスポート機能

## [2.3.0] - 2025-11-05

### Changed - リファクタリングとドキュメント整備

#### コード整理
- **QDEモジュール削除**
  - 未使用のQDE（Quick Draft Editor）関連ファイル11個を削除
  - `index.html`からQDE script参照7行を削除
  - `assets/main.css`からQDE関連コメント削除
  
- **Plan Editorモジュール分離**
  - ワークスペース管理ロジックを`plan-editor-workspace.js`へ分離（636行削減）
  - `plan-editor.js`: 833行 → 197行（76.3%削減）
  - 最終状態: 単一責務に焦点を当てた構造

#### ドキュメント整備
- **ARCHITECTURE.md** 新規作成
  - モジュラーモノリス設計の詳細説明
  - 3層アーキテクチャ（Core/Features/UI）
  - データフロー図とモジュール依存関係
  - デザインパターン解説（IIFE、Module、Observer、Template）
  - パフォーマンス戦略とコーディング規約
  - リファクタリング履歴（Phase 1 & 2）
  
- **API.md** 新規作成
  - 全Public API（window.*）の完全リファレンス
  - JSDoc形式のアノテーション（@param、@returns、@sideEffects）
  - 使用例とエラーハンドリング情報
  - Core、Plan Editor、State Management、Workspace等のAPI群
  
- **CONTRIBUTING.md** 新規作成
  - 開発環境セットアップガイド
  - コーディング規約（JavaScript、HTML/CSS、コメント）
  - Conventional Commits形式のコミットメッセージ
  - PRプロセスとレビュー基準
  - 手動テストチェックリスト
  
- **REFACTORING_PLAN.md** 新規作成
  - リーダブルコード原則に基づく分析
  - 現状維持（Status Quo）の決定を文書化
  - 将来の技術的方向性（TypeScript、Testing、Performance）
  
- **README.md** 更新
  - v2.3.0リリース情報追加
  - Plan Editorシステムの詳細説明（Light/Workspaceモード）
  - ファイル構成の再整理（行数含む）
  - 技術的達成の記載（90.0%コード削減、モジュール化）

### Metrics
- **総コード削減**: 90.0%（4,719行 → 471行、main.js + plan-editor.js）
- **Plan Editor削減**: 81.8%（1,083行 → 197行）
- **削除ファイル数**: 11（QDEモジュール）
- **新規ドキュメント**: 4ファイル（85KB+ ARCHITECTURE、88KB+ API、CONTRIBUTING、REFACTORING_PLAN）

## [2.2.0] - 2025-11-04

### Changed - Plan Editor大規模リファクタリング（Phase 2）

#### モジュール分割完了
- **Plan Editorモジュール群を分離**（1,083行 → 197行、81.8%削減）
  - `plan-editor-modes.js` - Light/Workspaceモード選択とレンダリング
  - `plan-editor-light.js` - ライトモードのフォーム・エディタ・プレビュー
  - `plan-editor-workspace.js` - ワークスペースモード（詳細編集）
  - `plan-editor-actions.js` - アクション管理（保存、エクスポート、リセット）
  - `plan-editor.js` - コア制御ロジック（オーケストレーション）

#### アーキテクチャ改善
- **関心の分離（Separation of Concerns）**
  - UIレンダリング vs ビジネスロジック
  - モード選択 vs モード実装
  - 状態管理の一元化
  
- **可読性向上**
  - 単一責務原則の適用
  - 明確なモジュール境界
  - 一貫したAPI設計（window.* exports）

### Metrics
- Plan Editorモジュール: 1,083行 → 197行（81.8%削減）
- 新規ファイル: 4（modes、light、workspace、actions）
- 平均ファイルサイズ: 約200行/ファイル

## [2.1.0] - 2025-11-03

### Changed - Main.js大規模リファクタリング（Phase 1）

#### 機能分割
- **Main.jsから機能別モジュールを抽出**（3,636行 → 274行、92.5%削減）
  - `projects.js` - プロジェクト管理（作成、編集、削除、表示）
  - `people.js` - 人物管理（プロフィール、モーダル、アクション作成）
  - `actions.js` - アクション管理（ステータス変更、詳細表示）
  - `summary.js` - サマリー機能（リフレクション、Next昇格）
  - `settings.js` - 設定管理（ダークモード切替）
  - `plan-editor.js` - プラン編集（AI生成、編集、保存）
  - `financial-estimator.js` - 財務シミュレーション

#### アーキテクチャ変更
- **モジュールパターン導入**
  - IIFE（即時実行関数式）によるカプセル化
  - Public API（window.*）とPrivate実装の分離
  - グローバル汚染の防止
  
- **main.jsの役割再定義**
  - ルーティングとナビゲーション
  - ページ遷移制御
  - 通知システム
  - 初期化処理

### Metrics
- Main.js: 3,636行 → 274行（92.5%削減）
- 新規モジュール: 7ファイル
- コードの再利用性向上、保守性向上

## [2.0.0] - 2025-10-15

### Added - Plan Editor統合

#### 新機能
- **AI支援プラン作成機能**
  - 2つのモード: Light（簡易）/ Workspace（詳細）
  - AI生成による初期プラン作成（シミュレーション）
  - リアルタイムプレビュー
  - MarkdownとHTML出力
  
- **財務シミュレーター**
  - 目標月収から逆算
  - 必要販売数・ユーザー数計算
  - ビジネスモデル別試算（B2C、B2B、サブスク等）

#### UI/UX改善
- Plan Editorページ追加
- ナビゲーション更新
- レスポンシブデザイン対応

### Breaking Changes
- ルーティング変更: `#plan-editor`追加

## [1.2.0] - 2025-09-20

### Added
- **Summaryページ実装**
  - 週次リフレクション機能
  - Next Actionsへの昇格機能
  - アクション完了統計

### Changed
- アクション管理の改善
  - ステータス変更UI
  - 詳細モーダル表示

## [1.1.0] - 2025-08-10

### Added
- **Peopleページ実装**
  - 人物プロフィール表示
  - 人物別アクション作成
  - プロフィール編集機能

### Changed
- ナビゲーション追加（People）

## [1.0.0] - 2025-07-01

### Added - 初期リリース

#### コア機能
- **Dashboard**
  - プロジェクトサマリー
  - アクション統計
  - クイックアクション

- **Projects**
  - プロジェクト作成・編集・削除
  - プロジェクトカード表示
  - 基本情報管理

- **Actions**
  - Next Actions管理
  - ステータス管理（Not Started、In Progress、Done）
  - アクション一覧表示

#### 技術スタック
- Vanilla JavaScript
- Tailwind CSS
- LocalStorage（データ永続化）
- Marked.js（Markdown変換）

#### アーキテクチャ
- Single Page Application（SPA）
- Hash-based Routing
- モノリシック構造（main.js）

---

## リリースタイプ

- **Major (x.0.0)**: 破壊的変更、大規模な機能追加
- **Minor (0.x.0)**: 後方互換性のある機能追加
- **Patch (0.0.x)**: バグ修正、小規模な改善

## リンク

- [最新バージョン](https://github.com/hico-in-tigris/ls-mock)
- [Issue Tracker](https://github.com/hico-in-tigris/ls-mock/issues)
- [Pull Requests](https://github.com/hico-in-tigris/ls-mock/pulls)
