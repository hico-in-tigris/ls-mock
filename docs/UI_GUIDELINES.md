# LocalSuccess UIガイドライン v0.1

プロダクト全体のUI統一を目的とした軽量デザインシステム

## 1. デザインのコア思想（Design Principles）

LocalSuccess は「地域の思考フローを可視化し、行動につなげる」プロダクト。そのため UI も **"落ち着き・視認性・構造化された思考"** を軸に統一します。

### 基礎となる4原則

#### Calm & Clarity（静けさ × 明瞭さ）

- 情報密度は下げすぎず、ノイズは極力排除
- 地域プレイヤーの"判断疲れ"を抑える
- 必要な情報だけを明確に提示

#### Flow First（思考の流れを優先）

- 気づき → 仮説 → 行動 → プロジェクト → 仲間
- という順番が画面構造にも自然に表れるようにする
- ユーザーの思考プロセスに沿った画面遷移

#### Consistency（規律と統一）

- カラー・余白・アイコン・テキスト階層をすべて共通化
- ページ間で一貫した体験を提供
- コンポーネントの再利用性を高める

#### Friendly Minimal（親しみ × 最小構成）

- スマホでの利用が多いため、余白・角丸・余裕ある行間で使いやすさと安心感を
- 過度な装飾を避け、機能性を優先
- 地域プレイヤーにとって親しみやすいデザイン

## 2. カラーパレット（Color Tokens）

自然・地域を想起する **低彩度のグリーン / アースカラー** を基調に統一。

### カラー定義

```css
--ls-primary:        #4D6B57;   /* 静かな深緑（メイン） */
--ls-primary-light:  #6C8A73;
--ls-secondary:      #375A73;   /* 山の青のニュアンス（補助） */
--ls-accent:         #89A97C;   /* ボタン強調色 */
--ls-bg:             #FAFAF7;   /* 優しい背景色 */
--ls-surface:        #FFFFFF;   /* カード・ボックス */
--ls-border:         #E5E5DF;   /* 薄い境界 */
--ls-text:           #333333;
--ls-text-light:     #666666;
--ls-danger:         #D9534F;
--ls-warning:        #F0AD4E;
--ls-success:        #5CB85C;
```

### 目的

- 全ページに"土の匂いがする落ち着き"を持たせる
- 派手にならず、仮説や思考が読みやすくなる
- 長時間の利用でも疲れにくい配色

### Tailwind CSS での使用

カラートークンは `tailwind.config.js` で定義し、以下のように使用：

```jsx
// 背景色
<div className="bg-[--ls-bg]">...</div>

// テキスト色
<p className="text-[--ls-text]">...</p>

// ボーダー色
<div className="border-[--ls-border]">...</div>
```

## 3. タイポグラフィ（Typography Rules）

### 使用フォント

- **Sans-serif**（Inter / Noto Sans JP）
- 日本語の情報密度に強い、明瞭なライン

### テキスト階層

| 用途 | Tailwind例 | 説明 |
|------|-----------|------|
| ページタイトル | `text-2xl font-semibold` | 最上部、呼吸を作る |
| セクションタイトル | `text-lg font-medium` | カードやリスト塊の見出し |
| ラベル / 小見出し | `text-sm font-medium` | メタ情報 |
| 本文 | `text-sm text-[--ls-text]` | 標準テキスト |
| 備考 / 補足 | `text-xs text-[--ls-text-light]` | 補助情報 |

### ルール

- **階層の飛び級は禁止**（例：タイトルの下にいきなり本文を置かない）
- 見出しの下には必ず適切な間隔を設ける
- テキストサイズは上記の階層に従う

## 4. 余白・角丸・シャドウ（Layout Rhythm）

一貫性の正体は「余白の決め打ち」です。

### 余白（Spacing）

- **ページ左右**: `px-4`
- **セクション間**: `mt-6`
- **カード内**: `p-4`
- **リスト行**: `p-3`

### 角丸（Border Radius）

- **原則**: `rounded-lg`
- **タグや小パーツ**: `rounded-md`

### シャドウ

- **最小限**。カードは薄いシャドウのみ
- `shadow-sm` を標準とする
- 過度なシャドウは避ける

## 5. コンポーネント指針（shadcnベース）

LocalSuccess専用のコンポーネントプリセットを定義。

### LSPageLayout

ページ全体のレイアウト構造：

```
タイトル
↓
サマリー（任意）
↓
セクションブロック（複数）
↓
CTA（追加 or 作成）
```

### LSSection

薄い区切り線 + タイトル + カード群

- `mt-6` から始める
- セクションタイトルは `text-lg font-medium`
- セクション間には適切な余白を設ける

### LSCard

- **表面**: 白（`bg-[--ls-surface]`）
- **角丸**: `rounded-lg`
- **パディング**: `p-4`
- **ボーダー**: `border border-[--ls-border]`
- **タイトル・本文・CTAの順序を守る**

### LSListItem

- **最低高さ**: `min-h-[44px]`（タッチターゲットの確保）
- **アイコンサイズ**: `20px` 統一
- **行内余白**: `px-3 py-2`
- **ホバー時**: 背景色の変化でフィードバック

### LSButton

- **Primary**: 深緑（`bg-[--ls-primary]`）
- **Secondary**: 灰色（shadcn標準）
- **Danger / Warning**: shadcn標準を使用
- **サイズ**: `sm`, `default`, `lg` を統一

## 6. ページテンプレート（Production-ready）

すべてのページはこの構造に揃える：

```jsx
<Page>
  <Header title="○○" />
  <SummaryBox />         // DashboardやProject系
  <LSSection title="今日やること">
    <LSListItem />
    <LSListItem />
  </LSSection>
  <LSSection title="進行中のプロジェクト">
    <LSCard />
  </LSSection>
  <FooterCTA />
</Page>
```

### 適用ページ

- Dashboard
- 仮説生成
- 行動ログ
- プロジェクト
- People

全部これで統一できます。

## 7. アイコンルール（Lucide Icons）

### サイズ

- **固定**: `20px`（`w-5 h-5`）
- ページ間でサイズが揺れないようにする

### 色

- **標準**: `text-[--ls-text-light]`
- **アクティブ**: `text-[--ls-primary]`
- **エラー**: `text-[--ls-danger]`

### 配置

- **行頭揃え**: 必ず `mr-2` または `mr-3`
- アイコンとテキストの間隔を統一

### 禁則

- ページ間でアイコンが別物にならないこと
- サイズや色が場面で揺れないこと
- 同じ機能には同じアイコンを使用

## 8. 禁則事項（Consistency Anti-Patterns）

以下のパターンは避けること：

### ❌ 文字サイズがページによって違う

- 同じ階層のテキストは同じサイズを使用
- タイポグラフィルールに従う

### ❌ ボタンカラーがページごとに違う

- Primaryボタンは常に深緑
- カラートークンを使用

### ❌ リスト行の高さが揺れて"ガタつく"

- `min-h-[44px]` を統一
- パディングを統一

### ❌ 余白ルールなしで詰まる or 開きすぎる

- 余白ルール（Spacing）に従う
- セクション間は `mt-6`

### ❌ タイトルの扱いがバラつく

- ページタイトル: `text-2xl font-semibold`
- セクションタイトル: `text-lg font-medium`

### ❌ カードなのかリストなのか判別しづらい

- LSCard と LSListItem を明確に使い分ける
- 視覚的な区別を明確にする

## 9. 実装チェックリスト

新しいページやコンポーネントを作成する際は、以下を確認：

- [ ] カラートークンを使用しているか
- [ ] タイポグラフィルールに従っているか
- [ ] 余白ルール（Spacing）に従っているか
- [ ] アイコンサイズが統一されているか（20px）
- [ ] 角丸が統一されているか（`rounded-lg`）
- [ ] シャドウが最小限か（`shadow-sm`）
- [ ] ページテンプレート構造に従っているか
- [ ] 禁則事項に違反していないか

## 10. 今後の拡張

- カラートークンを `tailwind.config.js` に正式に追加
- LSPageLayout, LSSection, LSCard, LSListItem をコンポーネントとして実装
- Storybook でのコンポーネントドキュメント化
- デザインシステムのバージョン管理

---

**バージョン**: v0.1  
**最終更新**: 2025年  
**メンテナー**: LocalSuccess Team

